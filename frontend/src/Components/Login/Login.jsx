import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export default function Login() 
{
    const navigate = useNavigate()
    const [cread, setcread] = useState({
        email: '',
        password: '',

    });
    const change = (e) => {
        const { name, value } = e.target;
        setcread({ ...cread, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/Admin/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cread),
            });
            // const json=await response.json();

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("authToken",data.authToken);
                console.log(localStorage.getItem("authToken"));
                navigate("/")
            }
            else {
                alert("Enter valid credentials")
            }
            console.log(response);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (

        <div className='container  bg-balck d-flex justify-content-center align-items-center'>
            <form className='w-50 ' onSubmit={submit}>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email"
                        className="form-control"
                        id='email'
                        name="email"
                        value={cread.email}
                        onChange={change}
                    />
                    <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={cread.password}
                        onChange={change}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/Signup" className='btn btn-primary ms-3'>New User</Link>
            </form>
        </div>
    )
}
