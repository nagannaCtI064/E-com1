import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [items, setItems] = useState([]);
  const [email_Id, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/getData').then((res) => setItems(res.data));
  }, []);
  

  const submitHandler = (e) => {
    e.preventDefault();
    if(name.length <= 3) { // added opening and closing braces for the if statement and added space before and after the less than or equal operator
      alert("Please provide a valid name (less than or equal to 20 characters)"); // modified alert message to be more specific
    } else if(password !== confirmpassword) { // added spaces before and after the not equal to operator
      alert('Passwords do not match');
    } else {
      axios.post('http://localhost:5000/addData', { email_Id:email_Id, name: name, password: password, confirmpassword: confirmpassword }) // corrected key for confirmPassword
        .then((res) => {
          setItems(res.data);
          alert("Data saved successfully");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((res) => setItems(res.data))
    .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <div className='container-fluid p-5 form1'>
        <form className='container p-5 form2' onSubmit={submitHandler}>
          <label>EMAIL</label>
          <input type='email' placeholder='PLEASE ENTER YOUR EMAIL' name='email' className='form-input' value={email_Id} onChange={(e) => setEmail(e.target.value)} /><br></br>
          <label>NAME</label>
          <input type='text' placeholder='PLEASE ENTER NAME' name='name' className='form-input' value={name} onChange={(e) => setName(e.target.value)} /><br></br>
          <label>PASSWORD</label>
          <input type='password' placeholder='PLEASE ENTER PASSWORD' name='password' className='form-input' value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
          <label>CONFIRM PASSWORD</label>
          <input type='password' placeholder='PLEASE ENTER PASSWORD' name='confirmPassword' className='form-input' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} /><br></br>
          <button type='submit' className='btn btn-primary form-button1'>Sign Up</button>
          <Link to='/Login'>I have an account</Link>
        </form>  
      </div>
   
    </div>
  );
};

export default Register;
