import React, { Component } from "react";
import { Link } from "react-router-dom";
import Global from "../Global";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Register extends Component {

    constructor(){
        super();
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es requerido.",
                email: "Debe digitar un correo valido.",
                min: "La contraseña deben contender almenos 8 caracteres."
            }
        })
    }



    url = Global.url;
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    emailRef = React.createRef();
    passwordRef = React.createRef();
    passwordConfirmRef = React.createRef();
    confirmMessage;

    state = {
        user: {},
        status: null
    }

    saveUser = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            console.log(this.state.user);
            axios.post(this.url+'save', this.state.user)
                .then(res => {
                    // console.log(res);
                    if(res.data.user){
                        this.setState({
                            user: res.data.user,
                            status: "success"
                        })

                        Swal.fire(
                            'Usuario registrado correctamente!',
                            'Has creado un usuario nuevo',
                            'success'
                        );
                    } else if(res.status === 200 && res.data.status === 'error') {
                        this.setState({
                            status: "failed"
                        })

                        Swal.fire(
                            'Este correo ya existe en nuestros registros!',
                            'Correo ya existente!',
                            'error'
                        );
                    } else {
                        this.setState({
                            status: "failed"
                        })

                        Swal.fire(
                            'Ocurrio un error al crear el usuario!',
                            'hubo un error!',
                            'error'
                        );
                    }
                })
          } else {
            this.setState({
                status: 'failed'
            });
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
          }
    }

    changeState = () => {
        let password = this.passwordRef.current.value;
        let passwordConfirm = this.passwordConfirmRef.current.value;
        let passwordConfirmed;
       
        if(password.normalize() === passwordConfirm.normalize()){
            this.confirmMessage = false;
            passwordConfirmed = this.passwordRef.current.value;
           
        } else {
            this.confirmMessage = true;
        }

        this.setState({
            user: {
                name: this.nombreRef.current.value,
                surname: this.apellidoRef.current.value,
                email: this.emailRef.current.value,
                password: passwordConfirmed,
            }
        })
    }


    render(){
        if(this.state.status === 'success'){
            return <Redirect to="/login"></Redirect>
        }



        return(
            <div className="log-container">
            <h2><b>Login</b> App</h2>
            <form action="" className="form-login" onSubmit={this.saveUser}>
                <h3>Formulario de registro</h3>
                <div className="input-group">
                    <input type="text" name="name" id="name" ref={this.nombreRef} onChange={this.changeState} placeholder="Nombre"/>
                    <i className="fas fa-id-card icon-user"></i>
                </div>
                {this.validator.message('name', this.state.user.name, 'required')}
                <div className="input-group">
                    <input type="text" name="surname" id="surname" ref={this.apellidoRef} onChange={this.changeState} placeholder="Apellido"/>
                    <i className="fas fa-id-card icon-user"></i>
                </div>
                {this.validator.message('surname', this.state.user.surname, 'required')}
                <div className="input-group">
                    <input type="email" name="email" id="email" placeholder="Email" ref={this.emailRef} onChange={this.changeState}/>
                    <i className="fas fa-user icon-user"></i>
                </div>
                {this.validator.message('email', this.state.user.email, 'required|email')}
                <div className="input-group">
                    <input type="password" name="password" id="password" placeholder="Contraseña" ref={this.passwordRef} onChange={this.changeState}/>
                    <i className="fas fa-lock icon-lock"></i>
                </div>
                {this.validator.message('password', this.state.user.password, 'min:8')}
                <div className="input-group">
                    <input type="password" name="" id="" placeholder="Confirmar Contraseña" ref={this.passwordConfirmRef} onChange={this.changeState}/>
                    <i className="fas fa-lock icon-lock"></i>
                </div>
                {this.confirmMessage && 
                    (<div className="srv-validation-message">
                        Las contraseñas deben coincidir.
                    </div>)
                }
             
                <Link  to="/login">Volver</Link>
                <input type="submit" value="Registrar"/>
            </form>
        </div>
        );
    }
}



export default Register;