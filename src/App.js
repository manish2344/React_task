import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Video from "./Video";
import ContactForm from "./Form";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactForm/>} />
        <Route path="/video" element={<Video/>} />
      </Routes>
    </Router>
  );
};

export default App;
