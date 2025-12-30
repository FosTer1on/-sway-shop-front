import "./global.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
// & PAGES
import Home from "@pages/Home/Home";
import NotFound from "@pages/Not Found/NotFound";
import Product from "@/pages/Product/Product";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            {/* <Route path="/wishlist" element={<Wishlist />} /> */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
