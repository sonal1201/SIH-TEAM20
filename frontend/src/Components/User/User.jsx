import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './User.css';

export default function User() {
  const [cread, setcread] = useState({
    address: '',
    pincode: '',
  });

  const navigate = useNavigate();

  const parseAddress = (rawAddress) => {
    return {
      address: rawAddress,
      pincode: cread.pincode,
    };
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const structuredAddress = parseAddress(cread.address);
      
      const response = await fetch('http://localhost:5000/find-post-office', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(structuredAddress),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const nearestOffice = data ? 
          `Office Name: ${data.OfficeName}, City: ${data.District}, State: ${data.StateName}, Pincode: ${data.Pincode}` :
          "No data available";
        Swal.fire({
          title: 'Nearest Office',
          text: nearestOffice,
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        setcread({
          address: "",
          pincode: "",
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: data.error || 'An unexpected error occurred',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred: ' + err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  const change = (e) => {
    const { name, value } = e.target;
    setcread({ ...cread, [name]: value });
  };

  return (
    <>
      <form onSubmit={Submit}>
        <div className='container_user p-3'>
          <div className="p-3">
            <div className="row">
              <div className="col">
                video
              </div>
              <div className="col">
                <div className="mb-6">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id='address'
                    name="address"
                    value={cread.address}
                    onChange={change}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="pincode" className="form-label">PIN CODE</label>
                  <input
                    type="text"
                    className="form-control"
                    id='pincode'
                    name="pincode"
                    value={cread.pincode}
                    onChange={change}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
