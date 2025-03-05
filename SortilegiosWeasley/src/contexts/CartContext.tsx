// import { createContext, useState, useEffect } from "react";
// import { ArticuloCarrito, Carrito } from "../tipos";
// import {jwtDecode} from "jwt-decode";


// export const CartContext = createContext<{
//   cartItems: ArticuloCarrito[];
//   addToCart: (item: ArticuloCarrito) => void;
//   removeFromCart: (item: ArticuloCarrito) => void;
//   getCartTotal: () => number;
//   toggleCart: () => void;
//   getTotalCartItems: () => number;
//   deleteItem: (item: ArticuloCarrito) => void;
//   migrateCart: (items: ArticuloCarrito[]) => Promise<void>;
// }>({
//   cartItems: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
//   getCartTotal: () => 0,
//   toggleCart: () => {},
//   getTotalCartItems: () => 0,
//   deleteItem: () => {},
//   migrateCart: async () => {},
// });

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState<ArticuloCarrito[]>([]);
//   const [token, setToken] = useState<string | null>(null);
//   const [carrito, setCarrito] = useState<Carrito>({} as Carrito);

//   // Cargar carrito del usuario autenticado
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const decoded = jwtDecode(token) ?? '';
//     const fetchCart = async () => {
//       if (token) {
//         try {
//           const response = await fetch(`http://localhost:5000/carrito/${decoded.id}`, {
//             method:"GET",
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setCarrito(data)
//           } 
//         } catch (error) {
//           console.error("Error al obtener el carrito:", error);
//         }
//       } else {
//         setCartItems([]);
//         //TODO: leer los datos del carrito de compras en el local storage, apenas los lea los guarda en setCartItems
//       }
//     };
//     fetchCart();
//   }, []);
// const addToCart = async (item: ArticuloCarrito) => {
//   const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
//   const token = localStorage.getItem('token');
//   const decoded = jwtDecode(token) ?? '';
//   console.log("HOLAAA")
//   if (isItemInCart) {
//     setCartItems(prevCartItems =>
//       prevCartItems.map(cartItem =>
//         cartItem._id === item._id
//           ? { ...cartItem, total_items: cartItem.total_items + 1 }
//           : cartItem
//       )
//     );
//   } else {
//     setCartItems(prevCartItems => [...prevCartItems, { ...item, total_items: 1 }]);
//   }
//   carrito.items = cartItems.map(item => ({
//     _id: item._id,
//     total_items: item.total_items
//   }))
//   console.log("Miremos a cartItems",cartItems)
//   console.log("Miremos a carrito", {carrito}) 
//   if ( typeof carrito.items !== "undefined") {
//     try {
//       console.log("Se agregó el tin con el tan", carrito.items)
//       const peticion = cartItems.map(item => ({
//         _id: item._id,
//         total_items: item.total_items
//       }))

//       console.log(peticion)
      
//       const carritoId = carrito?._id
//       const response = await fetch(`http://localhost:5000/carrito/${carritoId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           userId: decoded.id, 
//           // items: [{ productoId: item._id, total_items: 1 }],
//           items: cartItems.map(item => ({
//             _id: item._id,
//             total_items: item.total_items
//           }))
//         }),
//       });
      
//       const data = await response.json();
      
//       console.log(`productos en base de datos ${data}`);
//       //TODO guardar estos datos en setCarrito
//       console.log("🔍 Respuesta del backend al agregar producto:", data);
  
//       if (!response.ok) {
//         console.error("❌ Error en la petición:", data);
//       }
//     } catch (error) {
//       console.error("❌ Error al agregar producto al carrito en el backend:", error);
//     }
//   }
//   else {
//     try {
//       console.log("Aquí está vacío")
//       const response = await fetch(`http://localhost:5000/carrito`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           userId: decoded.id, // Asegurarse de que esto coincide con el backend
//           items: {
//             productoId: cartItems[0]._id,
//             total_items: cartItems[0].total_items
//           },
//         }),
//       });
  
//       const data = await response.json();
//       console.log(`productos en base de datos ${data}`);
//       //TODO guardar estos datos en setCarrito
//       console.log("🔍 Respuesta del backend al agregar producto:", data);
  
//       if (!response.ok) {
//         console.error("❌ Error en la petición:", data);
//       }
//     } catch (error) {
//       console.error("❌ Error al agregar producto al carrito en el backend:", error);
//     }
//   }

import { createContext, useState, useEffect } from "react";
import { ArticuloCarrito, Carrito } from "../tipos";
import { jwtDecode } from "jwt-decode";

