import React , {useEffect} from "react"
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import AboutDeveloper from "./Pages/AboutDeveloper/AboutDeveloper";
import Comments from "./Pages/Comments/Comments";
import Profile from "./Pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateNew from "./Pages/CreateNew/CreateNew";
import FindFriend from "./Pages/FindFriend/FindFriend";
import { useSelector , useDispatch } from "react-redux";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import { PostAction } from "./Actions/PostsAction";
import CommentPreLoader from "./Components/CommentPreLoader/CommentPreLoader";

function App() {
  const user = useSelector((state) => state.auth.authData);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/aboutdeveloper" element={user ? <AboutDeveloper /> : <Navigate to="/auth" />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />}/>
          <Route path="/profile/:id/updateprofile" element={<UpdateProfile/>}/>
          <Route path="/new/post" element={user ? <CreateNew /> : <Navigate to="/auth" />}/>
          <Route path="/find/friend" element={user ? <FindFriend /> : <Navigate to="/auth" />}/>
          <Route path="/post/:id/comments" element={user ? <Comments /> : <Navigate to="/auth" />}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>
      <div className="FullWidth">
        This App is Only For Andriod Version Not For PC
      </div>
    </>
  );
}

export default App;
