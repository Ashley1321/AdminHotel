
import {Link, useHistory} from 'react-router-dom'
import {auth} from '../config/firebase'
import { useState } from "react";
import {sendPasswordResetEmail } from "firebase/auth";


function ResetPassword(){

    let history = useHistory('');


    const [email,setEmail] = useState('');
    

    const resetPassword = (()=>{
        sendPasswordResetEmail(auth, email).then(() => {
                    history.push("/AddHotel")
                    alert('Check your emails for varification')
                   
               }).catch((error) => {
                    console.log(error);
                    alert('something went wrong')
                });
                
    })
    return(
        <div className='MainFirstBg'>
            <div  className='SubMainDiv'>
            <img className='user' src='/images/user.png'></img>
            </div>
            <div  className='subWhite'>
                <h1 style={{ position: 'absolute', left: '160px', top: '110px', color: '#3F0E03' }}>RESET PASSWORD</h1>
                <input className="signupEmail" type="Email" onClick={(e)=>setEmail(e.target.value)} placeholder="Enter Email Linked with Account"/><br></br>
                <button style={{ backgroundColor: '#3F0E03', color: 'white', width: '400px', position: 'absolute', left: '100px', top: '270px', height:'35px',borderRadius:'5px' }} onClick={resetPassword}>RESET</button>

            </div>

        </div>
    )
}

export default  ResetPassword;