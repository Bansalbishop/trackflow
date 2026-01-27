import React, { useEffect, useRef, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import DashFooter from "../components/DashFooter";

const AboutUs = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.05;
      position.current.y += (mouse.current.y - position.current.y) * 0.05;
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px,${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px,${position.current.y - 20}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <DashNavbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

      <div className="bg-blue-400/10 py-1">
        <div className="max-w-5xl bg-white mx-auto my-10 rounded-xl px-6 py-16  ">
          <h1 className="text-4xl font-extrabold mb-6">About TaskFlow</h1>

          <p className="text-gray-600 leading-7 mb-6">
            TaskFlow is a modern task and project management application built
            to help individuals stay organized, focused, and productive. It
            provides a simple yet powerful way to manage daily tasks, group them
            into projects, and track progress visually.
          </p>

          <p className="text-gray-600 leading-7 mb-6">
            Built using React, TaskFlow runs entirely in your browser and uses
            local storage to keep your data safe on your own device. This means
            there is no account creation, no cloud storage, and no external
            servers handling your data.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            What TaskFlow Offers
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Create, edit, and delete tasks</li>
            <li>Group tasks under projects</li>
            <li>Track completed, ongoing, and pending work</li>
            <li>Visual dashboard with progress ring charts</li>
            <li>Fast, private, and offline-first experience</li>
          </ul>

          <p className="text-gray-600 leading-7 mt-6">
            TaskFlow is designed for simplicity, privacy, and efficiency —
            giving you full control over your productivity without compromising
            your data.
          </p>
        </div>
        <div className="flex mx-5 rounded-2xl p-4 sm:mx-5 md:mx-20 lg:mx-40 text-black bg-white gap-10 sm:gap-0 flex-col shadow-lg sm:flex-row justify-between items-center">
          <DashFooter />
        </div>
      </div>

      <div
        ref={outlineRef}
        className={`${menuOpen ? "border-white" : "border-black"} hidden md:block fixed top-0 left-0 h-10 w-10 rounded-full border border-black  pointer-events-none z-[9999]`}
      ></div>
      {/* custom cursor dot */}
      <div
        ref={dotRef}
        className={` ${menuOpen ? "bg-white" : "bg-black"} hidden md:block fixed top-0 left-0 h-3 w-3 rounded-full bg-black pointer-events-none z-[9999]`}
      ></div>
    </>
  );
};

export default AboutUs;
