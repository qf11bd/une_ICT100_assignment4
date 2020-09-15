class Marker {
    constructor(maxScore, maxMark, manager){
        this.maxScore = maxScore;
        this.currentScore = 0;
        this.maxMark = maxMark;
        this.errorsLog = [];
        this.successLogs = [];
        this.manager = manager;
    }

    recordScore(scoreValue, log, isSuccess){
        if (isSuccess){
            this.successLogs.push(log + ' => +' + scoreValue + 'pt');
            this.currentScore += scoreValue;
        } else {
            this.errorsLog.push(log);
        }
        let curMark = Math.round((this.maxMark * (this.currentScore / this.maxScore)) * 100) / 100;
        this.manager.publish('marker_update', {
            score: this.currentScore, 
            mark: curMark,
            maxMark: this.maxMark,
            maxScore: this.maxScore
        });
    }

    report(taskName, seed){
        let reportElement = document.getElementById('report');
        let content = `<h1>Report for ${taskName} (with seed '${seed}'):</h1><br />`;
        content += `Max score for this task: <span style="font-weight: bold;"> ${this.maxScore}</span><br />`;
        content += `Your score for this task: <span style="font-weight: bold;"> ${this.currentScore}</span><br />`;
        let mark = Math.round(((this.maxMark / this.maxScore) * this.currentScore) * 100) / 100;
        content += `Marks for this task: <span style="font-weight: bold;"> ${mark}</span><br />`;
        content += '<br />';
        content += '<h1>Summary of the points for this task:</h1>';
        for (let log of this.successLogs){
            content += `${log}<br/>`;
        }
        reportElement.innerHTML = content;
        reportElement.style.opacity = 1;
    }
}