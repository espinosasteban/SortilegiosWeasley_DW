import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { DeleteIconButton } from '../../components/carritoCompras';
import '../MiPerfil/user_info.css';
import './procesoCompra.css';

import "../MiPerfil/user_info.css";
import './procesoCompra.css';
import { LegendToggleRounded } from '@mui/icons-material';
import type { Direccion } from "../../tipos";
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
    const API_URL_PERFIL = "http://localhost:5000/mi-informacion";
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        documento: "",
        fnac: "",
      });
    
      //Cargar datos del usuario autenticado
      useEffect(() => {
        fetch(API_URL_PERFIL, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setUserData({
                nombre: data.nombre || "",
                apellido: data.apellido || "",
                email: data.correo || "",  // Ajusta si el backend devuelve otro nombre
                telefono: data.telefonoPersonal || "",
                documento: data.documento || "",
                fnac: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString().split("T")[0] : "",
              });
            }
          })
          .catch((error) => console.error("Error obteniendo perfil:", error));
      }, [token]);
    
      // Maneja cambios en los inputs
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };
    
      //Guardar cambios en la API
      const guardarCambios = async () => {
        const respuesta = await fetch(API_URL_PERFIL, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefonoPersonal: userData.telefono,
            fechaNacimiento: userData.fnac, 
            correo: userData.email,
            documento: userData.documento, // Se enviará ya en formato "yyyy-MM-dd"
          })
        });
    
        if (!respuesta.ok) {
          console.error("Error actualizando el perfil");
          return;
        }
      };

      const handleClick = async () => {
        await guardarCambios(); // Esperar a que los cambios se guarden antes de redirigir
        setFormulario("dirección"); // Luego cambiar la sección
      };
    
    return (<>
        <section className="info-contacto">
            <div className="user-info">
                <h3>Información de contacto</h3>
                <div className="perfil">
                    <div><label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={userData.nombre} 
                        onChange={handleChange}
                    /></div>
                    <div>
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={userData.apellido} 
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email} 
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label>Telefono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={userData.telefono} 
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                        <label>Documento</label>
                    <input
                        type="text"
                        name="documento"
                        value={userData.documento} 
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento</label>
                    <input
                        type= "date"
                        name="fnac"
                        value={userData.fnac} 
                        onChange={handleChange}
                    />
                    </div>
                </div>
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <button className="cancelar-button" onClick={() => navigate(-1)}>Cancelar compra</button>
                <button className="direccion-button" onClick={handleClick}>Continuar a dirección</button>
            </div>
        </div>
        </section>
    </>)
}

interface PropsInformacionContacto {
    setFormulario: (formulario: string) => void;
    onGuardar?: (direccion: Direccion) => void;
}

function Direccion({setFormulario,onGuardar}: PropsInformacionContacto){
    const navigate = useNavigate();
    const API_URL_DIRECCIONES = "http://localhost:5000/mis-direcciones";
    const token = localStorage.getItem("token");
    
    const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState<string>("");

  // Estado de los datos de la dirección
  const [datos, setDatos] = useState<Direccion>({
    id:"",
    _id: "",
    nombre: "",
    departamento: "",
    municipio: "",
    direccion: "",
    barrio: "",
    info_extra: "",
    recibidor: "",
    usuario: ""
  });

  // 🔹 1. Cargar todas las direcciones del usuario al montar el componente
  useEffect(() => {
    fetch(API_URL_DIRECCIONES, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setDirecciones(data);
        if (data.length > 0) {
          setDireccionSeleccionada(data[0]._id); // Selecciona la primera dirección por defecto
          setDatos(data[0]); // Carga los datos en el formulario
        }
      })
      .catch((error) => console.error("Error obteniendo direcciones:", error));
  }, [token]);

  // 🔹 2. Manejar selección de dirección en el `<select>`
  const cambiarDireccion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSeleccionado = e.target.value;
    setDireccionSeleccionada(idSeleccionado);

    const direccionEncontrada = direcciones.find((dir) => dir._id === idSeleccionado);
    setDatos(direccionEncontrada || {
        id: "",
        _id: "",
        nombre: "",
        departamento: "",
        municipio: "",
        direccion: "",
        barrio: "",
        info_extra: "",
        recibidor: "",
        usuario: ""
    });
  };

  // 🔹 3. Manejar cambios en los inputs
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // 🔹 4. Guardar cambios en la dirección seleccionada
  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const metodo = datos._id ? "PUT" : "POST";
        const url = datos._id ? `${API_URL_DIRECCIONES}/${datos._id}` : API_URL_DIRECCIONES;

        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
      console.error("Error guardando la dirección");
      return;
    }
    const nuevaDireccion = await respuesta.json();
    onGuardar?.(nuevaDireccion); // Notificar cambios al componente padre
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await manejarSubmit(e);
    navigate("/gracias");
  };

    return (<>
        <section className="info-contacto">
            <div className="user-info">
                <h3>Dirección</h3>
                <div className="perfil">
                <div><label>nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={datos.nombre} 
                        onChange={manejarCambio} 
                        required
                    /></div>
                    <div><label>Departamento</label>
                    <input
                        type="text"
                        name="departamento"
                        value={datos.departamento}
                        onChange={manejarCambio} 
                        required
                    /></div>
                    <div>
                    <label>Municipio</label>
                    <input
                        type="text"
                        name="municipio"
                        value={datos.municipio}
                        onChange={manejarCambio} 
                        required
                    />
                    </div>
                    <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={datos.direccion}
                        onChange={manejarCambio} 
                        required
                    />
                    </div>
                    <div>
                    <label>Información adicional</label>
                    <input
                        type="text"
                        name="info_extra"
                        value={datos.info_extra}
                        onChange={manejarCambio} 
                        required
                    />
                    </div>
                    <div>
                        <label>Barrio</label>
                    <input
                        type="text"
                        name="barrio"
                        value={datos.barrio}
                        onChange={manejarCambio} 
                        required
                    />
                    </div>
                    <div>
                        <label>Nombre de quien recibe</label>
                    <input
                        type= "text"
                        name="recibidor"
                        value={datos.recibidor}
                        onChange={manejarCambio} 
                        required
                    />
                    </div>
                    <div><label>Cambiar dirección</label>
                    <select value={direccionSeleccionada} onChange={cambiarDireccion} className='seleccion-direccion'>
                        {direcciones.map((dir) => (
                        <option key={dir._id} value={dir._id}>
                        {dir.nombre} - {dir.direccion}
                        </option>
                    ))}
                    </select>
                    </div>
                </div>
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <button className="regresar-button" onClick={() => setFormulario('información')}>Regresar</button>
                <button className="finalizar-button" onClick={handleClick}>Finalizar compra</button>
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
    const guardarDireccion = (direccion: Direccion) => {
        console.log("Dirección guardada:", direccion);
    };

    if (formulario === "información"){
        return <InformacionContacto setFormulario={setFormulario} />
        
    }else{
        return  <Direccion setFormulario={setFormulario} onGuardar={guardarDireccion} />
        
    }

}