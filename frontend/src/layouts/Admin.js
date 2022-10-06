import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views

import Dashboard from "views/admin/Dashboard.js";

export default function Admin() {
  const { state } = useLocation();
  const url = state.link;
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const data = {
    data: {
      scorecard: {
        score: 4.2,
        checks: [
          { score: 10, name: "Binary-Artifacts" },
          { score: 0, name: "Branch-Protection" },
          { score: 7, name: "CI-Tests" },
          { score: 0, name: "CII-Best-Practices" },
          { score: 4, name: "Code-Review" },
          { score: 10, name: "Contributors" },
          { score: 10, name: "Dangerous-Workflow" },
          { score: 0, name: "Dependency-Update-Tool" },
          { score: 0, name: "Fuzzing" },
          { score: 10, name: "License" },
          { score: 0, name: "Maintained" },
          { score: -1, name: "Packaging" },
          { score: 9, name: "Pinned-Dependencies" },
          { score: 0, name: "SAST" },
          { score: 0, name: "Security-Policy" },
          { score: -1, name: "Signed-Releases" },
          { score: 0, name: "Token-Permissions" },
          { score: 10, name: "Vulnerabilities" },
          { score: -1, name: "Webhooks" },
        ],
      },
      appinspector: {
        dynamicExecution: 0,
        crytpography: 0,
        networkCalls: 0,
        cryptocurrency: 0,
        fileio: 0,
        os: 0,
      },
      metadata: [
        { name: "author_changes", verdict: 0, message: "" },
        { name: "dist_tag_latest", verdict: 0, message: "" },
        { name: "first_version", verdict: 0, message: "" },
        {
          name: "immature_package",
          verdict: 1,
          message:
            "The latest version is 0.13.1 It might not be a mature package and have bugs and vulnerabilities.",
        },
        {
          name: "maintainer_changes",
          verdict: 1,
          message:
            "version 0.4.0: \t maintainers: None \nversion 0.5.0: \t maintainers: [{'name': 'tim-kos', 'email': 'tim@debuggable.com'}]\n\nversion 0.12.0: \t maintainers: [{'name': 'tim-kos', 'email': 'tim@debuggable.com'}] \nversion 0.13.1: \t maintainers: [{'name': 'tim-kos', 'email': 'tim@transloadit.com'}]\n\n",
        },
        { name: "malicious_authors_involved", verdict: 0, message: "" },
        { name: "malicious_maintainers_involved", verdict: 0, message: "" },
        { name: "package_popularity", verdict: 0, message: "" },
        { name: "strictly_inc_versions", verdict: 0, message: "" },
        { name: "version_skipping", verdict: 0, message: "" },
        { name: "age_comparison", verdict: 0, message: "" },
        { name: "popularity_comparison", verdict: 0, message: "" },
        { name: "same_author", verdict: 0, message: "" },
      ],
    },
    status: false,
  };
  // const fetchData = async () => {
  //   const response = await fetch(`http://localhost:3001/data?url=${url}`);
  //   const data = await response.json();
  //   setData(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      <main>
        {data ? (
          <div className="relative bg-blueGray-100">
            <AdminNavbar data={url} />
            <HeaderStats data={data} url={url} />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <Dashboard data={data} />
            </div>
          </div>
        ) : (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
      </main>
    </>
  );
}
