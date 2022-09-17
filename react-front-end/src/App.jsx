import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {RecoilRoot} from 'recoil';
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";


function App() {
  return (
    <>
     <RecoilRoot>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
