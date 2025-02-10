import { useState } from "react";
import InfoBoton from "../../components/infoBoton";

// Definir interfaces para la información del usuario y direcciones
interface ContactInfo {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  documento: number;
  fnac: string;
}

interface Address {
  departamento: string;
  municipio: string;
  direccion: string;
  barrio: string;
  recibidor: string;
  infoextra: string;
}

const UserProfile = () => {
  // Estado para la información de contacto
  const [contact, setContact] = useState<ContactInfo>({
    nombre: "Harry",
    apellido: "Potter",
    email: "harry.potter@hogwarts.com",
    telefono: "3116298300",
    documento:1007239563,
    fnac:"07-15-2000",
  });

  // Estado para la edición de contacto
  const [isEditingContact, setIsEditingContact] = useState<boolean>(false);

  // Estado para la lista de direcciones
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Estado para añadir una nueva dirección
  const [newAddress, setNewAddress] = useState<Address>({
    departamento:"" ,
    municipio:"" ,
    direccion: "",
    barrio: "",
    recibidor: "",
    infoextra: "",
  });

  // Estado para controlar si se está añadiendo una dirección
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Estado para la edición de una dirección
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Manejar cambios en la información de contacto
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Guardar cambios en la información de contacto
  const handleSaveContact = () => {
    setIsEditingContact(false);
  };

  // Manejar cambios en la nueva dirección
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Agregar una nueva dirección
  const handleAddAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress({   
        departamento:"" ,
        municipio:"" ,
        direccion: "",
        barrio: "",
        recibidor: "",
        infoextra: "",});
    setIsAdding(false);
  };

  // Eliminar una dirección
  const handleDeleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  // Editar una dirección
  const handleEditAddress = (index: number) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
    setIsAdding(true);
  };

  // Guardar edición de una dirección
  const handleSaveAddress = () => {
    if (editingIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = newAddress;
      setAddresses(updatedAddresses);
      setEditingIndex(null);
      setIsAdding(false);
    }
  };

// Función para cerrar sesión
const handleLogout = () => {
    console.log("Cerrando sesión...");
    alert("Has cerrado sesión exitosamente.");
    
    // Redirección a la página de inicio de sesión (opcional)
    window.location.href = "/login";
    };

  return (
    <div className="profile-container">
      <h2>Hola, Muggle!</h2>

      {/* Información de contacto */}
      <div className="contact-info">
        <h3>Mi información de contacto</h3>
        {isEditingContact ? (
          <div>
            <input
              type="text"
              name="nombre"
              value={contact.nombre}
              onChange={handleContactChange}
            />
            <input
              type="text"
              name="apellido"
              value={contact.apellido}
              onChange={handleContactChange}
            />
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleContactChange}
            />
            <input
              type="text"
              name="telefono"
              value={contact.telefono}
              onChange={handleContactChange}
            />
            <input
              type="text"
              name="documento"
              value={contact.documento}
              onChange={handleContactChange}
            />
            <input
              type="text"
              name="fecha de nacimiento"
              value={contact.fnac}
              onChange={handleContactChange}
            />
            <button onClick={handleSaveContact}>Guardar</button>
          </div>
        ) : (
          <div>
            <p>{contact.nombre} {contact.apellido}</p>
            <p>{contact.email}</p>
            <p>{contact.telefono}</p>
            <p>{contact.documento}</p>
            <p>{contact.fnac}</p>
            <button onClick={() => setIsEditingContact(true)}>Editar</button>
          </div>
        )}
      </div>

      {/* Sección de Direcciones */}
      <div className="address-section">
        <h3>Mis Direcciones</h3>
        {addresses.length === 0 ? (
          <p>No tienes direcciones guardadas.</p>
        ) : (
          <ul>
            {addresses.map((address, index) => (
              <li key={index}>
                <p>
                  {address.departamento}, {address.municipio}, {address.direccion}, {address.barrio} {address.recibidor}, {address.infoextra}
                </p>
                <button onClick={() => handleEditAddress(index)}>Editar</button>
                <button onClick={() => handleDeleteAddress(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => setIsAdding(true)}>Añadir Dirección</button>

        {/* Formulario para añadir o editar una dirección */}
        {isAdding && (
          <div className="add-address-form">
            <input
              type="text"
              name="departamento"
              placeholder="Departamento"
              value={newAddress.departamento}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="municipio"
              placeholder="Municipio"
              value={newAddress.municipio}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Direccion"
              value={newAddress.direccion}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="barrio"
              placeholder="Barrio"
              value={newAddress.barrio}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="recibidor"
              placeholder="Nombre de quien recibe"
              value={newAddress.recibidor}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="infoextra"
              placeholder="Infomación adicional"
              value={newAddress.infoextra}
              onChange={handleAddressChange}
            />
            {editingIndex !== null ? (
              <button onClick={handleSaveAddress}>Guardar Cambios</button>
            ) : (
              <button onClick={handleAddAddress}>Añadir Dirección</button>
            )}
          </div>
        )}
      </div>

      {/* Botón de cerrar sesión */}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>

    </div>

  );
  <InfoBoton/>
};

export default UserProfile;
