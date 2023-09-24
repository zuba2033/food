import {deleteNotDigits} from '../services/services';

function calc() {
     // КАЛЬКУЛЯТОР КАЛЛОРИЙ на сайте
    
     let gender,
        activityCoeff,
        height = 0,
        weight = 0,
        age = 0;

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
    }

    if (localStorage.getItem('activityCoeff')) {
        activityCoeff = localStorage.getItem('activityCoeff');
    } else {
        activityCoeff = 1.375;
    }

    const genderWrap = document.querySelector('#gender'),
        genderItems = genderWrap.querySelectorAll('.calculating__choose-item'),
        activityItemsWrap = document.querySelector('.calculating__choose_big'),
        activityItems = activityItemsWrap.querySelectorAll('.calculating__choose-item'),
        inputs = document.querySelectorAll('.calculating__choose_medium input'),
        resultOut = document.querySelector('.calculating__result span'),
        allItems = document.querySelectorAll('.calculating__choose-item');

    initLocalSettings(allItems);
    dailyCcal();
    
    genderWrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('calculating__choose-item')) {
            itemActive(genderItems, e.target);
            gender = e.target.id; 
            localStorage.setItem('gender', gender);
            dailyCcal();
        }
    });

    activityItemsWrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('calculating__choose-item')) {
            itemActive(activityItems, e.target);
            chooseActivity(e.target);
            localStorage.setItem('activity', e.target.id);
            dailyCcal();
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (input.value.match(/\D/g)) {
                e.target.value = e.target.value.replace(/\D/g, '');
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            } 
            dailyCcal();
        });
    });

    function initLocalSettings(items) {
        items.forEach(item => {
            if (item.id == localStorage.getItem('gender')) {
                gender = localStorage.getItem('gender');
                itemActive(genderItems, item);
            } else if (item.id == localStorage.getItem('activity')) {
                chooseActivity(item);
                itemActive(activityItems, item);
            } else return;
        });
    }

    function itemActive(items, active) {
        items.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });
        active.classList.add('calculating__choose-item_active');
    }

    function chooseActivity(activityItem) {
        switch (activityItem.id) {
            case 'low':
                activityCoeff = 1.2;
                break;
            case 'small':
                activityCoeff = 1.375;
                break;
            case 'medium':
                activityCoeff = 1.55;
                break;
            case 'high': 
                activityCoeff = 1.725;
                break;
        }
    }

    function dailyCcal() {
        height = deleteNotDigits(document.querySelector('#height').value);
        weight = deleteNotDigits(document.querySelector('#weight').value);
        age = deleteNotDigits(document.querySelector('#age').value);

        if (!height || !weight || !age) {
            resultOut.textContent = "0";
            return;
        }

        let bmr;

        if (gender == 'male') {
            bmr = 88.36 + (4.8 * height) + (13.4 * weight)  - (5.7 * age); 
        } 
        if (gender == 'female') {
            bmr = 447.6 + (3.1 * height) + (9.2 * weight)  - (4.3 * age); 
        } 

        let result = bmr * activityCoeff;

        if (weight && height && age && bmr && activityCoeff && result > 0) {
            resultOut.textContent = Math.round(result);
        } else {
            resultOut.textContent = "0";
        }
        console.log(gender, height, weight, age, bmr, activityCoeff);
    }
}

export default calc;

