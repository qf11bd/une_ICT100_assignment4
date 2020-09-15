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

IMPORTANT ASSUMPTION! The robot with ID robotID used in this function
has already been acquired. In other words, safeTeleportTo(<robotID>, <landmarkID>)
is always used after gameController.acquireRobot(<robotID>).
By acquiring <robotID> again in this function you will reach a deadlock state
in the simulations!
*/

async function safeTeleportTo(robotID, landmarkID){
    // You can remove/edit these lines of code
    gameController.log(`Calling safeTeleportTo('${robotID}', '${landmarkID}')`);
    await gameController.sleep(5000);
}
