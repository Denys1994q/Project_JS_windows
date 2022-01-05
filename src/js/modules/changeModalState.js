import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    // знаходимо елементи на сторінці 
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');
    // записуємо їх значення
   
    checkNumInputs('#width')
    checkNumInputs('#height')

    function bindActionToElems(event, element, prop) {
        element.forEach((item, index) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' : // якщо картинки вікон
                        state[prop] = index;
                        break;
                    case 'INPUT' :
                        if (item.getAttribute('type') === 'checkbox') { // якщо чекбокс
                            index === 0 ? state[prop] = 'Холодне' : state[prop] = 'Тепле'
                            element.forEach((box, j) => {
                                box.checked = false;
                                if (index == j) {
                                    box.checked = true;
                                }
                            })
                        } else { // якщо інпут звичайний (висота, ширина)
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' : // якщо селект
                            state[prop] = item.value;
                        break;
                }
                console.log(state)
            })
        })
    }
    bindActionToElems('click', windowForm, 'form')
    bindActionToElems('input', windowWidth, 'width')
    bindActionToElems('input', windowHeight, 'height')
    bindActionToElems('change', windowType, 'type')
    bindActionToElems('change', windowProfile, 'profile')
};

export default changeModalState;

