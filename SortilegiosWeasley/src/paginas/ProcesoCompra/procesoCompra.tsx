import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { DeleteIconButton } from '../../components/carritoCompras';
import '../MiPerfil/user_info.css';
import './procesoCompra.css';

// Definir el tipo para las secciones
interface Seccion {
    _id: string;
    nombre: string;
}

export default function ProcesoCompra() {
    const [formulario, setFormulario] = useState('información');
    const { cartItems, addToCart, removeFromCart, getCartTotal, deleteItem } = useContext(CartContext);
    const [secciones, setSecciones] = useState<Seccion[]>([]);

    // Cargar las secciones desde el backend
    useEffect(() => {
        async function fetchSecciones() {
            try {
                const response = await fetch('http://localhost:5000/seccion');
                if (!response.ok) {
                    console.error('Error al obtener secciones:', response.statusText);
                    return;
                }
                const data = await response.json();
                setSecciones(data);
            } catch (error) {
                console.error('Error de red al obtener secciones:', error);
            }
        }
        fetchSecciones();
    }, []);

    return (
      <main className="proceso-compra">
        <section className="informacion">
          <section className="Formularios">
            <h2 className='h2-gracias-muggle'>Termina tu compra, Muggle!</h2>
            <ElegirInformacion setFormulario={setFormulario} formulario={formulario} />
          </section>
        </section>

        {/* Resumen de Compras */}
        <aside className="resumen-compras">
            <h2 className="resumen-compras-title">Resumen de tu compra</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                <div className="resumen-lista">
                    {cartItems.map((item) => {
                        // Buscar el nombre de la sección basado en el _id almacenado en item.seccion
                        const seccionNombre = secciones.find(sec => sec._id === item.seccion)?.nombre || 'Sección desconocida';

                        return (
                            <div key={item.nombre} className="resumen-item">
                                <div className="resumen-imagen">
                                    <img src={item.img} alt={item.nombre} />
                                </div>

                                <div className='resumen-item-info'>
                                    <div className='resumen-item-header'>
                                        <h3 className="resumen-item-name">{item.nombre}</h3>
                                        <DeleteIconButton onClick={() => deleteItem(item)} />
                                    </div>

                                    {/* Mostrar el nombre de la sección */}
                                    <p className='resumen-item-seccion'>{seccionNombre}</p>

                                    <div className='resumen-item-bottom'>
                                        <div className='resumen-item-quantity'>
                                            <button className='resumen-item-quantity-btn'onClick={() => removeFromCart(item)}>-</button>
                                            <p className="resumen-total-items">{item.total_items}</p>
                                            <button className="resumen-item-quantity-btn" onClick={() => addToCart(item)}>+</button>
                                        </div>

                                        <p className="resumen-item-price">$ {Number(item.precio * item.total_items).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <h2>Total: ${getCartTotal().toFixed(2)} </h2>
        </aside>
      </main>
    );
}

interface PropsInformacionContacto {
    setFormulario: (formulario: string) => void;

}

function InformacionContacto({setFormulario}: PropsInformacionContacto){
    const navigate = useNavigate();
    return (<>
        <section className="info-contacto">
            <div className="user-info">
                <h3>Información de contacto</h3>
                <div className="perfil">
                    <div><label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                    /></div>
                    <div>
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                    />
                    </div>
                    <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                    />
                    </div>
                    <div>
                    <label>Telefono</label>
                    <input
                        type="text"
                        name="telefono"
                    />
                    </div>
                    <div>
                        <label>Documento</label>
                    <input
                        type="text"
                        name="documento"
                    />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento</label>
                    <input
                        type= "date"
                        name="fnac"
                    />
                    </div>
                </div>
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <button className="cancelar-button" onClick={() => navigate(-1)}>Cancelar compra</button>
                <button className="direccion-button" onClick={() => setFormulario('dirección')}>Continuar a dirección</button>
            </div>
        </div>
        </section>
    </>)
}

interface PropsInformacionContacto {
    setFormulario: (formulario: string) => void;
}

function Direccion({setFormulario}: PropsInformacionContacto){
    const navigate = useNavigate();
    return (<>
        <section className="info-contacto">
            <div className="user-info">
                <h3>Dirección</h3>
                <div className="perfil">
                    <div><label>Departamento</label>
                    <input
                        type="text"
                        name="departamento"
                    /></div>
                    <div>
                    <label>Municipio</label>
                    <input
                        type="text"
                        name="municipio"
                    />
                    </div>
                    <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                    />
                    </div>
                    <div>
                    <label>Información adicional</label>
                    <input
                        type="text"
                        name="informacion-adicional"
                    />
                    </div>
                    <div>
                        <label>Barrio</label>
                    <input
                        type="text"
                        name="barrio"
                    />
                    </div>
                    <div>
                        <label>Nombre de quien recibe</label>
                    <input
                        type= "text"
                        name="nombre-recibe"
                    />
                    </div>
                </div>
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <button className="regresar-button" onClick={() => setFormulario('información')}>Regresar</button>
                <button className="finalizar-button" onClick={() => {}}>Finalizar compra</button>
            </div>
        </div>
        </section>
    </>)
}

interface PropsElegirFormulario{
    formulario: string;
    setFormulario: (formulario: string) => void;
}

function ElegirInformacion({formulario, setFormulario}: PropsElegirFormulario){

    if (formulario === "información"){
        return (
            <InformacionContacto setFormulario={setFormulario} />
        )
    }else{
        return(
            <Direccion setFormulario={setFormulario}/>
        )
    }

}


