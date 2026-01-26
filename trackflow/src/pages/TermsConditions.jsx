
import React from "react";
import DashNavbar from "../components/DashNavbar";
import DashFooter from "../components/DashFooter";

const TermsConditions = () => {
  return (
    <>
      <DashNavbar />
      <div className="bg-blue-400/10 py-1">
        <div className="max-w-5xl bg-white mx-auto my-10 rounded-xl px-6 py-16  ">
          <h1 className="text-4xl font-extrabold mb-6">
        Terms & Conditions
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Last updated: October 24, 2025
      </p>

      <p className="text-gray-600 leading-7 mb-6">
        By accessing or using TaskFlow, you agree to be bound by these Terms and
        Conditions. If you do not agree with any part of these terms, please do
        not use the application.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Use of the Application
      </h2>
      <p className="text-gray-600 leading-7 mb-6">
        TaskFlow is provided for personal productivity and task management.
        You are responsible for how you use the application and the data you
        store within it.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Data Responsibility
      </h2>
      <p className="text-gray-600 leading-7 mb-6">
        All data is stored locally in your browser. TaskFlow is not responsible
        for data loss caused by browser resets, device changes, or clearing of
        storage.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Limitation of Liability
      </h2>
      <p className="text-gray-600 leading-7 mb-6">
        TaskFlow is provided "as is" without warranties of any kind. We shall
        not be liable for any direct or indirect damages resulting from the use
        or inability to use the application.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Changes to Terms
      </h2>
      <p className="text-gray-600 leading-7">
        We reserve the right to update these Terms & Conditions at any time.
        Continued use of TaskFlow after changes constitutes acceptance of the
        updated terms.
      </p>
        </div>
          <div className="flex mx-5 rounded-2xl p-4 sm:mx-5 md:mx-20 lg:mx-40 text-black bg-white gap-10 sm:gap-0 flex-col shadow-lg sm:flex-row justify-between items-center">
          <DashFooter />
        </div>
      </div>

    
    </>
  );
};

export default TermsConditions;
