import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";  
import { BrowserRouter } from "react-router-dom";
import StorePage from "./pages/store";
import AboutPage from "./pages/about";
import ServicesPage from "./pages/services";
import { Footer } from "./components/components/Footer";
import ContactPage from "./pages/home";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;