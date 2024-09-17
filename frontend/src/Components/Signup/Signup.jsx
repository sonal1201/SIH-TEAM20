import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [cread, setcread] = useState({
        email: '',
        username: '',
        password: '',
        
    });
    const navigate = useNavigate()
    
    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/Admin/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cread),
            });
            const data = await response.json();
            console.log("Response Status:", response.status);  // Logs response status
            console.log("Response Data:", data);

            if (response.ok) {
                setcread({
                    email: "",
                    username: "",
                    password: "",
                    
                });
                navigate("/login");
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

    return (
        <div className='container  d-flex justify-content-center align-items-center'>
            <form className='w-50' onSubmit={Submit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={cread.username}  // Corrected here
                        onChange={change}  // Corrected here
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={cread.email}
                        onChange={change}  // Corrected here
                    />
                    <div id="emailHelp" className="form-text ">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={cread.password}
                        onChange={change}  // Corrected here
                    />
                </div>
                

                <button type="submit" className="btn btn-primary">SignUp</button>
                <Link to="/login" className='btn btn-primary ms-3'>Already a user</Link>
            </form>
        </div>
    )
}
