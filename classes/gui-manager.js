class GUIManager{
    constructor(manager){
        this.manager = manager;

        // subscribe to logger to update the logs panel
        this.manager.subscribe('log', this.updateLogPanel);

        this.manager.subscribe('marker_update',
            (msg) => {
                document.getElementById('score-current').innerText = `Current score: ${msg.score} out of ${msg.maxScore}`;
                document.getElementById('score-normalised').innerText = `Current mark: ${msg.mark} out of ${msg.maxMark}`;
            }
        )

        this.manager.subscribe('new_simulation', 
            (msg) => {
                document.getElementById('score-scenario').innerText = `Scenario: ${msg.scenarioTitle}`;
                document.getElementById('score-current').innerText = `Current score: 0 out of ${msg.maxScore}`;
                document.getElementById('score-normalised').innerText = `Current mark: 0 out of ${msg.maxMark}`;
            }
        )
    }

    updateLogPanel(msg){
        let log = msg.logMessage;
        const logPanel = document.getElementById('logs');
        const newLogElement = document.createElement('div');
        newLogElement.innerText = `${msg.logType.toUpperCase()}:: ${log}`;
        let cssClass = 'log-message';
        if (msg.logType !== 'info'){
            cssClass += ' log-' + msg.logType;
        }
        newLogElement.className = cssClass;
        logPanel.appendChild(newLogElement);
    }
}