/*
TODO: Task 6 => complete the following function setupGameSubscribers.

The function does not take input arguments.
The function should setup the appropriate subscribers to make robots
responding to the events of the game.

You should have already completed all or part of the previous subtasks,
now it is time to put them at work with subscribers!
*/
function setupGameSubscribers(){
    gameController.log(`Calling setupGameSubscribers()`);
    gameController.subscribe('new_customer', welcomeAndSeatCustomer)
    gameController.subscribe('customer_requiring_attention', async (msg) => {
        try{
            await attendCustomerRequest(msg.customerLocation, msg.customerName);
        } catch (err) {
            gameController.logError(`Attending failed ${err.stack}`);
        } finally {
            // gameController.publish('command_executed', {});
        }
    });
    gameController.subscribe('food_ready', async (msg) => {
        try{
            await deliverFood(msg.foodName, msg.landmarkID);
        } catch (err) {
            gameController.logError(`Food ready failed ${err.stack}`);
        } finally {
            // gameController.publish('command_executed', {});
        }
    });
}