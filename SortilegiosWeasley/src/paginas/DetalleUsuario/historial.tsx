import "./historial.css";

const HistorialCompras = () => {
    return(
    <div className="cart-item">
        <img className="cart-item-image" src="../src/assets/imagenesProductos/explosivos/bomba.png" alt="" />
        <div className="cart-item-info">
            <div className="cart-item-header">
                <h3 className="cart-item-name">Bomba</h3>
                <p className="cart-item-section">Explosivos</p>
                <p className="cart-item-quantity">Cantidad: 2 </p>
            </div>
            <div className="cart-item-compra">
                <p className="cart-item-price">$ 800</p>
                <p className="cart-item-recib">Entregado: 14/02/2025</p>
            </div>
                
        </div>
    </div>
    );
}
export default HistorialCompras;


/* 
TODOS:

Corregir:
- Agregarle mejores estilos
- Cuando tenga menos de un tamaño, haya un botón para poder cerrar el carrito
- Agregarle un gorrito al título 

*/