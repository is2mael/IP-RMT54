function errorHandler(err, req, res, next) {
  console.log(err, "<<<<<< errror handler");

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      return;
    case "Bad Request":
      res.status(400).json({ message: err.message });
      return;
    case "Unauthorized":
      res.status(401).json({ message: err.message });
      return;
    case "Not Found":
      res.status(404).json({ message: err.message });
      return;
    case "Forbidden":
      res.status(403).json({ message: err.message });
      return;
    case "JasonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      return;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
}

module.exports = errorHandler;
