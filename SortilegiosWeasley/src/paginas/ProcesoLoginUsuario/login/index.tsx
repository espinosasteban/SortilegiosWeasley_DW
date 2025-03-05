import React, { useState } from 'react';
import "./styles.css";
import InfoBoton from '../../../components/infoBoton';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router';
import HarryPotterImg from '../../../assets/Login/HarryPotter.png';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        console.log("Enviando datos:", { nombreUsuario: usuario, contrasena: password });

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreUsuario: usuario, contrasena: password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error desconocido");
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', usuario);
            login(usuario, data.rol); // Guarda usuario y rol correctamente

            navigate(data.rol === "admin" ? '/gestion-producto' : '/perfil');

        } catch (error) {
            console.error("Error en el login:", error);
            setError("Error en el servidor o credenciales incorrectas");
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="contenido-login">
            <div className="login-header">
                <h1 className="LoginH1">Inicio de sesión</h1>
                <img src={HarryPotterImg} alt="Harry Potter" className="harry-potter-img" />
            </div>
            <form className="form-login" onSubmit={submitHandler}>
                <label htmlFor="usuario">Usuario</label>
                <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="cambiar-contraseña">
                    ¿Olvidaste tu contraseña? <a href="/cambiarContraseña">Recuperar contraseña</a>
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <div className="crear-cuenta">
                    ¿No tienes cuenta? <a href="/crearCuenta">Crear cuenta</a>
                </div>
                <div className="login-error">
                    {error && <p className="error">{error}</p>}
                </div>
            </form>
            <InfoBoton />
        </div>
    );
}
