import React, { useState, useEffect } from "react";
import FormularioDireccion from "./FormDireccion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Direccion } from "../../tipos";
import "./MisDirecciones.css";

export const API_URL = "http://localhost:5000/mis-direcciones";

const MisDirecciones: React.FC = () => {
  const token = localStorage.getItem("token");
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [direccionActual, setDireccionActual] = useState<Direccion | null>(null);

  // **Cargar direcciones desde la API**
  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDirecciones(data))
      .catch((error) => console.error("Error obteniendo direcciones:", error));
  }, []);

  // **Guardar (Agregar o Editar) Dirección**
  const guardarDireccion = async (direccion: Direccion) => {
    const metodo = direccion._id ? "PUT" : "POST";
    const url = direccion._id ? `${API_URL}/${direccion._id}` : API_URL;

    const respuesta = await fetch(url, {
      method: metodo,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(direccion),
    });

    if (!respuesta.ok) {
      console.error("Error guardando la dirección");
      return;
    }

   // Después de guardar, recargar toda la lista desde la API
    fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDirecciones(data))
      .catch((error) => console.error("Error obteniendo direcciones:", error));

    setMostrandoFormulario(false);
    setDireccionActual(null);
  };

  // **Eliminar Dirección**
  const eliminarDireccion = async (_id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta dirección?")) return;

    const respuesta = await fetch(`${API_URL}/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      console.error("Error eliminando la dirección");
      return;
    }

    setDirecciones((prevDirecciones) => prevDirecciones.filter((dir) => dir._id !== _id));
  };

  return (
    <div className="direcciones-container">
      {mostrandoFormulario ? (
        <FormularioDireccion
          onGuardar={guardarDireccion}
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
            <p className="no-direccion">No tienes direcciones guardadas.</p>
          ) : (
            <div className="tarjetas-direcciones">
              {direcciones.map((dir) => (
                <div key={dir._id} className="tarjeta">
                  <h3>{dir.nombre}</h3>
                  <p>
                    {dir.departamento}, {dir.municipio}, {dir.direccion}, {dir.barrio}
                  </p>
                  <p>{dir.recibidor}, {dir.info_extra}</p>
                  <div className="acciones">
                    <FaEdit className="icono editar" onClick={() => {
                      setDireccionActual(dir);
                      setMostrandoFormulario(true);
                    }} />
                    <FaTrash className="icono eliminar" onClick={() => eliminarDireccion(dir._id)} />
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