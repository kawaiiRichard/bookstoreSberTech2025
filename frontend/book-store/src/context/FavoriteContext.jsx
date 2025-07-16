import { createContext, useState, useContext } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (book) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === book.id)
        ? prev.filter((fav) => fav.id !== book.id)
        : [...prev, book]
    );
  };

  const value = {
    favorites,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
