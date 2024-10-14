import React from "react";
import api from '../api'
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css';
import LoadingIndicator from "./LoadingIndicator";
import LogoutRegisterButton from "./LogoutRegisterButton";


//route = route we want to go to when we submit form
//method = logging in or registering
export default function Form({route, method}){
    const[username, setUsername] = React.useState('')
    const[password, setpassword] = React.useState('')
    const[loading, setLoading] = React.useState(false)
    const navigate = useNavigate()


    async function handleSubmit(e){
        
        e.preventDefault()//stops reloading page
        setLoading(true)
        try{
            //send request with username and password, hopefully get tokens back
            const res = await api.post(route, {username, password})
            if(method === 'login'){//if logging in
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")//navigate back to home after logged in
            } else{
                //if not login method then it was register. need to got back to login page so we can 
                //login to get the tokens with the new account
                navigate('/login')
            }
        }catch(error){
            window.alert(error)
        } finally{
            setLoading(false)
        }

    }

    function goToRegister(){

    }


    return(
        <form onSubmit={handleSubmit} className='formContainer'>
            <h1> {method === 'login' ? "Login" : "Register"} </h1>
            <input className='formInput' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <br></br>
            <input className='formInput' type='password' value={password} onChange={(e) => setpassword(e.target.value)}></input>
            {loading && <LoadingIndicator />}
            <button className='formButton' type='submit'>
                {method === 'login' ? "Login" : "Register"}
            </button>
            {method==='login' ? 
                <LogoutRegisterButton 
                type="register"
                url="/register" 
                />
                : ""}
        </form>
    )

}