// import React, { useState } from 'react';
// import './User.css';

// export default function User() {
//   const [cread, setcread] = useState({
//     address: '',
//     pincode: '',
//   });
//   const [officeHistory, setOfficeHistory] = useState([]); // Store all nearest office submissions
//   const [filter, setFilter] = useState('All'); // Filter state

//   const parseAddress = (rawAddress) => {
//     return {
//       address: rawAddress,
//       pincode: cread.pincode.trim() ? cread.pincode : undefined,
//     };
//   };

//   const Submit = async (e) => {
//     e.preventDefault();

//     // Validate address field
//     if (!cread.address.trim()) {
//       alert("Please provide an address.");
//       return;
//     }

//     try {
//       const structuredAddress = parseAddress(cread.address);

//       const response = await fetch('http://localhost:5000/find-post-office', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(structuredAddress),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const isPincodeCorrect = cread.pincode && cread.pincode === data.Pincode;

//         const newCard = {
//           OfficeName: data.OfficeName,
//           City: data.District,
//           State: data.StateName,
//           correctPincode: data.Pincode,
//           userPincode: cread.pincode,
//           address: cread.address,
//           isPincodeCorrect: isPincodeCorrect
//         };

//         setOfficeHistory([newCard, ...officeHistory]);

//         setcread({
//           address: "",
//           pincode: "",
//         });
//       } else {
//         alert(data.error || 'An unexpected error occurred.');
//       }
//     } catch (err) {
//       alert('An error occurred: ' + err.message);
//     }
//   };

//   const change = (e) => {
//     const { name, value } = e.target;
//     setcread({ ...cread, [name]: value });
//   };

//   const showUserData = (card) => {
//     alert(`Address: ${card.address}\nPincode (Entered): ${card.userPincode}`);
//   };

//   // Filtered cards based on the selected filter
//   const filteredCards = officeHistory.filter(card => {
//     if (filter === 'Correct') return card.isPincodeCorrect;
//     if (filter === 'Incorrect') return !card.isPincodeCorrect;
//     return true; // 'All' option
//   });

//   return (
//     <>
//       <form onSubmit={Submit}>
//         <div className='container_user p-3'>
//           <div className="p-3">
//             <div className="row">
//               <div className="col">
//                 {/* Filter Buttons */}
//                 <div className="filter-buttons">
//                   <button 
//                     className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-light'}`}
//                     onClick={() => setFilter('All')}
//                   >
//                     All
//                   </button>
//                   <button 
//                     className={`btn ${filter === 'Correct' ? 'btn-success' : 'btn-light'}`}
//                     onClick={() => setFilter('Correct')}
//                   >
//                     Correct
//                   </button>
//                   <button 
//                     className={`btn ${filter === 'Incorrect' ? 'btn-danger' : 'btn-light'}`}
//                     onClick={() => setFilter('Incorrect')}
//                   >
//                     Incorrect
//                   </button>
//                 </div>
                
//                 {/* Scrollable Cards for Nearest Post Offices */}
//                 <div className="scrollable-cards">
//                   {filteredCards.length > 0 ? (
//                     filteredCards.map((office, index) => (
//                       <div
//                         key={index}
//                         className={`card mb-3 ${office.isPincodeCorrect ? 'bg-success' : 'bg-danger'}`}
//                         style={{ color: 'white', position: 'relative' }}
//                       >
//                         <div className="card-body">
//                           <h5 className="card-title">Nearest Post Office</h5>
//                           <p className="card-text">Office Name: {office.OfficeName}</p>
//                           <p className="card-text">City: {office.City}</p>
//                           <p className="card-text">State: {office.State}</p>
//                           <p className="card-text">Correct Pincode: {office.correctPincode}</p>
//                           {!office.isPincodeCorrect && (
//                             <>
//                               <p className="card-text" style={{ color: 'yellow' }}>
//                                 Incorrect Pincode (Entered): {office.userPincode || 'Not provided'}
//                               </p>
//                               <button 
//                                 className="btn btn-light btn-sm show-user-data-btn"
//                                 onClick={() => showUserData(office)}
//                                 style={{
//                                   position: 'absolute',
//                                   bottom: '10px',
//                                   right: '10px',
//                                   backgroundColor: 'white',
//                                   color: 'black'
//                                 }}
//                               >
//                                 Show User Data
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No nearest office information yet.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="col">
//                 <div className="mb-6">
//                   <label htmlFor="address" className="form-label">Address</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id='address'
//                     name="address"
//                     value={cread.address}
//                     onChange={change}
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="pincode" className="form-label">PIN CODE (Optional)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id='pincode'
//                     name="pincode"
//                     value={cread.pincode}
//                     onChange={change}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

