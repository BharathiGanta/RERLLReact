import cors from "cors";

const corsMiddleware = (req, res, next) => {
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })(req, res, next);
};

export default corsMiddleware;
