
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

async function deliverFood(foodName, customerLocation){
    // You can remove/edit these lines of code
    gameController.log(`Calling attendCustomerRequest('${customerLocation}', '${foodName}')`);
    await gameController.sleep(5000);
}