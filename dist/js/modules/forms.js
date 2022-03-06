import {openModal, closeModal, closeAnimation} from './modal'
import {postData} from '../services/services';

function forms(formSelector) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.classList.add('status');
            statusMessage.src = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data'); 
            // request.setRequestHeader('Content-type', 'application/json'); 
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })

            /* request.addEventListener('load', () => {
                if (request.status === 200) {
                    form.reset();
                    statusMessage.remove();
                    showThanksModal(message.success);
                } else {
                    showThanksModal(message.failure);
                }
            }); */
        });
    }

    function showThanksModal(message) {

        const prevModalDialog = document.querySelector('.modal__dialog'),
            modal = document.querySelector('.modal');

        prevModalDialog.classList.add('hide');
        openModal('.modal', '.modal__content');
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
            closeAnimation('.modal', '.modal__content');
            setTimeout(() => {
                prevModalDialog.classList.remove('hide');
                prevModalDialog.classList.add('show');
                closeModal('.modal', '.modal__content');
                thanksModal.remove();
            }, 800);
        }, 4000);
    }
}

export default forms;