import express from 'express'
import orderRouter from './routers/orderRouter.js'
import cors from 'cors'
const app = express();
app.use(cors())
app.use('/api/',orderRouter)
app.listen(3000,()=>{
    console.log('Server started on 3000')
})