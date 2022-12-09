import React, { useEffect, useState } from "react";
import "./Comments.css";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SinglePostAction } from "../../Actions/PostsAction";
import { submitComment } from "../../Actions/PostsAction";
import UserComment from "../../Components/UserComment/UserComment";
import CommentPreLoader from "../../Components/CommentPreLoader/CommentPreLoader";

const Comments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Params = useParams();

  const { user } = useSelector((state) => state.auth.authData);
  const { Comments } = useSelector((state) => state.singlePost.Post);
  const { Loading } = useSelector((state) => state.singlePost);

  const [commentVal, setComment] = useState(null);

  useEffect(() => {
    dispatch(SinglePostAction(Params.id));
  }, [dispatch, Params.id]);

  const submitCom = () => {
    dispatch(submitComment(Params.id, commentVal, user._id));
    setComment("");
  };

  return (
    <>
      <div className="Post_comment_div">
        <div className="Comments_backspace">
          <MdKeyboardBackspace onClick={() => navigate(-1)} />
          <h4>Comments</h4>
        </div>

        {Loading ? (
          <CommentPreLoader />
        ) : (
          <>
            {Comments &&
              Comments.map((comments) => {
                return (
                  <div className="comment_body">
                    <UserComment comments={comments} />
                  </div>
                );
              })}

            <div className="write_comment">
              <input
                type="text"
                name="comment"
                value={commentVal}
                placeholder="Add a comment..."
                onChange={(e) => setComment(e.target.value)}
                autoComplete="off"
              />
              <button
                onClick={submitCom}
                disabled={commentVal ? "" : "disabled"}
              >
                Post
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Comments;
