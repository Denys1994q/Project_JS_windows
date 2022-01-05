const timer = (id, deadline) => {
// таймер
    // 1. Рахує математично різницю в часі
    // 2. Виводить час на сторінку 
    // 3. Запускає інтервал і кожну секунду оновлює дані
    
    function getTimeRemaining(endtime) { // рахує різницю від кінця акції до нинішнього часу 
        const t = Date.parse(endtime) - Date.parse(new Date); // показує різницю в мілісекундах 
        // переводить мілісекунди в дні, години, хвилини, секунди
        const days = Math.floor(t / (1000 * 60 * 60 * 24) );
        const hours = Math.floor((t / (1000 * 60 * 60) % 24 ));
        const minutes = Math.floor((t / 1000 / 60) % 60 );
        const seconds = Math.floor((t / 1000) % 60);
    
        return {
          'total': t,
          'days': days,  
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds,
        };
    }
    
    function getZero(num) { // робить, щоб виводилося на сторінку як "09"
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) { // виводить на сторінку цифри з ф-ії getTimeRemaining
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
    
        const timeInterval = setInterval(updateClock, 1000); // кожну секунду виводить ф-ію updateClock
    
        updateClock();
    
        function updateClock() { // кожну секунду перезаписує innerHTML блоків дні, години тощо
            const t = getTimeRemaining(endtime);
    
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    
            if (t.total <= 0) { // якщо час менше 0, інтервал зупиняється
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

    
    export default timer;