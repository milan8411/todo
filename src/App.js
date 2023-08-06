import Homepage from "./Component/Homepage";
import { Routes, Route, Link } from "react-router-dom";
import AddTaskPage from "./Component/AddTaskPage";
import Task from "./Component/Task";
import TaskContext from "./Context/Tasks/TaskContext";
import TaskIDContext from "./Context/Tasks/TaskIDContext";
import { useState } from "react";



 function App  ()  {
  
  const [taskList, setTaskList] = useState([]);
  const [taskType, setTaskType] = useState(0);

  return (

    <>
    <TaskContext.Provider value={{taskList,setTaskList}}>
      <TaskIDContext.Provider value={{taskType, setTaskType}}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="add-task" element={<AddTaskPage />} />
        <Route path="task" element={<Task />} />
      </Routes>
      </TaskIDContext.Provider>
    </TaskContext.Provider>
  
    </>
  );
}

export default App;
