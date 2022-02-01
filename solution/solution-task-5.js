
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
    gameController.log(`Calling deliverFood('${customerLocation}', '${foodName}')`);
    if (gameController.canAcquireRobot('green')) {
        let token66;
        try{
            let clean = gameController.isSeatClean(customerLocation)
            let grabFood = await gameController.canRobotGrabFood('green')
            if ((clean !== false) && (grabFood !== false)) {
                token66 = await gameController.acquireRobot('green', true);
                await safeTeleportTo('green', 'kitchen')
                // await gameController.sleep(10000);
                await gameController.takeFood('green', foodName)
                // await gameController.sleep(3000);
                await safeTeleportTo('green', customerLocation)
                // await gameController.sleep(10000);
                await gameController.serveFood('green')
                // await gameController.sleep(7000);
            } else if (grabFood !== false) {
                token66 = await gameController.acquireRobot('green', true);
                await safeTeleportTo('green', customerLocation)
                // await gameController.sleep(10000);
                await gameController.cleanSeat('green')
                // await gameController.sleep(5000);
                await safeTeleportTo('green', 'kitchen')
                // await gameController.sleep(10000);
                await gameController.takeFood('green', foodName)
                // await gameController.sleep(3000);
                await safeTeleportTo('green', customerLocation)
                // await gameController.sleep(10000);
                await gameController.serveFood('green')
                // await gameController.sleep(7000);
            } else {
                await gameController.sleep(10000)
                deliverFood(foodName, customerLocation)
            }
        } catch(err){
            console.log('Error with acquiring deliverFood green')
        } finally {
            foodPrice = gameController.getFoodPrice(foodName)
            billTotal[customerLocation] = billTotal[customerLocation] + foodPrice
            // console.log(billTotal[customerLocation])
            // await gameController.teleportRobotAtHome('green')
            // await gameController.sleep(2000)
            await gameController.releaseRobot('green', token66);
        }
    } else if (gameController.canAcquireRobot('yellow')) {
        let token77;
        try{
            let clean = gameController.isSeatClean(customerLocation)
            let grabFood = await gameController.canRobotGrabFood('yellow')
            if ((clean !== false) && (grabFood !== false)) {
                token77 = await gameController.acquireRobot('yellow', true);
                await safeTeleportTo('yellow', 'kitchen')
                // await gameController.sleep(10000);
                await gameController.takeFood('yellow', foodName)
                // await gameController.sleep(3000);
                await safeTeleportTo('yellow', customerLocation)
                // await gameController.sleep(10000);
                await gameController.serveFood('yellow')
                // await gameController.sleep(7000);
            } else if (grabFood !== false) {
                token77 = await gameController.acquireRobot('yellow', true);
                await safeTeleportTo('yellow', customerLocation)
                // await gameController.sleep(10000);
                await gameController.cleanSeat('yellow')
                // await gameController.sleep(5000);
                await safeTeleportTo('yellow', 'kitchen')
                // await gameController.sleep(10000);
                await gameController.takeFood('yellow', foodName)
                // await gameController.sleep(3000);
                await safeTeleportTo('yellow', customerLocation)
                // await gameController.sleep(10000);
                await gameController.serveFood('yellow')
                // await gameController.sleep(7000);
            } else {
                await gameController.sleep(10000)
                deliverFood(foodName, customerLocation)
            }
        } catch(err){
            console.log('Error with acquiring deliverFood yellow')
        } finally {
            foodPrice = gameController.getFoodPrice(foodName)
            billTotal[customerLocation] = billTotal[customerLocation] + foodPrice
            // console.log(billTotal[customerLocation])
            // await gameController.teleportRobotAtHome('yellow')
            // await gameController.sleep(2000)
            await gameController.releaseRobot('yellow', token77);
        }
    } else if (gameController.canAcquireRobot('pink')) {
        let token88;
        try{
            let clean = gameController.isSeatClean(customerLocation)
            let grabFood = await gameController.canRobotGrabFood('pink')
            if ((clean !== false) && (grabFood !== false)) {
                token88 = await gameController.acquireRobot('pink', true);
                await safeTeleportTo('pink', 'kitchen')
                // await gameController.sleep(10000);
                await gameController.takeFood('pink', foodName)
                // await gameController.sleep(3000);
                await safeTeleportTo('pink', customerLocation)
                // await gameController.sleep(10000);
                await gameController.serveFood('pink')
                // await gameController.sleep(7000);
            } else if (grabFood !== false) {
                token88 = await gameController.acquireRobot('pink', true);
                await safeTeleportTo('pink', customerLocation)
                // await gameController.sleep(10000);
                await gameController.cleanSeat('pink')
                // await gameController.sleep(5000);
                await safeTeleportTo('pink', 'kitchen')
                // await gameController.sleep(10000);
                await gameController.takeFood('pink', foodName)
                // await gameController.sleep(2000);
                await safeTeleportTo('pink', customerLocation)
                // await gameController.sleep(10000);
                await gameController.serveFood('pink')
                // await gameController.sleep(7000);
            } else {
                await gameController.sleep(10000)
                deliverFood(foodName, customerLocation)
            }
        } catch(err){
            console.log('Error with acquiring deliverFood pink')
        } finally {
            foodPrice = gameController.getFoodPrice(foodName)
            billTotal[customerLocation] = billTotal[customerLocation] + foodPrice
            // console.log(billTotal[customerLocation])
            // await gameController.teleportRobotAtHome('pink')
            // await gameController.sleep(2000)
            await gameController.releaseRobot('pink', token88);
        }
    } else {
        await gameController.sleep(2000);
        deliverFood(foodName, customerLocation)
    }
    //  await gameController.sleep(3000);
}