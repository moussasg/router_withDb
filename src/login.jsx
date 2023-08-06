import React from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ()=> {
    const navigate = useNavigate()
    const handel =(event)=> {
        if(1+1===2) {
            event.preventDefault()
            console.log('fdsfds');
            navigate('/signup');
     }  
    }
    return (
        <>
        <h1>login</h1>
        <button onClick={handel}>clique</button>
        </>
    )
}
export default Login