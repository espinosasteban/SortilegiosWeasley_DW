import React, { useState } from "react";
import { Producto } from "../../tipos";


interface Props {
  onGuardar: (producto: Producto) => void;
  onCancelar: () => void;
  producto?: Producto | null;
}

const FormularioProducto: React.FC<Props> = ({ onGuardar, onCancelar, producto}) => {
    const [datos, setDatos] = useState<Producto>( 
      producto || { id: 0, name: "", section: "", price: 0, units: 0, description: ""} 
    );

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(datos);
  };

  return (
    <div className="formulario-Producto" >
      <h2>{producto ? "Editar Dirección" : "Añadir Dirección"}</h2>
      <div className="datos">
        <div>
            <label>name</label>
            <input type="text" name="name" value={datos.name} onChange={manejarCambio} placeholder="Nombre del Producto" required />
        </div>
        <div>
        <label>section</label>
            <input type="text" name="section" value={datos.section} onChange={manejarCambio} placeholder="Sección del Producto" required />
        </div>
        <div>
        <label>price</label>
            <input type="text" name="price" value={datos.price} onChange={manejarCambio} placeholder="Precio del Producto" required />
        </div>
        <div>
        <label>units</label>
            <input type="text" name="units" value={datos.units} onChange={manejarCambio} placeholder="Unidades del Producto" required />
        </div>
        <div>
        <label>Descripcion</label>
            <input type="text" name="Producto" value={datos.description} onChange={manejarCambio} placeholder="Descripción del Producto" required />
        </div>
      </div>
      <div className="botones">
        <button type="submit" onClick={manejarSubmit}>Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </div>
  );
};

export default FormularioProducto;
