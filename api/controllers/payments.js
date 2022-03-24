const paypal = require("paypal-rest-sdk");
const Payment = require("../models/payments");

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

exports.PaymentController = {
  makePayment: async (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const query = req.query;

    if (query.method === "paypal") {
      if (query.state == 1) {
        try {
          await createPaypalPayment(body, params, res);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Payment failed",
            error: error.message,
          });
        }
      } else if (query.state == 2) {
        try {
          await makePaypalPayment(body, query, res);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Payment failed",
            error: error.message,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "invalid state",
          error: null,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "method not found",
        error: null,
      });
    }
  },
};

const createPaypalPayment = async (body, params, res) => {
  let { product_items, total } = body;

  const transaction_item = product_items.map((item, id) => {
    console.log(item, parseInt(total).toFixed(2));
    return {
      name: item.name,
      sku: item.quantity,
      price: parseInt(item.price).toFixed(2),
      currency: "USD",
      quantity: parseInt(item.quantity),
    };
  });
  console.log(transaction_item);

  const payment_payload = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.CLIENT_URL}/pay/success`,
      cancel_url: `${process.env.CLIENT_URL}/pay/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: transaction_item,
        },
        amount: {
          currency: "USD",
          // total in two decimal places
          total: parseInt(total).toFixed(2),
        },
        description: "order summary",
      },
    ],
  };

  paypal.payment.create(payment_payload, function (err, payment) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "Payment not successful",
        success: false,
        error: err.response.details,
      });
    }
    console.log(payment);
    for (let i = 0; i < payment.links.length; i++) {
      if (payment.links[i].rel === "approval_url") {
        // res.redirect(payment.links[i].href);

        return res.status(200).json({
          success: true,
          message: "Payment initiated",
          data: { redirect_url: payment.links[i].href },
        });
      }
    }
  });
};

const makePaypalPayment = async (body, query, res) => {
  let { orderId, userId, total } = body;

  const { PayerID, paymentId } = query;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total.toFixed(2),
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async (err, payment) => {
      if (err) {
        Logger.debug(err);
        return res.status(400).json({
          success: false,
          message: "Payment not successful",
          error: err.message,
        });
      }
      try {
        console.log(payment);
        const paymentData = {
          userId,
          orderId,
          payment_id: paymentId,
          payer_id: PayerID,
        };

        const payments = new Payment(paymentData);

        return res.status(201).json({
          success: true,
          message: "Payment successful",
          data: payments,
        });
      } catch (error) {
        Logger.debug(err || error);
        return res.status(400).json({
          success: false,
          message: "Payment not successful",
          error: error.message,
        });
      }
    }
  );
};
