import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {

  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [postUser, setPostUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setPostUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUser();
  }, [post.userId])

  async function likeHandler() {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: user._id });
    } catch (error) {

    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${postUser.username}`}>
              <img
                src={postUser.profilePicture ? PF + postUser.profilePicture : PF + "person/noAvatar.png"}
                className="postProfileImg" alt=""
              />
            </Link>
            <span className="postUsername">{postUser.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.png`} onClick={likeHandler} className="likeIcon" alt="" />
            <img src={`${PF}heart.png`} onClick={likeHandler} className="likeIcon" alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
