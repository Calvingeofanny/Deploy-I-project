const { Book } = require("../models");
const cloudinary = require("../utils/cloudinary");

class BookController {
  static async create(req, res, next) {
    try {
      const { title, developer, image, CategoryId } = req.body;
      const book = await Book.create({ title, author:developer, image, CategoryId });
      res.status(201).json({ message: "Success Create Book", book });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const books = await Book.findAll({
        include: "Category",
      });

      res.status(200).json({
        message: "Success Read Books",
        books,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readOne(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        throw { name: "NotFound" };
      }

      res.status(200).json({
        message: "Success Read Book",
        book,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, developer, image, CategoryId } = req.body;

      const book = await Book.findByPk(id);

      if (!book) {
        throw { name: "NotFound" };
      }

      await book.update({ title, developer, image, CategoryId });

      res.status(200).json({
        message: "Success Update Book",
        book,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const book = await Book.findByPk(id);

      if (!book) {
        throw { name: "NotFound" };
      }

      book.destroy();

      res.status(200).json({
        message: "Success Delete Book",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateImage(req, res, next) {
    try {
      if (!req.file) throw { name: "BadRequestImage" };

      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        throw { name: "NotFound" };
      }

      const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        public_id: `book-${id}-${Date.now()}`,
        tags: ["books"],
        resource_type: "auto",
      });

      console.log(uploadResult, "uploadResult");

      const imageUrl = uploadResult.secure_url;

      console.log(imageUrl, "imageurl");

      await book.update({ image: imageUrl });

      res.status(200).json({
        message: "Success Update Book Image",
        imageUrl,
        book,
      });
    } catch (error) {
      console.log(error, "error on cloudinary");
      next(error);
    }
  }
}

module.exports = BookController;
