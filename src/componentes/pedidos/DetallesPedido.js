import React from 'react';


function DetallesPedido(props) {

    const {pedido, eliminarPedido} = props;
    const {cliente} = pedido;

    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido} </p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                         {
                            pedido.pedido.map(articulos => (                        
                            <li key={pedido._id + (articulos.producto !== null ? articulos.producto._id : "#Error al cargar este dato")}>
                                <p>{articulos.producto !== null ? articulos.producto.nombre: "#Error al cargar este dato"} </p>
                                <p>Precio: ${articulos.producto !== null ? articulos.producto.precio : "#Error al cargar este dato"} </p>
                                <p>Cantidad: {articulos.producto !== null ? articulos.cantidad : "#Error al cargar este dato"}</p>
                            </li>))                                                                 
                        }
                    </ul>
                </div>

                <p className="total">Total: ${props.pedido.total} </p>
                        
            </div>
            <div className="acciones">
                <button type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick = {()=>eliminarPedido(pedido._id)}
                
                >
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default DetallesPedido;