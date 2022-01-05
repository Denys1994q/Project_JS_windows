import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const windows = document.querySelectorAll('[data-modal]');
    // шукаємо всі форми за тегом 'form'
    // на кожну форму вішаємо лісенер submit
    // дані з форми обробляємо через new FormData, в яку передаємо кожну окрему форму 
    // при сабміті запускаємо ф-ію postData, яка відправляє дані на сервер 

    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'загрузка...',
        success: 'Дякую! Ми з вами звяжемося',
        failure: 'Щось пішло не так'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'Post',
            body: data
        });
        return await res.text();
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) { // додаємо дані з попередніх форм у форму end
                    formData.append(key, state[key]); // додаємо у форматі ключ-значення
                }
            }

            const clearInputs = () => {
                input.forEach(item => item.value = '')
            }

            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                clearInputs();
                // setTimeout(() => {
                //     statusMessage.remove();
                // }, 2000)
                setTimeout(() => {
                    windows.forEach(item => {
                        item.style.display = 'none';
                        document.body.style.overflow = '';
                    })
                }, 2200)
            })
        })
    })
}



export default forms;