import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Registro";


import PrivateRoute from "./PrivateRoute";

class Router extends Component {
    render(){
        return (
            <BrowserRouter>
               
                <Switch>
                    <Route exact  path="/" component={Home}></Route>
                    {/* <Route exact  path="/home" component={Home}></Route> */}
                    <Route exact  path="/registro" component={Register}></Route>
                    <Route exact  path="/login" component={Login}></Route>
                    <PrivateRoute path="/home" component={Home} exact></PrivateRoute>

                </Switch>
            
            </BrowserRouter>
        );
    }
}



export default Router;
