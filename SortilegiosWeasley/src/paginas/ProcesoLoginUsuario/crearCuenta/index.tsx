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
    const [mensaje, setMensaje] = useState<string | null>(null);

    const validarContraseña = (contraseña: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[\.,*?%_])(?=.*\d)(?=.{8,})/;
        return regex.test(contraseña);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validarContraseña(contraseña)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial (., *, ?, %, _).");
            return;
        }

        if (contraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const nuevoUsuario = {
            nombreUsuario: usuario,
            contrasena: contraseña,
            correo: correo,
            rol: "muggle"
        };

        try {
            const response = await fetch("http://localhost:5000/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error creando el usuario");
            }

            setMensaje("Cuenta creada exitosamente");
            setError(null);
        } catch (error: any) {
            setError(error.message);
            setMensaje(null);
        }
    };

    return (
        <div className="contenido-login">
            <div className="create-header">
                <h1 className='CreateH1'>Crear una cuenta</h1>
                <img src={HermioneImg} alt="Hermione" className="hermione-img" />
            </div>
            <form className="form-crear-cuenta" onSubmit={handleSubmit}>
                <label htmlFor="usuario">Usuario</label>
                <input type="text" className="crearCuenta__input" onChange={(e) => setUsuario(e.target.value)} required />

                <label htmlFor="email">Correo electrónico</label>
                <input type="email" className="crearCuenta__input" onChange={(e) => setCorreo(e.target.value)} required />

                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" className="crearCuenta__input" onChange={(e) => setContraseña(e.target.value)} required />
                <p className="info">La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial (., *, ?, %, _).</p>

                <label htmlFor='confirmarContraseña'>Confirmar Contraseña</label>
                <input type="password" className="crearCuenta__input" onChange={(e) => setConfirmarContraseña(e.target.value)} required />

                <button className="crearCuenta__boton" type="submit">Crear Cuenta</button>

                {error && <p className="crearCuenta__error">{error}</p>}
                {mensaje && <p className="crearCuenta__exito">{mensaje}</p>}
            </form>
            <InfoBoton />
        </div>
    );
}
