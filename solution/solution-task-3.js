/*
TODO: Task 3 => complete the following function welcomeAndSeatCustomer.

The function does not take input arguments.
This function will move a robot at the reception to pick up a new
customer and find them an available seat.

The function should return true if successful,
or false otherwise.
*/

// Define function for welcoming and seating customer
// Use safe teleport function to move robot safely to reception and subsequent table
// Initial versions of this function referenced a 'findTable' function in order to minimise replication of code
// Unfurtunately, this broke the scoring system (with it thinking the test had completed when calling the additional function)
// Loop iteration used to search for an empty seat. Sleeps utilised to allow time for each sequence to complete prior to proceeding
async function welcomeAndSeatCustomer(){
    gameController.log(`Calling welcomeAndSeatCustomer()`);
    if (gameController.canAcquireRobot('green')) {
        let token33;
        try{
            token33 = await gameController.acquireRobot('green', true);
            let outcome = await safeTeleportTo('green', 'reception')
            if (outcome !== false) {
                await gameController.pickUpCustomer('green')
            } else {
                await gameController.sleep(2000)
                await gameController.pickUpCustomer('green')
            }
        } catch(err){
            console.log('Error with acquiring welcome green')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            for (let i = 3; i > 0; i--) {
                for (let j = 1; j < 5; j ++) {
                    if (gameController.isSeatFree('table-' + i + '-' + j)) {
                        freeSeat = 'table-' + i + '-' + j
                        console.log(freeSeat)
                        isFree = true
                        break
                    }
                }
            }
            outcome = await safeTeleportTo('green', freeSeat)
            if (outcome !== false) {
                await gameController.seatCustomer('green')
                // await gameController.teleportRobotAtHome('green')
                await gameController.releaseRobot('green', token33);
            } else {
                await gameController.releaseRobot('green', token33);
            }
            await gameController.releaseRobot('green', token33)
        }
    } else if (gameController.canAcquireRobot('yellow')) {
        let token11;
        try{
            token11 = await gameController.acquireRobot('yellow', true);
            let outcome = await safeTeleportTo('yellow', 'reception')
            if (outcome !== false) {
                await gameController.pickUpCustomer('yellow')
            } else {
                await gameController.sleep(2000)
                await gameController.pickUpCustomer('yellow')
            }
        } catch(err){
            console.log('Error with acquiring welcome yellow')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            for (let i = 3; i > 0; i--) {
                for (let j = 1; j < 5; j ++) {
                    if (gameController.isSeatFree('table-' + i + '-' + j)) {
                        freeSeat = 'table-' + i + '-' + j
                        console.log(freeSeat)
                        isFree = true
                        break
                    }
                }
            }
            outcome = await safeTeleportTo('yellow', freeSeat)
            if (outcome !== false) {
                await gameController.seatCustomer('yellow')
                // await gameController.teleportRobotAtHome('yellow')
                await gameController.releaseRobot('yellow', token11);
            } else {
                await gameController.releaseRobot('yellow', token11);
            }
            await gameController.releaseRobot('yellow', token11)
        }
    } else if (gameController.canAcquireRobot('pink')) {
        let token22;
        try{
            token22 = await gameController.acquireRobot('pink', true);
            let outcome = await safeTeleportTo('pink', 'reception')
            if (outcome !== false) {
                await gameController.pickUpCustomer('pink')
            } else {
                await gameController.sleep(2000)
                await gameController.pickUpCustomer('pink')
            }
        } catch(err){
            console.log('Error with acquiring welcome pink')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            for (let i = 3; i > 0; i--) {
                for (let j = 1; j < 5; j ++) {
                    if (gameController.isSeatFree('table-' + i + '-' + j)) {
                        freeSeat = 'table-' + i + '-' + j
                        console.log(freeSeat)
                        isFree = true
                        break
                    }
                }
            }
            outcome = await safeTeleportTo('pink', freeSeat)
            if (outcome !== false) {
                await gameController.seatCustomer('pink')
                // await gameController.teleportRobotAtHome('pink')
                await gameController.releaseRobot('pink', token22);
            } else {
                await gameController.releaseRobot('pink', token22);
            }
            await gameController.releaseRobot('pink', token22)
        }
    } else {
        await gameController.sleep(2000)
        welcomeAndSeatCustomer()
    }
}