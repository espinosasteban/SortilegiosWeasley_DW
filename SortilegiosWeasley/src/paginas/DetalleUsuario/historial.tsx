import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./historial.css";

const API_URL = "http://localhost:5000/historial"

const HistorialCompras = () => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("TOKEN", token);
                if (!token) {
                    setError("Usuario no autenticado");
                    setLoading(false);
                    return;
                }
                const decoded = jwtDecode<{ id: string}>(token);
                console.log("Usuario", {decoded});

                const response = await fetch(`${API_URL}/${decoded.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("Error obteniendo el historial de compras");
                }

                const data = await response.json();
                setHistorial(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial();
    }, []);

    if (loading) return <p>Cargando historial...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="historial-container">
            <h2>Historial de Compras</h2>
            {historial.length === 0 ? (
                <p>No hay compras registradas.</p>
            ) : (
                historial.map((compra) => (
                    <div key={compra._id} className="compra-container">
                        <h3>Orden de compra: {compra._id}</h3>
                        <div className="compra-items">
                            {compra.items.map((item) => (
                                <div key={item._id} className="cart-item">
                                    <img className="cart-item-image" src={item.img || "../src/assets/imagenesProductos/default.png"} alt={item.nombre} />
                                    <div className="cart-item-info">
                                        <div className="cart-item-header">
                                            <h3 className="cart-item-name">{item.nombre}</h3>
                                            <p className="cart-item-section">{item.seccion}</p>
                                            <p className="cart-item-quantity">Cantidad: {item.total_items}</p>
                                        </div>
                                        <div className="cart-item-compra">
                                            <p className="cart-item-price">Total: ${item.precio * item.total_items}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HistorialCompras;
