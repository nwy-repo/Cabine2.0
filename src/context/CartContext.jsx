import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "cabine2.order";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [order, setOrder] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (order) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // stockage indisponible (mode privé, etc.) : on ignore silencieusement
    }
  }, [order]);

  // type: "internet" | "mix" | "transfert"
  function startOrder({ operatorId, type, item, recipientPhone }) {
    setOrder({
      operatorId,
      type,
      item, // { id, name, data?, validity?, price }
      recipientPhone: recipientPhone ?? "",
      createdAt: Date.now(),
    });
  }

  function clearOrder() {
    setOrder(null);
  }

  function updateRecipientPhone(phone) {
    setOrder((prev) => (prev ? { ...prev, recipientPhone: phone } : prev));
  }

  return (
    <CartContext.Provider value={{ order, startOrder, clearOrder, updateRecipientPhone }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
