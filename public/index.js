document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы кнопок и блоков
    const tapButton = document.getElementById('tap');
    const magazButton = document.getElementById('magaz');
    const mhiding = document.getElementById('mhiding');
    const thiding = document.getElementById('thiding');

    const chernotap = document.getElementById('chernotap');
    const stepantap = document.getElementById('stepantap');
    const chernoskolko = document.getElementById('chernoskolko');

    const chtp = document.getElementById('chtp');
    const chmp = document.getElementById('chmp');
    const sttp = document.getElementById('sttp');
    const sttt = document.getElementById('sttt');

    let chernoguzes = 0;
    let chernoplus = 0;
    let stepaned = false;

    // Изначальные значения для chtpv и chppv
    let chtpv = 1;
    let chppv = 0; // Добавлено определение
    let chtmv = 1;
    let chmmv = 1;
    let sttpv = 1.2;
    let stttv = 30000; // Добавлено определение

    // Начальное значение для снятия черногузов
    let deductionFactor = 50;
    let deductionMultiplier = 1.6;
    let deductionFactor2 = 30;
    let deductionMultiplier2 = 1.4;
    let deductionFactor5 = 60;
    let deductionMultiplier5 = 2.2;
    let deductionFactor6 = 90;
    let deductionMultiplier6 = 2.5;
    let vsek = 0

    // Объявляем переменные для управления временем Степана
    let lastStepanTime; // Объявляем переменную для хранения времени последнего использования
    const stepanCooldownTime = 120000; // Установите время ожидания (например, 10 секунд)

    mhiding.style.display = 'none';
    thiding.style.display = 'flex';

    // Обработчики событий для кнопок
    tapButton.addEventListener('click', () => {
        mhiding.style.display = 'none';
        thiding.style.display = 'flex';
    });

    magazButton.addEventListener('click', () => {
        thiding.style.display = 'none';
        mhiding.style.display = 'flex';
    });

    chernotap.addEventListener('click', () => {
        chernoplus = chtpv * chtmv; // Предполагается, что chtpv и chppv определены
        if (stepaned) {
            chernoplus *= sttpv; // Предполагается, что sttpv определен
        }
        chernoguzes += chernoplus;
        console.log("Текущие чёрногузы:", chernoguzes);
        chernoskolko.innerHTML = chernoguzes.toFixed(2) + " черногузов";
    });

    setInterval(() => {
        vsek = chppv*chmmv / 600;
        if (stepaned){
            vsek*=sttpv
        }
        chernoguzes += vsek
        chernoskolko.innerHTML = chernoguzes.toFixed(2) + " черногузов";
    }, 100);

    chtp.addEventListener('click', () => {
    if (chernoguzes >= deductionFactor) {
        chtpv += 1;
        chernoguzes -= deductionFactor;
        deductionFactor *= deductionMultiplier;
        chtp.innerHTML = "черногузы за тап (щас " + chtmv.toFixed(2) + " черногузов) <p>" + Math.floor(deductionFactor) + " черногузов</p>";
    } else {
        alert("Недостаточно черногузов");
    }
    chernoskolko.innerHTML = chernoguzes.toFixed(2) + " черногузов";
});

chmp.addEventListener('click', () => {
    if (chernoguzes >= deductionFactor2) {
        chppv += 10;
        chernoguzes -= deductionFactor2;
        deductionFactor2 *= deductionMultiplier2;
        chmp.innerHTML = "черногузы в минуту (щас " + chppv.toFixed(2) + " черногузов) <p>" + Math.floor(deductionFactor2) + " черногузов</p>";
    } else {
        alert("Недостаточно черногузов");
    }
    chernoskolko.innerHTML = chernoguzes.toFixed(2) + " черногузов";
});

sttp.addEventListener('click', () => {
    if (chernoguzes >= deductionFactor5) {
        sttpv += 0.1;
        chernoguzes -= deductionFactor5;
        deductionFactor5 *= deductionMultiplier5;
        sttp.innerHTML = "степан жирнее (щас х" + sttpv.toFixed(2) + ") <p>" + Math.floor(deductionFactor5) + " черногузов</p>";
    } else {
        alert("Недостаточно черногузов");
    }
    chernoskolko.innerHTML = chernoguzes.toFixed(2) + " черногузов";
});

sttt.addEventListener('click', () => {
    if (chernoguzes >= deductionFactor6) {
        stttv += 5000;
        chernoguzes -= deductionFactor6;
        deductionFactor6 *= deductionMultiplier6;
        sttt.innerHTML = "степан дольше (щас " + (stttv / 1000).toFixed(2) + " секунд) <p>" + Math.floor(deductionFactor6) + " черногузов</p>";
    } else {
        alert("Недостаточно черногузов");
    }
    chernoskolko.innerHTML = chernoguzes.toFixed(2) + " черногузов";
});

stepantap.addEventListener('click', () => {
    const currentTime = Date.now();
    if (!lastStepanTime || (currentTime - lastStepanTime) >= stepanCooldownTime) {
        stepantap.classList.add("inactive")
        stepantap.classList.remove("active")
        stepaned = true;
        lastStepanTime = currentTime;
        console.log("Степан включен:", stepaned);

        setTimeout(() => {
            stepaned = false;
            console.log("Степан выключен:", stepaned);
        }, stttv);
        setTimeout(() => {
            stepantap.classList.add("active")
            stepantap.classList.remove("inactive")
        }, stepanCooldownTime-stttv)
    } else {
        alert("Степан еще не готов к использованию.");
        console.log("Степан еще не готов к использованию.");
    }
});

});
