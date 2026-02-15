// ? REACT
import { useEffect, useState } from "react";
// ^ Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
// ~ Store
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";
import { useAuth } from "@/hooks/useAuth";
// & PAGES
import Home from "@pages/Home/Home";
import NotFound from "@pages/Not Found/NotFound";
import Product from "@/pages/Product/Product";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./routes/PrivateRoute";
// ? Style
import "./global.css";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function App() {
  const { isAuth } = useAuth();

  const { fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    if (isAuth) {
      fetchFavorites();
    }
  }, [isAuth]);

  return (
    <div>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              padding: "12px",
              fontSize: "16px"
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
