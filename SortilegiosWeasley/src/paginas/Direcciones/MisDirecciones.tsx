import React, { useState,useEffect  } from "react";
//import "./user_info.css"; // Asegúrate de importar los estilos
import FormularioDireccion from "./FormDireccion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Direccion } from "../../tipos";
import "./MisDirecciones.css";

export const API_URL = "http://localhost:5000/mis-direcciones";

const MisDirecciones: React.FC = () => {
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [direccionActual, setDireccionActual] = useState<Direccion | null>(null);

  // **Cargar direcciones desde la API**
  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => setDirecciones(data))
      .catch((error) => console.error("Error obteniendo direcciones:", error));
  }, []);

  // **Agregar o editar una dirección en la API**
  const agregarDireccion = async (direccion: Direccion) => {
    const metodo = direccion.id ? "PUT" : "POST";
    const url = direccion.id ? `${API_URL}/${direccion.id}` : API_URL;

    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(direccion),
    });

    const nuevaDireccion = await respuesta.json();

    if (metodo === "POST") {
      setDirecciones([...direcciones, nuevaDireccion]);
    } else {
      setDirecciones(
        direcciones.map((dir) => (dir.id === nuevaDireccion.id ? nuevaDireccion : dir))
      );
    }

    setMostrandoFormulario(false);
    setDireccionActual(null);
  };

  // **Eliminar dirección en la API**
  const eliminarDireccion = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setDirecciones(direcciones.filter((dir) => dir.id !== id));
  };


  const editarDireccion = (direccion: Direccion) => {
    setDireccionActual(direccion);
    setMostrandoFormulario(true);
  };

  return (
    <div className="direcciones-container">
      {mostrandoFormulario ? (
        <FormularioDireccion
          onGuardar={agregarDireccion}
          onCancelar={() => {
            setMostrandoFormulario(false);
            setDireccionActual(null);
          }}
          direccion={direccionActual}
        />
      ) : (
        <>
          <button className="btn-anadir" onClick={() => setMostrandoFormulario(true)}>
              Añadir Dirección
            </button>
          {direcciones.length === 0 ? (
            <p>No tienes direcciones guardadas.</p>
          ) : (
            <div className="tarjetas-direcciones">
              {direcciones.map((dir) => (
                <div key={dir.id} className="tarjeta">
                  <h3>{dir.nombre}</h3>
                  <p>{dir.departamento}, {dir.municipio}, {dir.direccion} , {dir.barrio}</p>
                  <p>{dir.recibidor}, {dir.info_extra}</p>
                  <div className="acciones">
                    <FaEdit className="icono editar" onClick={() => editarDireccion(dir)} />
                    <FaTrash className="icono eliminar" onClick={() => eliminarDireccion(dir.id)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MisDirecciones;