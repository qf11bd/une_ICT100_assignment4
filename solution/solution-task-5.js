
/*
TODO: Task 5 => complete the following function deliverFood.

The function takes two input arguments: the name of the food
to collect and the location where to serve the collected food. 
This function will move a robot to kitchen, make it
retrieving the food, and move to the correct customer's location
to serve the food.

Remember to clean the table before serving a new meal!

The function should return true if successful,
or false otherwise.
*/

// Function for delivering food, if else main statements to allow for robot being busy
// Robot first checks if the seat is clean, and if the robot can grab food
// If seat isn't clean, robot cleans before teleporting to the kitchen to grab the food
// After serving the food, the total of that food is added to tbe bill total for that seat

async function deliverFood(foodName, customerLocation){
    gameController.log(`Calling attendCustomerRequest('${customerLocation}', '${foodName}')`);
    if (gameController.canAcquireRobot('green')) {
        let token;
        try{
            let clean = await gameController.isSeatClean(customerLocation)
            let grabFood = await gameController.canRobotGrabFood('green')
            if ((clean !== false) && (grabFood !== false)) {
                token = await gameController.acquireRobot('green', true);
                safeTeleportTo('green', 'kitchen')
                await gameController.sleep(10000);
                gameController.takeFood('green')
                await gameController.sleep(3000);
                safeTeleportTo('green', customerLocation)
                await gameController.sleep(10000);
                gameController.serveFood('green')
                await gameController.sleep(7000);
            } else if (grabFood !== false) {
                token = await gameController.acquireRobot('green', true);
                safeTeleportTo('green', customerLocation)
                await gameController.sleep(10000);
                gameController.cleanSeat('green')
                await gameController.sleep(5000);
                safeTeleportTo('green', 'kitchen')
                await gameController.sleep(10000);
                gameController.takeFood('green', foodName)
                await gameController.sleep(3000);
                safeTeleportTo('green', customerLocation)
                await gameController.sleep(10000);
                gameController.serveFood('green')
                await gameController.sleep(7000);
            } else {
                await gameController.sleep(10000)
                deliverFood(foodName, customerLocation)
            }
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            foodPrice = gameController.getFoodPrice(foodName)
            billTotal[customerLocation] = billTotal[customerLocation] + foodPrice
            console.log(billTotal[customerLocation])
            gameController.teleportRobotAtHome('green')
            await gameController.sleep(2000)
            gameController.releaseRobot('green', token);
        }
    } else if (gameController.canAcquireRobot('yellow')) {
        let token;
        try{
            let clean = await gameController.isSeatClean(customerLocation)
            let grabFood = await gameController.canRobotGrabFood('yellow')
            if ((clean !== false) && (grabFood !== false)) {
                token = await gameController.acquireRobot('yellow', true);
                safeTeleportTo('yellow', 'kitchen')
                await gameController.sleep(10000);
                gameController.takeFood('yellow')
                await gameController.sleep(3000);
                safeTeleportTo('yellow', customerLocation)
                await gameController.sleep(10000);
                gameController.serveFood('yellow')
                await gameController.sleep(7000);
            } else if (grabFood !== false) {
                token = await gameController.acquireRobot('yellow', true);
                safeTeleportTo('yellow', customerLocation)
                await gameController.sleep(10000);
                gameController.cleanSeat('yellow')
                await gameController.sleep(5000);
                safeTeleportTo('yellow', 'kitchen')
                await gameController.sleep(10000);
                gameController.takeFood('yellow', foodName)
                await gameController.sleep(3000);
                safeTeleportTo('yellow', customerLocation)
                await gameController.sleep(10000);
                gameController.serveFood('yellow')
                await gameController.sleep(7000);
            } else {
                await gameController.sleep(10000)
                deliverFood(foodName, customerLocation)
            }
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            foodPrice = gameController.getFoodPrice(foodName)
            billTotal[customerLocation] = billTotal[customerLocation] + foodPrice
            console.log(billTotal[customerLocation])
            gameController.teleportRobotAtHome('yellow')
            await gameController.sleep(2000)
            gameController.releaseRobot('yellow', token);
        }
    } else if (gameController.canAcquireRobot('purple')) {
        let token;
        try{
            let clean = await gameController.isSeatClean(customerLocation)
            let grabFood = await gameController.canRobotGrabFood('purple')
            if ((clean !== false) && (grabFood !== false)) {
                token = await gameController.acquireRobot('purple', true);
                safeTeleportTo('purple', 'kitchen')
                await gameController.sleep(10000);
                gameController.takeFood('purple')
                await gameController.sleep(3000);
                safeTeleportTo('purple', customerLocation)
                await gameController.sleep(10000);
                gameController.serveFood('purple')
                await gameController.sleep(7000);
            } else if (grabFood !== false) {
                token = await gameController.acquireRobot('purple', true);
                safeTeleportTo('purple', customerLocation)
                await gameController.sleep(10000);
                gameController.cleanSeat('purple')
                await gameController.sleep(5000);
                safeTeleportTo('purple', 'kitchen')
                await gameController.sleep(10000);
                gameController.takeFood('purple', foodName)
                await gameController.sleep(3000);
                safeTeleportTo('purple', customerLocation)
                await gameController.sleep(10000);
                gameController.serveFood('purple')
                await gameController.sleep(7000);
            } else {
                await gameController.sleep(10000)
                deliverFood(foodName, customerLocation)
            }
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            foodPrice = gameController.getFoodPrice(foodName)
            billTotal[customerLocation] = billTotal[customerLocation] + foodPrice
            console.log(billTotal[customerLocation])
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