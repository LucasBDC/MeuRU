const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKE || "",
});

Mercado_Pago.post("/", async (req, res) => {
  const producto = req.body;
  const desjejumScreen = req.body.desjejumScreen
  const almocoScreen = req.body.almocoScreen
  const jantarScreen = req.body.jantarScreen
  const soma = req.body.soma
  try {
    const preference = {
      items: [
        {
          title: producto.nome,
          unit_price: producto.preco,
          currency_id: "BRL",
          quantity: producto.quantidade,
        },
      ],

      back_urls: {
        success: "http://localhost:3000/success?desjejum="+desjejumScreen+"&almoco="+almocoScreen+"&jantar="+jantarScreen+"&soma="+soma,
        failure: "http://localhost:3000/venda",
      },

      auto_return: "approved",
    };

    const resposta = await mercadopago.preferences.create(preference);
    console.log(resposta);
    res.status(200).json(resposta.response.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = Mercado_Pago;
