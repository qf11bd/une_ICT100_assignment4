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

// Function for attending customer request, if else main statements to allow for robots being  busy
// Checks string for 'bill' key words, and processes bill request based on totals for that seat location
// Food ordering turns the request string into an array, and compares it for similarities against the menu
// Robot is moved back home and released after completing the function

async function attendCustomerRequest(customerLocation, customerName){
    gameController.log(`Calling attendCustomerRequest('${customerLocation}', '${customerName}')`);
    if (gameController.canAcquireRobot('green')) {
        let token;
        try{
            token = await gameController.acquireRobot('green', true);
            safeTeleportTo('green', customerLocation)
            await gameController.sleep(10000);
            let order = await gameController.attendCustomerRequest('green')
            
            if (order.includes("bill") || order.includes("total") || order.includes("pay") || order.includes("cheque") || order.includes("check")) {
                gameController.billCustomer('green', billTotal[customerLocation])
                await gameController.sleep(7000);
            } else {
                let orderArray = order.split(" ")
                let menuArray = gameController.getMenuList()
                const foodOrder = orderArray.filter(element => menuArray.includes(element))
                gameController.newOrder(customerName, foodOrder)
                await gameController.sleep(5000);
            }
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            gameController.teleportRobotAtHome('green')
            await gameController.sleep(2000)
            gameController.releaseRobot('green', token);
        }
    } else if (gameController.canAcquireRobot('yellow')) {
        let token;
        try{
            token = await gameController.acquireRobot('yellow', true);
            safeTeleportTo('yellow', customerLocation)
            await gameController.sleep(10000);
            let order = await gameController.attendCustomerRequest('yellow')
            
            if (order.includes("bill") || order.includes("total") || order.includes("pay") || order.includes("cheque") || order.includes("check")) {
                gameController.billCustomer('yellow', billTotal[customerLocation])
                await gameController.sleep(7000);
            } else {
                let orderArray = order.split(" ")
                let menuArray = gameController.getMenuList()
                const foodOrder = orderArray.filter(element => menuArray.includes(element))
                gameController.newOrder(customerName, foodOrder)
                await gameController.sleep(5000);
            }
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            gameController.teleportRobotAtHome('yellow')
            await gameController.sleep(2000)
            gameController.releaseRobot('yellow', token);
        }
    } else if (gameController.canAcquireRobot('purple')) {
        let token;
        try{
            token = await gameController.acquireRobot('purple', true);
            safeTeleportTo('purple', customerLocation)
            await gameController.sleep(10000);
            let order = await gameController.attendCustomerRequest('purple')
            
            if (order.includes("bill") || order.includes("total") || order.includes("pay") || order.includes("cheque") || order.includes("check")) {
                gameController.billCustomer('purple', billTotal[customerLocation])
                await gameController.sleep(7000);
            } else {
                let orderArray = order.split(" ")
                let menuArray = gameController.getMenuList()
                const foodOrder = orderArray.filter(element => menuArray.includes(element))
                gameController.newOrder(customerName, foodOrder)
                await gameController.sleep(5000);
            }
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            gameController.teleportRobotAtHome('purple')
            await gameController.sleep(2000)
            gameController.releaseRobot('purple', token);
        }
    } else {
        await gameController.sleep(10000);
        attendCustomerRequest(customerLocation, customerName)
    }
    await gameController.sleep(5000);
}