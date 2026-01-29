import React, { useEffect, useRef, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import DashFooter from "../components/DashFooter";
import assets from "../assets/assets";
import { useDashboard } from "../contexts/Dashboard.context";
import ActivityflexCards from "../components/ActivityflexCards";
import ActivitygridCards from "../components/ActivitygridCards";
import Add from "./Add";
const AllTasks = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [addState, setAddState] = useState("task");
    const [selectedProject, setSelectedProject] = useState(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

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

  const state = "alltasks";
  const [toggle, setToggle] = useState("flex");
  const [menuOpen, setMenuOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const [activeTask, setActiveTask] = useState(null);
  //   const [selectedNote,setSelectedNote]=useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const openNote = (task) => {
    setActiveTask(task);
    setNoteText(task.note || "");
  };

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("a");
  const { tasks, toggleTask, updateTaskNote } = useDashboard();
  const closeModal = () => {
    updateTaskNote(activeTask.id, noteText);
    setActiveTask(null);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    const d = new Date(date);

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    if (!date) return false;
    const today = new Date();
    const d = new Date(date);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return d >= startOfWeek && d <= endOfWeek;
  };

  const isThisMonth = (date) => {
    if (!date) return false;
    const today = new Date();
    const d = new Date(date);

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const filterByDate = (item) => {
    if (activeFilter === "a") return true;
    if (activeFilter === "t") return isToday(item.duedate);
    if (activeFilter === "w") return isThisWeek(item.duedate);
    if (activeFilter === "m") return isThisMonth(item.duedate);

    return true;
  };


const filteredTasks = tasks
  .filter((task) => {
    // project scope (if selected)
    if (selectedProject && task.projectId !== selectedProject.id) {
      return false;
    }

    // search
    if (search.trim()) {
      return task.title.toLowerCase().includes(search.toLowerCase());
    }

    return true;
  })
  .filter(filterByDate)
  .sort((a, b) => {
    if (a.isdone !== b.isdone) {
      return a.isdone ? 1 : -1;
    }
    if (!a.duedate) return 1;
    if (!b.duedate) return -1;
    return new Date(a.duedate) - new Date(b.duedate);
  });


  return (
    <>
      <div
        className={`min-h-screen flex flex-col bg-blue-400/10 ${addOpen || activeTask ? "blur-lg pointer-events-none" : ""} `}
      >
        {/* Navbar */}
        <DashNavbar
          search={search}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setSearch={setSearch}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />

        <main className="grow py-6">
          <div className="mx-5 mb-5 sm:mx-5 md:mx-20 lg:mx-40 flex items-center justify-between bg-white rounded-2xl p-4 shadow-lg">
            <h1 className="text-2xl font-bold">All Tasks</h1>
            <div className=" flex items-center gap-10">
              <img
                src={assets.plus_icon}
                onClick={() => setAddOpen(true)}
                className="w-10 bg-blue-400/40 p-2 rounded-xl"
              ></img>

              <div
                className=" hidden lg:flex
          flex shadow-lg p-1 rounded-lg"
              >
                <img
                  src={assets.listview}
                  onClick={() => setToggle("flex")}
                  className={`w-10 p-2 rounded-lg  border-black ${toggle === "flex" ? "bg-blue-400/60" : ""}`}
                />
                <img
                  src={assets.gridview}
                  onClick={() => setToggle("grid")}
                  className={`w-10 p-2 rounded-lg  border-black ${toggle === "grid" ? "bg-blue-400/60" : ""}`}
                />
              </div>
            </div>
          </div>
          <div className="mx-5 mb-10 sm:mx-5 md:mx-20 lg:mx-40  flex-rows items-center justify-between bg-white rounded-2xl p-4 shadow-lg">
            <div className="hidden lg:block">
              {" "}
              {toggle === "flex"
                ?filteredTasks
                    .map((task) => (
                      <ActivityflexCards
                        key={task.id}
                        task={task}
                        onViewNote={openNote}
                        whichState={state}
                        //   selectedNote={selectedNote}
                        //   setSelectedNote={setSelectedNote}
                        onToggle={toggleTask}
                      />
                    ))
                : null}
            </div>
            {/* GRID layout: always visible on mobile & tablet */}
            <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
              {/* Grid cards here */}
              {filteredTasks
                .map((task) => (
                  <ActivitygridCards
                    key={task.id}
                    whichState={state}
                    task={task}
                    onViewNote={openNote}
                    //   selectedNote={selectedNote}
                    //   setSelectedNote={setSelectedNote}
                    onToggle={toggleTask}
                  />
                ))}
            </div>

            {/* GRID layout on desktop when toggle === "grid" */}
            <div className="hidden lg:grid lg:grid-cols-3 ">
              {toggle === "grid" &&
                filteredTasks
                  .map((task) => (
                    <ActivitygridCards
                      key={task.id}
                      task={task}
                      whichState={state}
                      onViewNote={openNote}
                      //   selectedNote={selectedNote}
                      //   setSelectedNote={setSelectedNote}
                      onToggle={toggleTask}
                    />
                  ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mx-5 sm:mx-5 md:mx-20 lg:mx-40 bg-white rounded-2xl p-4 shadow-lg mb-4">
          <DashFooter />
        </footer>
      </div>
      <div>
        {addOpen && (
          <Add addState={addState} onClose={() => setAddOpen(false)} />
        )}
      </div>
      {activeTask && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeModal}
          />

          {/* Modal */}
          <div>
            {activeTask && (
              <div onClose={() => setAddOpen(false)}>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between mb-4">
                      <h2 className="text-2xl font-bold">{activeTask.title}</h2>
                      <button onClick={closeModal} className="text-xl">
                        ✕
                      </button>
                    </div>

                    <textarea
                      value={noteText}
                      rows={20}
                      cols={200}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                </div>{" "}
              </div>
            )}
          </div>
        </>
      )}
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

export default AllTasks;
