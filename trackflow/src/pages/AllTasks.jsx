import React, { useState } from "react";
import DashNavbar from "../components/DashNavbar";
import DashFooter from "../components/DashFooter";
import MylistCard from "../components/MylistCard";
import assets from "../assets/assets";
import { useDashboard } from "../contexts/Dashboard.context";
import ActivityflexCards from "../components/ActivityflexCards";
import ActivitygridCards from "../components/ActivitygridCards";
import Add from "./Add";
const AllTasks = () => {
  const [toggle, setToggle] = useState("flex");
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

  const filterbySearch = (item) => {
    if (!search || !search.trim()) return true;

    return item.title.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <>
      <div
        className={`min-h-screen flex flex-col bg-blue-400/10 ${addOpen || activeTask ? "blur-lg pointer-events-none" : ""} `}
      >
        {/* Navbar */}
        <DashNavbar
          search={search}
          setSearch={setSearch}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
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
                ? [...tasks]
                    .filter(filterbySearch)
                    .filter(filterByDate)
                    .sort((a, b) => {
                      if (a.isdone !== b.isdone) {
                        return a.isdone ? 1 : -1;
                      }

                      if (!a.duedate) return 1;
                      if (!b.duedate) return -1;

                      return new Date(a.duedate) - new Date(b.duedate);
                    })
                    .map((task) => (
                      <ActivityflexCards
                        key={task.id}
                        task={task}
                        onViewNote={openNote}
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
              {[...tasks]
                .filter(filterbySearch)
                .filter(filterByDate)
                .sort((a, b) => {
                  if (a.isdone !== b.isdone) {
                    return a.isdone ? 1 : -1;
                  }

                  if (!a.duedate) return 1;
                  if (!b.duedate) return -1;

                  return new Date(a.duedate) - new Date(b.duedate);
                })
                .map((task) => (
                  <ActivitygridCards
                    key={task.id}
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
                [...tasks]
                  .filter(filterbySearch)
                  .filter(filterByDate)
                  .sort((a, b) => {
                    if (a.isdone !== b.isdone) {
                      return a.isdone ? 1 : -1;
                    }

                    if (!a.duedate) return 1;
                    if (!b.duedate) return -1;

                    return new Date(a.duedate) - new Date(b.duedate);
                  })
                  .map((task) => (
                    <ActivitygridCards
                      key={task.id}
                      task={task}
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
      <div>{addOpen && <Add onClose={() => setAddOpen(false)} />}</div>
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
    </>
  );
};

export default AllTasks;
