const errorHandler = (error, req, res, next) => {
    // console.log(error);
  
    let message = "Internal server error";
    let status = 500;
  
    if (error.name === "SequelizeValidationError") {
      message = error.errors[0].message;
      status = 400;
    }
  
    if (error.name == "SequelizeUniqueConstraintError") {
      status = 400;
      message = error.errors[0].message;
    }
  
    if (error.name === "SequelizeDatabaseError" || error.name === "SequelizeForeignKeyConstraintError") {
      message = "Invalid data input";
      status = 400;
    }
  
    if (error.name === "ValidationError") {
      message = "Image Required";
      status = 400;
    }
  
    if (error.name === "BadRequest") {
      message = "Please input email or password";
      status = 400;
    }
  
    if (error.name === "BadRequestImage") {
      message = "Image is required";
      status = 400;
    }
  
    if (error.name === "LoginError") {
      message = "Invalid email or password";
      status = 401;
    }
  
    if (error.name == "Unauthorized" || error.name == "JsonWebTokenError") {
      message = "Please login first";
      status = 401;
    }
  
    if (error.name == "Forbidden") {
      message = "You dont have any access";
      status = 403;
    }
  
    if (error.name === "NotFound") {
      message = "Data not found!";
      status = 404;
    }
  
    res.status(status).json({
      message,
    });
  };
  
  module.exports = errorHandler;
  