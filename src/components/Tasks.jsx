import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";

const FORMAT = "dd/MM/yyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ onCancel, onAddTask }) => {
  const [task, settask] = useState("");
  const [date, setdate] = useState(null);
  return (
    <div className="add-task-dialog">
      <input
        value={task}
        onChange={(event) => {
          settask(event.target.value);
        }}
      />
      <div className="add-task-actions">
        <div className="btns-container">
          <button
            disabled={!task}
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
              //console.log(date, "halle");
              onCancel();
              settask("");
            }}
          >
            Add
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              settask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => {
              // console.log(day);
              setdate(day);
            }}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            format={FORMAT}
            formatDate={formatDate}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Taskitems = ({ selectedtab, tasks }) => {
  if (selectedtab == "NEXT_7") {
    return tasks
      .filter(
        (task) =>
          isAfter(task.date, new Date()) &&
          isBefore(task.date, addDays(new Date(), 7))
      )
      .map((task) => (
        <div className="task-container">
          <div className="task-items">
            <p>{task.text}</p>
            <p> {dateFnsFormat(new Date(task.date), FORMAT)}</p>
          </div>
        </div>
      ));
  }

  if (selectedtab == "TODAY") {
    return tasks
      .filter((task) => isToday(task.date))
      .map((task) => (
        <div className="task-container">
          <div className="task-items">
            <p>{task.text}</p>
            <p> {dateFnsFormat(new Date(task.date), FORMAT)}</p>
          </div>
        </div>
      ));
  }

  return tasks.map((task) => (
    <div className="task-container">
      <div className="task-items">
        <p>{task.text}</p>
        <p> {dateFnsFormat(new Date(task.date), FORMAT)}</p>
      </div>
    </div>
  ));
};

const TASKS_HEADER_MAPPING = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 days",
};

const Tasks = ({ selectedtab }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, settasks] = useState([]);
  const addNewTask = (text, date) => {
    const newTask = { text, date: date || new Date() };
    //console.log(newTask.date);
    settasks((prevtasks) => [...prevtasks, newTask]);
  };
  return (
    <div className="tasks">
      <h1>{TASKS_HEADER_MAPPING[selectedtab]}</h1>
      {selectedtab === "INBOX" ? (
        <div
          className="add-task-btn"
          onClick={() => {
            setShowAddTask(!showAddTask);
          }}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      ) : null}
      {showAddTask && (
        <AddTask
          onCancel={() => {
            setShowAddTask(false);
          }}
          onAddTask={addNewTask}
        />
      )}
      {tasks.length > 0 ? (
        <Taskitems selectedtab={selectedtab} tasks={tasks} />
      ) : (
        <p>No task yet</p>
      )}
    </div>
  );
};

export default Tasks;
