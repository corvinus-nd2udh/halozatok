var hotList = [];
var questionsInHotList = 3; //Később felkonfiguráljuk 7-re.
var displayedQuestion; //A hotListből melyik kérdést mutajuk épp
var numberOfQuestions; //Kérdések száma a teljes adatbázisban -> erre van már nekem egy változóm
var nextQuestion = 1; //A következő kérdés száma a teljes listában.
var timeoutHandler;
var tarolo = window.localStorage;

window.onload = function () {
    countQuestions();
    init();
};

function countQuestions() {
    fetch('/questions/count')
        .then(response => response.json())
        .then(output => {
            var data = output
            numberOfQuestions = data
        }
        )
}

function init() {
    if (tarolo.getItem('hotListBackup') != null) {
        var tempList = JSON.parse(tarolo.getItem('hotListBackup'));
        var tempDisplayed = JSON.parse(tarolo.getItem('displayedQuestionBackup'));
        var tempNext = JSON.parse(tarolo.getItem('nextQuestionBackup'));
        hotList = tempList;
        console.log("Backup betöltve.")
        displayedQuestion = tempDisplayed;
        nextQuestion = tempNext;
        kerdesMegjelenites();
    } else {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }

        for (var i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    }
}

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${response.status}`)
            }
            else {
                return result.json()
            }
        })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`);
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kerdesMegjelenites()
                }
            }
        )
}

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerHTML = kerdes.questionText
    document.getElementById("valasz1").innerHTML = kerdes.answer1
    document.getElementById("valasz2").innerHTML = kerdes.answer2
    document.getElementById("valasz3").innerHTML = kerdes.answer3
    if (kerdes.image) {
        document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image
        document.getElementById("kep1").style.display = "block";
    } else {
        document.getElementById("kep1").style.display = "none";
    }
};

function vissza() {
    clearTimeout(timeoutHandler);
    displayedQuestion--;
    if (displayedQuestion == -1) {
        displayedQuestion = questionsInHotList-1;
    }
    kerdesMegjelenites();
    torles();
    document.getElementById(`valasz1`).style.pointerEvents = "auto";
    document.getElementById(`valasz2`).style.pointerEvents = "auto";
    document.getElementById(`valasz3`).style.pointerEvents = "auto";
};

function elore() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) {
        displayedQuestion = 0;
    }
    kerdesMegjelenites();
    torles();
    document.getElementById(`valasz1`).style.pointerEvents = "auto";
    document.getElementById(`valasz2`).style.pointerEvents = "auto";
    document.getElementById(`valasz3`).style.pointerEvents = "auto";

};

function megoldas(melyikGomb) {
    let kerdes = hotList[displayedQuestion]
    if (kerdes.question.correctAnswer == melyikGomb) {
        document.getElementById(`valasz${melyikGomb}`).classList.add("jo");
        kerdes.goodAnswers++;
        console.log(kerdes.goodAnswers);
    } else {
        kerdes.goodAnswers = 0;
        for (var i = 1; i < hotList.length + 1; i++) {
            if (kerdes.question.correctAnswer == i) {
                document.getElementById(`valasz${kerdes.question.correctAnswer}`).classList.add("jo")
            } else {
                document.getElementById(`valasz${i}`).classList.add("rossz")
            }
        }
    }
    document.getElementById(`valasz1`).style.pointerEvents = "none";
    document.getElementById(`valasz2`).style.pointerEvents = "none";
    document.getElementById(`valasz3`).style.pointerEvents = "none";
    if (kerdes.goodAnswers == 3) {
        if (nextQuestion != numberOfQuestions) {
            kerdesBetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    tarolo.setItem('hotListBackup', JSON.stringify(hotList));
    tarolo.setItem('displayedQuestionBackup', displayedQuestion);
    tarolo.setItem('nextQuestionBackup', nextQuestion);
    timeoutHandler = setTimeout(elore, 3000);
}

function torles() {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`valasz${i}`).classList.remove("rossz")
        document.getElementById(`valasz${i}`).classList.remove("jo")
    }
}