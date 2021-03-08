$(document).ready(function() {
    /* Apariencia de navegación al hacer scroll */
    $(window).scroll(function() {
        if (this.scrollY > 50) {
            $('.navbar').addClass("sticky")
        } else {
            $('.navbar').removeClass("sticky")
        }
    })

    /* Menu toggle | Navbar */
    $('.menu-hamburguer').click(function() {
        $('.navbar .menu').toggleClass('active')
        $('.menu-hamburguer i').toggleClass('active')
    })

    /* Scroll */
    $('.link').click(function() {
        event.preventDefault();
        if ($(this).attr('href') === "#services") {
            $("body, html").animate({
                scrollTop:$($(this).attr('href')).offset().top - 145
            },1000);
        } else {
            $("body, html").animate({
                scrollTop:$($(this).attr('href')).offset().top - 50
            },1000);
        }
    });
})

/* JS native */
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('.nombre');
const email = document.querySelector('.correo');
const subject = document.querySelector('.subject');
const mensaje = document.querySelector('.mensaje');

eventListeners();

function botonDisabled()
{
    formulario.lastElementChild.children[0].disabled = true;
        formulario.lastElementChild.children[0].style.opacity = ".5";
        formulario.lastElementChild.children[0].style.cursor = "not-allowed";
}

function eventListeners()
{
    document.addEventListener('DOMContentLoaded', () => {
        formulario.lastElementChild.children[0].disabled = true;
        formulario.lastElementChild.children[0].style.opacity = ".5";
        formulario.lastElementChild.children[0].style.cursor = "not-allowed";
    })
    nombre.addEventListener('input', validarCampo);
    email.addEventListener('input', validarCampo);
    subject.addEventListener('input', validarCampo);
    mensaje.addEventListener('input', validarCampo);
    formulario.addEventListener('submit', enviarEmail);
}

function validarCampo(evt)
{
    if (evt.target.value.length < 10) {
        evt.target.style.border = "2px solid red";
    } else {
        evt.target.style.border = "3px solid lightgreen";
        
    }
    validarEmail(evt);
    validarCampos();
}

function validarEmail(evt)
{
    if (evt.target.type === "email") {
        const arroba = evt.target.value.indexOf('@');
        if (arroba < 0) {
            evt.target.style.border = "2px solid red";
        }
    }
}

function validarCampos()
{
    if (nombre.value.length >= 10 && email.value.indexOf('@') > 0 && subject.value.length >= 10 && mensaje.value.length >= 10) {
        formulario.lastElementChild.children[0].disabled = false;
        formulario.lastElementChild.children[0].style.opacity = "1";
        formulario.lastElementChild.children[0].style.cursor = "pointer";
    } else {
        formulario.lastElementChild.children[0].disabled = true;
        formulario.lastElementChild.children[0].style.opacity = ".5";
        formulario.lastElementChild.children[0].style.cursor = "not-allowed";
    }
}

function enviarEmail(evt)
{
    evt.preventDefault();
    const datos = {
        nombre: nombre.value,
        email: email.value,
        subject: subject.value,
        mensaje: mensaje.value
    };
    $.post("backend/enviar-email.php", datos, function(response) {
        const datosObj = JSON.parse(response);
        const {alerta, color} = datosObj;
        const div = document.createElement('div');
        const spinner = document.querySelector('#spinner');
        const alert = document.querySelector('.alert');
        const parrafoAlert = document.querySelector('.alert p');
        parrafoAlert.textContent = alerta;
        alert.style.background = color;
        spinner.style.display = "block";
        setTimeout(() => {
            formulario.reset();
            botonDisabled();
            spinner.style.display = "none";
            alert.style.display = "block";
            setTimeout(() => {
                nombre.style.border = "none";
                email.style.border = "none";
                subject.style.border = "none";
                mensaje.style.border = "none";
                alert.style.display = "none";
            }, 3000);
        }, 3000);
    });
}