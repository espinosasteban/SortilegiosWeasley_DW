import '../styles/NavBar.css';

interface NavBarProps {
    cambiarSeccion: (seccion: string) => void;
}


function NavBar ({cambiarSeccion}: NavBarProps) {

    const secciones = ["magiaMuggle", "bromas"];

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {secciones.map((seccion) => (
                    <li
                        key={seccion}
                        className="navbar-item"
                        onClick={() => cambiarSeccion(seccion)}>
                        {seccion.toLowerCase()}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;