import React, { useState } from 'react';
import "./styles.css";
import InfoBoton from '../../../components/infoBoton';

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
            <h1>Inicio de sesión</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor='usuario'>Usuario</label>
                <input 
                    type='text' 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)} 
                />
                <label htmlFor='password'>Contraseña</label>
                <input 
                    type='password'  
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div className='cambiar-contraseña'>
                    ¿Olvidaste tu contraseña? <a href='/cambiarContraseña'>Recuperar contraseña</a>
                </div>
                <button type='submit' className='login-button'>Iniciar Sesión</button>
                <div className='crear-cuenta'>
                    ¿No tienes cuenta? <a href='/crearCuenta'>Crear cuenta</a>
                </div>
                {error && <p className='error'>{error}</p>}
            </form>
            <InfoBoton />
        </div>
    );
}
