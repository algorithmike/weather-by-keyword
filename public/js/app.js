const locationSearchForm = document.querySelector('#locationSearchForm')
const locationSearchInput = document.querySelector('#locationSearchInput')
const messageParagraph = document.querySelector('#messageParagraph')


locationSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageParagraph.textContent = "Loading..."

    const location = locationSearchInput.value
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) return messageParagraph.textContent = error;

            return messageParagraph.textContent = `${data.location}: ${data.forecast}`;
        })
    })
})