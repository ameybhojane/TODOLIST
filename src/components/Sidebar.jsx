import React from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";

const Sidebar = ({ selectedtab, setselectedtab }) => {
  console.log(selectedtab);
  return (
    <div className="sidebar">
      <div
        className={selectedtab === "INBOX" ? "active" : null}
        onClick={() => setselectedtab("INBOX")}
      >
        <FaInbox className="icon" />
        Inbox
      </div>
      <div
        className={selectedtab === "TODAY" ? "active" : null}
        onClick={() => setselectedtab("TODAY")}
      >
        <FaRegCalendarAlt className="icon" />
        Today
      </div>
      <div
        className={selectedtab === "NEXT_7" ? "active" : null}
        onClick={() => setselectedtab("NEXT_7")}
      >
        <FaRegCalendar className="icon" />
        Next 7 Days
      </div>
    </div>
  );
};

export default Sidebar;
