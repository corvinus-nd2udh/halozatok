window.onload = function () {
    console.log("start")

    var faktorialisR = (n) => {
        if (n === 0 || n === 1) {
            return 1
        } else {
            return n * faktorialisR(n - 1)
        }
    }

    for (let sor = 0; sor < 10; sor++) {
        let ujDiv = document.createElement("div")
        ujDiv.classList.add("sor")
        document.getElementById("pascal").appendChild(ujDiv)
        for (let oszlop = 0; oszlop <= sor; oszlop++) {
            let ujDiv2 = document.createElement("div")
            ujDiv2.classList.add("elem")
            ujDiv2.innerHTML = (faktorialisR(sor)) / (faktorialisR(oszlop) * faktorialisR((sor - oszlop)))
            ujDiv.appendChild(ujDiv2)
            if (ujDiv2.innerHTML < 10) {
                ujDiv2.classList.add("kicsi")
            } else {
                if (ujDiv2.innerHTML >= 10 && ujDiv2.innerHTML < 100) {
                    ujDiv2.classList.add("kozepes")
                } else {
                    ujDiv2.classList.add("nagy")
                }
            }
        }
    }
}