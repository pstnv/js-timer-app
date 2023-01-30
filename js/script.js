const values = document.querySelectorAll('.value');
const hours = document.querySelector('#hours') ;
const minutes = document.querySelector('#minutes') ;
const seconds = document.querySelector('#seconds') ;
const audio = document.querySelector('#alarm');



let hoursTotal = 0;
let minutesTotal = 0;
let secondsTotal = 0;
let targetHours = false;
let targetMinutes = false;
let targetSeconds = false;
let amountTime = 0;



hours.addEventListener('click', setHours);
function setHours() {
    hours.classList.add('selected');
    minutes.classList.remove('selected');
    seconds.classList.remove('selected');
    targetHours = true;
    targetMinutes = false;
    targetSeconds = false;
}

minutes.addEventListener('click', setMinutes);
function setMinutes() {
    hours.classList.remove('selected');
    minutes.classList.add('selected');
    seconds.classList.remove('selected');
    targetHours = false;
    targetMinutes = true;
    targetSeconds = false;
}

seconds.addEventListener('click', setSeconds);
function setSeconds() {
    hours.classList.remove('selected');
    minutes.classList.remove('selected');
    seconds.classList.add('selected');
    targetHours = false;
    targetMinutes = false;
    targetSeconds = true;
}

values.forEach(value => {    

        value.addEventListener('click', ()=> {
            if (targetHours === true) {
                hoursTotal += value.textContent;
                // если меньше 10 минут, добавляем ноль спереди
                if (Number(hoursTotal) < 10) {
                    hoursTotal = "0" + Number(hoursTotal)
                }
                // вводим ограничение: максимальное количество заданных часов - 99
                // если число становится трехзначным, то оставляем две последние цифры
                else if (hoursTotal.length >= 3) {
                    hoursTotal = Number(hoursTotal.substr(hoursTotal.length-2, 2)) < 10 ? "0" + Number(hoursTotal.substr(hoursTotal.length-1, 1)) :
                                                                                    hoursTotal = Number(hoursTotal.substr(hoursTotal.length-2, 2));
                    // hoursTotal < 10 ? hoursTotal = "0" + Number(hoursTotal) : 
                }
                else {
                    hoursTotal = Number(hoursTotal);
                }
                hours.innerHTML = `${hoursTotal}<span class="unit">ч.</span>`;
            }

            else if (targetMinutes === true) {
                minutesTotal += value.textContent;
                // если меньше 10 минут, добавляем ноль спереди
                if (Number(minutesTotal) < 10) {
                    minutesTotal = "0" + Number(minutesTotal)
                }
                // если число становится трехзначным и больше 60, то оставляем последнюю цифру и добавляем ноль спереди
                // если число становится трехзначным и меньше 60, то оставляем две последние цифры
                else if (minutesTotal.length >= 3) {
                    minutesTotal = Number(minutesTotal.substr(minutesTotal.length-2, 2)) > 60 ? "0" + Number(minutesTotal.substr(minutesTotal.length-1, 1)) : 
                    minutesTotal = Number(minutesTotal.substr(minutesTotal.length-2, 2)) < 10 ? "0" + Number(minutesTotal.substr(minutesTotal.length-1, 1)) : 
                                                                                                            Number(minutesTotal.substr(minutesTotal.length-2, 2));
                }
                else {
                    minutesTotal = Number(minutesTotal);
                }
                minutes.innerHTML = `${minutesTotal}<span class="unit">м.</span>`;
            }

            else if (targetSeconds === true) {
                secondsTotal += value.textContent;
                // если меньше 10 минут, добавляем ноль спереди
                if (Number(secondsTotal) < 10) {
                    secondsTotal = "0" + Number(secondsTotal)
                }
                // если число становится трехзначным и больше 60, то оставляем последнюю цифру и добавляем ноль спереди
                // если число становится трехзначным и меньше 60, то оставляем две последние цифры
                else if (secondsTotal.length >= 3) {
                    secondsTotal = Number(secondsTotal.substr(secondsTotal.length-2, 2)) > 60 ? "0" + Number(secondsTotal.substr(secondsTotal.length-1, 1)) : 
                    secondsTotal = Number(secondsTotal.substr(secondsTotal.length-2, 2)) < 10 ? "0" + Number(secondsTotal.substr(secondsTotal.length-1, 1)) :
                                                                                                            Number(secondsTotal.substr(secondsTotal.length-2, 2));
                }
                else {
                    secondsTotal = Number(secondsTotal);
                }
                seconds.innerHTML = `${secondsTotal}<span class="unit">с.</span>`;
            }
            if (targetHours === true || targetMinutes === true || targetSeconds === true) {
            amountTime = Number(hoursTotal)*oneHour + Number(minutesTotal)*oneMinute + Number(secondsTotal);
            }
        });

});


const oneMinute = 60;
const oneHour = 60*oneMinute;
let timerID;


const btnStart = document.querySelector('#btnStart') ;
btnStart.addEventListener('click', () => {
    audio.load();

    if (amountTime > 0) {
        if (btnStart.getAttribute("state") === "start") {
            btnStart.setAttribute("state", "pause");
            btnStart.textContent = 'Пауза';
            hours.removeEventListener('click', setHours);
            minutes.removeEventListener('click', setMinutes);
            seconds.removeEventListener('click', setSeconds);
            targetMinutes = false;
            targetHours = false;
            targetSeconds = false;
            hours.classList.remove('selected');
            minutes.classList.remove('selected');
            seconds.classList.remove('selected');
            timerID = setInterval(startTimer, 1000); 
        }
        else if (btnStart.getAttribute("state") === "pause") {
            btnStart.setAttribute("state", "start");
            btnStart.textContent = 'Возобновить';
            hours.addEventListener('click', setHours);
            minutes.addEventListener('click', setMinutes);
            seconds.addEventListener('click', setSeconds);
            clearInterval(timerID);
        }
    }
});

function startTimer() {
    amountTime--;   

    if (amountTime <= 0) {

        clearInterval(timerID);
        hours.innerHTML = `00<span class="unit">ч.</span>`;
        minutes.innerHTML = `00<span class="unit">м.</span>`;
        seconds.innerHTML = `00<span class="unit">с.</span>`;
        hoursTotal = 0;
        minutesTotal = 0;
        secondsTotal = 0;
        btnStart.setAttribute("state", "start");
        btnStart.textContent = 'Старт';
        hours.addEventListener('click', setHours);
        minutes.addEventListener('click', setMinutes);
        seconds.addEventListener('click', setSeconds);
        audio.play();
        document.querySelector('.iconClear').style.backgroundColor = 'red';
    }
    else {        
        let hoursLeft = Math.floor(amountTime/oneHour);
        let minutesLeft = Math.floor((amountTime%oneHour) / oneMinute);
        let secondsLeft = Math.floor(amountTime%oneMinute);

        hoursLeft < 10 ? hoursLeft = "0" + hoursLeft : hoursLeft;        
        hoursTotal = hoursLeft; //предусматривает исправление времени пользователем чисел при нажатой кнопке "Возобновить"
        minutesLeft < 10 ? minutesLeft = "0" + minutesLeft : minutesLeft;
        minutesTotal = minutesLeft; //предусматривает исправление времени пользователем чисел при нажатой кнопке "Возобновить"
        secondsLeft < 10 ? secondsLeft = "0" + secondsLeft : secondsLeft;
        secondsTotal = secondsLeft; //предусматривает исправление времени пользователем чисел при нажатой кнопке "Возобновить"
        
        hours.innerHTML = `${hoursLeft}<span class="unit">ч.</span>`;
        minutes.innerHTML = `${minutesLeft}<span class="unit">м.</span>`;
        seconds.innerHTML = `${secondsLeft}<span class="unit">с.</span>`;
    }
};

const btnClear = document.querySelector('#btnClear') ;
btnClear.addEventListener('click', () => { 
        clearInterval(timerID);
        hours.innerHTML = `00<span class="unit">ч.</span>`;
        minutes.innerHTML = `00<span class="unit">м.</span>`;
        seconds.innerHTML = `00<span class="unit">с.</span>`;
        hoursTotal = 0;
        minutesTotal = 0;
        secondsTotal = 0;
        amountTime = 0; 
        btnStart.setAttribute("state", "start");
        btnStart.textContent = 'Старт';
        hours.addEventListener('click', setHours);
        minutes.addEventListener('click', setMinutes);
        seconds.addEventListener('click', setSeconds);
        
        if (audio.played) {
            audio.pause();
            document.querySelector('.iconClear').style.backgroundColor = 'initial';
        };
});

gsap.from(".value", {
    delay: 1,
    opacity: 0,
    duration: .2,
    stagger: .2
})

gsap.from("#btnStart", {
    opacity: 0,
    rotate: 60,
    duration: 1,
})

gsap.from("hr", {
    opacity: 0,
    rotate: 60,
    duration: 1,
})