import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from './App';
import { Link } from 'react-router-dom';


const Login = () => {
    const [token,setToken] = useContext(store)
    const [data,setData] = useState({
        email:'',
        password:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
            res => setToken(res.data.token)
        )
    }
    if(token){
       return  window.location.replace("/myprofile");
    }
    return (
        <div>
            <center>
            <form onSubmit={submitHandler}>
                <h3>Login</h3>
                <input type="email"  class="form-control" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="password"  class="form-control" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="submit"  class="btn btn-primary"value="Login" /><br />
                <Link to='/register'>I don't Have account</Link>
            </form>
            </center>
        </div>
    )
}

export default Login