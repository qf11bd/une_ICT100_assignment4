/*
You can add shared variables, functions and classes here.
These will be visible in all your solutions for the subtasks.
*/

// Bill total init

var billTotal = {
    'table-1-1': 0,
    'table-1-2': 0,
    'table-1-3': 0,
    'table-1-4': 0,
    'table-2-1': 0,
    'table-2-2': 0,
    'table-2-3': 0,
    'table-2-4': 0,
    'table-3-1': 0,
    'table-3-2': 0,
    'table-3-3': 0,
    'table-3-4': 0
}

async function closestRobot(landmarkID) {
    var greenDistance = gameController.getRobotDistanceFromLandmark('green', landmarkID)
    var yellowDistance = gameController.getRobotDistanceFromLandmark('yellow', landmarkID)
    var pinkDistance = gameController.getRobotDistanceFromLandmark('pink', landmarkID)

    if (greenDistance < (yellowDistance && pinkDistance) && gameController.canAcquireRobot('green')) {
        console.log('FRIST')
        return 'green'
    } else if (yellowDistance < (greenDistance && pinkDistance) && gameController.canAcquireRobot('yellow')) {
        console.log('FRIST')
        return 'yellow'
    } else if (pinkDistance < (greenDistance && yellowDistance) && gameController.canAcquireRobot('pink')) {
        console.log('FRIST')
        return 'pink'
    } else if (greenDistance < (yellowDistance || pinkDistance) && gameController.canAcquireRobot('green')) {
        console.log('SECOND')
        return 'green'
    } else if (yellowDistance < (greenDistance || pinkDistance) && gameController.canAcquireRobot('yellow')) {
        console.log('SECOND')
        return 'yellow'
    } else if (pinkDistance < (yellowDistance || greenDistance) && gameController.canAcquireRobot('pink')) {
        console.log('SECOND')
        return 'pink'
    } else if (gameController.canAcquireRobot('green')) {
        console.log('THIRD')
        return 'green'
    } else if (gameController.canAcquireRobot('yellow')) {
        console.log('THIRD')
        return 'yellow'
    } else if (gameController.canAcquireRobot('pink')) {
        console.log('THIRD')
        return 'pink'
    } else {
        setTimeout(() => { closestRobot(landmarkID); }, 5000)
        // await gameController.sleep(5000)
        // closestRobot(landmarkID)
    }
}