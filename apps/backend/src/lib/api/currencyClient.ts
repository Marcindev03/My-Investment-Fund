import axios from "axios";

export const currencyClient = axios.create({
  baseURL: "https://currency-converter5.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.CURRENCY_CONVERTER_API_KEY,
    "X-RapidAPI-Host": process.env.CURRENCY_CONVERTER_HOST,
  },
  params: { format: "JSON", to: process.env.BASE_CURRENCY_SYMBOL },
});
