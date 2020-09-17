class Customer {
    constructor(name, customerGraphic, manager){
        this.name = name;
        this.htmlElement = customerGraphic;
        this.currentRequest = null;
        this.isExpectingFood = false;
        this.eatingPromise = null;
        this.foodEaten = [];
        this.currentSeat = null;
        this.wasBilled = false;
        this.paidBill = false;
        this.waitingTimeout = null;
        this.remainingSeconds = null;
        this.waitingInterval = null;
        this.manager = manager;
    }

    // the customer has a request and requires attention
    requireAttention(request, waitForever){
        if (this.htmlElement === null){
            throw(Error(this.name + ' cannot require attention since they already left the restaurant!'));
        }
        if (this.currentRequest !== null){
            throw(Error(`${this.name} is already requiring attention. Current request: ${this.currentRequest[0]}`));
        }
        if (this.waitingTimeout !== null){
            throw(Error(this.name + ' is already waiting and cannot require attention again. Perhaps they ordered food or asked for the bill?'));
        }
        if (this.currentSeat === null){
            throw(Error(`${this.name} cannot require attention because not seated.`));
        }
        let customerLocation = gameController.locateCustomer(this.name);
        if (customerLocation !== null){
            this.currentRequest = [request, waitForever];
            this.manager.logEvent(this.name + ' is requiring attention');
            setTimeout(() => {
                this.manager.publish(
                    'customer_requiring_attention', 
                    {
                        customerLocation: customerLocation,
                        customerName: this.name
                    }
                );
            }, 1500); 
            this.htmlElement.setStatus(`${this.currentSeat}-status require-attention`, '');
            if (!waitForever){
                this.waitToBeAttended(18000*gameController.getNumberOfCustomers());
            } else {
                this.waitToBeAttended(0);
            }
            
            return true;
        } else {
            this.manager.logError(this.name + ' not found. Was the customer picked up by a robot or did they leave the restaurant?');
            return false;
        }
    }

    leaveRestaurant() {
        if (this.htmlElement === null){
            throw(Error(this.name + ' already left the restaurant!'));
        }
        this.htmlElement.getContainerElement().remove();
        this.htmlElement = null;
        let landmarkID = gameController.locateCustomer(this.name);
        this.manager.publish('customer_left', {customerName: this.name, landmarkID: landmarkID});
        this.manager.logEvent(this.name + ' left the restaurant');
        if (!this.paidBill && this.foodEaten.length > 0){
            this.manager.logWarning(this.name + ' left the restaurant without paying the bill!');
        }
    }

    payBill(){
        if (this.htmlElement === null){
            throw(Error(this.name + ' cannot pay the bill since they already left the restaurant!'));
        }
        if (this.wasBilled === false){
            throw(Error(this.name + ' cannot pay the bill because they did not receive one yet'));
        }
        let paying = new Promise(
            (resolve) => {
                setInterval(resolve, 1000 + Math.random() * 4000);
            }
        ).then (
            () => {
                this.paidBill = true;
                this.manager.log(this.name + ' paid the bill');
                this.leaveRestaurant();
            }
        )
    }

    eatFood(food){
        if (this.htmlElement === null){
            throw(Error(this.name + ' cannot eat food since they already left the restaurant!'));
        }
        if (this.currentSeat === null){
            throw(Error(this.name + ' cannot eat food since not seated at a table!'));
        }
        if (this.eatingPromise !== null){
            throw(Error(this.name + ' is already eating some food'));
        }
        this.htmlElement.setStatus(`${this.currentSeat}-status eating`,'');
        this.eatingPromise = new Promise(
            (resolve) => {
                setTimeout(resolve, (10 + Math.random() * 10) * 1000);
            }
        ).then(
            () => {
                this.foodEaten.push(food.foodName);
                this.htmlElement.setStatus('','');
                let landmarkID = gameController.locateCustomer(this.name);
                food.htmlElement.getTileElement().classList.value = 'plate-empty';
                this.manager.logEvent(this.name + ' at ' + landmarkID + ' finished to eat ' + food.foodName);
                this.manager.publish('customer_finished_meal', {customerName: this.name, landmarkID: landmarkID});
                this.eatingPromise = null;
            }
        )
    }

    waitToBeAttended(ms){
        if (this.htmlElement === null){
            throw(Error(this.name + ' cannot wait since they already left the restaurant!'));
        }
        if (this.waitingTimeout !== null){
            throw(Error(this.name + ' is already waiting'));
        }
        let waitingPromise = new Promise(
            (resolve) => {
                if (ms > 0){
                    this.waitingTimeout = setTimeout(resolve, ms);
                    this.remainingSeconds = ms/1000;
                    this.htmlElement.setLabel(`${this.name} <span style="font-size:8px">(${this.remainingSeconds})</span>`);
                    this.waitingInterval = setInterval(() => {
                        this.remainingSeconds--;
                        if (this.remainingSeconds <= 0){
                            clearInterval(this.waitingInterval);
                            this.remainingSeconds = null;
                        }
                        try{
                            if (this.remainingSeconds === null){
                                this.htmlElement.setLabel(this.name);
                            } else {
                                this.htmlElement.setLabel(`${this.name} <span style="font-size:8px">(${this.remainingSeconds})</span>`);
                            }
                        } catch(err) {}
                    }, 1000);
                } else {
                    this.waitingTimeout = true;
                }
            }
        ).then(
            () => {
                this.manager.logWarning(this.name + ' waited too long and is now leaving the restaurant');
                this.leaveRestaurant();
                this.waitingTimeout = null;
            }
        );
    }

    clearWaitingTimeout(){
        if (this.waitingTimeout === null){
            throw(Error('Timeout for ' + this.name + ' cannot be cleared since it was already cleared or the customer is not waiting to be attended'));
        }
        if (this.waitingTimeout !== true){
            clearTimeout(this.waitingTimeout);
            clearInterval(this.waitingInterval);
            this.htmlElement.setLabel(this.name);
        }
        this.waitingTimeout = null;
        this.waitingInterval = null;
        this.remainingSeconds = null;
    }

}