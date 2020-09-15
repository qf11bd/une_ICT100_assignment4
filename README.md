# Assignment 4

This document is still in preparation (it is missing the specifications of the methods in gameController that you can use to solve the game).

# Introduction 

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

1. Place the .js solution files (common.js, and solution-task-1.js to solution-task-6.js) into a directory called solution<your student ID> (so if your student ID is 12345, the directory should be named solution12345);
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

If you get stuck, first take a big breath in and relax. You are here to learn and we are here to help you learning. You can contact us on the Slack channel, post on the forum or send a private e-mail. Pay attention to not share piece of your code. Exchanging ideas about possible solutions with the other students is fine and encouraged (without spoiling too much!).

A general suggestion is to always try to deal with one small problem at a time. If the problem is still too big, you can probably divide it in further subproblems. Also, do not immediately dive into the code. First try to mentally solve the problem in steps, then think how can you write those steps as pieces of code. 

Remember, to climb a mountain you need to take many small steps and the journey will feel hard on your body but at the end you will be able to appreciate a wonderful view and you will be able to climb higher mountains.

# Additional resources

You can find more information about the assignment (including a showing-through of the application and some suggestions) on this video:

In preparation

You can find the documentation about the methods available to control the game below.

# Documentation of gameController

In preparation
