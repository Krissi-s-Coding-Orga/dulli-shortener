import "bootstrap/dist/js/bootstrap.min.js"
import {Tooltip} from "bootstrap";

window.addEventListener('load', (event) => {
    load()
})

function load() {
    void loadForm()
    void loadCopy()

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl, {trigger: 'click'})
    })
}

async function loadCopy() {
    const copyButton = document.getElementById('copyButton')

    if(!copyButton) return

    copyButton.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()

        const url = document.getElementById('url')

        navigator.clipboard.writeText(url.value);
    })
}

async function loadForm() {
    const form = document.getElementById('urlForm')

    if(!form) return

    const submitButton = document.getElementById('formSubmit')

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        event.stopPropagation();

        const url = document.getElementById('url')

        if(!(new RegExp("^(http|https)://", "i").test(url.value))) {
            url.setCustomValidity('invalid.')
            if (!form.classList.contains('was-validated')) {
                form.classList.add('was-validated');
            }
            url.classList.remove('is-valid')
            if(!url.classList.contains('is-invalid')) {
                url.classList.add('is-invalid')
            }
            return
        } else {
            url.setCustomValidity('')
        }

        if (form.checkValidity() === false) {
            if (!form.classList.contains('was-validated')) {
                form.classList.add('was-validated');
            }
            return
        }

        form.classList.remove('was-validated')

        const formData = new FormData(form, submitButton)

        const inputs = form.querySelectorAll('input, select, button')

        for (const input of inputs) {
            input.disabled = true
        }

        submitButton.innerHTML = `
  <span class="">Generate</span>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

        const response = await fetch('/api', {
            method: 'post',
            body: formData
        })

        const result = await response.text()
        const resultDocument = new DOMParser().parseFromString(result, 'text/html')

        document.querySelector('main').innerHTML = resultDocument.querySelector('main').innerHTML

        load()
    }, false);
}