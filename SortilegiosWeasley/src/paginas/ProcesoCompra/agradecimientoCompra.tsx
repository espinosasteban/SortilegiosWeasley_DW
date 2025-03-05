import './agradecimientoCompra.css';
import Lechuza from '../../components/lechuza';
import { useNavigate } from 'react-router';

export default function AgradecimientoCompra() {
    const navigate = useNavigate();

    return (
        <>
            <main className="agradecimiento-compra">
                <section className="agradecimiento">
                    <h2 className='h2-gracias-muggle'>¡Gracias por tu compra, Muggle!</h2>
                    <p className='p-agradecimiento'>Tu pedido ha sido recibido y será enviado en breve con una de nuestras lechuzas</p>
                    <Lechuza/>
                    <p className='p-lechuza'>Empaca en su bolsa mágica el dinero exacto. ¡No se irá hasta que le des lo que es! Pero sí se puede llevar un poco más...</p>
                    <button className='boton-volver' onClick={()=>navigate("/")}>Volver a la tienda</button>
                </section>
            </main>
        </>
    )
}