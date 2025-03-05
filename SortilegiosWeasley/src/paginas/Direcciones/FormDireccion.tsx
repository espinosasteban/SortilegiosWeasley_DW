import React, { useState, useEffect } from "react";
import { Direccion } from "../../tipos";

interface Props {
  onGuardar: (direccion: Direccion) => void;
  onCancelar: () => void;
  direccion?: Direccion | null;  
}

const FormularioDireccion: React.FC<Props> = ({ onGuardar, onCancelar, direccion }) => {
  const token = localStorage.getItem("token");

  // Si hay una dirección, se usa para edición; si no, es una nueva
  const [datos, setDatos] = useState<Direccion>(
    direccion || {
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
    }
  );

  // Cargar datos cuando cambie la dirección (para edición)
  useEffect(() => {
    if (direccion) {
      setDatos(direccion);
    }
  }, [direccion]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const esEdicion = Boolean(datos._id); // Si tiene ID, es edición
    const metodo = esEdicion ? "PUT" : "POST";
    const url = esEdicion
      ? `http://localhost:5000/mis-direcciones/${datos._id}`
      : `http://localhost:5000/mis-direcciones`;

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
    onGuardar(nuevaDireccion); // Notificar al componente padre
  };

  return (
    <div className="formulario-direccion">
      <h2>{datos.id ? "Editar Dirección" : "Añadir Dirección"}</h2>
      <form onSubmit={manejarSubmit}>
        <div className="datos">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={manejarCambio}
              placeholder="Ej: Casa, Oficina"
              required
            />
          </div>
          <div>
            <label>Departamento</label>
            <input
              type="text"
              name="departamento"
              value={datos.departamento}
              onChange={manejarCambio}
              required
            />
          </div>
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
            <label>Información Adicional</label>
            <input
              type="text"
              name="info_extra"
              value={datos.info_extra}
              onChange={manejarCambio}
              placeholder="Ej: Timbre rojo, puerta grande"
            />
          </div>
          <div>
            <label>Nombre de quien recibe</label>
            <input
              type="text"
              name="recibidor"
              value={datos.recibidor}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>
        <div className="botones">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDireccion;