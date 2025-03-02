import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    usuario: string | null;
    rol: string | null;
    login: (rol: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<string | null>(null);
    const [rol, setRol] = useState<string | null>(null);

    const login = (rol: string) => {
        setUsuario("Usuario"); // Esto podría venir del backend
        setRol(rol);
    };

    const logout = () => {
        setUsuario(null);
        setRol(null);
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
