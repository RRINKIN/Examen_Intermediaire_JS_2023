let maPage = 0;
let lengthQuestionnaire = 0;
let monSousTitre = document.querySelector('h3');
let maLocation = document.getElementById('questions');
let nextBtn = document.getElementById('next');

// Ajax request count pages
let xhrCount = new XMLHttpRequest;
let urlcount = `./enquete.php?length`;
xhrCount.open('GET', urlcount);
xhrCount.onreadystatechange = function() {
    if (xhrCount.readyState == 4 && xhrCount.status == 200) {
        let monCount = JSON.parse(xhrCount.response).length;
        lengthQuestionnaire += monCount;
    }
}
xhrCount.send(null);

// call the Ajax for the first time
pageGenerator();

// function to call the Ajax
function pageGenerator() {
    maPage++;
    let xhrPage = new XMLHttpRequest;
    let urlpage = `./enquete.php?page=${maPage}`;
    xhrPage.open('GET', urlpage);
    xhrPage.onreadystatechange = function() {
        if (xhrPage.readyState == 4 && xhrPage.status == 200) {
            let questionnaire = JSON.parse(xhrPage.response);
            console.log(questionnaire);
        
            // understand type
            let monType = questionnaire.type;

            // Add title
            monSousTitre.innerHTML = `Question(s) ${maPage}/${lengthQuestionnaire}`

            // Create form
            let newForm = document.createElement('form');
            maLocation.appendChild(newForm);

            // Create elements of the table
            let newTable = document.createElement('table');
            newTable.classList.add(`Table${maPage}`);
            newForm.appendChild(newTable);

            // Create title
            let newTableRow1 = document.createElement('tr');
            let newTableHead = document.createElement('th');
            newTableHead.innerHTML = questionnaire.title;
            newTableRow1.appendChild(newTableHead);
            if (monType == "boolean") {
                let Oui = document.createElement('th');
                Oui.innerHTML = 'Oui';
                newTableRow1.appendChild(Oui);
                let Non = document.createElement('th');
                Non.innerHTML = 'Non';
                newTableRow1.appendChild(Non);
            } else if (monType == "scale") {
                let Ti = document.createElement('th');
                Ti.innerHTML = "Tres Insatisfait";
                newTableRow1.appendChild(Ti);
                let I = document.createElement('th');
                I.innerHTML = "Insatisfait";
                newTableRow1.appendChild(I);
                let N = document.createElement('th');
                N.innerHTML = "Neutre";
                newTableRow1.appendChild(N);
                let S = document.createElement('th');
                S.innerHTML = "satisfait";
                newTableRow1.appendChild(S);
                let Ts = document.createElement('th');
                Ts.innerHTML = "très satisfait";
                newTableRow1.appendChild(Ts);
            } else if (monType == "text") {
                let texte = document.createElement('th');
                texte.innerHTML = "Réponse libre";
                newTableRow1.appendChild(texte);
            }
            newTableRow1.classList.add(`Table${monType}`);
            newTable.appendChild(newTableRow1);

            // Create table content
            let compteur = 1;
            for (const key in questionnaire.questions) {
                let newTableRow2 = document.createElement('tr');
                let newTableDetail = document.createElement('td');
                newTableDetail.innerHTML = questionnaire.questions[`${key}`];
                newTableRow2.appendChild(newTableDetail);
                if (monType == "boolean") {
                    let Oui = document.createElement('td');
                    Oui.innerHTML = `<input type="radio" id="Q${compteur}Oui" name="Q_P${maPage}_Q${compteur}" value="Oui">`;
                    newTableRow2.appendChild(Oui);
                    let Non = document.createElement('td');
                    Non.innerHTML = `<input type="radio" id="Q${compteur}Non" name="Q_P${maPage}_Q${compteur}" value="Non">`;
                    newTableRow2.appendChild(Non);
                } else if (monType == "scale") {
                    let Ti = document.createElement('td');
                    Ti.innerHTML = `<input type="radio" id="Q${compteur}TI" name="Q_P${maPage}_Q${compteur}" value="tresInsatisfait">`;
                    newTableRow2.appendChild(Ti);
                    let I = document.createElement('td');
                    I.innerHTML = `<input type="radio" id="Q${compteur}I" name="Q_P${maPage}_Q${compteur}" value="insatisfait">`;
                    newTableRow2.appendChild(I);
                    let N = document.createElement('td');
                    N.innerHTML = `<input type="radio" id="Q${compteur}N" name="Q_P${maPage}_Q${compteur}" value="Neutre">`;
                    newTableRow2.appendChild(N);
                    let S = document.createElement('td');
                    S.innerHTML = `<input type="radio" id="Q${compteur}S" name="Q_P${maPage}_Q${compteur}" value="Satisfait">`;
                    newTableRow2.appendChild(S);
                    let Ts = document.createElement('td');
                    Ts.innerHTML = `<input type="radio" id="Q${compteur}Ts" name="Q_P${maPage}_Q${compteur}" value="tresSatisfait">`;
                    newTableRow2.appendChild(Ts);
                } else if (monType == "text") {
                    let texte = document.createElement('td');
                    texte.innerHTML = `<input type="text" id="Q${compteur}texte" name="Q_P${maPage}_Q${compteur}" value="text" minlength="4" maxlength="8" size="10">`;
                    newTableRow2.appendChild(texte);
                }
                newTableRow2.classList.add(`Table${monType}`);
                newTable.appendChild(newTableRow2);
                compteur += 1;
            }

            // Hide previous table 
            let page = maPage - 1;
            let toBeHidden = document.querySelector(`.Table${page}`);
            //toBeHidden.classList.add("hidden");
            toBeHidden.remove();   
        }
    }
    xhrPage.send(null);
}

// Remove the alert
function checkAlert() {
    let alerte = document.querySelectorAll('input');
    console.log(alerte);
    let checkedInput = 0;
    for (let i = 0; i < (alerte.length -2); i++) {
        console.log(i);
        if (i.checked) {  
            console.log("c'est checked");
            checkedInput++;
        } else {
            console.log("not checked");
        }
    console.log(checkedInput);
    }   
}

// Bouton "next""
let btnNext = document.getElementById("next");
btnNext.addEventListener("click", () => {
    checkAlert();
    //pageGenerator();
});





