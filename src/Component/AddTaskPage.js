import React, { useContext } from "react";
import "../Component/addTaskPage.css";
import { Formik } from "formik";
import {
  ArrowBack,
  AttachFile,
  AttachmentRounded,
  AttachmentSharp,
  AttachmentTwoTone,
  Camera,
  CameraAlt,
  CameraAltOutlined,
  KeyboardVoice,
  KeyboardVoiceSharp,
  PhotoAlbum,
  PhotoAlbumOutlined,
  PhotoOutlined,
  PhotoSharp,
  RecordVoiceOver,
  VideoCall,
  VideoCallSharp,
  VoiceChat,
  VoiceChatOutlined,
  VoiceChatSharp,
  VoiceOverOff,
} from "@material-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskContext from "../Context/Tasks/TaskContext";

function AddTaskPage() {
  const { taskList } = useContext(TaskContext);
  const { setTaskList } = useContext(TaskContext);

  // Stats & Variable

  const navigate = useNavigate();
  // Functions
  const handleSubmitform = (e, values, resetForm) => {
    console.log(values)
    e.preventDefault();
    setTaskList([...taskList, { ...values, key: values.tasktype }]);
    resetForm();
  };

  // console.log(taskList);

  const backTask = () => {
    // console.log('1');
    navigate("/");
  };

  // Render Data

  return (
    <div className="addtask">
      <span className="header">
        <button onClick={backTask}>
          <ArrowBack></ArrowBack>
        </button>
        {/* <span className="addtaskback">{`<--`}</span> */}
        <span className="heading">Add New Task</span>
      </span>
      <div className="container">
        <Formik
          initialValues={{ id:taskList.length + 1,  tasktype: "", taskinput: "", date: "", completed: false, priority: false , expanded: false }}
          // validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setSubmitting }) => {
            // console.log(values);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            resetForm,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="formclass">
              <select
                name="tasktype"
                id="tasktype"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tasktype}>
                <option>Please select Task Type</option>
                <option>Personal Errands</option>
                <option>Work Project</option>
                <option>Grocery List</option>
                <option>School</option>
              </select>
              <input
                type="text"
                name="taskinput"
                id="taskinput"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.taskinput}
                placeholder=" Task Input"></input>

              <input
                id="date"
                name="date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
              />

              <div className="addTaskIcons">
                <p className="addTaskIC">
                  <CameraAltOutlined />
                </p>
                <p className="addTaskIC">
                  <PhotoOutlined />
                </p>
                <p className="addTaskIC">
                  <VoiceChatOutlined />
                </p>
                <p className="addTaskIC">
                  <AttachmentRounded />
                </p>
                <p className="addTaskIC">
                  <KeyboardVoiceSharp />
                </p>
              </div>

              <div className="AddButton">
                <button
                  className="addBtn"
                  onClick={(e) => {
                    handleSubmitform(e, values, resetForm);
                  }}>
                  ADD TASK
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddTaskPage;
