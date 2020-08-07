const formulario = document.getElementById('form');
const inputs = document.querySelectorAll('#form input')
const expresiones = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,16}$/, // Letras y espacios, pueden llevar acentos.
    lastname: /^[a-zA-ZÀ-ÿ\s]{1,25}$/,
    password: /^.{4,20}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
}
const countrysides = {
    name: false,
    lastname: false,
    email: false,
    password: false,
};

const validateForm = (e) => {
    switch (e.target.name) {
        case "username":
            validateCountryside(expresiones.name, e.target, 'username');
            break;
        case "lastname":
            validateCountryside(expresiones.lastname, e.target, 'lastname');
            break;
        case "email":
            validateCountryside(expresiones.email, e.target, 'email');
            break;
        case "password":
            validateCountryside(expresiones.password, e.target, 'password');
            validatepassword();
            break;
        case "repeat-password":
            validatepassword();
            break;

    }
}

const validateCountryside = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grup-${campo}`).classList.remove('form-grupo-incorrect');
        document.getElementById(`grup-${campo}`).classList.add('form-grupo-correct');
        document.querySelector(`#grup-${campo} i`).classList.remove('bxs-x-circle');
        document.querySelector(`#grup-${campo} i`).classList.add('bx-check');
        document.querySelector(`#grup-${campo} .error-message`).classList.remove('error-message-active');
        countrysides[campo] = true;
    } else {
        document.getElementById(`grup-${campo}`).classList.add('form-grupo-incorrect');
        document.getElementById(`grup-${campo}`).classList.remove('form-grupo-correct');
        document.querySelector(`#grup-${campo} i`).classList.add('bxs-x-circle');
        document.querySelector(`#grup-${campo} i`).classList.remove('bx-check');
        document.querySelector(`#grup-${campo} .error-message`).classList.add('error-message-active');
        countrysides[campo] = false;
    }
}
const validatepassword = () => {
    const inputpassword1 = document.getElementById('password');
    const inputpassword2 = document.getElementById('repeat-password');
    if (inputpassword1.value !== inputpassword2.value) {
        document.getElementById(`grup-repeat-password`).classList.add('form-grupo-incorrect');
        document.getElementById(`grup-repeat-password`).classList.remove('form-grupo-correct');
        document.querySelector(`#grup-repeat-password i`).classList.add('bxs-x-circle');
        document.querySelector(`#grup-repeat-password i`).classList.remove('bx-check');
        document.querySelector(`#grup-repeat-password .error-message`).classList.add('error-message-active');
        countrysides['password'] = false;
    } else {
        document.getElementById(`grup-repeat-password`).classList.remove('form-grupo-incorrect');
        document.getElementById(`grup-repeat-password`).classList.add('form-grupo-correct');
        document.querySelector(`#grup-repeat-password i`).classList.remove('bxs-x-circle');
        document.querySelector(`#grup-repeat-password i`).classList.add('bx-check');
        document.querySelector(`#grup-repeat-password .error-message`).classList.remove('error-message-active');
        countrysides['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);

});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminos = document.getElementById('terminos');
    if (countrysides.name && countrysides.lastname && countrysides.email && countrysides.password && terminos.checked) {
      formulario.reset();
      
    }
});