import React, { useState } from "react";
import { Articulo } from "../../tipos";

interface Props {
  onGuardar: (producto: Articulo) => void;
  onCancelar: () => void;
  producto?: Articulo | null;
}

const FormularioProducto: React.FC<Props> = ({ onGuardar, onCancelar, producto }) => {
  const [datos, setDatos] = useState<Articulo>(
    producto || { _id: "", nombre: "", descripcion: "", img: "", precio: 0, unidadesStock: 0, seccion: "" }
  );
  const [imagen, setImagen] = useState<File | null>(null);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imagenUrl = datos.img;
    
    if (imagen) {
      const formData = new FormData();
      formData.append("file", imagen);

      try {
        const respuesta = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
        const resultado = await respuesta.json();
        imagenUrl = resultado.url;
      } catch (error) {
        console.error("Error subiendo la imagen", error);
      }
    }
    
    const productoFinal = { ...datos, img: imagenUrl };
    
    try {
      const respuesta = await fetch("http://localhost:5000/producto" + (producto ? `/${producto._id}` : ""), {
        method: producto ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoFinal),
      });

      const resultado = await respuesta.json();
      onGuardar(resultado);
    } catch (error) {
      console.error("Error guardando el producto", error);
    }
  };

  return (
    <div className="formulario-Producto">
      <h2>{producto ? "Editar producto" : "Añadir un nuevo producto"}</h2>
      <div className="datos">
        <div className="formulario-producto-info">
          <label>Nombre</label>
          <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Nombre del Producto" required />
        </div>
        <div className="formulario-producto-info">
          <label>Sección</label>
          <input type="text" name="seccion" value={datos.seccion} onChange={manejarCambio} placeholder="Sección del Producto" required />
        </div>
        <div className="formulario-producto-info">
          <label>Precio</label>
          <input type="number" name="precio" value={datos.precio} onChange={manejarCambio} placeholder="Precio del Producto" required />
        </div>
        <div className="formulario-producto-info">
          <label>Unidades</label>
          <input type="number" name="unidadesStock" value={datos.unidadesStock} onChange={manejarCambio} placeholder="Unidades del Producto" required />
        </div>
        <div className="formulario-producto-info">
          <label>Descripción</label>
          <input type="text" name="descripcion" value={datos.descripcion} onChange={manejarCambio} placeholder="Descripción del Producto" required />
        </div>
        <div className="formulario-producto-info">
          <label>Imagen</label>
          <input type="file" onChange={manejarImagen} />
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
