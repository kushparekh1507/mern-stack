import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';

const Feed = ({ username }) => {
  const [post, setPost] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || user.username === username) && <Share />}
        {post.map(po => {
          return <Post key={po._id} post={po} />
        })}
      </div>
    </div>
  )
}

export default Feed
