import { useContext, useRef, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Share = () => {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      console.log(fileName);
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(file);

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {

    }
  }


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg"
            src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
            alt=""
          />
          <input type="text" className="shareInput" placeholder={"What's in your mind " + user.username + "?"} ref={desc} />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="postImg" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptiontext">Photo/Video</span>
              <input type="file" id="postImg" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }} />
            </label>
            <div className="shareOption">
              <Label htmlColor="green" className="shareIcon" />
              <span className="shareOptiontext">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="blue" className="shareIcon" />
              <span className="shareOptiontext">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
