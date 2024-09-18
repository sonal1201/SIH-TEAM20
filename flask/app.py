from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import pandas as pd
import math

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

# Your Google API Key
API_KEY = 'AIzaSyBZlpDfwVnYL1pTjI3SxKtEVm1chTRlT3o'

def get_coordinates_and_postal_code(address):
    """
    Gets latitude, longitude, and postal code from an address using Google Maps Geocoding API.
    """
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        'address': address,
        'key': API_KEY
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        print("Google Maps API Response:", data)  # Add this line to debug
        
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


def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculates the Haversine distance between two points on a sphere.
    """
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371  # Earth radius in kilometers
    return c * r

def find_nearest_post_office(address_latitude, address_longitude, post_offices_df):
    """
    Finds the nearest post office based on Haversine distance and excludes latitude, longitude, and delivery status from the response.
    """
    post_offices_df['Latitude'] = pd.to_numeric(post_offices_df['Latitude'], errors='coerce')
    post_offices_df['Longitude'] = pd.to_numeric(post_offices_df['Longitude'], errors='coerce')
    
    filtered_df = post_offices_df[post_offices_df['Delivery'] == 'Delivery']
    filtered_df = filtered_df.dropna(subset=['Latitude', 'Longitude'])
    
    print("Filtered Post Offices for Distance Calculation:", filtered_df.head())  # Debugging line
    
    if filtered_df.empty:
        return {}
    
    filtered_df['Distance'] = filtered_df.apply(
        lambda row: haversine_distance(
            address_latitude, address_longitude, row['Latitude'], row['Longitude']
        ),
        axis=1
    )
    
    nearest_post_office = filtered_df.loc[filtered_df['Distance'].idxmin()]
    return {
        "OfficeName": nearest_post_office['OfficeName'],
        "District": nearest_post_office['District'],   
        "Pincode": nearest_post_office['Pincode'],
        "StateName": nearest_post_office['StateName']
    }


def get_postal_code_from_coordinates(lat, lng):
    """
    Gets postal code from latitude and longitude using Google Maps Reverse Geocoding API.
    """
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        'latlng': f"{lat},{lng}",
        'key': API_KEY
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data['status'] == 'OK':
            for component in data['results'][0]['address_components']:
                if 'postal_code' in component['types']:
                    return component['long_name']
            return None
        else:
            print("Error in reverse geocoding:", data['status'])
            return None
    except requests.exceptions.RequestException as e:
        print("Error making request:", e)
        return None

@app.route('/find-post-office', methods=['POST'])
def find_post_office():
    """
    API endpoint to find the nearest post office based on address provided in the request.
    """
    data = request.json
    address = data.get('address')
    
    if not address:
        return jsonify({"error": "Address is required"}), 400
    
    latitude, longitude, postal_code = get_coordinates_and_postal_code(address)
    
    print("Received Address:", address)
    print("Latitude:", latitude)
    print("Longitude:", longitude)
    print("Postal Code:", postal_code)
    
    if not latitude or not longitude:
        return jsonify({"error": "Unable to find address information"}), 500
    
    # If postal code is not found, use latitude and longitude to get postal code
    if not postal_code:
        postal_code = get_postal_code_from_coordinates(latitude, longitude)
    
    if not postal_code:
        return jsonify({"error": "Unable to find postal code"}), 500
    
    # Load post office data from CSV
    try:
        post_offices_df = pd.read_csv("pincode1.csv", dtype=str)
        print("Post Offices Data:", post_offices_df.head())  # Debugging line
    except Exception as e:
        return jsonify({"error": "Error loading post office data"}), 500
    
    # Filter post offices by postal code
    filtered_post_offices = post_offices_df[post_offices_df['Pincode'] == postal_code]
    print("Filtered Post Offices Data:", filtered_post_offices.head())  # Debugging line
    
    if filtered_post_offices.empty:
        return jsonify({"error": f"No post offices found for the postal code: {postal_code}"}), 404
    
    # Find the nearest post office
    nearest_post_office = find_nearest_post_office(latitude, longitude, filtered_post_offices)
    
    if not nearest_post_office:
        return jsonify({"error": "No nearest post office found"}), 404
    
    return jsonify(nearest_post_office)



if __name__ == '__main__':
    app.run(debug=True)