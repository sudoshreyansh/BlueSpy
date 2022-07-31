import React from "react";
import { BrowserRouter, Routes, Route, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views

import Dashboard from "views/admin/Dashboard.js";

export default function Admin() {
  const { state } = useNavigation();
  const url = state.link;
  fetch(`/api/startTask?url=${url}`)
    .then((res) => {
      console.log("Made Start Request");
    })
    .catch((err) => console.log(err));

  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch("/api/getStatus")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => setHasError(true));
  }, []);

  return (
    <>
      <main>
        <div className="relative bg-blueGray-100">
          <AdminNavbar url={url} />
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Dashboard />
          </div>
        </div>
      </main>
    </>
  );
}
