import './login.css'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useHistory } from "react-router-dom";
import { auth } from '../config/firebase';
import React, { useState } from 'react';

// function LogIn(){
const LogIn = () => {
    const history = useHistory()
    const [email, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                console.log('signed in');
                alert('Succefully Signed in')
                history('/admin')

                // ...
            })
            .catch((error) => {
                alert('Wrong Email or Password')
                console.log(error)
            });
    }

    return (
        <div>
            <div className="MainFirstBg">
                <div className='SubMainDiv'>
                    <img className='user' src='/images/user.png'></img>
                </div>
            </div>
            <div className='subWhite'>
                <h1 style={{ position: 'absolute', left: '250px', top: '130px', color: '#3F0E03' }}>Log In</h1>
                <input className='firstTextbox' type='email' placeholder='Enter Your Email' onChange={(e) => setUserName(e.target.value)} />
                <input className='secondTextbox' type='password' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                <span className='Span'><Link to='/forgotPass' style={{ color: '#3F0E03', textDecoration: 'none', position: 'absolute', left: ' 400px', top: ' 290px' }}>Forgot Password</Link></span>
                <span className='Span'><Link to='/mySignUp' style={{ color: '#3F0E03', textDecoration: 'none', position: 'absolute', left: ' 400px', top: ' 310px' }}>Create An Account</Link></span>
                <Button onClick={(e) => { signIn() }} variant="contained" style={{ backgroundColor: '#3F0E03', color: 'white', width: '400px', position: 'absolute', left: '125px', top: '340px' }}>
                    Log In
                </Button>
            </div>
        </div>
    )
}

export default LogIn;