import React from "react";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetDateTime from "./GetDateTime";

const ToastDemo = function() {
  const { notifications, clear, markAllAsRead, markAsRead } =
    useNotificationCenter();

    const showToast = () => {
      toast(`Hello World: ${GetDateTime()}`, {
        data: {
          title: "Hello World Again",
          text: "We are here again with another article",
        },
      });
    };

  const showSuccessToast = () => {
    toast.success("Yehey success", {
      data: {
        title: "Success toast",
        text: "This is a success message",
      },
    });
  };

  const showErrorToast = () => {
    toast.error("ayusin mo ung error kung hindi d ako gagana bahala ka uwu", {
      data: {
        title: "Error toast",
        text: "This is an error message",
      },
    });
  };

  return (
    <div>
      <p>{notifications.length}</p>
      <button onClick={showToast}>Default</button>
      <button onClick={showSuccessToast}>Success</button>
      <button onClick={showErrorToast}>Error</button>
      <br />
      <br />
      <button onClick={clear}>Clear Notifications</button>
      <button onClick={() => markAllAsRead()}>Mark all as read</button>
      <ul>
        {notifications.map((notification) => (
          <li
            onClick={() => markAsRead(notification.id)}
            key={notification.id}
            style={
              notification.read
                ? { background: "green", color: "silver", padding: "0 20px" }
                : {
                    border: "1px solid black",
                    background: "navy",
                    color: "#fff",
                    marginBottom: 20,
                    cursor: "pointer",
                    padding: "0 20px",
                  }
            }
          >
            <span>id: {notification.id}</span>
            <p>title: {notification.data.title}</p>
            <p>text: {notification.data.text}</p>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default ToastDemo;