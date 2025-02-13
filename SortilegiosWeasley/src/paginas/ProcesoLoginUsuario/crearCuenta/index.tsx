import React, { useState } from 'react';
import "./styles.css";
import InfoBoton from '../../../components/infoBoton';
import HermioneImg from '../../../assets/Login/Hermione.png';

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
        <div className="contenido-login">
            <div className="create-header">
                <h1 className='CreateH1'>Crear una cuenta</h1>
                <img src={HermioneImg} alt="Hermione" className="hermione-img" />
            </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="usuario">Usuario</label>
                    <input
                        type="text"
                        className="crearCuenta__input"
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        className="crearCuenta__input"
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                        type="password"
                        className="crearCuenta__input"
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                    <p className="info">La contraseña debe tener al menos 8 caracteres. Entre ellos: Una mayúscula y un carácter especial (., *, ?, %, _)</p>
                    <label htmlFor='confirmarContraseña'>Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="crearCuenta__input"
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                    />
                    <button className="crearCuenta__boton">Crear Cuenta</button>
                    {error && <p className="crearCuenta__error">{error}</p>}
                </form>
                <InfoBoton />
            </div>
    );
}
