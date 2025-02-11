import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    usuario: string | null;
    login: (usuario: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<string | null>(null);

    const login = (usuario: string) => {
        setUsuario(usuario);
    };

    const logout = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
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