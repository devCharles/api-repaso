const express = require("express");
const userUseCase = require("../usecases/user.usecase");
const createError = require("http-errors");

const router = express.Router();

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await userUseCase.getById(id);

    if (!user) {
      throw createError(404, "User not found");
    }

    response.json({
      success: true,
      message: `User: ${id}`,
      data: { user },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/signup", async (request, response) => {
  try {
    const user = await userUseCase.signUp(request.body);

    response.json({
      success: true,
      message: "User created",
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/signin", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await userUseCase.signIn(email, password);

    response.json({
      success: true,
      message: "Logged in",
      data: { token },
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
