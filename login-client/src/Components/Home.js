import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";



class Home extends Component {

    identity = JSON.parse(localStorage.getItem('identity'));

    state = {
        status: null
    }
    
    logout = () => {
        localStorage.clear();
        this.setState({
            status: "success"
        })
       
    }

    render(){
        if(this.state.status === 'success' || !this.identity){

            Swal.fire(
                "Has cerrado sesion",
                "",
                "info"
            )

            return  <Redirect to={"/login"}></Redirect>
        }




        return(
            <div className="contenedor">
                <Header></Header>
                <Menu></Menu>
                <div className="main">
                    <div className="jumbotron">
                        <h1 className="display-4">Hola, {this.identity.name} {this.identity.surname}!</h1>
                        <p className="lead">Esto es un simple login hecho con React, NodeJs, Express y MongoDB utilizando la libreria de JWT-Simple para tener obtener tokens de acceso.</p>
                        <hr className="my-4"/>
                        <p>Por ahora solo puedes crear usuarios y hacer login.</p>
                        <button className="btn btn-danger btn-lg" onClick={this.logout} >Cerrar Sesion</button>
                        <a className="btn btn-primary btn-lg ml-4" href="https://github.com/Neno2113" >Mi Github</a>
                        
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}



export default Home;