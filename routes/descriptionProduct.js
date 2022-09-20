import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/description', async (req, res) => {
    const { id } = req.query;
    const [ name, lastname ] = req.headers.author.split(" ");
    const response = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    const responseDescription = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);

    const product = response.data;
    const description = responseDescription.data;

    const filteredProduct = {
        author: {
            name,
            lastname,
        },
        items: {
            "id": product.id,
            "title": product.title,
            "price": {
                "currency": product.currency_id,
                "amount": product.price,
                "decimals": String(product.price).split(".")[1] 
                    ? String(product.price).split(".")[1].length
                    : 0
                },
            "picture": product.thumbnail,
            "condition": product.condition,
            "free_shipping": product.shipping.free_shipping,
            "sold_quantity": product.sold_quantity,
            "description": description.plain_text
        }
    }

    res.json(filteredProduct);
});


export default router;