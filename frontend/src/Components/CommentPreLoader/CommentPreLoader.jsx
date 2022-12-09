import React from "react";
import "./CommentPreLoader.css";

const CommentPreLoader = () => {
  return (
    <>
      <div className="comment_loader">
        <div className="image_load"></div>
        <div className="content_load">
          <div className="name_loader"></div>
          <div className="content_loader"></div>
        </div>
      </div>
      <div className="comment_loader">
        <div className="image_load"></div>
        <div className="content_load">
          <div className="name_loader"></div>
          <div className="content_loader"></div>
        </div>
      </div>
      <div className="comment_loader">
        <div className="image_load"></div>
        <div className="content_load">
          <div className="name_loader"></div>
          <div className="content_loader"></div>
        </div>
      </div>
    </>
  );
};

export default CommentPreLoader;
