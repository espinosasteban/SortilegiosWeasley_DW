import React, { useState, useEffect } from "react";
import { Articulo } from "../../tipos";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ProductForm from "./ProductForm";
import "./Styles.css";
import VoldemortImg from "../../assets/Login/Voldemort.png";

interface Seccion {
  _id: string;
  nombre: string;
}

const MisArticulo: React.FC = () => {
  const token = localStorage.getItem("token");
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [articuloActual, setArticuloActual] = useState<Articulo | null>(null);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [secciones, setSecciones] = useState<Seccion[]>([]);

  // Cargar secciones
  useEffect(() => {
    const cargarSecciones = async () => {
      try {
        const respuesta = await fetch("http://localhost:5000/seccion", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!respuesta.ok) throw new Error("Error al obtener las secciones");

        const data: Seccion[] = await respuesta.json();
        setSecciones(data);
      } catch (error) {
        console.error("Error al cargar secciones:", error);
      }
    };

    cargarSecciones();
  }, []);

  // Cargar artículos desde la API
  const cargarArticulos = async () => {
    try {
      const respuesta = await fetch("http://localhost:5000/producto", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!respuesta.ok) throw new Error("Error al obtener los artículos");

      const data: Articulo[] = await respuesta.json();
      setArticulos(data);
    } catch (error) {
      console.error("Error al cargar artículos:", error);
    }
  };

  useEffect(() => {
    cargarArticulos();
  }, []);

  // Obtener el nombre de la sección en base a su _id
  const obtenerNombreSeccion = (idSeccion: string) => {
    const seccionEncontrada = secciones.find((sec) => sec._id === idSeccion);
    return seccionEncontrada ? seccionEncontrada.nombre : "Sección desconocida";
  };

  return (
    <div className="Producto-container">
      <div className="admin-header">
        <h2 className="AdminH1">¡Hola, Administrador!</h2>
        <img src={VoldemortImg} alt="Voldemort" className="voldemort-img" />
      </div>

      {mostrandoFormulario ? (
        <ProductForm
          onGuardar={() => {
            cargarArticulos();
            setMostrandoFormulario(false);
            setArticuloActual(null);
          }}
          onCancelar={() => {
            setMostrandoFormulario(false);
            setArticuloActual(null);
          }}
          producto={articuloActual}
        />
      ) : (
        <>
          <button className="btn-anadir" onClick={() => setMostrandoFormulario(true)}>
            <FaPlus /> Añadir producto
          </button>
          {articulos.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <div className="tarjetas-Producto">
              {articulos.map((art) => (
                <div
                  key={art._id}
                  className="tarjeta"
                  onClick={() => {
                    setArticuloActual(art);
                    setModalAbierto(true);
                  }}
                >
                  <img src={art.img} alt={art.nombre} className="producto-imagen" style={{width: "140px", height:"120px", objectFit: "cover", borderRadius:"8px"}} />
                  <h3>{art.nombre}</h3>
                  <p>Precio: ${art.precio ?? "No disponible"}</p>
                  <p>Sección: {obtenerNombreSeccion(art.seccion)}</p>
                  <div className="acciones">
                    <FaEdit
                      className="icono editar"
                      onClick={() => {
                        setArticuloActual(art);
                        setMostrandoFormulario(true);
                      }}
                    />
                    <FaTrash
                      className="icono eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
                          fetch(`http://localhost:5000/producto/${art._id}`, {
                            method: "DELETE",
                          }).then(() => cargarArticulos());
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {modalAbierto && articuloActual && (
        <div className="custom-model-main model-open" onClick={() => setModalAbierto(false)}>
          <div className="custom-model-inner" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn" onClick={() => setModalAbierto(false)}>×</div>
            <div className="pop-up-content-wrap">
              <img src={articuloActual.img} alt={articuloActual.nombre} className="modal-imagen" style={{width: "140px", height:"120px", objectFit: "cover", borderRadius:"8px"}} />
              <h3 className="nombre-producto">{articuloActual.nombre}</h3>
              <p><strong>Precio: </strong>  ${articuloActual.precio ?? "No disponible"}</p>
              <p><strong> Unidades: </strong> {articuloActual.unidadesStock}</p>
              <p><strong>Sección: </strong>  {obtenerNombreSeccion(articuloActual.seccion)}</p>
              <p> <strong>Descripción: </strong> {articuloActual.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisArticulo;