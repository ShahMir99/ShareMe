import React from "react";
import "./UserComment.css";
import moment from "moment";
import defaultDp from "../../image/defaultDp.png";
import { MdVerified } from "react-icons/md";

const UserComment = ({ comments }) => {

  return (
    <div className="UserComment">
      <div className="image">
        <img
          src={comments.user?.profile.url ? comments.user.profile.url : defaultDp}
          alt="user "
        />
      </div>
      <div className="comment_content_div">
        <div className="comment_userInfo">
          <h4>{comments.user?.name}&nbsp;{comments.user?.isverify ? <MdVerified style={{color : '#3575c9', fontSize : '15px'}}/> : ""}</h4>
          <span>{moment(comments.commentedAt).fromNow()}</span>
        </div>
        <div className="commentContent">
          <p>{comments.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
