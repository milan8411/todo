import React, { useContext, useEffect, useState } from "react";
import "./homepage.css";
import { Form, Formik } from "formik";
import {
  Book,
  BusinessCenterOutlined,
  ListAltOutlined,
  MenuBookOutlined,
  MenuOutlined,
  PersonOutline,
  PlusOne,
  WorkOutlineOutlined,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TaskContext from "../Context/Tasks/TaskContext";
import TaskIDContext from "../Context/Tasks/TaskIDContext";
import Task from "./Task";

function Homepage() {
  const { taskList } = useContext(TaskContext);
  const { setTaskList } = useContext(TaskContext);
  const { taskType } = useContext(TaskIDContext);
  const { setTaskType } = useContext(TaskIDContext);

  let DateTime = new Date();
  const [createdTask, setCreatedTask] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);
  const [allSchedule, setAllSchedule] = useState(0);
  const [personalErrands, setPersonalErrands] = useState(0);
  const [workProject, setWorkProject] = useState(0);
  const [groceryList, setGroceryList] = useState(0);
  const [school, setSchool] = useState(0);

  useEffect(() => {
    // console.log(1);
    taskCount(taskList);
  }, [taskList]);

  const taskCount = (taskList) => {
    taskList.forEach((task) => {
      // console.log(task);
      setCreatedTask((createdTask) => createdTask + 1);
      setAllSchedule((allSchedule) => allSchedule + 1);
      if (task.key == "Personal Errands") {
        setPersonalErrands((personalErrands) => personalErrands + 1);
      } else if (task.key == "Work Project") {
        setWorkProject((workProject) => workProject + 1);
      } else if (task.key == "Grocery List") {
        setGroceryList((groceryList) => groceryList + 1);
      } else if (task.key == "School") {
        setSchool((school) => school + 1);
      }
    });
  };
  console.log(taskType, taskList);

  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  const navigate = useNavigate();

  const openaddTask = (e) => {
    navigate("add-task");
  };

  const openTask = (e) => {
    navigate("task");
  };

  const openDiv = (value) => {
    setTaskType(value);
    navigate("task");
  };

  return (
    <>
      <div className="homepage">
        <div className="menubarIcon">
          <button onClick={openTask}>
            <MenuOutlined />
          </button>
        </div>
        <div className="header">
          <div className="heading">
            <h1 className="hello">Hello</h1>
            <h1 className="userName">Milan</h1>
            <h5 className="date">{`${DateTime.toLocaleString(
              "en-IN",
              options
            )}`}</h5>
          </div>
        </div>

        <div className="filter">
          <div className="filter_top_taskkist">
            <div className="top_taskone">
              <h4>{createdTask}</h4>
              <span className="AAA">
                Created <br /> Task
              </span>
            </div>
            <div className="top_tasktwo">
              <h4>{completedTask}</h4>
              <span className="AAA">
                Completed <br /> Task
              </span>
            </div>
          </div>

          <div className="filter_bottom_taskkist">
            <div className="alltasklist">
              <div
                className="tasklist"
                onClick={(e) => {
                  openDiv("all");
                }}>
                <button>
                  <ListAltOutlined />
                </button>
                <span className="All-Span">
                  <span className="secondspan">
                    All <br /> Schedule
                  </span>
                  <span className="last-span">{`${allSchedule} `}task</span>
                </span>
              </div>

              <div
                className="tasklist"
                onClick={(e) => {
                  openDiv("Personal Errands");
                }}>
                <button>
                  <PersonOutline />
                </button>
                <span className="All-Span">
                  <span className="secondspan">
                    Personal <br /> Errands
                  </span>
                  <span className="last-span">{`${personalErrands} `}task</span>
                </span>
              </div>

              <div
                className="tasklist"
                onClick={(e) => {
                  openDiv("Work Project");
                }}>
                <button>
                  <BusinessCenterOutlined />
                </button>
                <span className="All-Span">
                  <span className="secondspan">
                    Work <br /> Project
                  </span>
                  <span className="last-span">{`${workProject} `}task</span>
                </span>
              </div>

              <div
                className="tasklist"
                onClick={(e) => {
                  openDiv("Grocery List");
                }}>
                <button>
                  <WorkOutlineOutlined />
                </button>
                <span className="All-Span">
                  <span className="secondspan">
                    Grocery <br /> List
                  </span>
                  <span className="last-span">{`${groceryList} `}task</span>
                </span>
              </div>

              <div
                className="tasklist"
                onClick={(e) => {
                  openDiv("School");
                }}>
                <button>
                  <MenuBookOutlined />
                </button>
                <span className="All-Span">
                  <span className="secondspan">
                    School
                    <br />
                    Task
                  </span>
                  <span className="last-span">{`${school} `}task</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="addTaskLogo">
          <button onClick={openaddTask}>+</button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
