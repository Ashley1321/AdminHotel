import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from './config/firebase'
import './components/edit.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import './components/AddHotel.css'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:"3%",
    },
    but:{
         marginTop:10
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      alignItems:'center'
    },
  }));

const Editpage = () => {

    const {id} = useParams()
    console.log(id)

    //fuction to get single doc
    const getDocDetails = async(id)=>{
        const docref = doc(db,'hotels',id)
        try{
            const docSnap = await getDoc(docref);
             if(docSnap.exists()){
                console.log('available')
                setDetails(docSnap.data())
             }else{
                console.log('not available available')
             }

        }catch(err){
            console.log(err)
        }
    }

    //updateButton
    const update = async(id,_guest)=>{
        const hotelDoc = doc(db,'hotels',id)

        const hotel ={
            guest: _guest,
            location:_location,
            amount:_amount,
            checkInDate:_checkInDate,
            checkOutDate:_checkOutDate,
            availableRooms:_availableRooms
    
        }

        await updateDoc(hotelDoc,hotel).then(()=>{
            alert('updated successfully')
        }).catch(err=>{
            console.log(err)
        })
         
    }

    useEffect(()=>{
        getDocDetails(id)

    },[])

    const [_guest, setGuest] = useState("")
    const [_location, setLocation] = useState("")
    // const [_descrip, setDescrip] = useState("")
    const [_amount, setAmount] = useState("")
    const [_checkInDate, setCheckInDate] = useState("")
    const [_checkOutDate, setCheckOutDate] = useState("")
    const [_availableRooms, setAvailableRooms] = useState("")

    const classes = useStyles();
    const [details, setDetails] = useState([])
    return (
        <div className='mainDiv'>
                <AppBar position="static" className='editBar'>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          
                        </IconButton>
                        <Typography variant="h6" className={classes.title} id='Heading'>
                          Edit Hotel
                        </Typography>
                        <Button className={classes.addButton} variant="contained" color="primary" id='buttonToHotels'>
                          <Link to="/admin"><img src='/images/back.png'/></Link>  
                        </Button>
                    </Toolbar>
                </AppBar>

                <div>
                <div className='form'>
                <form className={classes.root} noValidate autoComplete="off">

                      <TextField id="outlined-basic" label="guest" variant="standard" style={{alignItems:'center'}} onChange={(e)=>setGuest(e.target.value)}/><br></br>
                      <TextField id="outlined-basic" label="location" variant="standard" onChange={(e)=>setLocation(e.target.value)}/><br></br>
                      <TextField id="outlined-basic" label="Amount" variant="standard" onChange={(e)=>setAmount(e.target.value)} /><br></br>
                      <TextField id="outlined-basic" label="check in date" variant="standard" onChange={(e)=>setCheckInDate(e.target.value)}/><br></br>
                      <TextField id="outlined-basic" label="check out date" variant="standard" onChange={(e)=>setCheckOutDate(e.target.value)}/><br></br>
                      <TextField id="outlined-basic" label="Available rooms" variant="standard" onChange={(e)=>setAvailableRooms(e.target.value)}/><br></br>

                    <Button onClick={(e)=>{update(id,_guest)}}  className={classes.but}  variant="contained" color="primary" id='myMainButton'>
                    UPDATE
                </Button>
                </form>
                </div>
                </div>
        </div>
    );
}

export default Editpage;
