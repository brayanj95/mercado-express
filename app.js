import express from 'express';
import cors from 'cors'
import productsRoutes from './routes/products.js';
import descriptionProductsRoutes from './routes/descriptionProduct.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST"
  };
  
app.use(cors(corsOptions));

app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/product', descriptionProductsRoutes);

app.listen(3000, () => console.log("Server started http://localhost:3000"));