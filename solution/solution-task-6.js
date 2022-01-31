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
    gameController.subscribe('new_customer', welcomeAndSeatCustomer())
    gameController.subscribe('customer_requiring_attention', attendCustomerRequest())
    gameController.subscribe('food_ready', deliverFood())

}