export const CartContext = createContext<{
  cartItems: ArticuloCarrito[];
  addToCart: (item: ArticuloCarrito) => void;
  removeFromCart: (item: ArticuloCarrito) => void;
  getCartTotal: () => number;
  toggleCart: () => void;
  getTotalCartItems: () => number;
  deleteItem: (item: ArticuloCarrito) => void;
  migrateCart: (items: ArticuloCarrito[]) => Promise<void>;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getCartTotal: () => 0,
  toggleCart: () => {},
  getTotalCartItems: () => 0,
  deleteItem: () => {},
  migrateCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ArticuloCarrito[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<Carrito>({} as Carrito);


  console.log("CARTITEMS", {cartItems})
  console.log("CARRITO", {carrito})
  // Cargar carrito del usuario autenticado
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setCartItems([]);
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode<{ id: string }>(storedToken);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:5000/carrito/${decoded.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setCarrito(data);
          setCartItems(data.items || []);
        }  else if (response.status === 404) {
          console.warn("Carrito no encontrado para este usuario.");
          // setCartItems([]); // cartItems se mantenga vacío
        } else {
          console.error("Error al obtener el carrito:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error en la petición del carrito:", error);
      }
    };
    fetchCart();
  }, []);

  

const addToCart = async (item: ArticuloCarrito) => {
  const token = localStorage.getItem("token");
  if (!token) return; // Si no hay token, no hacemos nada

  const decoded = jwtDecode(token) ?? {};
  const userId = decoded.id;

  if (!userId) {
    console.error("❌ Error: No se encontró el ID del usuario en el token.");
    return;
  }

  // Actualizamos el estado localmente
  // let updatedCartItems: ArticuloCarrito[];
  // setCartItems(prevCartItems => {
  //   const isItemInCart = prevCartItems.find(cartItem => cartItem._id === item._id);
  //   if (isItemInCart) {
  //     updatedCartItems = prevCartItems.map(cartItem =>
  //       cartItem._id === item._id
  //         ? { ...cartItem, total_items: cartItem.total_items + 1 }
  //         : cartItem
  //     );
  //   } else {
  //     updatedCartItems = [...prevCartItems, { ...item, total_items: 1 }];
  //   }
  //   console.log("Aquí está el carrito actualizado: ", {updatedCartItems})
  //   return updatedCartItems;
  // });

  setCartItems(prevCartItems => {
    const isItemInCart = prevCartItems.find(cartItem => cartItem._id === item._id);
    if (isItemInCart) {
      return prevCartItems.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, total_items: (cartItem.total_items || 0) + 1 }
          : cartItem
      );
    } else {
      return [...prevCartItems, { ...item, total_items: 1 }];
    }
  })

  try {
    // 2️⃣ Verificar si el usuario ya tiene un carrito
    console.log({carrito})
    let carritoId = carrito?._id;
    if (!carritoId) {
      console.warn("⚠️ No se encontró un carrito, intentando obtener uno...");
      const response = await fetch(`http://localhost:5000/carrito/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        carritoId = data._id;
        setCarrito(data);
      }
    }

    // 3️⃣ Si el carrito existe, actualizarlo con PUT
    if (carritoId) {
      console.log("🔄 Actualizando carrito existente...");

      const response = await fetch(`http://localhost:5000/carrito/${carritoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        items: cartItems.map(i => ({
            productoId: i._id,
            total_items: i.total_items ?? 1
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Error en la actualización del carrito:", data);
      } else {
        console.log("✅ Carrito actualizado:", data);
        setCarrito(data);
      }
    } else {
      // 4️⃣ Si no hay carrito, crearlo con POST
      console.log("🆕 Creando nuevo carrito...");

      const response = await fetch(`http://localhost:5000/carrito`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          items: [{ productoId: item._id, total_items: 1 }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Error creando carrito:", data);
      } else {
        console.log("✅ Carrito creado:", data);
        setCarrito(data);
      }
    }
  } catch (error) {
    console.error("❌ Error al manejar el carrito:", error);
  }
};

  // Remover un producto del carrito
  const removeFromCart = async (item: ArticuloCarrito) => {
    console.log("removeFromCart")
    const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

    if (isItemInCart?.total_items === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, total_items: cartItem.total_items - 1 }
            : cartItem
        )
      );
    }

    if (token) {
      try {
        await fetch(`http://localhost:5000/carrito/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ total_items: isItemInCart.total_items - 1 }),
        });
      } catch (error) {
        console.error("Error al remover producto del carrito en el backend:", error);
      }
    }
  };

  // Eliminar producto del carrito
  const deleteItem = async (item: ArticuloCarrito) => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));

    if (token) {
      try {
        await fetch(`http://localhost:5000/carrito/${item._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error al eliminar producto del carrito en el backend:", error);
      }
    }
  };

  // Migrar carrito cuando el usuario inicia sesión
  const migrateCart = async (items: ArticuloCarrito[]) => {
    try {
      const response = await fetch("http://localhost:5000/carrito/migrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productoId: item._id,
            total_items: item.total_items,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al migrar el carrito");
      }

      console.log("Carrito migrado exitosamente");
    } catch (error) {
      console.error("Error en migrateCart:", error);
    }
  };

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.total_items, 0);
  };

  // Alternar la visibilidad del carrito
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Obtener la cantidad total de productos en el carrito
  const getTotalCartItems = () => {
    return cartItems.reduce((ack, item) => ack + item.total_items, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        toggleCart,
        getTotalCartItems,
        deleteItem,
        migrateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
