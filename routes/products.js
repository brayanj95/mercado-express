import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const [ name, lastname ] = req.headers.author.split(" ");
  const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`);
  const categories = response.data.filters.length 
    ? response.data.filters[0].values[0].path_from_root
    : []
  const items = response.data.results;

  const filteredItems = [];
  const maxItems = items.length ? 3 : 0
  for (let i = 0 ; i <= maxItems ; i++) {
    const item = items[i];
    filteredItems.push({
      "id": item.id,
      "title": item.title,
      "price": {
        "currency": item.prices.presentation.display_currency,
        "amount": item.price,
        "decimals": String(item.price).split(".")[1] 
          ? String(item.price).split(".")[1].length
          : 0
      },
      "picture": item.thumbnail,
      "condition": item.condition,
      "free_shipping": item.shipping.free_shipping,
      "address": `${item.address.state_name}`
    })
  }

  const filteredProducts = {
    author: {
      name,
      lastname,
    },
    categories: categories.map((categorie) => categorie.name),
    items: filteredItems
  }
  res.json(filteredProducts);
});

export default router;