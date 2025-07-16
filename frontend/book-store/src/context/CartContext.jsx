import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      const { data } = await axios.get("http://localhost:8080/api/cart", {
        withCredentials: true,
      });
      setCartItems(data);
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addItems = async (item) => {
    try {
      await axios.post(
        `http://localhost:8080/api/cart/add/${item.id}`,
        {},
        { withCredentials: true }
      );
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
    }
  };

  const inc = async (cartId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/cart/update/${cartId}?change=1`,
        {},
        { withCredentials: true }
      );

      if (!data) {
        setCartItems((prev) => prev.filter((item) => item.id !== cartId));
      } else {
        setCartItems((prev) =>
          prev.map((item) => (item.id === cartId ? data : item))
        );
      }
    } catch (error) {
      console.error("Ошибка увеличения количества:", {
        status: error.response?.status,
        data: error.response?.data,
        error: error.message,
      });

      if (error.response?.status === 404) {
        fetchCart();
      }
    }
  };

  const dec = async (cartId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/cart/update/${cartId}?change=-1`,
        { withCredentials: true }
      );
      if (data.quantity < 1) {
        setCartItems((prev) => prev.filter((item) => item.id !== cartId));
      } else {
        setCartItems((prev) =>
          prev.map((item) => (item.id === cartId ? data : item))
        );
      }
    } catch (error) {
      console.error("Ошибка уменьшения количества:", error);
    }
  };

  const removeItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/remove/${cartId}`, {
        withCredentials: true,
      });
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Ошибка удаления из корзины:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/cart/clear",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Ошибка очистки корзины:", {
        status: error.response?.status,
        data: error.response?.data,
        error: error.message,
      });
      alert("Не удалось очистить корзину. Попробуйте позже.");
    }
  };

  const value = {
    inc,
    dec,
    cartItems,
    addItems,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
