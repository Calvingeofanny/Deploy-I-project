const authorization = async (req, res, next) => {
    try {
      const { role } = req.loginInfo;
  
      if (role === "user") {
        throw { name: "Forbidden" };
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = authorization;
  