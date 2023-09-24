/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

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
  genderWrap.addEventListener('click', e => {
    if (e.target.classList.contains('calculating__choose-item')) {
      itemActive(genderItems, e.target);
      gender = e.target.id;
      localStorage.setItem('gender', gender);
      dailyCcal();
    }
  });
  activityItemsWrap.addEventListener('click', e => {
    if (e.target.classList.contains('calculating__choose-item')) {
      itemActive(activityItems, e.target);
      chooseActivity(e.target);
      localStorage.setItem('activity', e.target.id);
      dailyCcal();
    }
  });
  inputs.forEach(input => {
    input.addEventListener('input', e => {
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
    height = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(document.querySelector('#height').value);
    weight = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(document.querySelector('#weight').value);
    age = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(document.querySelector('#age').value);
    if (!height || !weight || !age) {
      resultOut.textContent = "0";
      return;
    }
    let bmr;
    if (gender == 'male') {
      bmr = 88.36 + 4.8 * height + 13.4 * weight - 5.7 * age;
    }
    if (gender == 'female') {
      bmr = 447.6 + 3.1 * height + 9.2 * weight - 4.3 * age;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function cards() {
  // Классы карточек товара
  class MenuItem {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        element.classList.add('menu__item');
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
      this.parent.append(element);
    }
  }

  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
  //         })
  //     })

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('https://my-json-server.typicode.com/zuba2033/food-json-server/menu').then(data => createCard(data));
  function createCard(data) {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      const element = document.createElement('div');
      element.classList.add('menu__item');
      element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
            `;
      document.querySelector('.menu .container').append(element);
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(formSelector) {
  // Forms

  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(form => {
    bindPostData(form);
  });
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.classList.add('status');
      statusMessage.src = message.loading;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('https://my-json-server.typicode.com/zuba2033/food-json-server/requests', json).then(data => {
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'),
      modal = document.querySelector('.modal');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', '.modal__content');
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
    modal.append(thanksModal);
    setTimeout(() => {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeAnimation)('.modal', '.modal__content');
      setTimeout(() => {
        prevModalDialog.classList.remove('hide');
        prevModalDialog.classList.add('show');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal', '.modal__content');
        thanksModal.remove();
      }, 4000);
    }, 4000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeAnimation": () => (/* binding */ closeAnimation),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, contentSelector) {
  const modal = document.querySelector(modalSelector),
    modalContent = modal.querySelector(contentSelector);
  modal.classList.add('show');
  modal.classList.add('fadeIn');
  modalContent.classList.add('translateYdown');
  modalContent.classList.remove('translateYup');
  modal.classList.remove('hide');
  modal.classList.remove('fadeOut');
  document.body.style.cssText = `
            height: 100vh;
            overflow: hidden;
            padding-right: 15px;
            top: ${document.scrollTop}px;
            `;
}
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  modal.classList.remove('fadeIn');
  // Либо вариант с toggle - но тогда назначить класс в верстке
  document.body.style.cssText = '';
}
function closeAnimation(modalSelector, contentSelector) {
  const modal = document.querySelector(modalSelector),
    modalContent = modal.querySelector(contentSelector);
  modal.classList.add('fadeOut');
  modalContent.classList.remove('translateYdown');
  modalContent.classList.add('translateYup');
}
function modal(triggerSelector, modalSelector, contentSelector) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, contentSelector));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeAnimation(modalSelector, contentSelector);
      setTimeout(() => closeModal(modalSelector), 800);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeAnimation(modalSelector, contentSelector);
      setTimeout(() => closeModal(modalSelector), 800);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
  indicatorsClass
}) {
  // slider 2 варианта, карусель и обычный

  const current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    slides = document.querySelectorAll(slide),
    // for Carousel 
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    frameWidth = window.getComputedStyle(slidesWrapper).width,
    /* ширина окна карусели */
    // для точек навигации
    slider = document.querySelector(container),
    dotsWrap = document.createElement('ul'),
    dots = [];
  let slideIndex = 1; /* для обоих */
  let offset = 0; /* для карусели */

  // для точек
  slider.style.position = 'relative';
  dotsWrap.classList.add(indicatorsClass);
  slider.append(dotsWrap);

  // Carousel

  // уберем overflow у wrapper
  slidesWrapper.style.overflow = 'hidden';
  // добавим стилей окошку карусели: 
  // ширина = 100% * количество слайдов
  // поставим flex чтобы слайды встали в ряд
  // добавим плавный переход
  slidesField.style.cssText = `
            width: ${100 * slides.length}%;
            display: flex;
            transition: all 0.5s ease-in-out;
        `;
  // назначим каждому слайду ширину окна карусели
  slides.forEach(slide => {
    slide.style.width = frameWidth;
  });
  // выставим начальные current и total
  currentSlide();
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }
  // зададим начальное положение в 0
  slidesField.style.transform = `translateX(0px)`;

  // сделаем функцию для приведения данных о ширине окна слайдера r xbcke

  function nextSlide() {
    // замкнем круг в конце, установив offset в 0 на конце карусели
    if (offset == (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(frameWidth) * (slides.length - 1)) {
      offset = 0;
    } else {
      // или прибавим к offset ширину окна карусели
      offset += (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(frameWidth);
    }
    // сбросим slideIndex на конце карусели
    if (slideIndex == slides.length) {
      slideIndex = 1;
      // или прибавим к нему единицу
    } else {
      slideIndex++;
    }
    // установим в current текущий slideIndex 
    currentSlide();
    // сдвинем slidesFilm на значение offset 
    slidesField.style.transform = `translateX(-${offset}px)`;
    dotActive();
  }
  function prevSlide() {
    if (offset == 0) {
      offset = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(frameWidth) * (slides.length - 1);
    } else {
      offset -= (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(frameWidth);
    }
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    currentSlide();
    slidesField.style.transform = `translateX(-${offset}px)`;
    dotActive();
  }

  // функция для отображения на странице номера слайда
  function currentSlide() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  // функция для выделения активной точки
  function dotActive() {
    dots.forEach(dot => {
      dot.classList.remove('dot-active');
    });
    dots[slideIndex - 1].classList.add('dot-active');
    ;
  }

  // цикл для создания точек
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i + 1);
    dotsWrap.append(dot);
    dots.push(dot);
    if (i == 0) {
      dot.classList.add('dot-active');
    }
  }

  // обработкики кликов на точки
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.dataset.index;
      slideIndex = slideTo;
      offset = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(frameWidth) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      dots.forEach(dot => {
        dot.classList.remove('dot-active');
      });
      e.target.classList.add('dot-active');
      currentSlide();
    });
  });

  // обработчики кликов на стрелки
  next.addEventListener('click', () => {
    nextSlide();
  });
  prev.addEventListener('click', () => {
    prevSlide();
  });

  // обработчики событий на сам слайдер
  slides.forEach(slide => {
    // клик в правую или левую часть
    slide.addEventListener('click', e => {
      if (e.offsetX < (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteNotDigits)(frameWidth) / 2) {
        prevSlide();
      } else {
        nextSlide();
      }
    });
    // настройка свайпа
    let x1, x2;
    slide.addEventListener('touchstart', e => {
      x1 = e.touches[0].clientX;
    });
    slide.addEventListener('touchend', e => {
      console.log(e);
      x2 = e.changedTouches[0].clientX;
      let deff = x1 - x2;
      if (deff < 0 && Math.abs(deff) > 100) {
        prevSlide();
      }
      if (deff > 0 && Math.abs(deff) > 100) {
        nextSlide();
      }
    });
  });

  // обычный слайдер

  // настроить total

  /* if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
  } else {
      total.textContent = slides.length;
  }
        // функция showSLide n 
        function showSlide(n) {
            // настраиваем замкнутый круг
      if (n > slides.length) {
          slideIndex = 1;
      }
      if (n < 1) {
          slideIndex = slides.length;
      }
      // для каждого слайда добавляем хайд и убираем шоу  
            slides.forEach(slide => {
          slide.classList.add('hide');
          slide.classList.remove('show', 'fadeOut', 'fadeIn');
      });
            //  добавляем шоу и убираем хайд для выбранного слайда
            slides[slideIndex - 1].classList.add('show');
      slides[slideIndex - 1].classList.remove('hide');
      
      // передаем slideIndex в счетчик на странице 
      
      current.textContent = slideIndex;
        }
        // запускаем showSlide по дефолту с первым слайдом
        showSlide(1);
        // пишем функцию, которая принимает n и вызывает showSlide c аргументом SlideIndex = slideIndex + n
        function changeSlide(n) {
      showSlide(slideIndex = slideIndex + n);
  }
        // вешаем на prev и next клик и запускаем функцию выше с аргументами -1 и 1 соответственно
  prev.addEventListener('click', () => {
      changeSlide(-1);
  });
        next.addEventListener('click', () => {
      changeSlide(1);
  }); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs

  let tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fadeIn');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fadeIn');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
  // Timer

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      return {
        'total': 0,
        'days': 0,
        'hours': 0,
        'minutes': 0,
        'seconds': 0
      };
    }
    const days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / (1000 * 60) % 60),
      seconds = Math.floor(t / 1000 % 60);
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
      t.minutes < 10 ? minutes.innerHTML = '0' + t.minutes : minutes.innerHTML = t.minutes;
      t.seconds < 10 ? seconds.innerHTML = '0' + t.seconds : seconds.innerHTML = t.seconds;
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  // setInterval(setClock(".timer", deadLine), 1000);
  setClock(id, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteNotDigits": () => (/* binding */ deleteNotDigits),
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await result.json();
};
function deleteNotDigits(str) {
  const reg = /\D/g;
  return +str.replace(reg, '');
}
const getResource = async url => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }
  return await result.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");









window.addEventListener('DOMContentLoaded', function () {
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', '.modal__content');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    indicatorsClass: 'carousel-indicators'
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2025-12-25');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map