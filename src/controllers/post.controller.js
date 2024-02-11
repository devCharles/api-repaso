// ejemplo de controlador separado
async function getAll(request, response) {
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
}

module.exports = {
  getAll,
};
