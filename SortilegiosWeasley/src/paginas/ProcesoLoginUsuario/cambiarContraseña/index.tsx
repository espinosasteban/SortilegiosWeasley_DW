import React, { useState } from "react";
import "./styles.css"; 
import InfoBoton from "../../../components/infoBoton";
import RonIMG from '../../../assets/Login/Ron.png';

export default function CambiarContrasena() {
    const [usuario, setUsuario] = useState<string>("");
    const [nuevaContrasena, setNuevaContrasena] = useState<string>("");
    const [confirmarContrasena, setConfirmarContrasena] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const validarContrasena = (contrasena: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[.,*?%_])(?=.{8,})/;
        return regex.test(contrasena);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validarContrasena(nuevaContrasena)) {
            setError("La nueva contraseña no cumple con los requisitos.");
            return;
        }
    
        if (nuevaContrasena !== confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }
    
        setError(null);
    
        try {
            // Usamos `getOne` para obtener el usuario por nombreUsuario
            const response = await fetch(`http://localhost:5000/usuario/${usuario}`);
            if (!response.ok) throw new Error("Usuario no encontrado");
    
            const data = await response.json();
            const usuarioId = data._id; // Extraer el ID del usuario
    
            if (!usuarioId) {
                setError("No se pudo encontrar el usuario.");
                return;
            }
    
            // Ahora hacemos la petición para cambiar la contraseña
            const cambiarContrasenaResponse = await fetch(`http://localhost:5000/usuario/cambiarContrasena/${usuarioId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nuevaContrasena }),
            });
    
            const cambiarContrasenaData = await cambiarContrasenaResponse.json();
    
            if (!cambiarContrasenaResponse.ok) {
                throw new Error(cambiarContrasenaData.error || "Error al cambiar la contraseña");
            }
    
            alert("✅ Contraseña cambiada correctamente");
            setUsuario("");
            setNuevaContrasena("");
            setConfirmarContrasena("");
        } catch (error: any) {
            setError(error.message);
        }

    };
    
    return (
        <div className="contenido-login">
            <div className="get-header">
                <h1 className="RecuperarH1">Recuperar contraseña</h1>
                <img src={RonIMG} alt="Ron" className="ron-img"/>
            </div>
                <form className="form-cambiar-contrasena "onSubmit={handleSubmit}>
                    <label htmlFor="usuario">Usuario</label>
                    <input
                        id="usuario"
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <label htmlFor="nuevaContrasena">Nueva contraseña</label>
                    <input
                        id="nuevaContrasena"
                        type="password"
                        value={nuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                    />
                    <p className="info">
                        La contraseña debe tener al menos 8 caracteres. Entre ellos: Una mayúscula y un carácter especial (., *, ?, %, _).
                    </p>
                    <label htmlFor="confirmarContrasena">Confirmar nueva contraseña</label>
                    <input
                        id="confirmarContrasena"
                        type="password"
                        value={confirmarContrasena}
                        onChange={(e) => setConfirmarContrasena(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="cambiarContraseña">Cambiar contraseña</button>
                </form>
                <InfoBoton />
            </div>
    );
}
