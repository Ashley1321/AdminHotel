import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import './Admin.css'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './config/firebase'
import CircularProgress from '@material-ui/core/CircularProgress';





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  root: {
    marginTop: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  edit: {

    ckgroundColor: 'orange'
  },
  addButton: {
    backgroundColor: 'white',
    color: 'red'
  },
  table: {
    minWidth: 650,
  },
  displayCard: {
    marginTop: 30
  },
  editButton: {
    background: "orange"
  }
}));



//function starts here
const Admin = () => {
  const [hotels, setHotels] = useState([])
  const classes = useStyles();

  const hotelRef = collection(db, 'hotels')

  const getHotels = async () => {
    const data = await getDocs(hotelRef)


    console.log(data.docs.map((results) => (results.data())))
    setHotels(data.docs.map((results) => ({ ...results.data(), id: results.id })))
  }

  useEffect(() => {
    getHotels()
  }, [])

  //delete fuction
  function deleteHotel(id) {
    console.log('delete clicked ', { id })
    const getDoc = doc(db, 'hotels', id)
    deleteDoc(getDoc).then(() => {
      alert('Successfully Deleted')
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div className='background' >

      <AppBar position="static" className='appBar' >

        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Admin
          </Typography>
          <Button className={classes.addButton} variant="contained" color="primary">
            <Link style={{ color: 'black', textDecoration: 'none' }} className='naming' to='/addHotel'>ADD HOTELS</Link>
          </Button>
        </Toolbar>
      </AppBar>



      <div>
        <div className='tasks'>
          <div><h1 style={{ textAlign: "center", color:'white'}}>GUEST DETAILS</h1></div>
          <div className='line'></div>

          {
            hotels.length == 0 ? (
              <h2 style={{ textAlign: 'center', color: 'black', marginTop: '280px' }}>LOADING PLEASE WAIT! <div className={classes.root}>
                <CircularProgress id='loading'/>
              </div></h2>
            ) : (
              hotels.map((res) => (
                <>
                  <Card className={classes.displayCard} id="card">

                    <div className='myCard'>
                      <h1 style={{color:'grey'}}>{res.hotelName}</h1>
                      <h3 style={{padding:'3px'}}>Location:{res.location}</h3>
                      <h3 >Check In:{res.checkInDate}</h3>
                      <h3>Check Out:{res.checkOutDate}</h3>
                      <h3>Room Available:{res.availableRooms}</h3>
                      <h3>Amount:R{res.amount}</h3>
                      <h3>days:{res.days}</h3>
                      <img className='miImange' src={res.image}/>
                      <hr style={{marginTop:'20px'}}></hr>
                      <h3 style={{backgroundColor:'grey',color:'black'}} >Total Amount:R{res.totalAmount}</h3>
                      <hr ></hr>

                    </div>

                    <div>
                      <div>
                        <button onClick={(e) => { deleteHotel(res.id) }} id='deleteBtn'>
                          DELETE
                        </button>
                      </div>

                      <div >
                        <Link to={`/edit/${res.id}`} style={{ textDecoration: 'none' }}>
                          <button id='updateBtn'>
                            UPDATE
                          </button>
                        </Link>
                      </div>

                    </div>
                  </Card>
                </>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Admin;
