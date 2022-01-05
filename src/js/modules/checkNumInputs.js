const checkNumInputs = (input) => {
    const inputNumbers = document.querySelectorAll(input);
    inputNumbers.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '') // всі НЕ цифри перетворюються в пусті строки без пробіла навіть
        })
    })
}

export default checkNumInputs;
