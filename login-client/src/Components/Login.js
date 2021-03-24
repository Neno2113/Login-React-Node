import React, { Component } from "react";
import { Link } from "react-router-dom";
import Global from "../Global";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import axios from "axios";
import { Redirect } from "react-router-dom";


class Login extends Component {

    constructor(){
        super();
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es requerido.",
                email: "Debe digitar un correo valido."
            }
        })
    }


    url = Global.url;
    emailRef = React.createRef();
    passwordRef = React.createRef();
    identity;

    state = {
        user: {},
        status: null
    }

    onChange = () => {
        this.setState({
            user: {
                email: this.emailRef.current.value,
                password: this.passwordRef.current.value,
                gettoken: null
            }
        })
    }

    login = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
          
            axios.post(this.url+'login', this.state.user)
                .then(res => {
                    if(res.data.user){
                        this.identity = res.data.user;
                        localStorage.setItem('identity', JSON.stringify(this.identity));
                        this.setState({
                            user: {
                                email: this.emailRef.current.value,
                                password: this.passwordRef.current.value,
                                gettoken: true
                            },
                            status: "waiting"
                        })
                        axios.post(this.url+'login', this.state.user)
                            .then( res => {
                                if(res.data.token){
                                    localStorage.setItem('token', JSON.stringify(res.data.token));

                                    this.setState({
                                        status: "success"
                                    });
            
                                    Swal.fire(
                                    'Bienvenido.',
                                    'Has iniciado sesion',
                                    'success'
                                    );
                                }
                            })
                        
                    } else if(res.data.status === "error"){
                        this.setState({
                            status: "failed"
                        })

                        Swal.fire(
                        'Las credenciales no son correctas',
                        'Intenta introducir los datos correctamente.',
                        'error'
                        );
                    }
                })
          } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
          }

        
    }

    render(){
        if(this.state.status === "success"){
            return <Redirect to="/home"></Redirect>
        }


        return(
            <div className="log-container">
            <h2> <b> Login</b> App</h2>
            <form action="" className="form-login" onSubmit={this.login}>
                <h3>Formulario de acceso</h3>
                <div className="input-group">
                    <input type="email" name="email" id="email" placeholder="Email" ref={this.emailRef} onChange={this.onChange}/>
                    <i className="fas fa-user icon-user"></i>
                </div>
                {this.validator.message('email', this.state.user.email, 'required|email')}
                <div className="input-group">
                    <input type="password" name="" id="" placeholder="Contraseña" ref={this.passwordRef} onChange={this.onChange}/>
                    <i className="fas fa-lock icon-lock"></i>
                </div>
                {this.validator.message('password', this.state.user.password, 'required')}
                <Link  to="/registro">Para registrar un usuario</Link>
                <input type="submit" value="Entrar"/>
            </form>
        </div>
        );
    }
}



export default Login;