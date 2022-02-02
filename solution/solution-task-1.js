/* 
TODO: Task 1 => add a click event to the button 'button-text-command' 
parse natural language commands to teleport robots
around the restaurant. The parsed robot and destination
must be published as a message for the topic
'new_command'. The message for this topic has the following
structure:
{
    robotID: <the name ID of the robot in the command>,
    landmarkID: <the name ID of the destination landmark>
}

BONUS TASK (0.5 bonus marks) => add a click event to the
button 'button-voice-command' that listens to the user's command,
parse it as above and publish the message on 'new_command' topic.
As long as the parser and publisher are correct it is not 
important if the speech-to-text fails to correctly recognise
the voice command.
*/

// Define function for reading input text
function readInputText(clearInput) {
    let inputTextBox = document.getElementById('input-text-command')
    let textCommand = inputTextBox.value
    if (clearInput == true) {
        inputTextBox
    }
    return textCommand
}

// Initialise constant for page enter button, define function for triggering event when 'enter' button pressed
// Convert string to an array, and remove conjoining words + verbs
// If array length is 2, landmark is not a table - publish 'new_command' as a single variable landmark
// If array length is greater than 2, convert phonetic numbers to integers to be parsed by publish as a joined table number

const enterButton = document.getElementById('button-text-command')
const talkButton = document.getElementById('button-voice-command')

enterButton.addEventListener(
    'click',
    function(){
        let text = readInputText(true)
        let textArray = text.split(" ")
        textArray = textArray.filter(v => v !== 'teleport')
        textArray = textArray.filter(v => v !== 'go')
        textArray = textArray.filter(v => v !== 'to')
        textArray = textArray.filter(v => v !== 'move')
        textArray = textArray.filter(v => v !== 'seat')
        // console.log(textArray)
        if (textArray.length == 2) {
            gameController.publish('new_command', {robotID: textArray[0], landmarkID: textArray[1]})
        } else {
            if (textArray[2] == 'one') {
                textArray[2] = 1
            } else if (textArray[2] == 'two') {
                textArray[2] = 2
            } else if (textArray[2] == 'three') {
                textArray[2] = 3
            }
            if (textArray[3] == 'one') {
                textArray[3] = 1
            } else if (textArray[3] == 'two') {
                textArray[3] = 2
            } else if (textArray[3] == 'three') {
                textArray[3] = 3
            } else if (textArray[3] == 'four') {
                textArray[3] = 4
            }
            gameController.publish('new_command', {robotID: textArray[0], landmarkID: textArray[1] + '-' + textArray[2] + '-' + textArray[3]})
            
        }
    }
)

talkButton.addEventListener(
    'click',
    function(){
        function repeat(transcription) {
            text = transcription.toLowerCase()
            let textArray = text.split(" ")
            textArray = textArray.filter(v => v !== 'teleport')
            textArray = textArray.filter(v => v !== 'go')
            textArray = textArray.filter(v => v !== 'to')
            textArray = textArray.filter(v => v !== 'move')
            textArray = textArray.filter(v => v !== 'seat')
            if (textArray.length == 2) {
                gameController.publish('new_command', {robotID: textArray[0], landmarkID: textArray[1]})
            } else {
                if (textArray[2] == 'one') {
                    textArray[2] = 1
                } else if (textArray[2] == 'two') {
                    textArray[2] = 2
                } else if (textArray[2] == 'three') {
                    textArray[2] = 3
                }
                if (textArray[3] == 'one') {
                    textArray[3] = 1
                } else if (textArray[3] == 'two') {
                    textArray[3] = 2
                } else if (textArray[3] == 'three') {
                    textArray[3] = 3
                } else if (textArray[3] == 'four') {
                    textArray[3] = 4
                }
                gameController.publish('new_command', {robotID: textArray[0], landmarkID: textArray[1] + '-' + textArray[2] + '-' + textArray[3]})
                
            }
        }
        gameController.listen(repeat)
    }
)
