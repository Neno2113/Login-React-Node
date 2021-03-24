import React, { Component } from "react";
import { Link } from "react-router-dom";
import loading from "../assets/img/loading.jpg";

class Menu extends Component {


    identity = JSON.parse(localStorage.getItem('identity'));

    render(){
        return(
            <aside className="menu">
                <div className="brand">
                    <Link to={"/home"}>
                        <div className="img-wrap">
                            <img src={loading} alt=""/>
                        </div>
                        <h3 className="name">Login</h3>
                    </Link>
                </div>

                <div className="user">
                    <Link to={"/home"}>
                        <div className="img-wrap">
                            <img src={loading} alt=""/>
                        </div>
                        <h3 className="name">{this.identity.name} {this.identity.surname}</h3>
                    </Link>
            
                </div>

                <nav className="options">
                    <h3 className="menu-title">Menu</h3>
                </nav>
            </aside>
        )
    }
}



export default Menu;