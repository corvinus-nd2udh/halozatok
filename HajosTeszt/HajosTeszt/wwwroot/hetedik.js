var kerdesek;
var sorszam = 0;
var leptetes = 1;
var osszesKerdesSzama;
var aktualisKerdes;

window.onload = function () {
    letoltes();
    kerdesBetoltes(leptetes);
};

function letoltes() {
  fetch('/questions.json')
      .then(response => response.json())
      .then(data => letoltesBefejezodott(data))
};

function letoltesBefejezodott(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kerdesek = d
    kerdesMegjelenites(0)
};

fetch('/questions/1')
    .then(respons => respons.json())
    .then(data => kerdesMegjelenites(data))

fetch('/questions/mind')
    .then(response => response.json())
    .then(output => {
        var data = output
        osszesKerdesSzama = data
    }
)

function kerdesMegjelenites(kerdes) {
    console.log(kerdes);
    aktualisKerdes = kerdes
    document.getElementById("kerdes_szoveg").innerHTML = kerdes.questionText
    document.getElementById("valasz1").innerHTML = kerdes.answer1
    document.getElementById("valasz2").innerHTML = kerdes.answer2
    document.getElementById("valasz3").innerHTML = kerdes.answer3
    document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image
};

function kerdesBetoltes(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesMegjelenites(data))
}

function vissza() {
    if (leptetes == 1) {
        leptetes = osszesKerdesSzama
    }
    else {
        leptetes = leptetes - 1;
    }
    kerdesBetoltes(leptetes);
    torles()
};

function elore() {
    if (leptetes == osszesKerdesSzama) {
        leptetes = 1
    }
    else {
        leptetes = leptetes + 1;
    }
    kerdesBetoltes(leptetes);
    torles();
};

function klikk() {
    if (this.innerHTML == "Vissza") {
        if (sorszam != 0) {
            sorszam = sorszam - 1;
            kerdesMegjelenites(sorszam)
        } else {
            sorszam = 2; kerdesMegjelenites(sorszam)
        }
    } else {
        if (sorszam != 2) {
            sorszam = sorszam + 1;
            kerdesMegjelenites(sorszam);
        } else { sorszam = 0; kerdesMegjelenites(sorszam) };
    };
}

function megoldas(ki) {
    if (aktualisKerdes.correctAnswer == ki) {
        document.getElementById(`valasz${ki}`).classList.add("jo")
    } else {
        for (var i = 1; i < kerdesek.length + 1; i++) {
            if (aktualisKerdes.correctAnswer == i) {
                document.getElementById(`valasz${aktualisKerdes.correctAnswer}`).classList.add("jo")
            } else {
                document.getElementById(`valasz${i}`).classList.add("rossz")
            }
        }
    }
    
}

function torles() {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`valasz${i}`).classList.remove("rossz")
        document.getElementById(`valasz${i}`).classList.remove("jo")
    }
}