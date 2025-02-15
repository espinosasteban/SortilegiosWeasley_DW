import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProductForm from "./ProductForm";
import { Producto } from "../../tipos";
import "./Styles.css";
import VoldemortImg from "../../assets/Login/Voldemort.png";

const MisProducto: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>(() => {
    const datosGuardados = localStorage.getItem("productos");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [productoActual, setProductoActual] = useState<Producto | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (producto: Producto) => {
    if (productoActual) {
      setProductos((prev) =>
        prev.map((prt) => (prt.id === productoActual.id ? producto : prt))
      );
      setProductoActual(null);
    } else {
      setProductos([...productos, { ...producto, id: Date.now() }]);
    }
    setMostrandoFormulario(false);
  };

  const eliminarProducto = (id: number) => {
    setProductos(productos.filter((prt) => prt.id !== id));
  };

  const editarProducto = (producto: Producto) => {
    setProductoActual(producto);
    setMostrandoFormulario(true);
  };

  return (
      <div className="Producto-container">
        <div className='admin-header'>
          <h2 className='AdminH1'>¡Hola, Administrador! </h2>
          <img src={VoldemortImg} alt="Voldemort" className="voldemort-img"/>
        </div>


        {mostrandoFormulario ? (
            <ProductForm
                onGuardar={agregarProducto}
                onCancelar={() => {
                  setMostrandoFormulario(false);
                  setProductoActual(null);
                }}
                producto={productoActual}
            />
        ) : (
            <>
              <button className="btn-anadir" onClick={() => setMostrandoFormulario(true)}>
                Añadir producto
              </button>
              {productos.length === 0 ? (
                  <p>No tienes productos guardados.</p>
              ) : (
                  <div className="tarjetas-Producto">
                    {productos.map((prt) => (
                        <div key={prt.id} className="tarjeta" onClick={() => {
                          setProductoActual(prt);
                          setModalAbierto(true);
                        }}>
                          <h3>{prt.name}</h3>
                          <p>{prt.price}</p>
                          <div className="acciones">
                            <FaEdit className="icono editar" onClick={(e) => {
                              e.stopPropagation();
                              editarProducto(prt);
                            }}/>
                            <FaTrash className="icono eliminar" onClick={(e) => {
                              e.stopPropagation();
                              eliminarProducto(prt.id);
                            }}/>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </>
        )}

        {modalAbierto && productoActual && (
            <div className="custom-model-main model-open" onClick={() => setModalAbierto(false)}>
              <div className="custom-model-inner" onClick={(e) => e.stopPropagation()}>
                <div className="close-btn" onClick={() => setModalAbierto(false)}>×</div>
                <div className="pop-up-content-wrap">
                  <h3>{productoActual.name}</h3>
                  <p>Precio: {productoActual.price}</p>
                  <p>Unidades: {productoActual.units}</p>
                  <p>Sección: {productoActual.section}</p>
                  <p>Descripción: {productoActual.description}</p>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default MisProducto;