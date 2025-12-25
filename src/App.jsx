import "./global.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// & PAGES
import Home from "@pages/Home/Home";
import NotFound from "@pages/Not Found/NotFound";
import Product from "@/pages/Product/Product";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/wishlist" element={<Wishlist />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
