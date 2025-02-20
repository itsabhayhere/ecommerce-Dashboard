import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = ()=>{
    const [name, setName]= useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const navigate = useNavigate(); 

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    });
    
    const collectData = async ()=>{
        let result = await fetch('http://localhost:4500/register',{
            method:"post",
            body: JSON.stringify({name,email,password}),
            headers: {
                'Content-type': 'application/json'
            }
        });
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/');  
    };

    return(
        <div className="Register">
            <h2>Register</h2>
            <input className="inpF" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="inpF" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
            <input className="inpF" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={collectData} className="subBtn" type="submit">submit</button>
        </div>
    )
}

export default Signup;  