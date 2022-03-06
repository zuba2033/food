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


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeAnimation(modalSelector, contentSelector);
            setTimeout(() => closeModal(modalSelector), 800);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeAnimation(modalSelector, contentSelector);
            setTimeout(() => closeModal(modalSelector), 800);
    }
});

}

export default modal;

export {openModal, closeModal, closeAnimation};