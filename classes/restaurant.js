class Restaurant {
    constructor(manager) {
        this.manager = manager;
        this.landmarks = {};

        this.robots = {};

        this.menu = {
            'espresso': new Food('espresso', 'an',  null, 3.5, 2),
            'latte': new Food('latte', 'a', null, 4.5, 2),
            'cappuccino': new Food('cappuccino', 'a', null, 4.5, 2),
            'toast': new Food('toast', 'a', null, 7, 7),
            'salad': new Food('salad', 'a', null, 10, 10),
            'chips': new Food('chips', '', null, 8, 10),
            'pasta': new Food('pasta', 'the', null, 20, 12),
            'risotto': new Food('risotto', 'the', null, 22, 12),
            'pizza': new Food('pizza', 'a', null, 25, 12),
            'chicken': new Food('chicken', 'the', null, 22, 15),
            'steak': new Food('steak', 'the', null, 30, 15),
            'lamb': new Food('lamb', 'the', null, 28, 15),
            'barramundi': new Food('barramundi', 'the', null, 30, 15),
            'salmon': new Food('salmon', 'the', null, 28, 15)
        };

        this.readyFood = [];
        this.inPreparationFood = [];
        this.progressiveFoodID = 0;
        this.nCustomers = 0;

        this.manager.subscribe(
            'new_order', (msg) => {
                this.cookOrder(msg);
            }
        );

        this.manager.subscribe(
            'customer_left', (msg) => {
                this.customerLeft(msg);
            }
        );
    }

    customerLeft(msg){
        let customerName = msg.customerName;
        let landmarkID = msg.landmarkID;
        let customerIdx = this.landmarks[landmarkID].customersList.findIndex(
            (value) => {
                return value.name === customerName;
            }
        );
        this.landmarks[landmarkID].customersList.splice(customerIdx, 1);
        this.renderReceptionQueue(); // just in case the customer was at the reception
        this.nCustomers--;
    }

    addRobot(robot, landmark){
        if (landmark.attendedByRobot === null){
            landmark.attendedByRobot = robot;
        } else {
            throw(Error('The landmark ' + landmark.landmarkID + ' is already attended by ' + landmark.attendedByRobot.robotID));
        }
        robot.curRobotLandmark = landmark;
        this.robots[robot.robotID] = robot;
        this.addTileToCanvas(robot.htmlElement.getContainerElement());
        landmark.displayElementAtLocation(robot, 'default');
    }

    addLandmark(landmark){
        this.landmarks[landmark.landmarkID] = landmark;
    }

    getRobotsIds() {
        let robotList = [];
        for (let [robotID, robot] of Object.entries(this.robots)){
            robotList.push(robotID);
        }
        return robotList;
    }

    getLandmarksIds() {
        let landmarkList = [];
        for (let [landmarkID, landmark] of Object.entries(this.landmarks)){
            landmarkList.push(landmarkID);
        }
        return landmarkList;
    }

    getRobot(robotId){
        if (robotId in this.robots){
            return this.robots[robotId];
        } else {
            throw(Error(`There is no robot with id ${robotId}`));
        }
    }

    getLandmark(landmarkId){
        if (landmarkId in this.landmarks){
            return this.landmarks[landmarkId];
        } else {
            throw(Error(`There is no landmark with id ${landmarkId}`));
        }
    }

    getRobotAtLandmark(landmarkID){
        if (landmarkID in this.landmarks){
            return this.getLandmark(landmarkID).attendedByRobot;
        } else {
            throw(Error(`${landmarkID} is not a valid landmark. Is there a typo?`));
        }
    }

    getFreeLandmarks(){
        let landmarkList = [];
        for (let [landmarkID, landmark] of Object.entries(this.landmarks)){
            if (landmark.attendedByRobot === null){
                landmarkList.push(landmarkID);
            }
        }
        return landmarkList;
    }

    getMenuList(){
        return Object.keys(this.menu);
    }

    getFoodPrice(foodName){
        if (foodName in this.menu){
            return this.menu[foodName].price;
        } else {
            throw(Error(`${foodName} is not on the menu`));
        }
    }

    cookOrder(orderMsg){
        this.manager.log('Kitchen received a new order for ' + orderMsg.item);
        let food;
        if (orderMsg.item in this.menu){
            food = new Food(
                this.menu[orderMsg.item].foodName,
                this.menu[orderMsg.item].preposition,
                null,
                this.menu[orderMsg.item].price,
                this.menu[orderMsg.item].maxPrepTime
            );
        } else {
            throw(Error('There is no \'' + orderMsg.item + '\' on the menu. Perhaps do you have a typo?'));
        }
        let customer = this.getCustomerByName(orderMsg.customerName);
        if (customer === null){
            throw(Error(`There is no customer ${orderMsg.customerName} at the restaurant. Maybe they already left`));
        }
        customer.isExpectingFood = true;
        let landmarkID = this.locateCustomer(orderMsg.customerName);
        let foodGraphic = new GraphicElement(`${food.foodName}-${this.progressiveFoodID}`, food.foodName, 'plate-full', 'food-label');
        this.progressiveFoodID += 1;
        food.htmlElement = foodGraphic;
        this.addTileToCanvas(foodGraphic.getContainerElement());
        this.landmarks.kitchen.displayElementAtLocation(food, 'middle');
        this.inPreparationFood.push(food);
        this.renderKitchenFood();
        let cooking = new Promise(
            (resolve, reject) => {
                let cookingTime = (food.maxPrepTime + Math.random()*5) * 1000;
                this.manager.log('Chef is preparing ' + food.foodName);
                setTimeout(resolve, cookingTime);
            }
        ).then(
            () => {
                this.manager.logEvent('New food ready at the kitchen for collection');
                let idx = this.inPreparationFood.findIndex((obj) => {return obj === food});
                if (idx != -1){
                    this.inPreparationFood.splice(idx, 1);
                }                
                this.readyFood.push(food);
                this.renderKitchenFood();
                setTimeout(() => {
                    this.manager.publish('food_ready', {foodName: food.foodName, landmarkID: landmarkID});
                }, 1500);
            }
        );
    }

    isSeatClean(tableN, seatN){
        let landmarkID = `table-${tableN}-${seatN}`;
        if (landmarkID in this.landmarks){
            let landmark = this.landmarks[landmarkID];
            return landmark.servedFood === null;
        } else {
            throw(Error(`There is no seat for table ${tableN} and seat ${seatN}`));
        }
    }

    addTileToCanvas(tile){
        let mainCanvas = document.getElementById('main-canvas');
        mainCanvas.appendChild(tile);
    }

    locateCustomer(customerName){
        for (let [key, l] of Object.entries(this.landmarks)){
            for (let c of l.customersList){
                if (c.name === customerName){
                    return l.landmarkID;
                }
            }
        }

        // customer not found
        return null;
    }

    getCustomerByName(customerName){
        for (let [key, l] of Object.entries(this.landmarks)){
            for (let c of l.customersList){
                if (c.name === customerName){
                    return c;
                }
            }
        }

        // customer not found
        return null;
    }

    newCustomerArrives(customerName, maxWaitingTime){
        let customerGraphic = new GraphicElement(customerName, customerName, 'user-waiting', 'agent-label');
        this.addTileToCanvas(customerGraphic.getContainerElement());
        let customer = new Customer(customerName, customerGraphic, this.manager);
        this.landmarks['reception'].customersList.push(customer);
        this.landmarks['reception'].displayElementAtLocation(customer, 'middle');
        this.renderReceptionQueue();
        this.manager.logEvent(customerName + ' arrives at the restaurant');
        customer.waitToBeAttended(maxWaitingTime); // waiting max seconds to be attended before leaving
        this.manager.publish('new_customer', {});
        this.nCustomers++;
    }

    renderReceptionQueue(){
        for (let [index, val] of this.landmarks.reception.customersList.entries()){
            val.htmlElement.getContainerElement().style.top = (250 + (60 * index)) + 'px';
        }
    }

    renderKitchenFood(){
        for (let [index, val] of this.readyFood.entries()){
            val.htmlElement.getTileElement().style.opacity = 1;
            val.htmlElement.setStatus('', '');
            val.htmlElement.getContainerElement().style.left = '550px';
            val.htmlElement.getContainerElement().style.top = (20 + (30 * index)) + 'px';
            val.htmlElement.setLabelOrientation('right');
        }
        for (let [index, val] of this.inPreparationFood.entries()){
            val.htmlElement.getTileElement().style.opacity = 0.25;
            val.htmlElement.setStatus('clock', '');
            val.htmlElement.getContainerElement().style.left = '550px';
            val.htmlElement.getContainerElement().style.top = (20 + (30 * (this.readyFood.length + index))) + 'px';
            val.htmlElement.setLabelOrientation('right');
        }
    }
}