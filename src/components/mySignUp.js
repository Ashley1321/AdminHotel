import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { useHistory } from "react-router-dom";


function CreateAccount() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory();


    const signup = () => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            history.push("/admin")
            alert('Successfully Created')
        }).catch((error) => {
            console.log(error);
            alert('Something Went Wrong')
        })

    };
    return (
        <div>
            <div className="MainFirstBg">
                <div className='SubMainDiv'>
                    <img className='user' src='/images/user.png'></img>
                </div>
            </div>
            <div className='subWhite'>
                <h1 style={{ position: 'absolute', left: '160px', top: '90px', color: '#3F0E03' }}>Create An Account</h1>
                <input className='firstName' type='text' onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' />
                <input className='Surname' type='text' onChange={(e) => setSurname(e.target.value)} placeholder='Enter Your Surname' />
                <input className='signupEmail' type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                <input className='signupPass' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
                <span className='Span'><Link to='/' style={{ color: '#3F0E03', textDecoration: 'none', position: 'absolute', left: ' 420px', top: ' 350px' }}>Log In</Link></span>
                <Button onClick={signup} variant="contained" style={{ backgroundColor: '#3F0E03', color: 'white', width: '400px', position: 'absolute', left: '100px', top: '400px' }}>register</Button>
            </div>

        </div>
    )
}

export default CreateAccount;