from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import requests
import json
import pandas as pd
import math
from bson import ObjectId

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['Postal-Data']
collection = db['nearest-Hub']

# Your Google API Key
API_KEY = 'AIzaSyBZlpDfwVnYL1pTjI3SxKtEVm1chTRlT3o'

def get_coordinates_and_postal_code(address):
    """
    Gets latitude, longitude, and postal code from an address using Google Maps Geocoding API.

    Args:
        address (str): The address to geocode.

    Returns:
        tuple: A tuple containing (latitude, longitude, postal_code). If the geocoding fails, returns (None, None, None).
    """
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        'address': address,
        'key': API_KEY
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        
        if data['status'] == 'OK':
            location = data['results'][0]['geometry']['location']
            postal_code = None
            for component in data['results'][0]['address_components']:
                if 'postal_code' in component['types']:
                    postal_code = component['long_name']
                    break
            return location['lat'], location['lng'], postal_code
        else:
            print("Error in geocoding:", data['status'])
            return None, None, None
    except requests.exceptions.RequestException as e:
        print("Error making request:", e)
        return None, None, None

def find_nearest_post_office(address_latitude, address_longitude):
    """
    Finds the nearest post office based on Haversine distance from MongoDB collection.

    Args:
        address_latitude (float): Latitude of the address.
        address_longitude (float): Longitude of the address.

    Returns:
        dict: Details of the nearest post office.
    """
    # Query MongoDB to get the post offices
    post_offices = list(collection.find({"Delivery": "Delivery"}))
    
    # Handle case where no post offices are found
    if not post_offices:
        return {}
    
    # Convert to DataFrame for easier manipulation
    post_offices_df = pd.DataFrame(post_offices)
    post_offices_df['Latitude'] = pd.to_numeric(post_offices_df['Latitude'], errors='coerce')
    post_offices_df['Longitude'] = pd.to_numeric(post_offices_df['Longitude'], errors='coerce')
    
    # Drop rows with missing latitude or longitude
    post_offices_df = post_offices_df.dropna(subset=['Latitude', 'Longitude'])
    
    if post_offices_df.empty:
        return {}
    
    post_offices_df['Distance'] = post_offices_df.apply(
        lambda row: haversine_distance(
            address_latitude, address_longitude, row['Latitude'], row['Longitude']
        ),
        axis=1
    )
    
    nearest_post_office = post_offices_df.loc[post_offices_df['Distance'].idxmin()]
    
    # Convert ObjectId to string
    nearest_post_office['_id'] = str(nearest_post_office['_id'])
    
    return nearest_post_office.to_dict()

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculates the Haversine distance between two points on a sphere.

    Args:
        lat1 (float): Latitude of point 1.
        lon1 (float): Longitude of point 1.
        lat2 (float): Latitude of point 2.
        lon2 (float): Longitude of point 2.

    Returns:
        float: The distance in kilometers.
    """
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371
    return c * r

@app.route('/find-post-office', methods=['POST'])
def find_post_office():
    """
    API endpoint to find the nearest post office based on address provided in the request.

    Returns:
        json: JSON response containing the nearest post office details.
    """
    data = request.json
    address = data.get('address')
    
    if not address:
        return jsonify({"error": "Address is required"}), 400
    
    latitude, longitude, postal_code = get_coordinates_and_postal_code(address)

    if not latitude or not longitude or not postal_code:
        return jsonify({"error": "Unable to find address information"}), 500
    
    # Find the nearest post office from MongoDB
    nearest_post_office = find_nearest_post_office(latitude, longitude)
    
    if not nearest_post_office:
        return jsonify({"error": "No nearest post office found"}), 404
    
    return jsonify(nearest_post_office)

if __name__ == '__main__':
    app.run(debug=True)
