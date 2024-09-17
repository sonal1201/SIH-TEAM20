import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



export default function User() {
  const [cread, setcread] = useState({
      address: '',
      pincode: '',
      
  });
  const navigate = useNavigate()
  
  const Submit = async (e) => {
      e.preventDefault();  // Corrected here
      try {
          const response = await fetch('http://localhost:4000/userdata/send', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(cread),
          });
          const data = await response.json();
          if (response.ok) {
              setcread({
                  address: "",
                  pincode: "",
                  
              });
//              navigate("/login");
          } else {
              console.log("Error inside");
          }
      } catch (err) {
          console.error("An error occurred:", err);  // Added error handling
      }
  }

  const change = (e) => {
      const { name, value } = e.target;
      setcread({ ...cread, [name]: value });
  };

// export default function user() {
  return (

    <form onSubmit={Submit}>
      <div className='container p-3'>
      <div class=" p-3">
        <div class="row">
          <div class="col">
            video
          </div>
          <div class="col">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id='address'
                  name="address"
                  value={cread.address}
                  onChange={change}

                />

              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">PIN CODE</label>
                <input
                  type="text"
                  className="form-control"
                  id='pincode'
                  name="pincode"
                  value={cread.pincode}
                  onChange={change}


                />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>
      </div>

    </div>





    </form>


    
  )
}
