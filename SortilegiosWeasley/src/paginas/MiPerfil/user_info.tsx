import React, { useState } from "react";
import "./user_info.css"; // Asegúrate de importar los estilos
import { FaEdit } from "react-icons/fa";

const UserInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "Harry",
    apellido: "Potter",
    email: "harry.potter@hogwarts.com",
    telefono: "3116298300",
    documento:1007239563,
    fnac:"07-15-2000",
  });

  // Maneja el cambio de valores en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Alternar entre modo edición y visualización
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="user-info">
        <p className="saludo"><h2>Mi Información</h2>Esta es la información de contacto que proporcionaste. Si necesitas hacer alguna actualización, puedes editarla en cualquier momento.<br /><br /></p>
      {!isEditing ? (
        // Vista de información
        <div className="column">
          <p><strong>Nombre:</strong> <br />{userData.nombre}</p>
          <p><strong>Apellido:</strong> <br /> {userData.apellido}</p>
          <p><strong>Email:</strong><br /> {userData.email}</p>
          <p><strong>Teléfono:</strong> <br /> {userData.telefono}</p>
          <p><strong>Documento:</strong> <br /> {userData.documento}</p>
          <p><strong>Fecha de nacimiento:</strong> <br /> {userData.fnac}</p>
          <FaEdit className="icono_editar"  onClick={toggleEdit} />
        </div>
      ) : (
        // Formulario de edición
        <div className="perfil">
          <div><label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
          /></div>
          <div>
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={userData.apellido}
            onChange={handleChange}
          />
          </div>
          <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          </div>
          <div>
          <label>Telefono</label>
          <input
            type="text"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
          />
          </div>
          <div>
            <label>Documento</label>
          <input
            type="text"
            name="documento"
            value={userData.documento}
            onChange={handleChange}
          />
          </div>
          <div>
            <label>Fecha de Nacimiento</label>
          <input
            type= "date"
            name="fnac"
            value={userData.fnac}
            onChange={handleChange}
          />
          </div>
          
          <button className="save-button" onClick={toggleEdit}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