import React, { useState } from 'react';
import './User.css';

export default function User() {
  const [cread, setcread] = useState({
    address: '',
    pincode: '',
  });
  const [officeHistory, setOfficeHistory] = useState([]); // Store all nearest office submissions
  const [filter, setFilter] = useState('All'); // Filter state

  const parseAddress = (rawAddress) => {
    return {
      address: rawAddress,
      pincode: cread.pincode.trim() ? cread.pincode : undefined,
    };
  };

  const Submit = async (e) => {
    e.preventDefault();

    // Validate address field
    if (!cread.address.trim()) {
      alert("Please provide an address.");
      return;
    }

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
        const isPincodeCorrect = cread.pincode && cread.pincode === data.Pincode;

        const newCard = {
          OfficeName: data.OfficeName,
          City: data.District,
          State: data.StateName,
          correctPincode: data.Pincode,
          userPincode: cread.pincode,
          address: cread.address,
          isPincodeCorrect: isPincodeCorrect
        };

        setOfficeHistory([newCard, ...officeHistory]);

        setcread({
          address: "",
          pincode: "",
        });
      } else {
        alert(data.error || 'An unexpected error occurred.');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setcread({ ...cread, [name]: value });
  };

  const showUserData = (card) => {
    alert(`Address: ${card.address}\nPincode (Entered): ${card.userPincode}`);
  };

  // Filtered cards based on the selected filter
  const filteredCards = officeHistory.filter(card => {
    if (filter === 'Correct') return card.isPincodeCorrect;
    if (filter === 'Incorrect') return !card.isPincodeCorrect;
    return true; // 'All' option
  });

  // Count calculations
  const countCorrect = officeHistory.filter(card => card.isPincodeCorrect).length;
  const countIncorrect = officeHistory.length - countCorrect;
  const countAll = officeHistory.length;

  return (
    <>
      <form onSubmit={Submit} className="m-4">
        <div className='container_user p-3'>
          <div className="p-3">
            <div className="row">
              <div className="col">
                {/* Filter Buttons with Counts */}
                <div className="filter-buttons">
                  <button 
                    className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-light'}`}
                    onClick={() => setFilter('All')}
                  >
                    All ({countAll})
                  </button>
                  <button 
                    className={`btn ${filter === 'Correct' ? 'btn-success' : 'btn-light'}`}
                    onClick={() => setFilter('Correct')}
                  >
                    Correct ({countCorrect})
                  </button>
                  <button 
                    className={`btn ${filter === 'Incorrect' ? 'btn-danger' : 'btn-light'}`}
                    onClick={() => setFilter('Incorrect')}
                  >
                    Incorrect ({countIncorrect})
                  </button>
                </div>
                
                {/* Scrollable Cards for Nearest Post Offices */}
                <div className="scrollable-cards">
                  {filteredCards.length > 0 ? (
                    filteredCards.map((office, index) => (
                      <div
                        key={index}
                        className={`card mb-3 ${office.isPincodeCorrect ? 'bg-success' : 'bg-danger'}`}
                        style={{ color: 'white', position: 'relative' }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">Nearest Post Office</h5>
                          <p className="card-text">Office Name: {office.OfficeName}</p>
                          <p className="card-text">City: {office.City}</p>
                          <p className="card-text">State: {office.State}</p>
                          <p className="card-text">Correct Pincode: {office.correctPincode}</p>
                          {!office.isPincodeCorrect && (
                            <>
                              <p className="card-text" style={{ color: 'yellow' }}>
                                Incorrect Pincode (Entered): {office.userPincode || 'Not provided'}
                              </p>
                              <button 
                                className="btn btn-light btn-sm show-user-data-btn"
                                onClick={() => showUserData(office)}
                                style={{
                                  position: 'absolute',
                                  bottom: '10px',
                                  right: '10px',
                                  backgroundColor: 'white',
                                  color: 'black'
                                }}
                              >
                                Show User Data
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No nearest office information yet.</p>
                  )}
                </div>
              </div>

              <div className="col">
                <div className="mb-1">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id='address'
                    name="address"
                    value={cread.address}
                    onChange={change}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="pincode" className="form-label">PIN CODE (Optional)</label>
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
