
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');
        let windowWidth = document.querySelector('#width');
        let windowHeight = document.querySelector('#height');
        let windowProfile = document.querySelectorAll('[type="checkbox"]');
       
        
        let message = document.createElement('div');
        message.textContent = 'Заповніть всі поля';

        function hide() {
            windows.forEach(item => {
                item.style.display = 'none';
                document.body.style.marginRight = '0' + 'px';
            })
            
        }
        function show() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }
        
        trigger.forEach(item => { // ф-ія, яка відкриває модалку
            item.addEventListener('click', (e) => {
                // if (e.target) {
                //     e.preventDefault();
                // }
                if (e.target.classList.contains('popup_calc_button')) {
                    e.preventDefault()
                    if (windowWidth.value !== '' && windowHeight.value !== '') {
                        hide()
                        show()
                    }
                    else {
                        windowWidth.style.border = '1px solid red';
                        windowHeight.style.border = '1px solid red';
                        document.querySelector('.popup_calc_button').insertAdjacentElement('afterEnd', message)
                    }
                }
                else if (e.target.classList.contains('popup_calc_profile_button')) {
                    windowProfile.forEach(elem => {
                        if (elem.checked) {
                            hide()
                            show()
                       }
                       else {
                            document.querySelector('.popup_calc_profile_button').insertAdjacentElement('afterEnd', message)
                       }
                   })
                }
                // else if (e.target.classList.contains('btn-block')) {
                //     console.log('ця кнопка')
                // }
                else {
                    e.preventDefault()
                    hide()
                    show()
                }
            });
        });
 
        close.addEventListener('click', () => { // ф-ія, яка закриває модалку по кліку на хрестик
            windows.forEach(item => {
                item.style.display = 'none';
                document.body.style.marginRight = '0' + 'px';
            })
            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open');
        });
        modal.addEventListener('click', (e) => { // ф-ія, яка закриває модалку по кліку на обложку
            if (e.target === modal && closeClickOverlay) {
            windows.forEach(item => {
                item.style.display = 'none';
                document.body.style.marginRight = '0' + 'px';
            })
            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open');
            }
        });
    }
    const scroll = calcScroll();
    function calcScroll() { // штучний блок, щоб забрати загальний скрол при появі всіх модалок
        let div = document.createElement('div');

        div.style.width = '50px'; // будь-яка ширина і висота
        div.style.height = '50px';
        div.style.overflowY = 'scroll'; // штучно задаємо, щоб з'явився скрол
        div.style.visibility = 'hidden'; // щоб ми його не бачили 

        document.body.appendChild(div); // просто кудись вставити
        let scrollWidth = div.offsetWidth - div.clientWidth; // віднімаємо від загальних параметрів блоку (разом зі скролом) його реальні параметри і різниця - це скрол в пікселях
        div.remove();

        return scrollWidth;
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }, time)
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
    showModalByTime('.popup', 2000);
};

export default modals;