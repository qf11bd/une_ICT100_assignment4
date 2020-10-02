# Assignment 4

In this assignment, you will write code for robotic waiters in a restaurant game.
Your robotic waiters will need to be able to understand natural language commands to move around the restaurant and to correctly create orders for your customers. Of course, the robots will first need to welcome new customers coming into the restaurant, find them a seat, and serve them food before they get annoyed from waiting too long and leave the restaurant without paying the bill!

Each robot and customer can perform actions concurrently. This feature introduces some additional challenges due to the following rules:

* Each location of the restaurant (landmark) can be occupied by only one robot at a time;
* Each robot can only perform a single action at each time;
* A customer can be picked up and walked to a free seat only when at the reception;
* A robot can only walk one customer at a time;
* A customer can only seat a free table seat;
* A robot can only take food when at the kitchen and a maximum of one meal at a time;
* Food can only be served if a customer is expecting a meal and if the seat is clean from previous meals;
* It is not possible to bill a customer when they are waiting for a meal in preparation at the kitchen.

# Marking

The assignment is scaffolded into five tasks marked independently. Solving them will consequently advance the solution for the whole game (task six). Here are the five tasks and their partial achievable marks (more details about them and their scoring are provided in the video/slides):

1. Correctly parse the name of the robot and a desired location from a natural language command received in input from the interface => 1 mark;
2. Safely teleport robots around the restaurant by managing conflicts with other robots => 1.5 marks;
3. Welcome a newly arrived customer and seat them at a free table seat => 1.5 marks;
4. Attend a customer requiring attention and handle their request => 1.5 marks;
5. Serve food to a customer => 1.5 marks.

Solving the game (task 6) will contribute to up to 3 additional marks.

## Bonus mark

It is possible to score an extra 0.5 bonus mark. To score the bonus mark you must:

* Achieve 1 mark in task 1; and
* Enable the second button to handle voice commands by listening to the user’s voice command, and then handle the obtained speech transcription similarly as in task 1.

There is no simulation to mark this additional task. This bonus task will be assessed manually by inspecting the code and testing if the button enables the use of voice commands. To get the bonus mark it is not important if the speech recognition system fails to correctly transcribe the voice command.

The bonus mark from task 1, if achieved, can be used to recover marks lost in the other tasks 2 - 6 of this assignment. However, the maximum achievable mark for this assignment remains 10 marks. As such, if for example your final mark for this assignment is 9.7, a 0.5 bonus mark will lead you to get 10 marks.

## Randomness

Each task simulation (1 to 6) makes use of a *random seed* to generate pseudo random events for the task. These pseudo random events can be replicated by using the same seed when running a simulation on the same browser (see instructions on the video/slides). Due to the randomness of the events, **your code should be able to score well under many random conditions for the same simulation task**.

However, to ensure that all assignments are scored against the same simulated conditions, **the marking process will make use of a set of fixed seeds**. The chosen seeds will be made public after the submission deadline. The code will be tested on Chrome and Mozilla Firefox. If a task will achieve different scores on the two browsers, that task will be marked against the most favourable outcome.

# Submission

To control the game and produce a solution you can only use the pre-declared global variable *gameController*. Controlling the game by means of other variables is forbidden and it will lead to penalties that, in some cases (e.g. illegal score yielding), can lead to 0 marks for this assignment. For example, you cannot move the robots around by using their HTML elements to draw them somewhere else. Similarly, you cannot publish messages to topics used by the game logic with the only purpose of yielding free points. However, you can create additional variables or data structures needed to keep track of the information generated during the game and to manage the logic flow of the application.

The repository with the application includes a directory called *solution*. In this directory are seven files where you will need to write the code solving each task and the overall game. Some of them already include a function. In case there is a function, you will need to produce the code for this functions (without changing the name of the function and its arguments). You can use the file common.js to place shared variables, data structures and functions that you may want to use in the other solution files. You will only need to submit the files contained in the directory 'solution'. Any code written outside these files will not be marked.

