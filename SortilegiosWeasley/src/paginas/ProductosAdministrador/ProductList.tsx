import React, { useState, useEffect } from "react";
import { Articulo } from "../../tipos";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ProductForm from "./ProductForm";
import "./Styles.css";
import VoldemortImg from "../../assets/Login/Voldemort.png";

const MisArticulo: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [articuloActual, setArticuloActual] = useState<Articulo | null>(null);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);

  // Cargar artículos desde la API
  const cargarArticulos = async () => {
    try {
      const respuesta = await fetch("http://localhost:5000/producto");
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

  const editarArticulo = (articulo: Articulo) => {
    setArticuloActual(articulo);
    setMostrandoFormulario(true);
  };

  const eliminarArticulo = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      try {
        const respuesta = await fetch(`http://localhost:5000/producto/${id}`, {
          method: "DELETE",
        });

        if (!respuesta.ok) throw new Error("Error al eliminar el artículo");

        // Actualizar la lista de artículos
        cargarArticulos();
      } catch (error) {
        console.error("Error al eliminar artículo:", error);
      }
    }
  };

  const agregarOActualizarArticulo = async (articulo: Articulo) => {
    try {
      let respuesta;

      if (articuloActual?._id) {
        // Actualizar artículo existente
        respuesta = await fetch(`http://localhost:5000/producto/${articuloActual._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: articulo.nombre,
            descripcion: articulo.descripcion,
            precio: articulo.precio,
            seccion: articulo.seccion,
            unidadesStock: articulo.unidadesStock
          }),
        });
      } else {
        // Crear nuevo artículo
        respuesta = await fetch("http://localhost:5000/producto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: articulo.nombre,
            descripcion: articulo.descripcion,
            precio: articulo.precio,
            seccion: articulo.seccion,
            unidadesStock: articulo.unidadesStock
          }),
        });
      }

      if (!respuesta.ok) throw new Error("Error al guardar el artículo");

      // Actualizar la lista de artículos y cerrar el formulario
      cargarArticulos();
      setMostrandoFormulario(false);
      setArticuloActual(null);
    } catch (error) {
      console.error("Error al guardar artículo:", error);
    }
  };

  return (
    <div className="Producto-container">
      <div className="admin-header">
        <h2 className="AdminH1">¡Hola, Administrador!</h2>
        <img src={VoldemortImg} alt="Voldemort" className="voldemort-img" />
      </div>

      {mostrandoFormulario ? (
        <ProductForm
          onGuardar={agregarOActualizarArticulo}
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
                  <h3>{art.nombre}</h3>
                  <p>Precio: ${art.precio ?? "No disponible"}</p>
                  <div className="acciones">
                    <FaEdit
                      className="icono editar"
                      onClick={(e) => {
                        e.stopPropagation();
                        editarArticulo(art);
                      }}
                    />
                    <FaTrash
                      className="icono eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarArticulo(art._id || "");
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
              <h3>{articuloActual.nombre}</h3>
              <p>Precio: ${articuloActual.precio ?? "No disponible"}</p>
              <p>Unidades: {articuloActual.unidadesStock}</p>
              <p>Sección: {articuloActual.seccion}</p>
              <p>Descripción: {articuloActual.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisArticulo;