const { Op } = require("sequelize");
const getGroqChatCompletion = require("../helpers/groq.js");
const { Book, Category } = require("../models");

class PublicController {
  static async read(req, res, next) {
    try {
      const testBook = await Book.findAll();

      const { search } = req.query;

      let queryOption = {
        include: Category,
      };

      //SEARCH
      // endpoint?search=keyword
      if (search !== " " && typeof search !== "undefined") {
        queryOption.where = {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const books = await Book.findAll(queryOption);

      res.status(200).json({
        message: "Success Read Books",
        books,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async readByCategory(req, res, next) {
    try {
      const { CategoryId } = req.params;

      const CategoryBook = await Book.findAll({
        where: {
          CategoryId,
        },
      });

      if (!CategoryBook || CategoryBook.length === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json(CategoryBook);
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

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  // static async generateAI(req, res, next) {
  //   try {
  //     const prompt = `Give me the 6 most popular games PC and Mobile right now. Response must be a format JSON like this
  //     [
  //       {
  //         title: ....,
  //         developer: ....,
  //         image: image url active,
  //         category: PC or Mobile choose one,
  //       }
  //     ]
  //     . Create without \`\`\` json and \`\`\``;

  //     const result = await gemini(prompt);

  //     console.log(result, "Result gemini");

  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log(error, "ERROR GEMINI <<<<<<<<<");

  //     next(error);
  //   }
  // }

  static generateGroqContent = async (req, res, next) => {
    try {
      const prompt = `Give me the 6 most popular books with category Fiction and Non-Fiction right now. Response must be a format JSON like this. 
      //     [
      //       {
      //         "title": ....,
      //         "author": ....,
      //         "image": using picsum only,
      //         "category": Fiction and Non-Fiction choose one,
      //       }
      //     ]
      //     . Create without \`\`\` json and \`\`\``;

      const chatCompletion = await getGroqChatCompletion(prompt);
      const response = chatCompletion.choices[0]?.message?.content || "";
      const parsedResponse = JSON.parse(response);

      return res.status(200).json(parsedResponse);
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  };
}

module.exports = PublicController;