To prepare the files for submission:

1. Place the .js solution files (common.js, and solution-task-1.js to solution-task-6.js) into a directory called solution&lt;your student ID&gt; (so if your student ID is 12345, the directory should be named solution12345);
2. Compress the directory into a zip file;
3. Submit the zip file on Moodle.

# Link to the Challenge Environment

The code for the application is available on Github at this URL:

[https://github.com/jvitale/une_ICT100_assignment4](https://github.com/jvitale/une_ICT100_assignment4)

To run the application you have three options:

1. Since this application do not require a live server, you can simply download the zip with the application, extract the file on your PC, and open the index.html file in your browser (only Mozilla Firefox or Chrome are fully supported);
2. You can use codesandbox.io as explained in the video discussing how to setup the working environment for the chatbots workshops ([video for the setup](https://echo360.org.au/media/c7315e50-02db-45ec-953f-5cdad6ead615/public));
3. You can use VSC as explained in the video discussing how to setup the working environment for the chatbots workshops ([video for the setup](https://echo360.org.au/media/c7315e50-02db-45ec-953f-5cdad6ead615/public)).

# Bugs

This is the first year that we offer this subject and this assignment was never tested before. We checked the code for bugs, but it can still be possible that the code still contains some.

If you believe that the code may have a bug, take a screenshot of the error and provide a description of what happened. Then send this information via e-mail to Jonathan (jvitale@une.edu.au).

# Help

If you get stuck, first take a big breath in and relax. You are here to learn and we are here to help you learning. You can contact us on the Slack channel, post on the forum or send a private e-mail. Pay attention to not share your code. Exchanging ideas about possible solutions with the other students is fine and encouraged (without spoiling too much!).

A general suggestion is to always try to deal with one small problem at a time. If the problem still looks too big, you can probably divide it in further subproblems. Also, do not immediately dive into the code. First try to mentally solve the problem by identifying the necessary steps, then think how you can write those steps as code.

Remember, to climb a mountain you need to take many small steps and the journey will feel hard on your body but at the end you will be able to appreciate a wonderful view and in the future you will be trained enough to climb higher mountains.

# Additional resources

You can find more information about the assignment (including a showing-through of the application and some suggestions) on this video:

In preparation

You can find the documentation about the methods available to control the game below.

# Documentation of gameController

The game logic can be controlled by using the pre-declared global variable `gameController`. This variable is an instance of an object with a set of methods that can be used as listed below. The methods are ordered by theme.

## Handling concurrency

### async acquireRobot(robotID, waitForToken)

Acquires a robot to ensure that no other processes can acquire the robot until it is released.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot to acquire (e.g. 'green')
`waitForToken` | *boolean* | If `true` the returned Promise will be fulfilled only if the robot is not currently acquired or when all the other processes that acquired the robot releases it. If `false` the returned Promise will be fulfilled immediately, even if the robot is not available for acquisition. In this case, the returned token will have value `null`

**Returns**

`acquisitionPromise`: *Promise*. When fullfilled the promise will return an acquisition token (*integer*) if the acquisition succeeded or `null` if the acquisition failed.

**Examples**

```js
let token1 = await gameController.acquireRobot('green', true);
console.log('First process acquiring green!')
let token2 = await gameController.acquireRobot('green', false);
if (token !== null){
    console.log('Second process able to acquire green!');
} else {
    console.log('Somebody else already acquired green :(');
}
gameController.releaseRobot('green', token1);
```

### canAcquireRobot(robotID)

Tells if a robot can be immediately acquired or if it was already previously acquired.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot (e.g. 'green')

**Returns**

`canBeAcquired`: *boolean*. The value is `true` if the robot can be immediately acquired, `false` otherwise.

**Examples**

```js
let outcome = gameController.canAcquireRobot('green');
if (outcome){
    console.log('It is possible to acquire Green');
} else {
    console.log('To acquire Green we will need to wait...');
}
```

### releaseRobot(robotID, token)

Releases a robot previously acquired to ensure that can be used by other concurrent processes acquiring it.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot to release (e.g. 'green')
`token` | *integer* | The acquisition token returned by the 

**Returns**

`outcome`: *boolean*. The value is `true` if the releasing process succeded, `false` otherwise.

**Examples**

```js
let token;
try{
  token = await gameController.acquireRobot('green', true);
  // if we are here we have exclusive control of green
  // do something ....
} catch(err){
  console.log('Whoops: ' + err.stack);
} finally {
  // always release the acquired token!
  gameController.releaseRobot('green', token);
}
```

## Handling game logic

### async attendCustomerRequest(robotID)

Sends a command to the robot to attend the customer at the current location of the robot. This call will fail if the robot is not at a table seat and if there is not a customer seated at that location or if the customer did not ask for attention.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to interact with the customer. When this process is completed with success, the returned promise will be fulfilled returning a *string* with the request of the customer. If the process fails, the returned promise will be fulfilled returning the *boolean* value `false`.

**Examples**

```js
let request = await gameController.attendCustomerRequest('green');
if (request !== false){
    console.log(`The customer said: ${request}`);
} else {
    console.log('It was not possible to attend the customer');
}
```

### async billCustomer(robotID, billTotal)

Sends a command to the robot to bill the customer at the current location of the robot with a total amount. This call will fail if the robot is not at a table seat and if there is not a customer seated at that location or if the customer is still waiting for an ordered food.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')
`billTotal` | *float* | The amount of the bill

**Returns**

`processPromise`: *Promise*. The robot will take some time to interact with the customer. When this process is completed, the returned promise will be fulfilled returning a *string* value: `true` if the billing proces succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.billCustomer('green', 100);
if (outcome !== false){
    console.log('The customer was billed $100');
} else {
    console.log('It was not possible to bill the customer');
}
```

### async cleanSeat(robotID)

Sends a command to the robot to clean the seat where the robot is currently located. This call will fail if the robot is not located at a table seat, if there is no plate to clean or if the customer is still eating their food.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to clean the seat. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.cleanSeat('green');
if (outcome !== false){
    console.log('Seat cleaned!');
} else {
    console.log('It was not possible to clean the seat');
}
```

### newOrder(customerName, foodName)

Makes a new order for a customer and set a food item in preparation at the kitchen.

|**parameter**|**type**|**description**|
--- | --- | ---
`customerName` | *string* | The name of the customer on the order
`foodName` | *string* | The food item to prepare

**Returns**

`outcome`: *boolean*. The value is `true` if the order succeeded, `false` otherwise.

**Examples**

```js
let outcome = gameController.newOrder('Jon Bowl', 'pasta');
if (outcome !== false){
    console.log('Order created!');
} else {
    console.log('It was not possible to make an order');
}
```

### async pickUpCustomer(robotID)

Sends a command to the robot to pick up a customer from the current location of the robot. This call will fail if the robot is not located at the reception, if there are no customers at the reception or if the robot is already picked up a customer.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.pickUpCustomer('green');
if (outcome !== false){
    console.log('Customer picked up!');
} else {
    console.log('It was not possible to pick up the customer');
}
```

### async seatCustomer(robotID)

Sends a command to the robot to offer a customer a seat. This call will fail if the robot is not located at a free seat or if the robot did not pick up a customer.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.seatCustomer('green');
if (outcome !== false){
    console.log('Customer seated!');
} else {
    console.log('It was not possible to offer the customer a seat');
}
```

### async serveFood(robotID)

Sends a command to the robot to serve food at a table seat. This call will fail if the robot is not located at a table seat, if the robot did not grab food, if there is not a customer seated at the table seat or if the customer is not expecting food.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.serveFood('green');
if (outcome !== false){
    console.log('Food served!');
} else {
    console.log('It was not possible to serve food');
}
```

### async takeFood(robotID, foodName)

Sends a command to the robot to take a food item from the kitchen. This call will fail if the robot is not located at the kitchen, if the robot already grabbed food or if the desired food item is not available at the kitchen.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')
`foodName` | *string* | The name of the food item to grab

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.takeFood('green', 'pasta');
if (outcome !== false){
    console.log('Food grabbed!');
} else {
    console.log('It was not possible to take food from the kitchen');
}
```

### async teleportRobotAtHome(robotID)

Sends a command to the robot to teleport it at its home landmark.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.teleportRobotAtHome('green');
if (outcome !== false){
    console.log('The robot is not at home-green');
} else {
    console.log('It was not possible to teleport Green at home');
}
```

### async teleportRobotToLandmark(robotID, landmarkID)

Sends a command to the robot to teleport it to desired landmark. The call will fail if the landmark is occupied by another robot.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')
`landmarkID` | *string* | The ID of destination landmark

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.teleportRobotToLandmark('green', 'reception');
if (outcome !== false){
    console.log('The robot is the reception');
} else {
    console.log('It was not possible to teleport Green at the reception');
}
```

### async throwAwayFood(robotID)

Sends a command to the robot to throw away the grabbed food. The call will fail if the robot did not grab food.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot performing the command (e.g. 'green')

**Returns**

`processPromise`: *Promise*. The robot will take some time to execute the command. When this process is completed, the returned promise will be fulfilled returning a *boolean* with value `true` if the command succeeded, `false` otherwise.

**Examples**

```js
let outcome = await gameController.throwAwayFood('green');
if (outcome !== false){
    console.log('The robot threw away food');
} else {
    console.log('It was not possible to throw away the food');
}
```

## Check game status

### canRobotGrabFood(robotID)

Tells if a robot can grab food or if it has already grabbed food and it cannot grab anymore food.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot (e.g. 'green')

**Returns**

`canGrabFood`: *boolean*. The value is `true` if the robot can grab food, `false` otherwise.

**Examples**

```js
let outcome = gameController.canRobotGrabFood('green');
if (outcome){
    console.log('Green can grab food');
} else {
    console.log('Green is already holding food');
}
```

### canRobotTeleportToLandmark(robotID, landmarkID)

Tells if a robot can teleport to a landmark. A robot may not be able to teleport to a landmark if the landmark is currently occupied by another robot or if the robot is trying to teleport to the home landmark of another robot.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot (e.g. 'green')
`landmarkID` | *string* | The ID of the destination landmark

**Returns**

`canTeleport`: *boolean*. The value is `true` if the robot can teleport to the landmark or if already at the landmark, `false` otherwise.

**Examples**

```js
let outcome = gameController.canRobotTeleportToLandmark('green', 'reception');
if (outcome){
    console.log('Green can teleport to the reception');
} else {
    console.log('There is another robot at the reception');
}
```

### isRobotWalkingACustomer(robotID)

Tells if a robot has already picked up a customer.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot (e.g. 'green')

**Returns**

`isWalkingACustomer`: *boolean*. The value is `true` if the robot picked up a customer from the reception, `false` otherwise.

**Examples**

```js
let outcome = gameController.isRobotWalkingACustomer('green');
if (outcome){
    console.log('Green is currently walking a customer somewhere');
} else {
    console.log('Green is free to pick up a customer');
}
```

### isSeatClean(landmarkID)

Tells if the seat is clean from food.

|**parameter**|**type**|**description**|
--- | --- | ---
`landmarkID` | *string* | The ID of table seat

**Returns**

`isClean`: *boolean*. The value is `true` if there is no empty plate at the seat, `false` otherwise.

**Examples**

```js
let isClean = gameController.isSeatClean('table-1-1');
if (isClean){
    console.log('The seat is clean');
} else {
    console.log('There is an empty plate at table one seat one');
}
```

### isSeatFree(landmarkID)

Tells if the seat is currently free.

|**parameter**|**type**|**description**|
--- | --- | ---
`landmarkID` | *string* | The ID of table seat

**Returns**

`isFree`: *boolean*. The value is `true` if there is no customer seated at that seat, `false` otherwise.

**Examples**

```js
let isFree = gameController.isSeatFree('table-1-1');
if (isFree){
    console.log('There is no customer at table one seat one');
} else {
    console.log('There is a customer at table one seat one');
}
```

## Getters

### getFoodPrice(foodName)

Returns the price of a food item.

|**parameter**|**type**|**description**|
--- | --- | ---
`foodName` | *string* | The name of the food item (e.g. 'toast')

**Returns**

`price`: *float*. The price of the food value.

**Examples**

```js
let price = gameController.getFoodPrice('pasta');
console.log(`The pasta costs ${price} dollars`);
```

### getFreeLandmarks()

Returns an array with the list of landmarks currently unoccupied by robots.

**Returns**

`freeLandmarks`: *string[]*. A list of free landmarks.

**Examples**

```js
let free = gameController.getFreeLandmarks();
console.log(`There are no robots at these landmarks: ${free}`);
```

### getLandmarkIDAsNaturalLanguage(landmarkID)

Returns the natural language string representing the desired landmark.

|**parameter**|**type**|**description**|
--- | --- | ---
`landmarkID` | *string* | The ID of the desired landmark (e.g. 'table-1-1') 

**Returns**

`asNaturalLanguage`: *string*.

**Examples**

```js
let asNaturalLanguage = gameController.getLandmarkIDAsNaturalLanguage('table-3-2');
console.log(`table-3-2 corresponds to the string ${asNaturalLanguage}`);
```

### getLandmarksIds()

Returns an array with the list of all the landmarks in the game.

**Returns**

`landmarks`: *string[]*. A list of all the game landmarks.

**Examples**

```js
let landmarks = gameController.getLandmarksIds();
console.log(`The game has these landmarks: ${landmarks}`);
```

### getMenuList()

Returns an array with the food items on the menu.

**Returns**

`foodItems`: *string[]*. A list of all the food items on the menu.

**Examples**

```js
let menu = gameController.getMenuList();
console.log(`Menu of the restaurant: ${menu}`);
```

### getNumberOfCustomers()

Returns the number of customers currently at the restaurant.

**Returns**

`nCustomers`: *integer*.

**Examples**

```js
let n = gameController.getNumberOfCustomers();
console.log(`There are ${n} customers at the restaurant`);
```

### getRobotDistanceFromLandmark(robotID, landmarkID)

Returns the distance in pixels from the robot to the desired landmark.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot (e.g. 'green')
`landmarkID` | *string* | The ID of the landmark

**Returns**

`distance`: *float*.

**Examples**

```js
let dist = gameController.getRobotDistanceFromLandmark('green', 'reception');
console.log(`Green is located ${dist} pixels away from the reception`);
```

### getRobotsIds()

Returns an array with IDs of the robots.

**Returns**

`robots`: *string[]*. A list of all robots at the restaurant.

**Examples**

```js
let robots = gameController.getRobotsIds();
console.log(`The restaurant uses these robots: ${robots}`);
```

### localiseRobot(robotID)

Returns the current location of the robot.

|**parameter**|**type**|**description**|
--- | --- | ---
`robotID` | *string* | The ID of the robot (e.g. 'green')

**Returns**

`landmarkID`: *string*. The location of the robot.

**Examples**

```js
let location = gameController.localiseRobot('green');
console.log(`Green is currently at ${location}`);
```

### locateCustomer(customerName)

Returns the current location of the customer. The call fails if the customer cannot be located (for example because they left the restaurant).

|**parameter**|**type**|**description**|
--- | --- | ---
`customerName` | *string* | The name of the customer

**Returns**

`landmarkID`: *string*. The location of the customer.

**Examples**

```js
let location = gameController.locateCustomer('Jon Bowl');
console.log(`Jon Bowl is at ${location}`);
```

### whichRobotIsAtLandmark(landmarkID)

Returns the robot that is currently at a landmark or `null` if no robot is at the specified landmark.

|**parameter**|**type**|**description**|
--- | --- | ---
`landmarkID` | *string* | The ID of the landmark

**Returns**

`robotID`: *string* or `null`. The robot currently at the landmark.

**Examples**

```js
let robot = gameController.whichRobotIsAtLandmark('reception');
if (robot !== null){
    console.log(`${robot} is currently at the reception`);
} else {
    console.log('There is no robot at the reception');
}
```

## Events manager

### publish(topic, msg)

Publishes a message object on a topic.

|**parameter**|**type**|**description**|
--- | --- | ---
`topic` | *string* | The name of the topic
`msg` | *Object* | A message object with some properties

**Returns**

`none`

**Examples**

```js
gameController.publish('a_topic', {property1: 'value1', property2: 'value2'});
console.log(`Published a new message on topic a_topic`);
```

### subscribe(topic, callback)

Subscribes to a topic.

|**parameter**|**type**|**description**|
--- | --- | ---
`topic` | *string* | The name of the topic
`callback` | *function* | A callback function executed when a new message is published on the subscribed topic. The callback function needs to receive as input the retrieved message.

**Returns**

`subID`: *integer*. The subscriber ID of the generated subscriber.

**Examples**

```js
function myTopicHandler(msg){
    console.log(`Received a new message on my_topic: ${msg.content}`);
}
gameController.subscribe('my_topic', myTopicHandler);
gameController.publish('my_topic', {content: 'hello world!'});
```

### unsubscribe(subID)

Unsubscribes a subscriber from a topic.

|**parameter**|**type**|**description**|
--- | --- | ---
`subID` | *integer* | The ID of the subscriber we want to unsubscribe from a topic

**Returns**

`none`

**Examples**

```js
function myTopicHandler(msg){
    console.log(`Received a new message on my_topic: ${msg.content}`);
}
let sub1 = gameController.subscribe('my_topic', myTopicHandler);
gameController.publish('my_topic', {content: 'hello world!'});
//We will see something logged on the console
gameController.unsubscribe(sub1);
gameController.publish('my_topic', {content: 'hello again!'});
//This time we will not see anything logged on the console
```

## Voice commands

### listen(callback)

Listen to speech from the user's microphone.

|**parameter**|**type**|**description**|
--- | --- | ---
`callback` | *function* | A function that needs to be executed when the speech recognition acquired the speech and converted it to a text transcription. The callback function needs to accept a parameter as input, that is the speech transcription

**Returns**

`none`

**Examples**

```js
function repeat(transcription){
    console.log(`The user said: ${transcription}`);
}
gameController.listen(repeat);
```

## Debugging, logging and other utilities

### debug.generateRandomRequest(isFoodRequest)

Generates a random natural language request for food or for the bill.

|**parameter**|**type**|**description**|
--- | --- | ---
`isFoodRequest` | *boolean* | Set it to `true` for generating a food request, set it to `false` for generating a bill request

**Returns**

`request`: *string*. A random natural languange request.

**Examples**

```js
let foodRequest = gameController.debug.generateRandomRequest(true);
console.log(`Food request: ${foodRequest}`);
let billRequest = gameController.debug.generateRandomRequest(false);
console.log(`Bill request: ${billRequest}`);
```

### debug.generateSeatedCustomer(landmarkID)

Generates a customer seated on the desired landmarkID. It fails if there is already a customer seated at that location or if the landmark is not a seat.

|**parameter**|**type**|**description**|
--- | --- | ---
`landmarkID` | *string* | The ID of the table seat landmark

**Returns**

`none`

**Examples**

```js
gameController.debug.generateSeatedCustomer('table-2-1');
console.log('A new customer at table 2 seat 1!');
```

### debug.generateWaitingCustomer(waitingTime)

Generates a customer waiting at the reception.

|**parameter**|**type**|**description**|
--- | --- | ---
`waitingTime` | *integer* | The customer will wait this amount of milliseconds before leaving the restaurant. If `waitingTime` is 0, the customer will wait forever.

**Returns**

`none`

**Examples**

```js
gameController.debug.generateWaitingCustomer(5000);
console.log('A new customer at the reception waiting for 5 seconds!');
```

### debug.triggerCustomerRequest(customerName, request, waitForever)

Makes the customer to ask for attention.

|**parameter**|**type**|**description**|
--- | --- | ---
`customerName` | *string* | The name of the customer
`request` | *string* | The natural language request of the customer
`waitForever` | *boolean* | If `true` the customer will wait forever for attention, if `false` the customer will wait for a limited amount of seconds before leaving.

**Returns**

`none`

**Examples**

```js
gameController.debug.triggerCustomerRequest('Jon Bowl', 'I want the pasta, please', false);
console.log('Jon Bowl is asking for attention');
```

### debug.triggerRandomCustomerRequest(customerName, waitForever)

Makes the customer to ask for attention by generating a request randomly.

|**parameter**|**type**|**description**|
--- | --- | ---
`customerName` | *string* | The name of the customer
`waitForever` | *boolean* | If `true` the customer will wait forever for attention, if `false` the customer will wait for a limited amount of seconds before leaving.

**Returns**

`none`

**Examples**

```js
gameController.debug.triggerRandomCustomerRequest('Jon Bowl', false);
console.log('Jon Bowl is asking for attention');
```

### debug.triggerRandomCustomerRequest(customerName, waitForever)

Makes the customer to ask for attention by generating a request randomly.

|**parameter**|**type**|**description**|
--- | --- | ---
`customerName` | *string* | The name of the customer
`waitForever` | *boolean* | If `true` the customer will wait forever for attention, if `false` the customer will wait for a limited amount of seconds before leaving.

**Returns**

`none`

**Examples**

```js
gameController.debug.triggerRandomCustomerRequest('Jon Bowl', false);
console.log('Jon Bowl is asking for attention');
```

### log(logText)

Logs an information on the log panel.

|**parameter**|**type**|**description**|
--- | --- | ---
`logText` | *string* | A log message

**Returns**

`none`

**Examples**

```js
gameController.log('Hello world!');
```

### logError(errorMessage)

Logs an error on the log panel.

|**parameter**|**type**|**description**|
--- | --- | ---
`errorMessage` | *string* | A log error

**Returns**

`none`

**Examples**

```js
gameController.logError('There was an error');
```

### logEvent(eventMessage)

Logs a message about an event on the log panel.

|**parameter**|**type**|**description**|
--- | --- | ---
`eventMessage` | *string* | A log message about an event

**Returns**

`none`

**Examples**

```js
gameController.logEvent('An event happened');
```

### logWarning(warningMessage)

Logs a warning on the log panel.

|**parameter**|**type**|**description**|
--- | --- | ---
`warningMessage` | *string* | A log warning

**Returns**

`none`

**Examples**

```js
gameController.logWarning('Attention! Something bad may happen');
```

### async sleep(ms)

Sleeps for an amount of milliseconds

|**parameter**|**type**|**description**|
--- | --- | ---
`ms` | *integer* | The amount of milliseconds to sleep

**Returns**

`sleepPromise`: *Promise*. The methods immediately returns a promise that is fulfilled when the process slept the desired amount of milliseconds.

**Examples**

```js
console.log('Now');
await gameController.sleep(3000);
console.log('After 3 seconds');
```

### verbose(verboseState)

Sets the verbose state. If `true` the debugging console will show the logs of the publisher/subscriber manager, if `false` these logs will not be displayed on the console. The default state is `false`.

|**parameter**|**type**|**description**|
--- | --- | ---
`verboseState` | *boolean* | The verbose state

**Returns**

`none`

**Examples**

```js
gameController.verbose(false);
gameController.publish('my_topic', {});
console.log('Nothing was displayed');
gameController.verbose(true);
gameController.publish('my_topic', {});
console.log('Something was displayed');
```








