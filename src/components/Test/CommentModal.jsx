// CommentModal.js
import React from "react";
import "./CommentModal.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const CommentModal = ({ onClose, videoId, refetch }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch data from the URL
    const url = `https://game-server-xi.vercel.app/comments`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const showComment = data.filter((d) => d.videoId === videoId);
        setComments(showComment);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [videoId]);

  const onSubmit = (data) => {
    const comment = data.comment;
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    const email = user?.displayName;
    const photo = user?.photoURL;

    const commentInfo = {
      formattedTime,
      comment,
      videoId,
      email,
      photo,
    };

    // Fetch for the first post method
    fetch("https://game-server-xi.vercel.app/addComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Comment added successfully");
          refetch();
          reset();
        }
      });

    // Add another fetch for a different post method
    const otherData = {
      comment: 1,
      videoId,
    };

    fetch("https://game-server-xi.vercel.app/addComment", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(otherData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // toast.success("Second post method successful");
        } else {
          toast.error("Error in the second post method");
        }
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-[#ffffff] w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold"></p>
            <button
              className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400 px-3 py-1 text-white"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div>
            <div>
              <p className="font-bold">{comments?.length} Comments</p>
              {comments.map((comment) => (
                <div>
                  <div className="flex gap-5 py-2 items-center">
                    <img
                      className="h-6 rounded-full"
                      src={comment?.photo}
                      alt=""
                    />
                    <div>
                      <p style={{ fontSize: "10px" }}>{comment?.email}</p>
                      <p className="font-bold">{comment?.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex">
                <input
                  {...register("comment")}
                  type="text"
                  placeholder="Add Comment ..."
                  name="comment"
                  className="w-full px-8 py-2 drop-shadow-xl border-2 rounded-full  border-[#54B89C] focus:outline-green-500 text-gray-900"
                />

                <button>
                  <FaAngleDoubleRight className="text-4xl " />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
