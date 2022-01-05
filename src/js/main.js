import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => { // скріпти починають працювати коли загрузилася верстка
    'use strict'
    console.log('GIT check')
    let modalState = {
        'form': 1,
        'type': 'tree'
    }; // обєкт, у який ми збираємо дані з усіх форм (інпути, селекти тощо)
    changeModalState(modalState) // ф-ія, яка збирає дані у modalState

    modals(); // не передаємо прямо в основну ф-ію параметри, бо там дві функції різні
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active'); // передаємо прямо сюди, бо лише одна ф-ія
    tabs ('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    forms(modalState) // передаємо modalState у forms, щоб додати дані у останню formData
    timer('#timer', '2022-01-20');
    images();
    
});

// function showModal(btn, modal, closeModal) {
//     let mod = document.querySelector(modal);
    
//     document.querySelector(btn).addEventListener('click', (e) => {
//             mod.style.display = 'block';
//         })

//     document.querySelector(closeModal).addEventListener('click', () => {
//             mod.style.display = 'none';
//         })
//     closeModalByClickOutside(modal)
// }

// showModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
// showModal('.contact_us_wrap .phone_link', '.popup', '.popup .popup_close');
// showModal('.feedback_block .phone_link', '.popup', '.popup .popup_close');

// function closeModalByClickOutside(selector) {
//     let mod = document.querySelector(selector);

//     mod.addEventListener('click', (e) => {
//         if (e.target == mod) {
//             mod.style.display = 'none';
//         }
//     });
// }