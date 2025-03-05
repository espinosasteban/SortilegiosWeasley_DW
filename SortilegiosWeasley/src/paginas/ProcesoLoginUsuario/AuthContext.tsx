import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    usuario: string | null;
    rol: string | null;
    login: (usuario: string, rol: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<string | null>(localStorage.getItem('usuario'));
    const [rol, setRol] = useState<string | null>(localStorage.getItem('rol'));

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        const storedRol = localStorage.getItem('rol');
        const storedToken = localStorage.getItem('token');

        if (storedUsuario && storedRol && storedToken) {
            setUsuario(storedUsuario);
            setRol(storedRol);
        } else {
            logout(); // Si falta algo, cierra sesión automáticamente
        }
    }, []);

    const login = (usuario: string, rol: string) => {
        setUsuario(usuario);
        setRol(rol);
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('rol', rol);
    };

    const logout = () => {
        setUsuario(null);
        setRol(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ usuario, rol, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de AuthProvider");
    }
    return context;
};
