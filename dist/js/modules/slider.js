import {deleteNotDigits} from '../services/services';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field, indicatorsClass}) {
            // slider 2 варианта, карусель и обычный

            const current = document.querySelector(currentCounter),
                total = document.querySelector(totalCounter),
                next = document.querySelector(nextArrow),
                prev = document.querySelector(prevArrow),
                slides = document.querySelectorAll(slide),
                // for Carousel 
                slidesWrapper = document.querySelector(wrapper),
                slidesField = document.querySelector(field),
                frameWidth = window.getComputedStyle(slidesWrapper).width, /* ширина окна карусели */
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
            if (offset == deleteNotDigits(frameWidth) * (slides.length -1)) {
                offset = 0;
            } else {
            // или прибавим к offset ширину окна карусели
                offset += deleteNotDigits(frameWidth);
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
                offset = deleteNotDigits(frameWidth) * (slides.length -1);
            } else {
                offset -= deleteNotDigits(frameWidth);
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
            })
            dots[slideIndex-1].classList.add('dot-active');;
        }
    
        // цикл для создания точек
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dot.setAttribute('data-index', (i + 1));
            dotsWrap.append(dot);
            dots.push(dot);
            if (i == 0) {
                dot.classList.add('dot-active');
            }
        }
    
        // обработкики кликов на точки
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.dataset.index;
    
                slideIndex = slideTo;
                offset = deleteNotDigits(frameWidth) * (slideTo - 1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                
                dots.forEach(dot => {
                    dot.classList.remove('dot-active');
                })
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
            slide.addEventListener('click', (e) => {
                if (e.offsetX < deleteNotDigits(frameWidth) / 2) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            });
            // настройка свайпа
            let x1,
                x2;
    
            slide.addEventListener('touchstart', (e) => {
                x1 = e.touches[0].clientX;
            });
            slide.addEventListener('touchend', (e) => {
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

export default slider;