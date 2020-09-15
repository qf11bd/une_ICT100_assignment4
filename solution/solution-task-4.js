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
    // You can remove/edit these lines of code
    gameController.log(`Calling attendCustomerRequest('${customerLocation}', '${customerName}')`);
    await gameController.sleep(5000);
}