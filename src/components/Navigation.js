import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from '../Admin';
import AddHotel from './AddHotel';
import LogIn from './Login';
import CreateAccount from './mySignUp';
import Editpage from '../Editpage';
import ResetPassword from './forgotPass';


const Navigation = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/mySignUp' component={CreateAccount}></Route>
                    <Route exact path='/' component={LogIn}></Route>
                    <Route exact path='/forgotPass' component={ResetPassword}></Route>
                    <Route path='/addHotel' component={AddHotel}></Route>
                    <Route  path='/edit/:id' component={Editpage}></Route>
                </Switch>
            </Router>

        </div>
    );
}

export default Navigation;
