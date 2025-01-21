import React from 'react';
import '../styles/infoBoton.css';

export default function InfoBoton() {
    return (<> 
        <button className="infoBoton"
                style = {{zIndex: 1, position: 'fixed', bottom: 0, right: '1%'}} >
        
            <img src = "../src/assets/infoBoton.png" alt="info"></img>
        </button>     
    </>);
}



