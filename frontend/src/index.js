import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

ReactDOM.render(
  <BrowserRouter>
    <main>
      <Routes>
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </main>
  </BrowserRouter>,
  document.getElementById("root")
);
