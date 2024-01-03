const allowedEndpoints = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password-check-email",
  "/reset-password-check-answers",
];
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log(req.path);
  console.log(req.cookies.token);
  if (allowedEndpoints.includes(req.path)) {
    console.log(`Skipping authentication for ${req.path}`);
    next();
  } else {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).send({ message: "Invalid session, please login" });
    }
    try {
      const decodedToken = jwt.verify(token, "secret-key");
      console.log(decodedToken);
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(403).send({ message: "Invalid session, please login" });
    }
  }
};

export default authMiddleware;
