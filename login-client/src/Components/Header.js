import React, { Component } from "react";
import loading from "../assets/img/loading.jpg";


class Header extends Component {


    identity = JSON.parse(localStorage.getItem('identity'));

    render(){
        return (
            <header className="head">
                <span className="bar">
                    <i className="fas fa-bars"></i>
                </span>
                <div className="user">
                    <div className="img-wrap">
                        <img src={loading} alt=""/>
                    </div>
                    <h3 className="name">{this.identity.name} {this.identity.surname}</h3>
                </div>
            </header>
        );
    }
}



export default Header;