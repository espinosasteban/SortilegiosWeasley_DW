import React from 'react';
import '../styles/infoBoton.css';

export default function InfoBoton() {
    const handleClick = () => {
        const phoneNumber = "573219953735";
        const message = encodeURIComponent("Hola, tengo una duda con respecto a Sortilegios Weasley.");
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        window.open(whatsappLink, "_blank"); // Abre el link en una nueva pestaña
    };

    return (<> 
        <button className="infoBoton"
                style={{ zIndex: 1, position: 'fixed', bottom: 0, right: '1%' }}
                onClick={handleClick}>
            <img src="../src/assets/infoBoton.png" alt="info" />
        </button>     
    </>);
}