import React, { useState, useEffect } from "react";
import "./user_info.css";
import { FaEdit } from "react-icons/fa";

const API_URL = "http://localhost:5000/mi-informacion";

const UserInfo: React.FC = () => {
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    documento: "",
    fnac: "",
  });

  //Cargar datos del usuario autenticado
  useEffect(() => {
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserData({
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            email: data.correo || "",  // Ajusta si el backend devuelve otro nombre
            telefono: data.telefonoPersonal || "",
            documento: data.documento || "",
            fnac: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString().split("T")[0] : "",
          });
        }
      })
      .catch((error) => console.error("Error obteniendo perfil:", error));
  }, [token]);

  // Maneja cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //Guardar cambios en la API
  const guardarCambios = async () => {
    const respuesta = await fetch(API_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: userData.nombre,
        apellido: userData.apellido,
        telefonoPersonal: userData.telefono,
        fechaNacimiento: userData.fnac,  // Se enviará ya en formato "yyyy-MM-dd"
      })
    });

    if (!respuesta.ok) {
      console.error("Error actualizando el perfil");
      return;
    }

    setIsEditing(false); // Salir del modo edición
  };

  return (
    <div className="user-info">
      <p className="saludo">
        <h2>Mi Información</h2>
        Esta es la información de contacto que proporcionaste. Si necesitas hacer alguna actualización, puedes editarla en cualquier momento.<br /><br />
      </p>

      {!isEditing ? (
        // Vista de información
        <div className="column">
          <p><strong>Nombre:</strong> <br />{userData.nombre}</p>
          <p><strong>Apellido:</strong> <br /> {userData.apellido}</p>
          <p><strong>Email:</strong><br /> {userData.email}</p>
          <p><strong>Teléfono:</strong> <br /> {userData.telefono}</p>
          <p><strong>Documento:</strong> <br /> {userData.documento}</p>
          <p><strong>Fecha de nacimiento:</strong> <br /> {userData.fnac}</p>
          <FaEdit className="icono_editar" onClick={() => setIsEditing(true)} />
        </div>
      ) : (
        // Formulario de edición
        <div className="perfil">
          <div>
            <label>Nombre</label>
            <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} />
          </div>
          <div>
            <label>Apellido</label>
            <input type="text" name="apellido" value={userData.apellido} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Teléfono</label>
            <input type="text" name="telefono" value={userData.telefono} onChange={handleChange} />
          </div>
          <div>
            <label>Documento</label>
            <input type="text" name="documento" value={userData.documento} onChange={handleChange} />
          </div>
          <div>
            <label>Fecha de Nacimiento</label>
            <input type="date" name="fnac" value={userData.fnac || ""} onChange={handleChange} />
          </div>
          <button className="save-button" onClick={guardarCambios}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;