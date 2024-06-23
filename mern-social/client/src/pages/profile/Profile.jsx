import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
import axios from "axios";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`); //`/users?userId=${post.userId}`
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUser();
  }, [username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
