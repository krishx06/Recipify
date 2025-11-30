import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load saved favorites from storage on app start
  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  async function loadFavoritesFromStorage() {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored !== null) {
        setFavorites(JSON.parse(stored));
      }
    } catch (err) {
      console.log("Error loading favorites:", err);
    }
  }

  async function saveToStorage(updatedList) {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedList));
    } catch (err) {
      console.log("Error saving favorites:", err);
    }
  }

  // Add recipe
  function addFavorite(recipe) {
    const exists = favorites.some((item) => item.id === recipe.id);
    if (exists) return;

    const updated = [...favorites, recipe];
    setFavorites(updated);
    saveToStorage(updated);
  }

  // Remove recipe
  function removeFavorite(id) {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    saveToStorage(updated);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
