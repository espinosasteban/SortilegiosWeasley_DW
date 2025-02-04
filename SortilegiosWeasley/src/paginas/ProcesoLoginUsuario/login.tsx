import React, { useState } from 'react';
import "../../styles/login.css";
import InfoBoton from '../../components/infoBoton';

export default function Login() {
    const [usuario, setUsuario] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = () => {
        if (usuario === 'admin' && password === 'admin') {
            setError(null);
            alert('Bienvenido');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className='contenido-login'>
            <h2>Inicio de Sesión</h2>
            <form onSubmit={submitHandler}>
                <input 
                    type='text' 
                    placeholder='Usuario' 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)} 
                />
                <input 
                    type='password' 
                    placeholder='Contraseña' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type='submit' className='login-button'>Iniciar Sesión</button>
                {error && <p className='error'>{error}</p>}
                <div className='cambiar-contraseña'>
                    ¿Olvidaste tu contraseña? <a href='/cambiarContraseña'>Recuperar contraseña</a>
                </div>
                <div className='crear-cuenta'>
                    ¿No tienes cuenta? <a href='/crearCuenta'>Crear cuenta</a>
                </div>
            </form>
            <InfoBoton />
        </div>
    );
}
