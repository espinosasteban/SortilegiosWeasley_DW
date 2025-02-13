import React, { useState } from "react";
//import "./user_info.css"; // Asegúrate de importar los estilos
import FormularioDireccion from "./FormDireccion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Direccion } from "../../tipos";
import "./MisDirecciones.css";

const MisDirecciones: React.FC = () => {
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [direccionActual, setDireccionActual] = useState<Direccion | null>(null);

  const agregarDireccion = (direccion: Direccion) => {
    if (direccionActual) {
      // Editar dirección existente
      setDirecciones((prev) =>
        prev.map((dir) => (dir.id === direccionActual.id ? direccion : dir))
      );
      setDireccionActual(null);
    } else {
      // Agregar nueva dirección
      setDirecciones([...direcciones, { ...direccion, id: Date.now() }]);
    }
    setMostrandoFormulario(false);
  };

  const eliminarDireccion = (id: number) => {
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