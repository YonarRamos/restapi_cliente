import React, {useState} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';


function CrearUsuario(props){

    // State con los datos del formulario
    const[usuario, guardarUsuario] = useState({
        email: '',
        nombre: '',
        password : ''
    });

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarUsuario({
            // obtener una copia del state actual
            ...usuario, 
            [e.target.name] : e.target.value
        })

    }

       // Añade en la REST API un cliente nuevo
       const agregarUsuario = e => {
        e.preventDefault();

        // enviar petición
        clienteAxios.post('/crear-usuario', usuario)
            .then(res => {
                // validar si hay errores de mongo 
                if(res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese usuario ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        res.data.mensaje,
                        'success'
                    )
                }
                // Redireccionar
                props.history.push('/iniciar-sesion');
            });
    }

    return(

        <div className="login">
            <h2>Registra tu Usuario</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={agregarUsuario}
                >

                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            placeholder="Email para Iniciar Sesión"
                            required
                            onChange={actualizarState}
                        />
                    </div>

                    
                    <div className="campo">
                        <label>Nombre</label>
                        <input 
                            type="text"
                            name="nombre"
                            placeholder="Nombre de usuario"
                            required
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password para Iniciar Sesión"
                            required
                            onChange={actualizarState}
                        />
                    </div>



                    <input type="submit" value="Crear Usuario" className="btn btn-verde btn-block" />
                    <div  className="linkCrearUsuario" ><Link className="link" to={`/iniciar-sesion`}>Volver al Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(CrearUsuario);