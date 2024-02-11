const jwt = require("../lib/jwt");
const userUseCase = require("../usecases/user.usecase");

async function auth(request, response, next) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    const payload = jwt.verify(token);

    const user = await userUseCase.getById(payload.user);

    if (!user) {
      throw createError(404, "User not found");
    }

    request.user = user;

    next();
  } catch (error) {
    response.status(error.status || 401);
    response.json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = auth;

// const token = localStorage.getItem('token');

// fetch('http://localhost:3000/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }, body: JSON.stringify({
//     title: 'Nuevo post',
//     content: 'Contenido del post'
//   })
// }
