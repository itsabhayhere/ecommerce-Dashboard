import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{

    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    });
    const handleLogin = async ()=>{
        let result = await fetch('http://localhost:4500/login',{
            method : 'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type' :'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
        }
      
    }

    return(
        <div className='Register'>
            <h1>Login</h1>
            <input type='text' className='inpF' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            <input type='password' className='inpF' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={handleLogin} className='subBtn'>Login</button>
        </div>
    )
}
export default Login;
