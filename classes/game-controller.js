function GameController(){
    let _manager = new PubSubManager(false);
    let _restaurant = new Restaurant(_manager);
    let _guiManager = new GUIManager(_manager);
    let _requestGETParsed = false;
    let _testCustomers = [];

    let _scenarioGraphics = {
        'table-1': new GraphicElement('landmark-table-1', '1', 'table', 'table-label'),
        'table-2': new GraphicElement('landmark-table-2', '2', 'table', 'table-label'),
        'table-3': new GraphicElement('landmark-table-3', '3', 'table', 'table-label'),
        'reception': new GraphicElement('reception', 'Reception', 'reception', 'place-label'),
        'kitchen': new GraphicElement('kitchen', 'Kitchen', 'kitchen', 'place-label'),
        'home-yellow': new GraphicElement('landmark-home-yellow', '', 'home', ''),
        'home-pink': new GraphicElement('landmark-home-pink', '', 'home', ''),
        'home-green': new GraphicElement('landmark-home-green', '', 'home', ''),
    }

    _restaurant.addLandmark(new Landmark(
        'table-1-1',
        'table one seat one',
        _scenarioGraphics['table-1'],
        true,
        1,
        0, 0, 90
    ));
    _restaurant.addLandmark(new Landmark(
        'table-1-2',
        'table one seat two',
        _scenarioGraphics['table-1'],
        true,
        1,
        120, 30, 180
    ));
    _restaurant.addLandmark(new Landmark(
        'table-1-3',
        'table one seat three',
        _scenarioGraphics['table-1'],
        true,
        1,
        100, 120, 270
    ));
    _restaurant.addLandmark(new Landmark(
        'table-1-4',
        'table one seat four',
        _scenarioGraphics['table-1'],
        true,
        1,
        0, 100, 0
    ));
    _restaurant.addLandmark(new Landmark(
        'table-2-1',
        'table two seat one',
        _scenarioGraphics['table-2'],
        true,
        1,
        0, 0, 90
    ));
    _restaurant.addLandmark(new Landmark(
        'table-2-2',
        'table two seat two',
        _scenarioGraphics['table-2'],
        true,
        1,
        120, 30, 180
    ));
    _restaurant.addLandmark(new Landmark(
        'table-2-3',
        'table two seat three',
        _scenarioGraphics['table-2'],
        true,
        1,
        100, 120, 270
    ));
    _restaurant.addLandmark(new Landmark(
        'table-2-4',
        'table two seat four',
        _scenarioGraphics['table-2'],
        true,
        1,
        0, 100, 0
    ));
    _restaurant.addLandmark(new Landmark(
        'table-3-1',
        'table three seat one',
        _scenarioGraphics['table-3'],
        true,
        1,
        0, 0, 90
    ));
    _restaurant.addLandmark(new Landmark(
        'table-3-2',
        'table three seat two',
        _scenarioGraphics['table-3'],
        true,
        1,
        120, 30, 180
    ));
    _restaurant.addLandmark(new Landmark(
        'table-3-3',
        'table three seat three',
        _scenarioGraphics['table-3'],
        true,
        1,
        100, 120, 270
    ));
    _restaurant.addLandmark(new Landmark(
        'table-3-4',
        'table three seat four',
        _scenarioGraphics['table-3'],
        true,
        1,
        0, 100, 0
    ));
    _restaurant.addLandmark(new Landmark(
        'kitchen',
        'kitchen',
        _scenarioGraphics['kitchen'],
        false,
        0,
        20, 20, 90
    ));
    _restaurant.addLandmark(new Landmark(
        'reception',
        'reception',
        _scenarioGraphics['reception'],
        false,
        -1,
        30, 30, 90
    ));
    _restaurant.addLandmark(new Landmark(
        'home-yellow',
        'home yellow',
        _scenarioGraphics['home-yellow'],
        false,
        0,
        0, 0, 90
    ));
    _restaurant.addLandmark(new Landmark(
        'home-pink',
        'home pink',
        _scenarioGraphics['home-pink'],
        false,
        0,
        0, 0, 180
    ));
    _restaurant.addLandmark(new Landmark(
        'home-green',
        'home green',
        _scenarioGraphics['home-green'],
        false,
        0,
        0, 0, 0
    ));

    _restaurant.addRobot(new Robot('yellow', 'yellow'), _restaurant.landmarks['home-yellow']);
    _restaurant.addRobot(new Robot('pink', 'pink'), _restaurant.landmarks['home-pink']);
    _restaurant.addRobot(new Robot('green', 'green'), _restaurant.landmarks['home-green']);

    _restaurant.getRobot('yellow').htmlElement.getTileElement().style.filter = "sepia(1) saturate(180%) hue-rotate(20deg)";
    _restaurant.getRobot('pink').htmlElement.getTileElement().style.filter = "sepia(1) saturate(180%) hue-rotate(240deg)";
    _restaurant.getRobot('green').htmlElement.getTileElement().style.filter = "sepia(1) saturate(250%) hue-rotate(70deg)";
    _restaurant.getRobot('pink').htmlElement.setLabelOrientation('top');
    _restaurant.getRobot('yellow').htmlElement.setLabelOrientation('left');

    function rnd(min, max){
        let random = min + Math.floor(Math.random() * (max - min + 1));
        if (random > max){
            random = max;
        }
        if (random < min){
            random = min;
        }

        return parseInt(random);
    }

    function assertRobot(robotID){
        if (!(robotID in _restaurant.robots)){
            let e = Error(robotID + ' does not exist. Maybe checks for typos.');
            _manager.logError(e.stack);
            throw(e);
        }
    }

    function assertLandmark(landmarkID){
        if (!(landmarkID in _restaurant.landmarks) && landmarkID !== 'home'){
            let e = Error(landmarkID + ' does not exist in restaurant Maybe checks for typos.');
            _manager.logError(e.stack);
            throw(e);
        }
    }

    function createFoodRequest(foodName){
        let greetings = [
            "Hi,", "Hello,", "Hey,", "Hi there,", ""
        ];
        let requests = [
            "can I order",
            "I would like to order",
            "I'd like",
            "may I order",
            "I want",
            "bring me"
        ];
        let please = ["please", "thanks", "thank you", ""];
        let greetingIdx = rnd(0, greetings.length - 1);
        let requestIdx = rnd(0, requests.length - 1);
        let pleaseIdx = rnd(0, please.length - 1);
    
        return `${greetings[greetingIdx]} ${requests[requestIdx]} ${foodName} ${please[pleaseIdx]}`;
    
    }
    
    function createBillRequest(){
        let greetings = [
            "Hi,", "Hello,", "Hey,", "Hi there,", ""
        ];
        let requests = [
            "can I have the bill",
            "I would like to pay",
            "I'd like the check",
            "may I have the bill",
            "I want the bill",
            "bring me the total",
            "the check",
            "the bill",
            "the total"
        ];
        let please = ["please", "thanks", "thank you", ""];
        let greetingIdx = rnd(0, greetings.length - 1);
        let requestIdx = rnd(0, requests.length - 1);
        let pleaseIdx = rnd(0, please.length - 1);
    
        return `${greetings[greetingIdx]} ${requests[requestIdx]} ${please[pleaseIdx]}`;
    
    }

    this.sleep = async (ms) => {
        return new Promise((resolve) => {
            setTimeout(() => {resolve();}, ms);
        });
    }

    this.getRobotsIds = () => {
        return _restaurant.getRobotsIds();
    }

    this.getLandmarksIds = () => {
        return _restaurant.getLandmarksIds();
    }

    this.getLandmarkIDAsNaturalLanguage = (landmarkID) => {
        assertLandmark(landmarkID);
        return _restaurant.landmarks[landmarkID].getIDAsNaturalLanguage();
    }

    this.locateCustomer = (customerName) => {
        return _restaurant.locateCustomer(customerName);
    }

    this.whichRobotIsAtLandmark = (landmarkID) => {
        assertLandmark(landmarkID);
        try{
            let robot = _restaurant.getRobotAtLandmark(landmarkID);
            if (robot === null){
                return null;
            } else {
                return robot.robotID;
            }
        } catch (err){
            _manager.logError(err.stack);
            throw(Error(err));
        }
    }

    this.getFreeLandmarks = () => {
        return _restaurant.getFreeLandmarks();
    }

    this.isSeatFree = (landmarkID) => {
        assertLandmark(landmarkID);
        let landmark = _restaurant.getLandmark(landmarkID);
        if (!landmark.isSeat){
            _manager.logError(`The landmark is not a valid seat.`);
            throw(Error(err));
        }
        return landmark.customersList.length === 0;
    }

    this.isSeatClean = (landmarkID) => {
        assertLandmark(landmarkID);
        try{
            let [_, tableN, seatN] = landmarkID.split('-');
            return _restaurant.isSeatClean(tableN, seatN);
        } catch(err){
            _manager.logError(`The landmark is not a valid seat: ${err.stack}`);
            throw(Error(err));
        }
    }

    this.isRobotWalkingACustomer = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        return !robot.canPickUpCustomer();
    }

    this.canRobotGrabFood = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        return robot.canGrabFood();
    }

    this.canRobotTeleportToLandmark = (robotID, landmarkID) => {
        assertRobot(robotID);
        assertLandmark(landmarkID);
        if (landmarkID.startsWith('home')) {
            if (landmarkID === 'home' || landmarkID === `home-${robotID}`){
                return true;
            } else {
                return false;
            }
        }
        let robotAtLadmark = _restaurant.landmarks[landmarkID].attendedByRobot;
        return robotAtLadmark === null || robotAtLadmark === _restaurant.getRobot(robotID);
    }

    this.getRobotDistanceFromLandmark = (robotID, landmarkID) => {
        assertRobot(robotID);
        assertLandmark(landmarkID);
        let landmark = _restaurant.landmarks[landmarkID];
        let robot = _restaurant.robots[robotID];
        return Math.sqrt(Math.pow(landmark.position[0] - robot.position[0], 2) + Math.pow(landmark.position[1] - robot.position[1], 2));
    }

    this.localiseRobot = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        for (let [landmarkID, landmark] of Object.entries(_restaurant.landmarks)){
            if (landmark.attendedByRobot === robot){
                return landmarkID;
            }
        }

        // no landmark found for this robot!
        // this should not happen
        throw(Error(`${robotID} is not located in any landmark! Cannot localise.`));
    }

    this.teleportRobotToLandmark = (robotID, landmarkID) => {
        if (landmarkID === 'home'){
            landmarkID = `home-${robotID}`;
        }
        assertRobot(robotID);
        assertLandmark(landmarkID);
        if (landmarkID.startsWith('home') && landmarkID !== `home-${robotID}`){
            throw(Error(`${robotID} cannot teleport to another robot's home (${landmarkID})`));
        }
        if(!this.canRobotTeleportToLandmark(robotID, landmarkID)){
            throw(Error(`${landmarkID} looks like is already being attended by another robot`));
        }
        let distance = this.getRobotDistanceFromLandmark(robotID, landmarkID);
        _manager.log(`${robotID} is attempting to teleport to ${landmarkID}...`);
        let landmark = _restaurant.landmarks[landmarkID];
        return _restaurant.robots[robotID].teleportTo(landmark, distance).then((outcome) => {
            if (!(outcome instanceof Error)){
                _manager.log(`${robotID} successfully teleported to ${landmarkID}`);
                _manager.publish('robot_teleported', {robotID: robotID, landmarkID: landmarkID});
                return true;
            } else {
                _manager.logError(`${robotID} cannot teleport to ${landmarkID}: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.teleportRobotAtHome = (robotID) => {
        assertRobot(robotID);
        return this.teleportRobotToLandmark(robotID, 'home');
    }

    this.pickUpCustomer = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to pick up a customer...`);
        return robot.pickUpCustomer().then( (outcome) => {
            if (!(outcome instanceof Error)){
                let customerName = outcome;
                _restaurant.renderReceptionQueue();
                _manager.log(`${robotID} successfully picked up ${customerName} from the reception`);
                _manager.publish('robot_pickedup_customer', {robotID: robotID, customerName: customerName});
                return true;
            } else {
                _manager.logError(`${robotID} cannot pick up customer: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.seatCustomer = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to seat a customer...`);
        return robot.seatCustomer().then((outcome) => {
            if (!(outcome instanceof Error)){
                let customerName = outcome;
                _manager.publish('customer_seated', {customerName: customerName, landmarkID: robot.curRobotLandmark.landmarkID});
                _manager.log(`${robotID} successfully seated customer ${customerName} at ${robot.curRobotLandmark.landmarkID}`);
                return true;
            } else {
                _manager.logError(`${robotID} cannot seat customer: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.attendCustomerRequest = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to attend a customer...`);
        return robot.attendCustomerRequest(_restaurant.nCustomers).then((outcome) => {
            if (!(outcome instanceof Error)){
                let [request, customer] = outcome;
                _manager.log(`${robotID} successfully collected a request from ${customer.name}: ${request}`);
                _manager.publish('customer_attended', {robotID: robotID, customerName: customer.name});
                return request;
            } else {
                _manager.logError(`${robotID} cannot attend customer's request: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.newOrder = (customerName, foodName) => {
        try {
            _manager.log(`Creating an order for ${customerName}: ${foodName}`);
            let customer = _restaurant.getCustomerByName(customerName);
            if (customer === null){
                throw(Error(`The customer ${customerName} cannot be found. Did they leave the restaurant or is there a typo?`));
            }
            if (customer.dropoffLocation === null){
                throw(Error(`The customer ${customerName} is not seated at a table and it is not possible to generate an order for them.`));
            }
            _manager.publish(
                'new_order',
                {
                    customerName: customerName,
                    item: foodName
                }
            );
        } catch(error) {
            _manager.logError(`Cannot make an order: ${error.stack}`);
            return false;
        }
        _manager.log(`Successfully created an order for ${customerName}: ${foodName}`);
        return true;
    }

    this.takeFood = (robotID, foodName) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        let food;
        try{
            if (robot.curRobotLandmark.landmarkID !== 'kitchen'){
                throw(Error(`${robotID} is not at the kitchen. Robots can only take food from the kitchen`));
            }
            if(robot.grabbedFood !== null){
                throw(Error(`${robotID} cannot take any more food because it has already grabbed ${robot.grabbedFood.foodName}`));
            }
            let foodIndex = -1;
            for (let [index, val] of _restaurant.readyFood.entries()){
                if (val.foodName === foodName){
                    foodIndex = index;
                    break;
                }
            }
            if (foodIndex === -1){
                throw(Error(`There is no ${foodName} ready at the kitchen for collection`));
            }
            food = _restaurant.readyFood.splice(foodIndex, 1)[0];
        } catch (error){
            _manager.logError(`${robotID} cannot take food: ${error.stack}`);
            return false;
        }
        _manager.log(`${robotID} is attempting to take ${foodName} from the kitchen...`);
        return robot.takeFood(food).then( (outcome) => {
            if (!(outcome instanceof Error)){
                _restaurant.renderKitchenFood();
                _manager.log(`${robotID} successfully took ${food.foodName} from the kitchen`);
                _manager.publish('robot_grabbed_food', {robotID: robotID, foodName: food.foodName});
                return true;
            } else {
                _manager.logError(`${robotID} cannot take food: ${outcome.stack}`);
                return false;
            }
        }); 
    }

    this.serveFood = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to serve food...`);
        return robot.serveFood().then((outcome) => {
            if (!(outcome instanceof Error)){
                let [foodName, customerName] = outcome;
                _manager.log(`${robotID} successfully served ${foodName} to ${customerName} at ${robot.curRobotLandmark.landmarkID}`);
                _manager.publish('food_served', {
                    foodName: foodName,
                    customerName: customerName
                });
                return true;
            } else {
                _manager.logError(`${robotID} cannot serve food: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.throwAwayFood = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to throw away the grabbed food...`);
        return robot.throwAwayFood().then((outcome) => {
            if (!(outcome instanceof Error)){
                _manager.log(`${robotID} successfully threw away the grabbed food`);
                return true;
            } else {
                _manager.logError(`${robotID} cannot throw away food: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.cleanSeat = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to clean ${robot.curRobotLandmark.landmarkID}...`);
        return robot.cleanSeat().then((outcome) => {
            if (!(outcome instanceof Error)){
                _manager.log(`${robotID} successfully cleaned the seat at ${robot.curRobotLandmark.landmarkID}`);
                return true;
            } else {
                _manager.logError(`${robotID} cannot clean seat: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.billCustomer = (robotID, billTotal) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        _manager.log(`${robotID} is attempting to bill a customer...`);
        return robot.billCustomer(billTotal).then((outcome) => {
            if (!(outcome instanceof Error)){
                let customerName = outcome;
                _manager.publish('customer_billed', {customerName: customerName, billTotal:billTotal});
                _manager.log(`${robotID} successfully billed ${customerName} an amount of $${billTotal}`);
                return true;
            } else {
                _manager.logError(`${robotID} cannot bill the customer: ${outcome.stack}`);
                return false;
            }
        });
    }

    this.canAcquireRobot = (robotID) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        return robot.canBeAcquired();
    }

    this.acquireRobot = (robotID, waitForToken) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        if (robot.acquisitionTokens.length > 0 && !waitForToken){
            return null;
        }
        return robot.acquireRobot();
    }

    this.releaseRobot = (robotID, token) => {
        assertRobot(robotID);
        let robot = _restaurant.robots[robotID];
        return robot.releaseRobot(token);
    }

    this.getNumberOfCustomers = () => {
        return _restaurant.nCustomers;
    }

    this.getFoodPrice = (foodName) => {
        return _restaurant.getFoodPrice(foodName);
    }

    this.getMenuList = () => {
        return _restaurant.getMenuList();
    }

    this.publish = (topic, msg) => {
        _manager.publish(topic, msg);
    }

    this.subscribe = (topic, callback) => {
        return _manager.subscribe(topic, callback);
    }

    this.unsubscribe = (subID) => {
        return _manager.unsubscribe(subID);
    }

    this.log = (logText) => {
        _manager.log(logText);
    }

    this.logError = (errorMessage) => {
        _manager.logError(errorMessage);
    }

    this.logWarning = (warningMessage) => {
        _manager.logWarning(warningMessage);
    }

    this.logEvent = (eventMessage) => {
        _manager.logEvent(eventMessage);
    }

    this.verbose = (verboseState) => {
        if (verboseState === true){
            _manager.verbose = true;
        } else {
            _manager.verbose = false;
        }
    }

    // DEBUG

    this.debug = {
        generateWaitingCustomer(waitingTime){
            let rndIdx = rnd(0, _utCustomersNames.length - 1);
            let [customerName, customerSurname] = _utCustomersNames[rndIdx].split(' ');
            let rndNum = rnd(1, 20);
            customerName = `${customerName} T-${rndNum}`;
            _restaurant.newCustomerArrives(customerName, waitingTime);
            _testCustomers.push(customerName);
            return customerName;
        },

        triggerCustomerRequest(customerName, request, waitForever){
            let customer = _restaurant.getCustomerByName(customerName);
            if (customer === null){
                throw(Error(`It is not possible to find the customer ${customerName}. Did they leave the restaurant?`));
            }
            if (customer)
            customer.requireAttention(request, waitForever);
        },

        generateRandomRequest(isFoodRequest){
            let request;
            if (isFoodRequest){
                let nAvailableFoods = Object.keys(_restaurant.menu).length;
                let rndFoodIdx = rnd(0, nAvailableFoods - 1);
                let foodName = Object.values(_restaurant.menu)[rndFoodIdx].foodName;
                Object.values(_restaurant.menu)[rndFoodIdx];
                request = createFoodRequest(foodName);
            } else {
                request = createBillRequest();
            }
            return request;
        },

        triggerRandomCustomerRequest(customerName, waitForever){
            let request = this.generateRandomRequest(Math.random() > 0.5);
            this.triggerCustomerRequest(customerName, request, waitForever);
            return request;
        },

        generateSeatedCustomer(landmarkID){
            assertLandmark(landmarkID);
            let landmark = _restaurant.getLandmark(landmarkID);
            if (!landmark.isSeat){
                throw(Error(`${landmarkID} is not a valid seat.`));
            }
            if (landmark.customersList.length > 0){
                throw(Error(`There is already someone seated at ${landmarkID}.`));
            }
            this.generateWaitingCustomer(0);
            let customer = _restaurant.getLandmark('reception').customersList.pop();
            customer.clearWaitingTimeout();
            let [t, tn, seat] = landmarkID.split('-');
            customer.currentSeat = `seat${seat}`;
            landmark.customersList.push(customer);
            landmark.displayElementAtLocation(
                customer,
                customer.currentSeat
            )
            customer.htmlElement.getTileElement().classList.value = 'user-seated';
        }
    }

    // SPEECH-TO-TEXT
    
    //let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    let _speechRecognitionObj;
    try{
        _speechRecognitionObj = new webkitSpeechRecognition();
    } catch(err){
        _speechRecognitionObj = new SpeechRecognition();
    }

    _speechRecognitionObj.continuous = false; // making it stop at the end of an utterance
    _speechRecognitionObj.lang = 'en-US'; // setting the language to English
    _speechRecognitionObj.interimResults = false; // no interim results
    _speechRecognitionObj.maxAlternatives = 1; // only one alternative available as result
    
    // function to listen using the speech recognition of the browser
    this.listen = (callback) => {
        // setting what to do once we get a result
        _speechRecognitionObj.onresult = function(event){
            var result = event.results[0][0].transcript;
            gameController.logEvent('Heard: ' + result);
            callback(result);
        }

        // opening the mic and start listening
        gameController.log('Started listening...');
        _speechRecognitionObj.start();
    }

    // UNIT TESTS

    let _utCustomersNames = [
        'Jon Bowl',
        'Caroline Chips',
        'Mary Berry',
        'Edward Peach',
        'Carol Knife',
        'Betty Plate',
        'Alex Basil',
        'Bob Parsley',
        'George Almond',
        'Anna Salt',
        'Robert Oats'
    ]
    
    let _utSubscribers = [];
    
    let _utNCommandsT1 = 5;
    
    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function customersGenerator(customers){
        await sleep(3000);
        for (let customer of customers){
            let timeout = 10000;
            if (gameController.getNumberOfCustomers() > 0){
                timeout *= gameController.getNumberOfCustomers();
            }
            _restaurant.newCustomerArrives(customer, timeout);
            await sleep(rnd(10000, 13000));
        }
    }
    
    async function startRequestsChain(customerName, requests, marker){
        // assumption: this function starts when the customer is seated
        // and once the customer is seated they cannot move
        // i.e. they will always remain at a table seat landmark unless they leave
        let total = 0;
        for (let request of requests){
            let landmarkID = _restaurant.locateCustomer(customerName);
            if (landmarkID !== null){
                let customer = _restaurant.landmarks[landmarkID].customersList[0];
                await sleep(rnd(3000, 8000));
                let subScore, subScoreWrong;
                if (request.type === 'food'){
                    subScore = _manager.subscribe('new_order', (msg) => {
                        if (msg.customerName === customerName){
                            total += _restaurant.getFoodPrice(msg.item);
                            if (request.foodName === msg.item){
                                marker.recordScore(1, `a correct order for ${msg.customerName} was created: ${msg.item}`, true);
                            } else {
                                marker.recordScore(0.5, `${msg.customerName}'s request was not managed completely correctly. The customer asked for ${request.foodName} but the robot ordered ${msg.item}`, true);
                            }
                            let subFoodServed = _manager.subscribe('food_served', (msgServed) => {
                                if (msgServed.customerName === customerName){
                                    if (msg.item === msgServed.foodName){
                                        marker.recordScore(1, `${msgServed.customerName} received the correct food: ${msg.item}`, true);
                                    }
                                    _manager.unsubscribe(subFoodServed);
                                }
                            });
                        }
                    });
                    subScoreWrong = _manager.subscribe('customer_billed', (msg) => {
                        if (msg.customerName === customerName){
                            marker.recordScore(0, `${msg.customerName}'s request was not managed correctly. Actual request type: ${request.type} -> Robot action: Ordered ${msg.item}`, false);
                        }
                    });
                } else {
                    // type bill
                    subScore = _manager.subscribe('customer_billed', (msg) => {
                        if (msg.customerName === customerName){
                            if (msg.billTotal == total){
                                marker.recordScore(1, `${msg.customerName} correctly received the bill with a correct amount`, true);
                            } else {
                                marker.recordScore(0.5, `${msg.customerName} correctly received the bill, but with a wrong amount`, true);
                            }
                        }
                    });
                    subScoreWrong = _manager.subscribe('new_order', (msg) => {
                        if (msg.customerName === customerName){
                            marker.recordScore(0, `${msg.customerName}'s request was not managed correctly. Actual request type: ${request.type} -> Robot action: Ordered ${msg.foodName}`, false);
                            // this was the last request of the customer (bill)
                            _manager.publish('customer_no_more_requests', {customerName: customerName});
                        }
                    });
                }
                customer.requireAttention(request.requestStr, false);
                let subAttendance, subLeave;
                let waitAttendancePromise = new Promise(
                    (resolve) => {
                        let callback = (msg) => {
                            if (msg.customerName === customerName){
                                resolve();
                            }
                        }
                        subAttendance = _manager.subscribe('customer_finished_meal', callback);
                        subLeave = _manager.subscribe('customer_left', callback);
                    }
                ).then( () => {
                    _manager.unsubscribe(subAttendance);
                    _manager.unsubscribe(subLeave);
                    _manager.unsubscribe(subScore);
                    _manager.unsubscribe(subScoreWrong);
                }
                );
                await waitAttendancePromise;
            } else {
                // customer left the restaurant
                break;
            }
        }
    }
    
    function unregisterSubscribers(){
        for (let sub of _utSubscribers){
            _manager.unsubscribe(sub);
        }
        _utSubscribers.splice(0, _utSubscribers.length);
    }
    
    function endOfSimulation(marker, taskName, seed){
        marker.report(taskName, seed);
    }
    
    function cleanLogs(){
        let l = document.getElementById('logs');
        while (l.children.length > 0){
            l.children[0].remove();
        }
    }
    
    function disableCommandButtons(status){
        document.getElementById('input-text-command').disabled = status;
        document.getElementById('button-text-command').disabled = status;
        document.getElementById('button-voice-command').disabled = status;
    }
    
    // to manage commands for teleportation
    _manager.subscribe('new_command', async (msg) => {
        try{
            let robot = _restaurant.getRobot(msg.robotID);
            await gameController.teleportRobotToLandmark(msg.robotID, msg.landmarkID);
        } catch (err) {
            _manager.logError(`Teleportation failed: ${err.stack}`);
        } finally {
            _manager.publish('command_executed', {});
        }
    });
    
    async function runTask1(seed){
        gameController.verbose(true);
        disableCommandButtons(true);
        unregisterSubscribers();
        cleanLogs();
        Math.seedrandom(seed);
        let marker = new Marker(_utNCommandsT1, 1, _manager);
        _manager.publish('new_simulation', {
            scenarioTitle: 'Task 1 simulation',
            maxMark: 1,
            maxScore: _utNCommandsT1
        });
        let commands = [
            'teleport to',
            'move to',
            'go to'
        ];
        for (let i = 0; i < _utNCommandsT1; i++){
            let randomIdx = rnd(0, _restaurant.getRobotsIds().length-1);
            let robotID = _restaurant.getRobotsIds()[randomIdx];
            let rndCommandIdx = rnd(0, commands.length - 1);
            let landmarkID = null;
            while (landmarkID === null || landmarkID.startsWith('home')){
                let randomLandmarkIdx = rnd(0, _restaurant.getFreeLandmarks().length-1);
                landmarkID = _restaurant.getFreeLandmarks()[randomLandmarkIdx];
            }
            let curTest = {
                command: `${robotID} ${commands[rndCommandIdx]} ${_restaurant.getLandmark(landmarkID).getIDAsNaturalLanguage()}`,
                expected: {robotID: robotID, landmarkID: landmarkID}
            };
            _manager.logEvent(`Generated new random command: ${curTest.command}`);
            let promise = new Promise((resolve) => {
                let timeout = setTimeout(() => {
                    _manager.logError('The message for the topic new_command was not published within 4 seconds. Timeout.');
                    _manager.unsubscribe(mySub);
                    _manager.publish('command_executed', {});
                    resolve();
                }, 4000);
                let mySub = _manager.subscribe('new_command', (msg) => {
                    let targetRobot, targetLandmark;
                    try{
                        targetRobot = msg.robotID;
                        targetLandmark = msg.landmarkID;
                        if (curTest['expected']['robotID'] === targetRobot && curTest['expected']['landmarkID'] === targetLandmark){
                            marker.recordScore(1, `Command '${curTest.command}' correctly parsed`, true);
                        } else {
                            marker.recordScore(0, `Command '${curTest.command}' incorrectly parsed`, false);
                        }
                    } catch (err) {
                        _manager.logError(err.stack);
                    } finally {
                        _manager.unsubscribe(mySub);
                        clearTimeout(timeout);
                        resolve();
                    }
                });
                
            });
            let promiseWaitCommand = new Promise((resolve) => {
                let mySub = _manager.subscribe('command_executed', (msg) => {
                    _manager.unsubscribe(mySub);
                    resolve();
                });
            });
            document.getElementById('input-text-command').value = curTest.command;
            document.getElementById('button-text-command').disabled = false;
            document.getElementById('button-text-command').click();
            document.getElementById('button-text-command').disabled = true;
            await promise;
            await promiseWaitCommand;
        }
        document.getElementById('input-text-command').value = '';
        disableCommandButtons(false);
        endOfSimulation(marker, 'Task 1', seed);
    }
    
    async function runTask2(seed){
        disableCommandButtons(true);
        unregisterSubscribers();
        cleanLogs();
        Math.seedrandom(seed);
        let marker = new Marker(3, 1.5, _manager);
        _manager.publish('new_simulation', {
            scenarioTitle: 'Task 2 simulation',
            maxMark: 1.5,
            maxScore: 3
        });
        let green = _restaurant.getRobot('green');
        let pink = _restaurant.getRobot('pink');
        let yellow = _restaurant.getRobot('yellow');
        
        // first test: the landmark is free
        let robotIdx = rnd(0, _restaurant.getRobotsIds().length-1);
        let robotID = _restaurant.getRobotsIds()[robotIdx];
        let robot = _restaurant.getRobot(robotID);
        let randomLandmarkIdx = rnd(0, _restaurant.getFreeLandmarks().length-1);
        let landmarkID = _restaurant.getLandmarksIds()[randomLandmarkIdx];
    
        _manager.logEvent(`Starting test 1: ${robotID} must teleport to ${landmarkID}`);
        let token = await robot.acquireRobot();
        try{
            await safeTeleportTo(robotID, landmarkID);
            if (gameController.localiseRobot(robotID) === landmarkID){
                marker.recordScore(1, `${robotID} successfully teleported to ${landmarkID}`, true);
            } else {
                marker.recordScore(0, `${robotID} did not teleport to ${landmarkID}`, false);
            }
        } catch (err){
            _manager.logError(`Error during task 2: ${err.stack}`);
            marker.recordScore(0, `${robotID} did not teleport to ${landmarkID}`, false);
        } finally {
            robot.releaseRobot(token);
        }
        _manager.logEvent(`End of test 1`);
        
        // second test: the landmark is not free
        robotIdx = rnd(0, _restaurant.getRobotsIds().length-1);
        robotID = _restaurant.getRobotsIds()[robotIdx];
        robot = _restaurant.getRobot(robotID);
        let otherRobotID = (robotIdx < _restaurant.getRobotsIds().length-1) ? _restaurant.getRobotsIds()[robotIdx + 1] : _restaurant.getRobotsIds()[0];
        let otherRobot = _restaurant.getRobot(otherRobotID);
        landmarkID = null;
        while (landmarkID === null || landmarkID.startsWith('home')){
            randomLandmarkIdx = rnd(0, _restaurant.getFreeLandmarks().length-1);
            landmarkID = _restaurant.getFreeLandmarks()[randomLandmarkIdx];
        }
        await gameController.teleportRobotToLandmark(otherRobotID, landmarkID);

        _manager.logEvent(`Starting test 2: ${robotID} must teleport to ${landmarkID}`);
        token = await robot.acquireRobot();
        try{
            await safeTeleportTo(robotID, landmarkID);
            if (gameController.localiseRobot(robotID) === landmarkID){
                marker.recordScore(1, `${robotID} successfully teleported to ${landmarkID}`, true);
            } else {
                marker.recordScore(0, `${robotID} did not teleport to ${landmarkID}`, false);
            }
        } catch (err){
            _manager.logError(`Error during task 2: ${err.stack}`);
            marker.recordScore(0, `${robotID} did not teleport to ${landmarkID}`, false);
        } finally {
            robot.releaseRobot(token);
        }
        _manager.logEvent(`End of test 2`);
    
        //third test: the landmark is not free and the other robot is
        // temporarily busy
        robotIdx = rnd(0, _restaurant.getRobotsIds().length-1);
        robotID = _restaurant.getRobotsIds()[robotIdx];
        robot = _restaurant.getRobot(robotID);
        otherRobotID = (robotIdx < _restaurant.getRobotsIds().length-1) ? _restaurant.getRobotsIds()[robotIdx + 1] : _restaurant.getRobotsIds()[0];
        otherRobot = _restaurant.getRobot(otherRobotID);
        landmarkID = null;
        while (landmarkID === null || landmarkID.startsWith('home')){
            randomLandmarkIdx = rnd(0, _restaurant.getFreeLandmarks().length-1);
            landmarkID = _restaurant.getFreeLandmarks()[randomLandmarkIdx];
        }
    
        await gameController.teleportRobotToLandmark(otherRobotID, landmarkID);
        let promise = new Promise((resolve) => {
            otherRobot.acquireRobot().then(
                (otherToken) => {
                    otherRobot.startProcess('dancing');
                    otherRobot.htmlElement.setStatus('clock', '');
                    setTimeout(() => {
                        otherRobot.endProcess();
                        otherRobot.htmlElement.setStatus('', '');
                        otherRobot.releaseRobot(otherToken);
                        resolve();
                    }, rnd(3500, 6000));
                }
            );
        });
    
        _manager.logEvent(`Starting test 3: ${robotID} must teleport to ${landmarkID}`);
        token = await robot.acquireRobot();
        try{
            await safeTeleportTo(robotID, landmarkID);
            if (gameController.localiseRobot(robotID) === landmarkID){
                marker.recordScore(1, `${robotID} successfully teleported to ${landmarkID}`, true);
            } else {
                marker.recordScore(0, `${robotID} did not teleport to ${landmarkID}`, false);
            }
        } catch (err){
            _manager.logError(`Error during task 2: ${err.stack}`);
            marker.recordScore(0, `${robotID} did not teleport to ${landmarkID}`, false);
        } finally {
            robot.releaseRobot(token);
        }
        await promise;
        _manager.logEvent(`End of test 3`);
        
        disableCommandButtons(false);
        endOfSimulation(marker, 'Task 2', seed);
    }
    
    async function runTask3(seed){
        disableCommandButtons(true);
        unregisterSubscribers();
        cleanLogs();
        Math.seedrandom(seed);
        let marker = new Marker(3, 1.5, _manager);
        _manager.publish('new_simulation', {
            scenarioTitle: 'Task 3 simulation',
            maxMark: 1.5,
            maxScore: 3
        });
        let subTeleport = _manager.subscribe(
            'robot_teleported',
            (msg) => {
                if(msg.landmarkID === 'reception'){
                    marker.recordScore(1, `${msg.robotID} successfully teleported to the reception`, true);
                    _manager.unsubscribe(subTeleport);
                }
            }
        );
        let subPickup = _manager.subscribe(
            'robot_pickedup_customer',
            (msg) => {
                marker.recordScore(1, `${msg.robotID} successfully picked up ${msg.customerName}`, true);
                _manager.unsubscribe(subPickup);
            }
        );
        let subSeat = _manager.subscribe(
            'customer_seated',
            (msg) => {
                marker.recordScore(1, `${msg.customerName} successfully seated at ${msg.landmarkID}`, true);
                _manager.unsubscribe(subSeat);
            }
        );

        // generates random seated customers
        let nRndCustomers = 10;
        let freeLandmarks = gameController.getFreeLandmarks();
        let freeSeats = [];
        for (let l of freeLandmarks){
            if (l.startsWith('table')){
                freeSeats.push(l);
            }
        }
        freeSeats.sort(function() {
            return .5 - Math.random();
        })
        for (let i = 1; i <= nRndCustomers; i++){
            let isFree = false;
            _restaurant.newCustomerArrives(_utCustomersNames[i], 0);
            let customer = _restaurant.getLandmark('reception').customersList.pop();
            let landmark = _restaurant.getLandmark(freeSeats[i]);
            customer.clearWaitingTimeout();
            let [t, tn, seat] = freeSeats[i].split('-');
            customer.currentSeat = `seat${seat}`;
            landmark.customersList.push(customer);
            landmark.displayElementAtLocation(
                customer,
                customer.currentSeat
            )
            customer.htmlElement.getTileElement().classList.value = 'user-seated';
        }

        _restaurant.newCustomerArrives(_utCustomersNames[0], 0);
        await welcomeAndSeatCustomer();
    
        disableCommandButtons(false);
        endOfSimulation(marker, 'Task 3', seed);
    }
    
    async function runTask4(seed){
        disableCommandButtons(true);
        unregisterSubscribers();
        cleanLogs();
        Math.seedrandom(seed);
        let marker = new Marker(3, 1.5, _manager);
        _manager.publish('new_simulation', {
            scenarioTitle: 'Task 4 simulation',
            maxMark: 1.5,
            maxScore: 3
        });
        let rndTable = rnd(1, 3);
        let rndSeat = rnd(1, 4);
        _restaurant.newCustomerArrives(_utCustomersNames[0], 0);
        let customer = _restaurant.getLandmark('reception').customersList.pop();
        let landmark = _restaurant.getLandmark(`table-${rndTable}-${rndSeat}`);
        customer.clearWaitingTimeout();
        customer.currentSeat = `seat${rndSeat}`;
        landmark.customersList.push(customer);
        landmark.displayElementAtLocation(
            customer,
            customer.currentSeat
        )
        customer.htmlElement.getTileElement().classList.value = 'user-seated';
        let request = null;
        let topicHandler;
        if (Math.random() > 0.5){
            let nAvailableFoods = Object.keys(_restaurant.menu).length;
            let randomFoodIdx = rnd(0, nAvailableFoods - 1);
            let randomFood = Object.values(_restaurant.menu)[randomFoodIdx];
            request = createFoodRequest(`${randomFood.preposition} ${randomFood.foodName}`.trim())
            topicHandler = 'new_order';
        } else {
            request = createBillRequest();
            topicHandler = 'customer_billed';
        }
        let subTeleport = _manager.subscribe(
            'robot_teleported',
            (msg) => {
                if(msg.landmarkID === landmark.landmarkID){
                    marker.recordScore(1, `${msg.robotID} successfully teleported to the customer`, true);
                    _manager.unsubscribe(subTeleport);
                }
            }
        );
        let subAttendance = _manager.subscribe(
            'customer_attended',
            (msg) => {
                marker.recordScore(1, `${msg.robotID} successfully attended the customer`, true);
                _manager.unsubscribe(subAttendance);
            }
        );
        let subHandler = _manager.subscribe(
            topicHandler,
            (msg) => {
                marker.recordScore(1, `${msg.customerName}'s request successfully handled`, true);
                _manager.unsubscribe(subHandler);
            }
        );
        let subRequest = _manager.subscribe(
            'customer_requiring_attention',
            (msg) => {
                attendCustomerRequest(
                    msg.customerLocation,
                    msg.customerName
                ).then(() => {
                    disableCommandButtons(false);
                    endOfSimulation(marker, 'Task 4', seed);
                });
                _manager.unsubscribe(subRequest);
            }
        );
        customer.requireAttention(request, true);
    }
    
    async function runTask5(seed){
        disableCommandButtons(true);
        unregisterSubscribers();
        cleanLogs();
        Math.seedrandom(seed);
        let marker = new Marker(3, 1.5, _manager);
        _manager.publish('new_simulation', {
            scenarioTitle: 'Task 5 simulation',
            maxMark: 1.5,
            maxScore: 3
        });
        let rndTable = rnd(1, 3);
        let rndSeat = rnd(1, 4);
        _restaurant.newCustomerArrives(_utCustomersNames[0], 0);
        let customer = _restaurant.getLandmark('reception').customersList.pop();
        let landmark = _restaurant.getLandmark(`table-${rndTable}-${rndSeat}`);
        customer.clearWaitingTimeout();
        customer.currentSeat = `seat${rndSeat}`;
        landmark.customersList.push(customer);
        landmark.displayElementAtLocation(
            customer,
            customer.currentSeat
        )
        customer.htmlElement.getTileElement().classList.value = 'user-seated';
        let oldFood = new Food('pasta', 'the', 
        new GraphicElement('oldpasta', 'pasta', 'plate-empty', 'food-label'),
        20, 12);
        oldFood.htmlElement.getLabelElement().style.opacity = 0;
        _restaurant.addTileToCanvas(oldFood.htmlElement.getContainerElement());
        landmark.servedFood = oldFood;
        landmark.displayElementAtLocation(oldFood, `meal${rndSeat}`);
        let nAvailableFoods = Object.keys(_restaurant.menu).length;
        let randomFoodIdx = rnd(0, nAvailableFoods - 1);
        let randomFood = Object.values(_restaurant.menu)[randomFoodIdx];
        
        let subTeleport = _manager.subscribe(
            'robot_teleported',
            (msg) => {
                if(msg.landmarkID === 'kitchen'){
                    marker.recordScore(1, `${msg.robotID} successfully teleported to the kitchen`, true);
                    _manager.unsubscribe(subTeleport);
                }
            }
        );
        let subFoodGrabbed = _manager.subscribe(
            'robot_grabbed_food',
            (msg) => {
                if (msg.foodName === randomFood.foodName){
                    marker.recordScore(1, `${msg.robotID} successfully grabbed ${msg.foodName}`, true);
                    _manager.unsubscribe(subFoodGrabbed);
                }
            }
        );
        let subServed = _manager.subscribe(
            'food_served',
            (msg) => {
                if (msg.foodName === randomFood.foodName){
                    marker.recordScore(1, `${msg.robotID} successfully served ${msg.foodName}`, true);
                    _manager.unsubscribe(subServed);
                }
            }
        );
        let subFoodReady = _manager.subscribe(
            'food_ready',
            (msg) => {
                deliverFood(msg.foodName, msg.landmarkID).then(() => {
                    disableCommandButtons(false);
                    endOfSimulation(marker, 'Task 5', seed);
                });
                _manager.unsubscribe(subFoodReady);
            }
        );
        
        gameController.newOrder(customer.name, randomFood.foodName);
        customer.waitToBeAttended(0);
    }
    
    async function runTask6(seed){
        disableCommandButtons(true);
        unregisterSubscribers();
        cleanLogs();
        Math.seedrandom(seed);
        setupGameSubscribers();
        let maxMark = 3;
        let nCustomers = rnd(5, 7);
        _utCustomersNames.sort(() => Math.random() - 0.5);
        let customersLogic = {};
        let nAvailableFoods = Object.keys(_restaurant.menu).length;
        let maxScore = 0;
        for (let i = 0; i < nCustomers; i++){
            customersLogic[_utCustomersNames[i]] = {
                requests: []
            };
            let nOrders = rnd(2, 3);
            for (let j = 0; j < nOrders; j++){
                let randomFoodIdx = rnd(0, nAvailableFoods - 1);
                let randomFood = Object.values(_restaurant.menu)[randomFoodIdx];
                customersLogic[_utCustomersNames[i]].requests.push(
                    {
                        type: 'food',
                        requestStr: createFoodRequest(`${randomFood.preposition} ${randomFood.foodName}`.trim()),
                        foodName: randomFood.foodName,
                        prepTime: randomFood.maxPrepTime
                    }
                );
            }
            customersLogic[_utCustomersNames[i]].requests.push(
                {
                    type: 'bill',
                    requestStr: createBillRequest(),
                    foodName: '',
                    prepTime: 15
                }
            );
            maxScore += 2 + nOrders*2;
        }
        let marker = new Marker(maxScore, maxMark, _manager);
        _manager.publish('new_simulation', {
            scenarioTitle: 'Waiter game simulation (Task 6)',
            maxMark: maxMark,
            maxScore: maxScore
        });
        let seatSub = _manager.subscribe('customer_seated',
            (msg) => {
                marker.recordScore(1, `${msg.customerName} correctly seated at the table`, true);
            }
        );
        _utSubscribers.push(seatSub);
        customersGenerator(Object.keys(customersLogic));
        let subReqChain = _manager.subscribe('customer_seated', 
            (msg) => {
                startRequestsChain(msg.customerName, customersLogic[msg.customerName].requests, marker);
            }
        );
        _utSubscribers.push(subReqChain);
        let customersAtTheRestaurant = Object.keys(customersLogic).length;
        let subLeft = _manager.subscribe('customer_left',
            (msg) => {
                customersAtTheRestaurant--;
                if (customersAtTheRestaurant == 0){
                    endOfSimulation(marker, 'Task 6', seed);
                    disableCommandButtons(false);
                }
            }
        );
        _utSubscribers.push(subLeft);
        let subNoMoreRequests = _manager.subscribe('customer_no_more_requests',
            (msg) => {
                customersAtTheRestaurant--;
                if (customersAtTheRestaurant == 0){
                    endOfSimulation(marker, 'Task 6', seed);
                    disableCommandButtons(false);
                }
            }
        );
        _utSubscribers.push(subNoMoreRequests);
        return customersLogic;
    }
    
    this.parseGETRequest = async () => {
        if (!_requestGETParsed){
            _requestGETParsed = true;
            let url = new URL(window.location.href);
            let urlParams = new URLSearchParams(url.search);
            let simulationTask = urlParams.get('task');
            let seedTask = urlParams.get('seed');
            if (simulationTask !== null){
                switch (simulationTask){
                    case 'task1':
                        if (seedTask === null){
                            seedTask = Date.now()+'';
                        }
                        await runTask1(seedTask);
                        break;
                    case 'task2':
                        if (seedTask === null){
                            seedTask = Date.now()+'';
                        }
                        await runTask2(seedTask);
                        break;
                    case 'task3':
                        if (seedTask === null){
                            seedTask = Date.now()+'';
                        }
                        await runTask3(seedTask);
                        break;
                    case 'task4':
                        if (seedTask === null){
                            seedTask = Date.now()+'';
                        }
                        await runTask4(seedTask);
                        break;
                    case 'task5':
                        if (seedTask === null){
                            seedTask = Date.now()+'';
                        }
                        await runTask5(seedTask);
                        break;
                    case 'task6':
                        if (seedTask === null){
                            seedTask = Date.now()+'';
                        }
                        await runTask6(seedTask);
                        break;
                }
            }
        }
    } 
}

const gameController = new GameController();