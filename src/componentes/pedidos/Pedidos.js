import React, {useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import Swal from 'sweetalert2';
import Spinner from '../layout/Spinner';

function Pedidos() {

    const [pedidos, guardarPedidos] = useState([]);
    useEffect(() => {
        const consultarAPI = async () => {
            // obtener los pedidos
            const resultado = await clienteAxios.get('/pedidos');
            guardarPedidos(resultado.data);
        }

        consultarAPI();
    }, []);

    const eliminarPedido = id =>{
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un pedidos eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
              // eliminar en la rest api
              console.log(pedidos);
              const todosPedidos = pedidos.filter(pedido => pedido._id !== id );
              console.log(todosPedidos);
              clienteAxios.delete(`/pedidos/${id}`)
              .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Eliminado',
                            res.data.mensaje,
                            'success'
                        )
                        guardarPedidos(todosPedidos)
                    }
                });
            }
        });

    }

    return (
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
            {  !pedidos.length ? <Spinner /> :  pedidos.map(pedido => (
                        <DetallesPedido 
                        key={pedido._id}
                        pedido={pedido}
                        eliminarPedido = {eliminarPedido}                         
                        />
                        )    
                    )
                }
            </ul>
        </Fragment>
    )
}
export default Pedidos;