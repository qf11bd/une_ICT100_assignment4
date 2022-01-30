/*
TODO: Task 3 => complete the following function welcomeAndSeatCustomer.

The function does not take input arguments.
This function will move a robot at the reception to pick up a new
customer and find them an available seat.

The function should return true if successful,
or false otherwise.
*/

async function welcomeAndSeatCustomer(){
    gameController.log(`Calling welcomeAndSeatCustomer()`);
    if (gameController.canAcquireRobot('green')) {
        let token;
        try{
            token = await gameController.acquireRobot('green', true);
            safeTeleportTo('green', 'reception')
            await gameController.sleep(5000)
            await gameController.pickUpCustomer('green')

        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            let isFree = false
            let freeSeat = 'table-1-1'
            do {
                for (let i = 1; i < 3; i++) {
                    for (let j = 1; j < 3; j ++) {
                        if (gameController.isSeatFree('table-' + i + '-' + j)) {
                            freeSeat = 'table-' + i + '-' + j
                            isFree = true
                            break
                        }
                    }
                }
            } while (isFree == false)
            safeTeleportTo('green', freeSeat)
            await gameController.sleep(5000)
            gameController.seatCustomer('green')
            gameController.releaseRobot('green', token);
        }
    } else if (gameController.canAcquireRobot('yellow')) {
        let token;
        try{
            token = await gameController.acquireRobot('yellow', true);
            safeTeleportTo('yellow', 'reception')
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            // always release the acquired token!
            gameController.releaseRobot('yellow', token);
        }       
    } else if (gameController.canAcquireRobot('purple')) {
        let token;
        try{
            token = await gameController.acquireRobot('purple', true);
            safeTeleportTo('purple', 'reception')
        } catch(err){
            console.log('Error with acquiring robot')
        } finally {
            // always release the acquired token!
            gameController.releaseRobot('purple', token);
        }    
    } else {
        await gameController.sleep(5000)
        welcomeAndSeatCustomer()
    }
    await gameController.sleep(5000);
}