const { Order } = require("../models");
const midtransClient = require("midtrans-client");
const { nanoid } = require("nanoid");
const axios = require("axios");

class Controller {
  static async readOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.loginInfo.userId,
        },
      });

      res.status(200).json(orders);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      // Create Snap API instance
      const price = 100000;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-zVqlSw2dgGOUiM4luk7hPfIu",
      });

      // console.log(snap, "<>>>>>>>>>");

      const orderId = `trx-buy-${nanoid()}`;

      await Order.create({
        orderId,
        userId: req.loginInfo.userId,
        amount: price,
      });

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.loginInfo.email,
        },
      };

      const { token } = await snap.createTransaction(parameter);

      // console.log(token, "token");

      res.status(200).json({
        transaction_token: token,
        orderId,
      });
    } catch (error) {
      console.log(error, "error midtrans");
      next(error);
    }
  }

  static async updateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.body;
      console.log(orderId, "kakaaa");

      const order = await Order.findOne({
        where: {
          orderId,
        },
      });

      console.log(order, "order");

      if (!order) throw { name: "NotFound" };

      // Perbaikan encoding server key
      const serverKey = "SB-Mid-server-zVqlSw2dgGOUiM4luk7hPfIu";
      const base64Key = Buffer.from(serverKey).toString("base64");

      const { data } = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Key}`,
          },
        }
      );

      console.log(data, "Response from Midtrans");

      // Perubahan logika pengecekan status
      if (
        data.transaction_status === "settlement" ||
        data.transaction_status === "capture"
      ) {
        await order.update({
          status: "paid",
          paidDate: new Date(),
        });

        res.status(200).json({
          message: "Payment success!",
        });
      } else {
        throw {
          name: "PaymentIncomplete",
          message: `Payment status: ${data.transaction_status}`,
        };
      }
    } catch (err) {
      console.log(err, "Error in updateOrderStatus");
      if (err.response) {
        console.log("Midtrans API Error:", err.response.data);
      }
      next(err);
    }
  }
}

module.exports = Controller;
