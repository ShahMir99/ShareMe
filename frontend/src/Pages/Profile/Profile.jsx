import React , {useEffect} from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Profile.css";
import bg from "../../image/bg.png";
import defaultDp from "../../image/defaultDp.png";
import PreLoader from "../../Components/PreLoader/PreLoader";
import NaN from "../../image/NaN.png";
import { CiSettings } from "react-icons/ci";
import { FaPinterestP } from "react-icons/fa";
import { SlSocialInstagram , SlSocialFacebook} from "react-icons/sl";
import Posts from "../../Components/Posts/Posts";
import { MdVerified } from "react-icons/md";
import { NavLink , useParams  , useNavigate} from "react-router-dom";
import { getProfile } from "../../Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../Actions/userAction";
import { PostAction } from "../../Actions/PostsAction";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Params = useParams();

  const { user} = useSelector((state) => state.auth.authData);
  const {authLoading } = useSelector((state) => state.auth);
  const { Profile, Loading } = useSelector((state) => state.UserProfile);
  const { Post } = useSelector((state) => state.Posts);


  useEffect(() => {
    dispatch(getProfile(Params.id));
  }, [dispatch, Params.id , user ]);

  
  const SpecificPosts = Post?.filter((data) => data.user?._id === Params.id)
  
  const followFun = (id , data) => {
    if(Profile.followers.includes(user._id)){
      dispatch(unfollowUser(id , data))
      window.location.reload()
      

    }
    else{
      dispatch(followUser(id , data));
      window.location.reload()
    }
  };

  return (
    <>
      {Loading || authLoading ? (
        <PreLoader />
      ) : (
        <div className="Profile">
          <Navbar />
          <div className="profile_header">
            <img src={Profile.cover?.url ? Profile.cover.url : bg} alt="backGround" width="100%" />

            {Profile._id === user._id ? (
              <div className="btn_setting">
                <NavLink to={`/profile/${Profile._id}/updateprofile`}>
                  <CiSettings />
                </NavLink>
              </div>
            ) : (
              <div className="btn_setting">
                <button onClick={() => followFun(Profile._id , user._id)}>{Profile.followers && Profile.followers?.includes(user._id) ? "Unfollow" : "Follow"}</button>
              </div>
            )}
            <div className="profile__pic">
              <img
                src={Profile.profile ? Profile.profile.url : defaultDp} alt="profile"/>
              <div className="name">
                <div className="heading__verifying">
                  <h3>{Profile.name}</h3>
                  {Profile.isverify ? <MdVerified /> : ""}
                </div>
                <p>{Profile.about}</p>
              </div>
              <div className="follow_following_main">
                <div className="followers follow">
                  <span>{Profile.following?.length}</span>
                  <span>Following</span>
                </div>
                <div className="followings follow">
                  <span>{Profile.followers?.length}</span>
                  <span>Followers</span>
                </div>
              </div>

              <div className="social_icons">
                <FaPinterestP />
                <span></span>
                <SlSocialInstagram />
                <span></span>
                <SlSocialFacebook />
              </div>

              <div className="post_count_box">
                <div>{Post && Post.filter((post) => post.user?._id === Params.id).length} Posts</div>
                <div>0 Collections</div>
              </div>
            </div>
          </div>
          {SpecificPosts.length > 0 ? (
            <Posts posts={SpecificPosts} profile={true}/>
          ) : (
            <div className="post_not_present">
              <img src={NaN} alt="No Post Available" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
