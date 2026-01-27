import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import TermsConditions from "./pages/TermsConditions";
import Add from "./pages/Add";
import AllTasks from "./pages/AllTasks";
import AllProjects from "./pages/AllProjects";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/add" element={<Add />} />
        <Route path="/alltasks" element={<AllTasks />} />
        <Route path="/allprojects" element={<AllProjects />} />

        <Route path="/termsconditions" element={<TermsConditions />} />
      </Routes>
    </>
  );
};

export default App;
