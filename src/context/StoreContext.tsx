import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "processing" | "confirmed" | "shipped" | "delivered";
  address: string;
}

interface StoreState {
  cart: CartItem[];
  orders: Order[];
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

type StoreAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "ADD_ORDER"; order: Order }
  | { type: "LOGIN"; user: { name: string; email: string } }
  | { type: "LOGOUT" };

const initialState: StoreState = {
  cart: [],
  orders: [],
  isAuthenticated: false,
  user: null,
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.product.id !== action.productId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, cart: state.cart.filter((item) => item.product.id !== action.productId) };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "ADD_ORDER":
      return { ...state, orders: [action.order, ...state.orders] };
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.user };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

interface StoreContextType extends StoreState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

function loadState(): StoreState {
  try {
    const saved = localStorage.getItem("freshcart_state");
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) };
    }
  } catch {}
  return initialState;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, loadState());

  useEffect(() => {
    localStorage.setItem("freshcart_state", JSON.stringify(state));
  }, [state]);

  const cartTotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const value: StoreContextType = {
    ...state,
    addToCart: (product) => dispatch({ type: "ADD_TO_CART", product }),
    removeFromCart: (productId) => dispatch({ type: "REMOVE_FROM_CART", productId }),
    updateQuantity: (productId, quantity) => dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    addOrder: (order) => dispatch({ type: "ADD_ORDER", order }),
    login: (user) => dispatch({ type: "LOGIN", user }),
    logout: () => dispatch({ type: "LOGOUT" }),
    cartTotal,
    cartCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
