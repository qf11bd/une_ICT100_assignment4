/*
TODO: Task 2 => complete the following function safeTeleportTo.

The function takes as input arguments the robotID to teleport safely
and the ID of the destination landmark.
For example, safeTeleportTo('green','table-1-1') must safely move
the robot green to the table one at seat one. That means to check,
for example, if the desired location is free, and if not, to make sure
that the destination gets free before teleporting the robot.
The function should return true if it successfully teleported the robot,
or false otherwise.

This function is async! That means that invoking it will immediately
return a Promise. Remember to use await if you want to wait for the
result of the Promise.

*/

async function safeTeleportTo(robotID, landmarkID){
    // You can remove/edit these lines of code
    gameController.log(`Calling safeTeleportTo('${robotID}', '${landmarkID}')`);
    await gameController.sleep(5000);
    /*
    IMPORTANT ASSUMPTION! The robot with ID robotID used in this function
    has already been acquired outside this function.
    In other words, safeTeleportTo(<robotID>, <landmarkID>)
    is always used after let token = await gameController.acquireRobot(robotID).
    If you use the command:
    await gameController.acquireRobot(robotID);
    inside this function, you will reach a deadlock state in task2 simulation.

    However, you can use gameController.acquireRobot to acquire other robots
    that you may need to safely move away before moving robotID to destination.
    Also, remember that gameController.acquireRobot can be used with the second
    parameter to false to prevent waiting forever if the robot that needs to be
    acquired was already acquired. However, in this case, the returned token will
    be null (so try to check about that later on when you are trying to release
    the robot).
    */
}
