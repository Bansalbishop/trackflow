import React from "react";
import LandingserviceTitle from "./LandingserviceTitle";
import assets from "../assets/assets";
import toast from "react-hot-toast";

const Landingcontactus = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "efbedc1e-2593-4830-9b9e-d017bd4e57c5");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");

        event.target.reset();
      } else {
        console.log("Error", data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      id="contact"
      className="flex mt-30 scroll-mt-30 flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-3 text-gray-700"
    >
      <LandingserviceTitle
        title="Reach out to us"
        desc="From strategy to execution, we bundle producitivty with progress"
      />

      <form
        onSubmit={onSubmit}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full"
      >
        <div>
          <p className="mb-2 text-sm font-medium">Your Name</p>
          <div className="flex pl-3 rounded-lg border border-gray-300">
            <img src={assets.person_icon} />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full p-3 text-sm outline-none"
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Your Email</p>
          <div className="flex pl-3 rounded-lg border border-gray-300">
            <img src={assets.email_icon} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 text-sm outline-none"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium">Your Message</p>
          <div className="flex pl-3 rounded-lg border border-gray-300">
            <textarea
              rows={8}
              name="message"
              placeholder="Enter you message"
              className="w-full p-3 text-sm outline-none rounded-lg "
            />
          </div>
          <button
            type="submit"
            className="w-max mt-5 mb-5 flex gap-2 bg-indigo-500 text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-105 transition-all"
          >
            Submit<img src={assets.arrow_icon} className="w-4"></img>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Landingcontactus;
