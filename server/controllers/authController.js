const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const cloudinary = require("../utils/cloudinary");

class AuthController {
  static async readProfile(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const user = await User.findByPk(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async changeProfile(req, res, next) {
    try {
      console.log("masuk");

      if (!req.file) throw { name: "BadRequestImage" };

      const { id } = req.params;
      const users = await User.findByPk(id);

      if (!users) {
        throw { name: "NotFound" };
      }

      const base64Data = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const uploadResult = await cloudinary.v2.uploader.upload(base64Data, {
        public_id: `users-${id}-${Date.now()}`,
        tags: ["userss"],
        resource_type: "auto",
      });

      console.log(uploadResult, "<<<<<<<<<<<<<<<");

      const imageUrl = uploadResult.secure_url;

      await users.update({ image: imageUrl });

      res.status(200).json({
        message: "Success Update users Image",
        imageUrl,
      });
    } catch (error) {
      // console.log(error, "error di cloudinary");
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });

      res.status(201).json({
        message: "Success Register User",
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "BadRequest" };

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "LoginError" };
      }

      if (!compare(password, user.password)) throw { name: "LoginError" };

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;

      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
      });

      const gPayload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: gPayload.email,
        },
        defaults: {
          email: gPayload.email,
          password: "password_google",
        },
        hooks: false,
      });

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error, "error di google login");

      next(error);
    }
  }
}

module.exports = AuthController;
