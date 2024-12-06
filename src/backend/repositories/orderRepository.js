const ordersRepository = [
    {
        numberOfOrder: 0,
        dateOfAdd: '2024-12-04',
        type: 'qwe',
        model: 'qwe',
        errorDescription: 'qwe',
        fullName: 'qwe',
        phoneNumber: 'qwe',
        status: 'Новая заявка',
        master:'test',
        progress:'В процессе ремонта'
    }
];
let averageLiveTime = 0;
let rateTypeError = {};
export class OrderRepository{
    static getOrders = () =>{
        return(ordersRepository)
    }
    static addOrder = (order) => {
        const requiredFields = ['numberOfOrder','dateOfAdd','model','fullName','type','phoneNumber','status'];
        console.log('order:',order)
        for(const field of requiredFields){
            if(!(field in order)){
                throw new Error(`${field} обязательно`);
            }
        }
    
        if(ordersRepository.find((elem)=>elem.numberOfOrder === Number(order.numberOfOrder))){
            console.log('qwe')
            throw new Error(`Заявка с номером, ${order.numberOfOrder} уже существует.`);
        }
        console.log('order123')
        const correctOrder = {
            ...order,
            numberOfOrder:Number(order.numberOfOrder),
            isEnded: false,
            liveTime: null,
            dateOfAdd: new Date(order.dateOfAdd),
        }
        console.log('correctOrder:',correctOrder)
        ordersRepository.push(correctOrder)
        rateTypeError[order.errorDescription] > 0 ? rateTypeError[order.errorDescription] +=1 : rateTypeError[order.errorDescription] = 1;
        console.log('cool!');
    }
    static editOrder(order) {
        const currentOrderIndex = ordersRepository.findIndex((findOrder)=> findOrder.numberOfOrder === Number(order.numberOfOrder));
        const currentOrder = ordersRepository[currentOrderIndex];
        console.log('order:',order)
        if(currentOrderIndex === -1){
            console.log('Error',order)
            throw new Error(`Заявка с номером, ${order.numberOfOrder} не найдена.`);
        }

        const updatedOrder = {
            ...currentOrder,
            ...(order.errorDescription && {progress: order.errorDescription}),
            ...(order.status && {description: order.status}),
            ...(order.master && {master: order.master}),
        };
        console.log('updatetedOrder:',updatedOrder)
        if(order.status !== currentOrder.status){
            updatedOrder.notification = true
        }
        ordersRepository[currentOrderIndex] = updatedOrder;
        if(ordersRepository[currentOrderIndex].status ==='Завершена'){
            ordersRepository[currentOrderIndex].liveTime = new Date() - (ordersRepository[currentOrderIndex].dateOfAdd) / (1000 * 60 * 60 * 24);
        }
    }

    static findByParams(option) {
        console.log(JSON.parse(option));
        const findOrder = ordersRepository.find(order => Object.keys(order).find(k => order[k] === JSON.parse(option)))
        console.log(findOrder)
        if(findOrder.length === 0){
            throw new Error(`Заявок с параметром,${option} не найдено.`)
        }
        return findOrder;
    }

    static getStatistics() {
        ordersRepository.forEach(order => {
            if(order.liveTime !== null){
                averageLiveTime += order.liveTime;
            }
        })
        const endedOrders = ordersRepository.filter((elem)=>elem.isEnded === true).length;
        const statisticsOrders = {
            ordersOfEnded: endedOrders,
            averageLiveTime: averageLiveTime / ordersRepository.length,
            rateTypeError: rateTypeError,
        }
        return statisticsOrders;
    }
}