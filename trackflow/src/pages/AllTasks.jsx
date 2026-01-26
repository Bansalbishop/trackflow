import React from "react";
import DashNavbar from "../components/DashNavbar";
import DashFooter from "../components/DashFooter";

const AllTasks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-400/10">
      {/* Navbar */}
      <DashNavbar />

      {/* Main content (grows) */}
      <main className="flex-grow py-6">
        <div className="mx-5 sm:mx-5 md:mx-20 lg:mx-40 bg-white rounded-2xl p-4 shadow-lg">
          {/* Your page content here */}
          <h1 className="text-2xl font-bold">All Tasks</h1>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-5 sm:mx-5 md:mx-20 lg:mx-40 bg-white rounded-2xl p-4 shadow-lg mb-4">
        <DashFooter />
      </footer>
    </div>
  );
};

export default AllTasks;
