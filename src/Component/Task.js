import { ArrowBack, MenuOutlined } from "@material-ui/icons";
import React, { useContext } from "react";
import "./task.css";
import { useNavigate } from "react-router-dom";
import TaskContext from "../Context/Tasks/TaskContext";
import TaskIDContext from "../Context/Tasks/TaskIDContext";

function Task() {
  const navigate = useNavigate();
  let DateTime = new Date()
  const { taskList } = useContext(TaskContext);
  const { taskType } = useContext(TaskIDContext);

  console.log(taskList);
  console.log(taskType);
  


  const backTask = () => {
    // console.log('1');
    navigate("/");
  };

  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };


  return (
    <div className="taskbox">
      <span className="taskboxheader">
        <button onClick={backTask}>
          <ArrowBack></ArrowBack>
        </button>
        {/* <span className="addtaskback">{`<--`}</span> */}
        <div className="taskheading">
          <h3 className="taskuserName">Work Projects</h3>
          <h5 className="date">{`${DateTime.toLocaleString(
            "en-IN",
            options
          )}`}</h5>
        </div>
        {/* <div className="menubarIcon"> */}
        <button className="menubarIcon">
          <MenuOutlined />
        </button>
        {/* </div> */}
      </span>
      <div className="taskselectors">
        <button>All</button>
        <button>Completed</button>
        <button>Priorty</button>
        <button>Date</button>
      </div>
        {taskList.map((task,index) => {
          // console.log(task);
          return (
            <>
            <div className="taskcontainer">
            <input
              type="checkbox"
              className="rounded-checkbox"
              // id="checkbox"
            ></input>
            <div className="hdrtask">
              <h4>{task.taskinput}</h4>
              <p>{task.tasktype}</p>
            </div>
      </div>
          </>);
        })}
    </div>
  );
}

export default Task;
