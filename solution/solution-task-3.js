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
        let token;
        try{
            token = await gameController.acquireRobot('green', true);
            safeTeleportTo('green', 'reception')
            await gameController.sleep(7000)
            await gameController.pickUpCustomer('green')
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            for (let i = 1; i < 3; i++) {
                for (let j = 1; j < 4; j ++) {
                    if (gameController.isSeatFree('table-' + i + '-' + j)) {
                        freeSeat = 'table-' + i + '-' + j
                        console.log(freeSeat)
                        isFree = true
                        break
                    }
                }
            }
            await gameController.sleep(10000)
            safeTeleportTo('green', freeSeat)
            await gameController.sleep(10000)
            gameController.seatCustomer('green')
            await gameController.sleep(2000)
            gameController.releaseRobot('green', token);
        }
    } else if (gameController.canAcquireRobot('yellow')) {
        let token;
        try{
            token = await gameController.acquireRobot('yellow', true);
            safeTeleportTo('yellow', 'reception')
            await gameController.sleep(7000)
            await gameController.pickUpCustomer('yellow')
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            for (let i = 1; i < 3; i++) {
                for (let j = 1; j < 4; j ++) {
                    if (gameController.isSeatFree('table-' + i + '-' + j)) {
                        freeSeat = 'table-' + i + '-' + j
                        console.log(freeSeat)
                        isFree = true
                        break
                    }
                }
            }
            await gameController.sleep(10000)
            safeTeleportTo('yellow', freeSeat)
            await gameController.sleep(10000)
            gameController.seatCustomer('yellow')
            await gameController.sleep(2000)
            gameController.releaseRobot('yellow', token);
        }       
    } else if (gameController.canAcquireRobot('purple')) {
        let token;
        try{
            token = await gameController.acquireRobot('purple', true);
            safeTeleportTo('purple', 'reception')
            await gameController.sleep(7000)
            await gameController.pickUpCustomer('purple')
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            for (let i = 1; i < 3; i++) {
                for (let j = 1; j < 4; j ++) {
                    if (gameController.isSeatFree('table-' + i + '-' + j)) {
                        freeSeat = 'table-' + i + '-' + j
                        console.log(freeSeat)
                        isFree = true
                        break
                    }
                }
            }
            await gameController.sleep(10000)
            safeTeleportTo('purple', freeSeat)
            await gameController.sleep(10000)
            gameController.seatCustomer('purple')
            await gameController.sleep(2000)
            gameController.releaseRobot('purple', token);
        }    
    } else {
        await gameController.sleep(5000)
        welcomeAndSeatCustomer()
    }
    await gameController.sleep(5000);
}