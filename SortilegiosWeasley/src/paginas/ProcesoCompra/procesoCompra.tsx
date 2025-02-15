import React from 'react';
import "../MiPerfil/user_info.css";
import './procesoCompra.css';
import { useNavigate } from 'react-router';

interface Props {
    infoContacto: boolean;
}
export default function ProcesoCompra({infoContacto}: Props) {


    return (<>
        <main className="proceso-compra"> 
            <h2>Termina tu compra, Muggle!</h2>
            <section className="informacion">
                <section className="Formularios">

                    <InformacionContacto />
                

                </section>
                <section className="Resumen">
                    <p>Resumen de tu compra</p>
                </section>

            </section>
        </main>
    </>)
}

function InformacionContacto(){
    const navigate = useNavigate();
    return (<>
        <section className="info-contacto">
            <div className="user-info">
                <h3>Información de contacto</h3>
                <div className="perfil">
                    <div><label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                    /></div>
                    <div>
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                    />
                    </div>
                    <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                    />
                    </div>
                    <div>
                    <label>Telefono</label>
                    <input
                        type="text"
                        name="telefono"
                    />
                    </div>
                    <div>
                        <label>Documento</label>
                    <input
                        type="text"
                        name="documento"
                    />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento</label>
                    <input
                        type= "date"
                        name="fnac"
                    />
                    </div>
                </div>
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <button className="cancelar-button" onClick={() => navigate(-1)}>Cancelar compra</button>
                <button className="direccion-button">Continuar a dirección</button>
            </div>
        </div>
        </section>
    </>)
}

