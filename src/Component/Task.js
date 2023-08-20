import {
  ArrowBack,
  ArrowDownward,
  Attachment,
  Delete,
  Edit,
  Flare,
  MenuOutlined,
  Star,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import "./task.css";
import { useNavigate } from "react-router-dom";
import TaskContext from "../Context/Tasks/TaskContext";
import TaskIDContext from "../Context/Tasks/TaskIDContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

function Task() {
  const navigate = useNavigate();
  let DateTime = new Date();
  const { taskList } = useContext(TaskContext);
  const { setTaskList } = useContext(TaskContext);
  const { taskType } = useContext(TaskIDContext);

  const [newtasklist, setNewtasklist] = useState(taskList);
  const [expanded, setExpanded] = useState(false);
  const [isCheckingNewInput, setCheckingNewInput] = useState(false);
  const [updatedTask, setUpdatedTask] = useState([]);
  const [priortyTask, setPriortyTask] = useState([]);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTaskInput, setEditedTaskInput] = useState("");
  const [idd, setIDD] = useState(null);

  const handleEditClick = (taskInput, taskID) => {
    setIDD(taskID);
    console.log(idd);
    setEditedTaskInput(taskInput);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditSave = async () => {
    console.log(idd);
    const newTaskList = [...taskList];
    newtasklist.map((element, index) => {
      console.log(element.id, idd);
      if (element.id === idd) {
        element.taskinput = editedTaskInput;
      }
    });

    setTaskList(taskList);
    setOpenEditDialog(false);

    console.log(newTaskList);
    console.log(taskList);
  };

  const backTask = () => {
    // console.log('1');
    navigate("/");
  };

  useEffect(() => {}, [taskList, updatedTask, newtasklist]);

  const handleClick = (task, index) => {
    console.log(expanded);
    setExpanded(true);
    // if(expanded == false) {
    task.expanded = true;
    // }
  };

  const handleAllTask = async () => {
    setNewtasklist(taskList);
  };

  const handleCheckboxChange = async (e, task) => {
    await setCheckingNewInput(true);

    const newTaskList = [...taskList];
    console.log(task);
    console.log(taskList);
    newTaskList.map((element, index) => {
      if (element.id == task.id) {
        element.completed = !element.completed;
      }
    });
    setTaskList(taskList);
    await setCheckingNewInput(false);

    console.log(newTaskList);
    console.log(taskList);
  };

  const handleCompletedTask = async () => {
    console.log(1);

    let updatedTaskArr = newtasklist.filter((task, index) => {
      console.log(1);
      return task.completed;
    });
    setUpdatedTask(newtasklist);
    await setNewtasklist(updatedTaskArr);
    // await setNewtasklist(updatedTask);
    console.log(1);
  };

  const handlePriorityMark = async (e, task) => {
    // await setCheckingNewInput(true);

    const newTaskList = [...taskList];
    console.log(task);
    console.log(taskList);
    newTaskList.map((element, index) => {
      if (element.id == task.id) {
        element.priorty = !element.priorty;
      }
    });
    setTaskList(taskList);
    // await setCheckingNewInput(false);

    console.log(newTaskList);
    console.log(taskList);
  };

  const handlePriorityTasklist = async () => {
    let updatedTaskArr = newtasklist.filter((task, index) => {
      console.log(1);
      return task.priorty;
    });
    setUpdatedTask(newtasklist);
    await setNewtasklist(updatedTaskArr);
  };

  const handleDelete = async (e, task) => {
    // const newTaskList = [...taskList];
    console.log(task);
    console.log(taskList);
    const newTaskList = taskList.filter((element) => element.id !== task.id);
    setTaskList(newTaskList);
    setNewtasklist(newTaskList);

    console.log(newTaskList);
    console.log(taskList);
  };

  // console.log(taskList);
  // console.log(updatedTask);

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
        <button onClick={(e) => handleAllTask()}> All</button>
        <button onClick={(e) => handleCompletedTask()}>Completed</button>
        <button onClick={(e) => handlePriorityTasklist()}>Priorty</button>
        <button>Date</button>
      </div>
      {newtasklist.map((task, index) => {
        console.log(newtasklist);
        task.id = index + 1;
        // console.log(task);
        if (task.tasktype == taskType) {
          return (
            <>
              <div className="taskcontainer" key={index}>
                {!isCheckingNewInput && (
                  <input
                    type="checkbox"
                    // value={task.completed}
                    checked={task.completed}
                    className="rounded-checkbox"
                    onChange={(e) => {
                      handleCheckboxChange(e, task);
                    }}
                  />
                )}
                <div
                  className="hdrtask"
                  onClick={(e) => {
                    if (expanded == false) {
                      handleClick(task, index);
                    } else if (expanded == true) {
                      setExpanded(false);
                      task.expanded = false;
                    }
                  }}>
                  <h4>{task.taskinput}</h4>
                  <p>{task.tasktype}</p>
                  {expanded && task.expanded > 0 && (
                    <>
                      <p
                        style={{
                          fontSize: "1rem",
                        }}>{`${DateTime.toLocaleString("en-IN", options)}`}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: "1rem",
                          paddingBottom: "1rem",
                          paddingRight: "1rem",
                          boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
                        }}>
                        <ArrowDownward></ArrowDownward>
                        <button
                          onClick={() =>
                            handleEditClick(task.taskinput, task.id)
                          }>
                          <Edit></Edit>
                        </button>
                        <button onClick={(e) => handlePriorityMark(e, task)}>
                          <Star></Star>
                        </button>
                        <Attachment></Attachment>
                        <button onClick={(e) => handleDelete(e, task)}>
                          <Delete></Delete>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          );
        } else if (taskType == "all") {
          return (
            <>
              <div className="taskcontainer">
                <input
                  type="checkbox"
                  // checked={true}
                  className="rounded-checkbox"
                  // id="checkbox"
                ></input>
                <div className="hdrtask">
                  <h4>{task.taskinput}</h4>
                  <p>{task.tasktype}</p>
                </div>
              </div>
            </>
          );
        }
        {
          console.log(taskList);
        }
      })}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Task"
            variant="outlined"
            fullWidth
            value={editedTaskInput}
            onChange={(e) => setEditedTaskInput(e.target.value)}
          />
        </DialogContent>
        <Button onClick={handleEditSave}>Save</Button>
        <Button onClick={handleEditDialogClose}>Cancel</Button>
      </Dialog>
    </div>
  );
}

export default Task;
