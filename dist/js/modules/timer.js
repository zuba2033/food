function timer(id, deadLine) {
    // Timer

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t / (1000*60*60)) % 24),
            minutes = Math.floor((t / (1000*60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {

            const t = getTimeRemaining(endtime);


            t.days < 10 ? days.innerHTML = '0' + t.days : days.innerHTML = t.days;
            t.hours < 10 ? hours.innerHTML = '0' + t.hours : hours.innerHTML = t.hours;
            t.minutes < 10 ? minutes.innerHTML = '0' +  t.minutes : minutes.innerHTML = t.minutes;
            t.seconds < 10 ? seconds.innerHTML = '0' +  t.seconds : seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // setInterval(setClock(".timer", deadLine), 1000);
    setClock(id, deadLine);
}

export default timer;