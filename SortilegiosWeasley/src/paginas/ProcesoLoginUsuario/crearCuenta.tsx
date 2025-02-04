import React, { useState } from 'react';
import "../../styles/crearCuenta.css";
import InfoBoton from '../../components/infoBoton';

export default function CrearCuenta() {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validarContraseña = (contraseña: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[.,*?%_])(?=.{8,})/;
        return regex.test(contraseña);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validarContraseña(contraseña)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial (., *, ?, %, _).");
            return;
        }
        if (contraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setError(null);
        alert("Cuenta creada exitosamente");
    };

    return (
        <div className="crearCuenta">
            <div className="crearCuenta__contenedor">
                <h1 className="crearCuenta__titulo">Crear una cuenta</h1>
                <form className="crearCuenta__formulario" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        className="crearCuenta__input"
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="crearCuenta__input"
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="crearCuenta__input"
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                    <p className="info">La contraseña debe tener al menos 8 caracteres. Entre ellos: Una mayúscula y un carácter especial (., *, ?, %, _)</p>
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        className="crearCuenta__input"
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                    />
                    <button className="crearCuenta__boton">Crear Cuenta</button>
                    {error && <p className="crearCuenta__error">{error}</p>}
                </form>
                <InfoBoton />
            </div>
        </div>
    );
}
