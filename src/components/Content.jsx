import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Tasks from "./Tasks";

const Content = () => {
  const [selectedtab, setselectedtab] = useState("INBOX");
  return (
    <section className="content">
      <Sidebar selectedtab={selectedtab} setselectedtab={setselectedtab} />
      <Tasks selectedtab={selectedtab} />
    </section>
  );
};

export default Content;
