class Robot {
    constructor(robotID, label) {
        this.robotID = robotID;
        this.htmlElement = new GraphicElement(robotID, label, 'bot', 'agent-label');
        this.position = [0, 0, 0];
        this.curRobotLandmark = null;
        this.pickedUpCustomer = null;
        this.grabbedFood = null;
        this.currentAction = null;
        this.nextAcquisitionToken = 0;
        this.acquisitionTokens = [];
    }

    // private
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    

    isAvailable(){
        return this.currentAction === null;
    }

    canPickUpCustomer(){
        return this.isAvailable() && this.pickedUpCustomer === null;
    }

    canGrabFood(){
        return this.isAvailable() && this.grabbedFood === null;
    }

    getRobotId(){
        return this.robotID;
    }

    async acquireRobot(){
        let token = this.nextAcquisitionToken++;
        if (this.acquisitionTokens.length == 0){
            this.acquisitionTokens.push([token, () => {console.log('pass')}]);
        } else {
            // there was already an acquisition
            let acquisitionPromise = new Promise(
                (resolve) => {
                    this.acquisitionTokens.push([
                        token,
                        () => {
                            resolve();
                        }
                    ]);
                }
            );
            await acquisitionPromise;
        }
        return token;
    }

    releaseRobot(token) {
        let tokenIdx = this.acquisitionTokens.findIndex((value) => {return value[0] === token});
        if (tokenIdx >= 0){
            this.acquisitionTokens.splice(tokenIdx,1);
            if (this.acquisitionTokens.length > 0){
                // execute the resolve function for the first token in queue
                let resolve = this.acquisitionTokens[0][1];
                if (resolve !== undefined){
                    resolve();
                }
            }
            return true;
        } else {
            return false;
        }
    }

    canBeAcquired(){
        return this.acquisitionTokens.length == 0;
    }

    // private
    startProcess(actionName){
        if (this.currentAction !== null){
            // bot already busy, throw error
            let error = `${this.robotID} is currently busy processing another action: ${actionName}`;
            throw(Error(error));
        }

        // set a new lock
        this.currentAction = actionName;
    }

    // private
    endProcess(){
        this.currentAction = null;
    }

    // private
    renderCustomer(){
        if (this.pickedUpCustomer !== null){
            let customer = this.pickedUpCustomer;
            let robotTileSize = [
                this.htmlElement.getTileElement().getBoundingClientRect().width,
                this.htmlElement.getTileElement().getBoundingClientRect().height,
            ];
            let robotLabelSize = [
                this.htmlElement.getLabelElement().getBoundingClientRect().width,
                this.htmlElement.getLabelElement().getBoundingClientRect().height,
            ];
            let customerTileSize = [
                customer.htmlElement.getTileElement().getBoundingClientRect().width,
                customer.htmlElement.getTileElement().getBoundingClientRect().height,
            ];
            let customerLeft = [this.position[0] - customerTileSize[0] - robotLabelSize[0], this.position[1] + (robotTileSize[1]-customerTileSize[1])/2, 'left'];
            let customerRight = [this.position[0] + robotTileSize[0] + robotLabelSize[0], this.position[1] + (robotTileSize[1]-customerTileSize[1])/2, 'right'];
            let customerTop = [this.position[0] + (robotTileSize[0] - customerTileSize[0])/2, this.position[1] - customerTileSize[1] - robotLabelSize[1], 'top'];
            let customerBottom = [this.position[0] + (robotTileSize[0] - customerTileSize[0])/2, this.position[1] + robotTileSize[1] + robotLabelSize[1], 'bottom'];
            let position;
            switch (this.position[2]){
                case 0:
                    position = customerBottom;
                    break;
                case 90:
                    position = customerLeft;
                    break;
                case 180:
                    position = customerTop;
                    break;
                case 270:
                    position = customerRight;
                    break;
            }
            customer.htmlElement.setElementPosition(position[0], position[1], this.position[2]);
            customer.position = [position[0], position[1], this.position[2]];
            customer.htmlElement.setLabelOrientation(position[2]);
        }
    }


