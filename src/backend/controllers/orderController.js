import { OrderRepository } from "../repositories/orderRepository.js"

export const addOrderController = (req,res)=>{
    try{
        OrderRepository.addOrder(req.body)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}
export const getOrdersController = (req,res)=>{
    try{
        res.status(200).send(OrderRepository.getOrders)
    }catch(e){
        res.status(400).send(e)
    }
}
export const editOrderController = (req, res) => {
    try{
        if(req.body.numberOfOrder === null || req.body.numberOfOrder === undefined) {
            throw new Error('Поле номера заказа не указано.')
        }
        OrderRepository.editOrder(req.body);
        res.status(200).send(`Заявка ${req.body.numberOfOrder}, успешно изменена.`);
    }catch(e){
        res.status(400).send(`Ошибка: ${e}`)
    }
}

export const findByParamOrderController = (req, res) => {
    const paramOrder = req.params.option;
    try{
        if(paramOrder === null || paramOrder === undefined) {
            throw new Error('Параметр задан неверно.')
        }
        res.status(200).send(OrderRepository.findByParams(paramOrder));
    }catch(e){
        res.status(400).send(`Ошибка: ${e}`)
    }
}

export const getStatisticsController = (req, res) => {
    try{
        res.status(200).send(OrderRepository.getStatistics());
    }catch(e){
        res.status(400).send(`Ошибка: ${e}`)
    }
}