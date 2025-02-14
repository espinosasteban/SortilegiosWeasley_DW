import React, { useState } from "react";
import { Link } from "react-router-dom"; // Se agrega Link para navegación
import ProductForm from "./ProductForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Producto } from "../../tipos";

// Función para formatear la URL del producto
const formatearNombreParaRuta = (nombre: string): string => {
  return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const MisProducto: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [productoActual, setProductoActual] = useState<Producto | null>(null);

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
                <div key={prt.id} className="tarjeta">
                  {/* Enlace al detalle del producto */}
                  <Link to={`/producto/${formatearNombreParaRuta(prt.name)}`} className="tarjeta-enlace">
                    <h3>{prt.name}</h3>
                    <p>{prt.price}, {prt.units}</p>
                  </Link>
                  <div className="acciones">
                    <FaEdit className="icono editar" onClick={() => editarProducto(prt)} />
                    <FaTrash className="icono eliminar" onClick={() => eliminarProducto(prt.id)} />
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

export default MisProducto;