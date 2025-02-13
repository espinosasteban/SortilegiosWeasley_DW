import React, { useState } from "react";
import { Direccion } from "../../tipos";


interface Props {
  onGuardar: (direccion: Direccion) => void;
  onCancelar: () => void;
  direccion?: Direccion | null;
}

const FormularioDireccion: React.FC<Props> = ({ onGuardar, onCancelar, direccion }) => {
    const [datos, setDatos] = useState<Direccion>( 
      direccion || { id: 0, nombre: "", departamento: "", municipio: "", direccion: "", barrio: "", info_extra: "", recibidor: ""} // Asegúrate de que 'id' esté incluido
    );

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(datos);
  };

  return (
    <div className="formulario-direccion" >
      <h2>{direccion ? "Editar Dirección" : "Añadir Dirección"}</h2>
      <div className="datos">
        <div>
            <label>Nombre</label>
            <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Nombre (Direccion1, Casa, Oficina)" required />
        </div>
        <div>
        <label>Departamento</label>
            <input type="text" name="departamento" value={datos.departamento} onChange={manejarCambio} placeholder="Departamento" required />
        </div>
        <div>
        <label>Municipio</label>
            <input type="text" name="municipio" value={datos.municipio} onChange={manejarCambio} placeholder="Municipio" required />
        </div>
        <div>
        <label>Direccion</label>
            <input type="text" name="direccion" value={datos.direccion} onChange={manejarCambio} placeholder="Calle / Dirección exacta" required />
        </div>
        <div>
        <label>Barrio</label>
            <input type="text" name="barrio" value={datos.barrio} onChange={manejarCambio} placeholder="Barrio" required />
        </div>
        <div>
        <label>Información Adicional</label>
            <input type="text" name="info_extra" value={datos.info_extra} onChange={manejarCambio} placeholder="Detalle (ejm: Es una puerta negra de madera)" />
        </div>
        <div>
        <label>Nombre de quien recibe</label>
            <input type="text" name="recibidor" value={datos.recibidor} onChange={manejarCambio} placeholder="Quien recibe el producto" required />
        </div>
      </div>
      <div className="botones">
        <button type="submit" onClick={manejarSubmit}>Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </div>
  );
};

export default FormularioDireccion;
