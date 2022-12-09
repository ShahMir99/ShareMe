import React, { useState } from "react";
import "./post.css";
import { BsSuitHeart } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { BsSuitHeartFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import defaultDp from "../../../image/defaultDp.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { LikePost, DeletePost } from "../../../Actions/PostsAction";

const Post = ({ data }) => {
  const disptach = useDispatch();

  const { user } = useSelector((state) => state.auth.authData);
  const [Liked, SetIsLiked] = useState(data.likeCounts.includes(user._id));
  const [likepost, Setlikepost] = useState(data.likeCounts.length);
  const [toggle, setToggle] = useState(false);

  const handleLikes = () => {
    disptach(LikePost(user._id, data._id));
    SetIsLiked((preVal) => !preVal);
    Liked
      ? Setlikepost((preVal) => preVal - 1)
      : Setlikepost((preVal) => preVal + 1);
  };

  const deletePost = (id) => {
    const conf = window.confirm("Are you Sure to Delete This Post");
    if (conf) {
      disptach(DeletePost(id));
    } else {
      return;
    }
  };

  const toggleBtn = () => {
    setToggle((preval) => !preval);
  };

  return (
    <>
      <div className="post">
        <div className="top__region">
          <div className="avatar">
            <img
              src={data.user?.profile ? data.user.profile.url : defaultDp}
              alt=""
            />
            <div className="name_time">
              <div className="Post__heading__verifying">
                <NavLink to={`/profile/${data.user?._id}`}>
                  <h6>{data.user?.name}</h6>
                </NavLink>
                {data.user?.isverify ? <MdVerified /> : ""}
              </div>
              <span>{moment(data.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="timeStamp">
            {data.user?._id === user._id || user.isverify ? (
              <>
                <HiOutlineDotsHorizontal onClick={toggleBtn} />
                <span
                  className="delete_post"
                  onClick={() => deletePost(data._id)}
                  style={{ visibility: toggle ? "" : "hidden" }}
                >
                  Delete
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="postimage">
          {data.postImages?.imageUrl && (
            <img src={data.postImages?.imageUrl} alt="" />
          )}

          <div className="like__comments">
            <div className="likes" onClick={handleLikes}>
              {Liked ? (
                <BsSuitHeartFill />
              ) : (
                <BsSuitHeart style={{ color: "black" }} />
              )}
            </div>

            <div className="comment">
              <NavLink to={`/post/${data._id}/comments`}>
                <GoComment />
              </NavLink>
            </div>
          </div>

          <div className="like_comments_count">
            <h6>
              {likepost} {likepost <= 1 ? "Like" : "Likes"}
            </h6>
          </div>
          
            {data.postContent && (
          <p>
              <p style={{ fontSize: "15px", paddingTop: "0" }}>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  {data.user?.name}{" "}
                </span>{" "}
                {data.postContent}
              </p>
          </p>
            )}
        </div>

        <div className="like_comments_count">
          <NavLink to={`/post/${data._id}/comments`}>
            <p>{`View all ${
              data.Comments && data.Comments.length
            } comments`}</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Post;