    // public
    async teleportTo(landmark, distance){
        this.startProcess(`teleportTo(${landmark.landmarkID})`);
        try{
            let teleportationTime = parseInt(distance * 10 + Math.random() * 5000);

            if (landmark.landmarkID.startsWith('home')){
                // going to home requires a fixed short time
                teleportationTime = 250;
            }
            if (landmark.attendedByRobot === this){
                // this robot already there, no waiting time
                teleportationTime = 1;
            }
            
            // immediately teleporting
            
            if (this.pickedUpCustomer !== null){
                this.pickedUpCustomer.htmlElement.getContainerElement().style.opacity = 0;
            }
            this.curRobotLandmark.attendedByRobot = null;
            landmark.attendedByRobot = this;
            this.curRobotLandmark = landmark;
            let displayLocation = 'default';
            if (landmark.landmarkID.startsWith('table')){
                displayLocation = 'attend'+landmark.landmarkID[landmark.landmarkID.length - 1];
            }

            landmark.displayElementAtLocation(this, displayLocation);
            this.htmlElement.getTileElement().classList.value = 'portal';
            
            await this.sleep(teleportationTime);

            this.htmlElement.getTileElement().classList.value = 'bot';
            this.renderCustomer();
            if (this.pickedUpCustomer !== null){
                this.pickedUpCustomer.htmlElement.getContainerElement().style.opacity = 1;
            }

        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        
        return true;
    }

    // public
    async pickUpCustomer(){
        this.startProcess(`pickUpCustomer()`);
        let customer;
        try {
            let robotLandmark = this.curRobotLandmark;
            if (this.pickedUpCustomer !== null){
                throw(Error(this.robotID + ' has already picked up a customer!'));
            }
            
            if (robotLandmark.customersList.length == 0){
                throw(Error('There are no customers at ' + robotLandmark.landmarkID));
            } 
            if (robotLandmark.isSeat === true) {
                throw(Error('It is not possible to move a customer once already seated'));
            }

            customer = robotLandmark.customersList.shift();
            customer.clearWaitingTimeout();

            this.htmlElement.setStatus('balloon', 'Hello!');
            await this.sleep(1500);
            this.htmlElement.setStatus('', '');

            customer.htmlElement.getTileElement().style.transform = 'rotate(270deg)';
            customer.htmlElement.setStatus('balloon', 'Hello!');
            await this.sleep(1500);
            customer.htmlElement.setStatus('', '');

            this.htmlElement.setStatus('balloon', 'Please,<br />follow me');
            await this.sleep(1500);
            this.htmlElement.setStatus('', '');
        
            this.pickedUpCustomer = customer;
            this.renderCustomer();
        } catch (error){
            return error;
        } finally {
            this.endProcess();
        }
        return customer.name;
    }

    // public
    async seatCustomer(){
        this.startProcess(`seatCustomer()`);
        let customer;
        try{
            let robotLandmark = this.curRobotLandmark;
            customer = this.pickedUpCustomer;
            if (this.pickedUpCustomer === null){
                throw(Error(this.robotID + ' did not pick up any customer'));
            }
            if (!robotLandmark.isSeat){
                throw(Error(robotLandmark.landmarkID + ' is not a valid seat'));
            }
            if (robotLandmark.customersList.length > 0){
                throw(Error('There is already a customer seated at ' + robotLandmark.landmarkID));
            }
            
            this.htmlElement.setStatus('balloon', 'Please,<br/>have a seat');
            await this.sleep(1500);
            this.htmlElement.setStatus('', '');

            customer.htmlElement.setStatus('balloon', 'Thank you!');
            await this.sleep(1500);
            customer.htmlElement.setStatus('', '');

            let dropoffLocation = 'seat'+robotLandmark.landmarkID[robotLandmark.landmarkID.length - 1];
            customer.currentSeat = dropoffLocation;
            robotLandmark.customersList.push(customer);
            this.pickedUpCustomer = null;

            robotLandmark.displayElementAtLocation(
                customer,
                dropoffLocation
            )
            customer.htmlElement.getTileElement().classList.value = 'user-seated';
            
        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        return customer.name;
    }

    // public
    async attendCustomerRequest(nCustomersAtRestaurant){
        this.startProcess(`attendCustomerRequest()`);
        let robotLandmark, customer;
        let request = null;
        let waitForever = null;
        try {
            robotLandmark = this.curRobotLandmark;
            if (!robotLandmark.isSeat) {
                throw(Error(robotLandmark.landmarkID + ' is not a seat. Robots can only attend customers\' requests at tables\' seats'));
            }
            if (robotLandmark.customersList.length == 0){
                throw(Error('There are no customers seated at ' + robotLandmark.landmarkID));
            }
            customer = robotLandmark.customersList[0];
            if (customer.currentRequest === null){
                throw(Error(customer.name + ' did not require attention or their request has already been attended'));
            }

            customer.clearWaitingTimeout();
            customer.htmlElement.setStatus('','');
            [request, waitForever] = customer.currentRequest;
            customer.currentRequest = null;

            this.htmlElement.setStatus('balloon', 'How can<br/>I help?');
            await this.sleep(1500);
            this.htmlElement.setStatus('', '');

            customer.htmlElement.setStatus('balloon', 'Mmhh...');
            await this.sleep(2000 + Math.random()*1000);
            customer.htmlElement.setStatus('', '');

            customer.htmlElement.setStatus('balloon', `<span style="font-size:8px">${request}</span>`);
            await this.sleep(2500);
            customer.htmlElement.setStatus('', '');

            this.htmlElement.setStatus('balloon', 'Sure!');
            await this.sleep(1500);
            this.htmlElement.setStatus('', '');

            if (!waitForever){
                customer.waitToBeAttended(10000 + 25000*nCustomersAtRestaurant);
            } else {
                customer.waitToBeAttended(0);
            }
            
        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        return [request, customer];
        
    }

    // public
    async takeFood(food){
        this.startProcess(`takeFood()`);
        try{
            this.grabbedFood = food;
            await this.sleep(1000 + Math.random()*2000);
            food.htmlElement.getContainerElement().style.opacity = 0;
        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        return true;
    }

    // public
    async serveFood(){
        this.startProcess(`serveFood()`)
        let robotLocation, food, customer;
        try{
            robotLocation = this.curRobotLandmark;
            if (this.grabbedFood === null){
                throw(Error(this.robotID + ' did not grab any food from the kitchen'));
            }
            if (!robotLocation.isSeat){
                throw(Error('Robots can only serve food at tables\' seats. ' + robotLocation.landmarkID + ' is not a seat'));
            }
            if (robotLocation.customersList.length == 0){
                throw(Error('There are no customers seated at ' + robotLocation.landmarkID));
            }
            if (robotLocation.servedFood !== null){
                throw(Error('Food has already been served at ' + robotLocation.landmarkID + '. First you need to clean up'));
            }
            customer = robotLocation.customersList[0];
            if (!customer.isExpectingFood){
                throw(Error(customer.name + ' is not expecting food'));
            }

            customer.clearWaitingTimeout();
            customer.isExpectingFood = false;
            food = this.grabbedFood;
            this.grabbedFood = null;
            robotLocation.servedFood = food;

            this.htmlElement.setStatus('balloon', 'Here you go');
            await this.sleep(1000 + Math.random()*1000);
            this.htmlElement.setStatus('', '');

            robotLocation.displayElementAtLocation(
                food,
                'meal'+robotLocation.landmarkID[robotLocation.landmarkID.length-1]
            );
            food.htmlElement.getLabelElement().style.opacity = 0;
            
            customer.htmlElement.setStatus('balloon', 'Thanks!');
            await this.sleep(1000 + Math.random()*1000);
            customer.htmlElement.setStatus('', '');
            customer.eatFood(food);
        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        return [food.foodName, customer.name];
    }

    // public
    async throwAwayFood(){
        this.startProcess(`throwAwayFood()`)
        let food;
        try{
            if (this.grabbedFood === null){
                throw(Error(this.robotID + ' did not grab any food'));
            }
            food = this.grabbedFood;
            this.grabbedFood.htmlElement.getContainerElement().remove();
            this.grabbedFood = null;

            await this.sleep(500 + Math.random()*1000);

        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        return true;
    }

    // public
    async cleanSeat(){
        this.startProcess(`cleanSeat()`)
        let robotLocation;
        try{
            robotLocation = this.curRobotLandmark;
            if (!robotLocation.isSeat){
                throw(Error(robotLocation.landmarkID + ' is not a seat'));
            }
            if (robotLocation.servedFood === null){
                throw(Error('The seat at ' + robotLocation.landmarkID + ' has already been cleaned'));
            }
            if (robotLocation.servedFood.htmlElement.getTileElement().classList.value !== 'plate-empty'){
                throw(Error('The customer is still enjoying their food'));
            }

            await this.sleep(2000 + Math.random()*3000);
            robotLocation.servedFood.htmlElement.getContainerElement().remove();
            robotLocation.servedFood = null;
        } catch (error){
            return error;
        } finally{
            this.endProcess();
        }
        return true;
    }

    // public
    async billCustomer(billTotal){
        this.startProcess(`billCustomer(${billTotal})`);
        let customer, robotLandmark;
        try{
            robotLandmark = this.curRobotLandmark;
            if (!robotLandmark.isSeat){
                throw(Error('It is possible to bill a customer only at their seat'));
            }
            if (robotLandmark.customersList.length == 0){
                throw(Error('There are no customers at ' + robotLandmark.landmarkID));
            }
            customer = robotLandmark.customersList[0];
            if (customer.isExpectingFood){
                throw(Error('It is not possible to bill a customer with a pending order. First serve the ordered food.'));
            }
            if (customer.wasBilled){
                throw(Error(customer.name + ' was already billed'));
            }
            customer.clearWaitingTimeout();
            customer.wasBilled = true;
            await this.sleep(1000 + Math.random()*3000);
            
            customer.payBill();
        } catch (error) {
            return error;
        } finally {
            this.endProcess();
        }
        return customer.name;
    }
    
}