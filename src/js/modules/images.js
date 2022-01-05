const images = () => {
    const workSection = document.querySelector('.works'),
          imgPopup = document.createElement('div'),
          bigImage = document.createElement('img');

    imgPopup.classList.add('popupImg');
    workSection.appendChild(imgPopup);
    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow = 'hidden';
        }

        if (target && target.matches('div.popupImg')) { // div з класом popup
            console.log(1)
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    })

};

export default images;