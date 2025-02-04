import React, { useState } from "react";
import "../../styles/cambiarContraseña.css";
import InfoBoton from "../../components/infoBoton";

export default function CambiarContraseña() {
    const [usuario, setUsuario] = useState<string>("");
    const [nuevaContraseña, setNuevaContraseña] = useState<string>("");
    const [confirmarContraseña, setConfirmarContraseña] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const validarContraseña = (contraseña: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[.,*?%_])(?=.{8,})/;
        return regex.test(contraseña);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validarContraseña(nuevaContraseña)) {
            setError("La nueva contraseña no cumple con los requisitos.");
            return;
        }
        if (nuevaContraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setError(null);
        alert("Contraseña cambiada correctamente");
    };

    return (
        <div className="cambiarContraseña">
            <h1>Recuperar contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}   
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={nuevaContraseña}
                    onChange={(e) => setNuevaContraseña(e.target.value)}
                />
                <p className="info">La contraseña debe tener al menos 8 caracteres. Entre ellos: Una mayúscula y un carácter especial (., *, ?, %, _)</p>
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}    
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Cambiar contraseña</button>
            </form>
            <InfoBoton />
        </div>
    );
}
