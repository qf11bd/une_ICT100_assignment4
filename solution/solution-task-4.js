/*
TODO: Task 4 => complete the following function attendCustomerRequest.

The function takes two input arguments: the location of the customer 
requiring attention, and their name.
This function will move a robot to the customer's seat, make it
retrieving the customer's request, parse it, and handle it. The
request can be either a food request for which a new order must be made
or a bill request, for which the robot has to provide the correct
bill amount.

The function should return true if successful,
or false otherwise.
*/

async function attendCustomerRequest(customerLocation, customerName){
    gameController.log(billTotal['table-1-1'])
    gameController.log(`Calling attendCustomerRequest('${customerLocation}', '${customerName}')`);
    if (gameController.canAcquireRobot('green')) {
        safeTeleportTo('green', customerLocation)
        await gameController.sleep(10000);
        let order = await gameController.attendCustomerRequest('green')
        
        if (order.includes("bill") || order.includes("total") || order.includes("pay") || order.includes("cheque") || order.includes("check")) {
            gameController.billCustomer('green', billTotal[customerLocation])
            console.log(billTotal[customerLocation])
        } else {
            let orderArray = order.split(" ")
            let menuArray = gameController.getMenuList()
            const foodOrder = orderArray.filter(element => menuArray.includes(element))
            gameController.newOrder(customerName, foodOrder)
        }
        // console.log(orderArray)
        // console.log(gameController.getMenuList())

    } else if (gameController.canAcquireRobot('yellow')) {

    } else if (gameController.canAcquireRobot('purple')) {

    } else {
        await gameController.sleep(10000);
        attendCustomerRequest(customerLocation, customerName)
    }
    await gameController.sleep(5000);
}