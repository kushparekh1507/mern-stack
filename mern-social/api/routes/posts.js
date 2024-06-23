const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Create a Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (e) {
    res.status(500).json(e);
  }
})

//Update a Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    }
    else {
      res.status(500).json("You can only edit your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

//Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    }
    else {
      res.status(500).json("You can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
})


//Like a Post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    }
    else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

//Get a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
})

//Get all Post of user following
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map(freiendId => {
        return Post.find({ userId: freiendId })
      })
    )
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
})

//get all post of user
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id })
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router