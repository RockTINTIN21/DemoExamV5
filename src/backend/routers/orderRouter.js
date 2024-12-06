
import express from 'express'
import {findByParamOrderController,addOrderController,editOrderController, getOrdersController,getStatisticsController } from '../controllers/orderController.js';
const app = express.Router()
app.use(express.json())
app.post('/addOrder',addOrderController)
app.get('/getOrders/',getOrdersController)
app.put('/editOrder',editOrderController)
app.get('/getStatistics',getStatisticsController)
app.get('/findByParamOrder/:option',findByParamOrderController)
export default app;