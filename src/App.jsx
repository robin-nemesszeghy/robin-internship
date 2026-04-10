import React, { useEffect } from "react"; // Added useEffect here
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Added AOS imports here
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  // Added the initialization hook here
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 0, // Changed offset from 100 to 0
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        {/* Updated the paths below to accept the dynamic ID */}
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
