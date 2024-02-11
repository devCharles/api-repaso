const express = require("express");
const postUseCase = require("../usecases/post.usecase");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allPosts = await postUseCase.getAll();

    response.json({
      success: true,
      message: "All posts",
      data: {
        posts: allPosts,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/", auth, async (request, response) => {
  try {
    request.body.author = request.user._id;

    const newPost = await postUseCase.create(request.body);

    response.json({
      success: true,
      message: "Post created",
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const post = await postUseCase.getById(id);

    response.json({
      success: true,
      message: `Post: ${id}`,
      data: {
        post,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
