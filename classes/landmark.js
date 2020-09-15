class Landmark {
    constructor (landmarkID, naturalLanguageID, graphicElement, isSeat, maxCustomersAllowed, offsetX, offsetY, rotation) {
        this.landmarkID = landmarkID;
        this.htmlElement = graphicElement;
        this.attendedByRobot = null;
        this.customersList = [];
        this.isSeat = isSeat;
        this.naturalLanguageID = naturalLanguageID;
        if (this.isSeat === true){
            maxCustomersAllowed = 1;
        }
        this.servedFood = null;
        this.maxCustomersAllowed = maxCustomersAllowed; // -1 for infinite number
        let mainCanvas = document.getElementById('main-canvas');
        mainCanvas.appendChild(graphicElement.getContainerElement());
        this.position = [
            parseInt(window.getComputedStyle(graphicElement.getContainerElement()).left || 0) + offsetX,
            parseInt(window.getComputedStyle(graphicElement.getContainerElement()).top || 0) + offsetY,
            rotation
        ];
    }

    getIDAsNaturalLanguage(){
        return this.naturalLanguageID;
    }

    getElementSize(element){
        let bbox = element.getBoundingClientRect();
       return [bbox.width, bbox.height];
    }

    displayElementAtLocation(entity, location){
        let tileContainer = entity.htmlElement.getContainerElement();
        let tileElement = entity.htmlElement.getTileElement();
        let labelElement = entity.htmlElement.getLabelElement();
        let labelSize = this.getElementSize(labelElement);
        let tileSize = this.getElementSize(tileElement);
        let labelMiddle = [
            (tileSize[0] - labelSize[0])/2,
            (tileSize[1] - labelSize[1])/2,
        ];
        let position = [
            parseInt(window.getComputedStyle(this.htmlElement.getContainerElement()).left || 0), 
            parseInt(window.getComputedStyle(this.htmlElement.getContainerElement()).top || 0),
            0,
            [`${labelMiddle[0]}px`, `${labelMiddle[1]}px`]
        ];
        let labelLeft = [`-${labelSize[0]}px`, `${(tileSize[1]-labelSize[1])/2}px`];
        let labelRight = [`${tileSize[0]}px`, `${(tileSize[1]-labelSize[1])/2}px`];
        let labelTop = [`${(tileSize[0] - labelSize[0])/2}px`, `-${labelSize[1]}px`];
        let labelBottom = [`${(tileSize[0] - labelSize[0])/2}px`, `${tileSize[1]}px`];
        switch (location){
            case 'attend1':
                position[2] += 90;
                position[3] = labelLeft;
                break;
            case 'attend2':
                position[0] += 120;
                position[1] += 30;
                position[2] = 180;
                position[3] = labelTop;
                break;
            case 'attend3':
                position[0] += 100;
                position[1] += 120;
                position[2] = 270;
                position[3] = labelRight;
                break;
            case 'attend4':
                position[1] += 100;
                position[3] = labelBottom;
                break;
            case 'seat1':
                position[0] += 60;
                position[1] += 10;
                position[2] = 180;
                position[3] = labelTop;
                break;
            case 'seat2':
                position[0] += 115;
                position[1] += 65;
                position[2] = 270;
                position[3] = labelRight;
                break;
            case 'seat3':
                position[0] += 60;
                position[1] += 115;
                position[2] = 0;
                position[3] = labelBottom;
                break;
            case 'seat4':
                position[0] += 5;
                position[1] += 65;
                position[2] = 90;
                position[3] = labelLeft;
                break;
            case 'meal1':
                position[0] += 60;
                position[1] += 30;
                position[2] = 180;
                position[3] = labelBottom;
                break;
            case 'meal2':
                position[0] += 95;
                position[1] += 65;
                position[2] = 270;
                position[3] = labelLeft;
                break;
            case 'meal3':
                position[0] += 60;
                position[1] += 95;
                position[2] = 0;
                position[3] = labelTop;
                break;
            case 'meal4':
                position[0] += 25;
                position[1] += 65;
                position[2] = 90;
                position[3] = labelRight;
                break;
            case 'offset':
                position[0] += 5;
                position[1] += 5;
                break;
            case 'middle':
                position[0] += Math.round(parseInt(window.getComputedStyle(this.htmlElement.getContainerElement()).width)/2);
                position[1] += Math.round(parseInt(window.getComputedStyle(this.htmlElement.getContainerElement()).height)/2);
                position[3] = labelBottom;
                break;
            default:
                position[0] = this.position[0];
                position[1] = this.position[1];
                if (this.landmarkID === 'reception'){
                    position[1] += 10;
                }
                position[2] = this.position[2];
                position[3] = labelBottom;
                break;
        }

        tileContainer.style.left = position[0] + 'px';
        tileContainer.style.top = position[1] + 'px';
        tileContainer.style.opacity = 1;
        tileElement.style.transform = 'rotate(' + position[2] + 'deg)';
        labelElement.style.left = position[3][0];
        labelElement.style.top = position[3][1];
        entity.position = position;
    }
}