const db = require("../database/models");
const Users = db.User

  userLoggedMiddleware = async (req, res, next) => {
  res.locals.isLogged = false;
  let userFromCookie;

  let emailInCookie = req.cookies.userEmail;

  userFromCookie = await Users.findOne({
    where: { id: {emailInCookie} },
  });
  
  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  };
  next();
}

module.exports = userLoggedMiddleware;
