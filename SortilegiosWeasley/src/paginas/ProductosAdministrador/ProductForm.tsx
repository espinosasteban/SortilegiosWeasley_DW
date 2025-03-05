import React, { useState,useEffect } from "react";
import { Articulo } from "../../tipos";

interface Seccion {
  _id: string;
  nombre: string;
}

interface Props {
  onGuardar: (producto: Articulo) => void;
  onCancelar: () => void;
  producto?: Articulo | null;
}

const FormularioProducto: React.FC<Props> = ({ onGuardar, onCancelar, producto }) => {
  const token = localStorage.getItem("token");
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [datos, setDatos] = useState<Omit<Articulo, "_id">>({
    nombre: producto?.nombre || "",
    descripcion: producto?.descripcion || "",
    img: producto?.img || "",
    precio: producto?.precio || 0,
    unidadesStock: producto?.unidadesStock || 0,
    seccion: producto?.seccion || ""
  });
  const [imagen, setImagen] = useState<File | null>(null);

  // 🔹 1. Cargar secciones con _id y nombre
  useEffect(() => {
    fetch("http://localhost:5000/seccion") 
      .then((res) => res.json())
      .then((data) => {
        setSecciones(data); // Guardar secciones completas (_id y nombre)
      })
      .catch((error) => console.error("Error cargando secciones:", error));
  }, []);

  // Cargar datos cuando cambie la dirección (para edición)
    useEffect(() => {
      if (producto) {
        setDatos(producto);
      }
    }, [producto]);

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
    
      // Convertir a número si el campo es precio o unidadesStock
      const newValue = name === "precio" || name === "unidadesStock" ? Number(value) : value;
    
      setDatos((prev) => ({
        ...prev,
        [name]: newValue
      }));
    };

  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const manejarSeleccionSeccion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDatos((prev) => ({
      ...prev,
      seccion: e.target.value // Guarda el ObjectId de la sección
    }));
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
    
    const productoFinal = { ...datos, img: imagenUrl  };
    
    try {
      const metodo = producto?._id ? "PUT" : "POST";
      const url = producto?._id ? `http://localhost:5000/producto/${producto._id}` : "http://localhost:5000/producto";

      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productoFinal),
      });

      if (!respuesta.ok) {
        throw new Error("Error guardando el producto");
      }

      const resultado = await respuesta.json();
      onGuardar(resultado);  // Actualizar la lista en productList.tsx
      onCancelar(); // Cerrar el formulario
    } catch (error) {
      console.error("Error guardando el producto", error);
    }
  };

  return (
    <div className="formulario-Producto">
      <h2>{producto?._id ?  "Editar producto" : "Añadir un nuevo producto"}</h2>
      <div className="datos">
        <div className="formulario-producto-info">
          <label>Nombre</label>
          <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Nombre del Producto" required />
        </div>
        <div className="formulario-producto-info">
          <label>Sección</label>
          <select name="seccion" value={datos.seccion} onChange={manejarSeleccionSeccion} required>
            <option value="">Selecciona una sección</option>
            {secciones.map((seccion) => (
              <option key={seccion._id} value={seccion._id}>
                {seccion.nombre}
              </option>
            ))}
          </select>
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