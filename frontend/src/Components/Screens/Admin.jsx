
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer.jsx';
import './Admin.css';

export default function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cards, setCards] = useState([]); // Store card data here
  const [cread, setCread] = useState({ address: '', pincode: '' });

  // Fetch data from MongoDB when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/userdata/send');
    const data = await response.json();
    setCards(data);
  };

  const handleTextButtonClick = () => {
    setShowForm(true);
    setShowCamera(false);
  };

  const handleCameraButtonClick = () => {
    setShowForm(false);
    setShowCamera(true);
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCread({ ...cread, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/userdata/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cread),
      });
      const newCard = await response.json();
      setCards([newCard, ...cards]); // Add the new card to the top of the list
      setCread({ address: '', pincode: '' }); // Reset form
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row" style={{ minHeight: 'calc(100vh - 150px)' }}>
          <div className="col-4">
            <button
              type="button"
              className="btn btn-primary btn-lg w-90 m-3"
              onClick={handleCameraButtonClick}
            >
              CAMERA
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg w-90 m-3"
              onClick={handleTextButtonClick}
            >
              TEXT
            </button>
            {showForm && (
              <form className='form_admin' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={cread.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">PINCODE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    value={cread.pincode}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            )}
            {showCamera && (
              <div className="camera-section">
                <p>Camera Section Content</p>
              </div>
            )}
          </div>
          <div className="col-8">
            <div className="card-container">
              {cards.map((card, index) => (
                <div className="card mb-3" key={index}>
                  <h5 className="card-title">Address: {card.address}</h5>
                  <p className="card-text">Pincode: {card.pincode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
