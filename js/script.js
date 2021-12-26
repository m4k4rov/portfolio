const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    menuLink = document.querySelectorAll('.menu__link'),
    closeMenu = document.querySelector('.menu__close');

hamburger.addEventListener('click',() => {
    menu.classList.toggle('active');
    disableScroll();
});
closeMenu.addEventListener('click',() => {
    menu.classList.toggle('active');
    enableScroll();
});
menuLink.forEach(item => {
    item.addEventListener('click',() => {
        menu.classList.toggle('active');
        enableScroll();
    });
});

//Блокировка скролла

function disableScroll() {
    const widthScroll=window.innerWidth-document.body.offsetWidth; //Ширина окна - Ширина документа = ширина скролла
    document.body.dbScrollY = window.scrollY; //Сколько пикселей от верха отмотали
    document.body.style.cssText=`
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
}

function enableScroll() {
    document.body.style.cssText='';
    window.scroll({
        top: document.body.dbScrollY,
    })
}

const sublineList = document.querySelectorAll('.me__card_subline'),
      percentList = document.querySelectorAll('.me__card_percent');
sublineList.forEach((item, index) => {
    item.style.width = percentList[index].textContent;
});

//Текст из формы в письмо
const form = document.querySelector('form');
form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let name = encodeURIComponent(document.getElementById('name').value);
    let email = encodeURIComponent(document.getElementById('email').value);
    let text = encodeURIComponent(document.getElementById('text').value);
    document.location.href = `mailto:makarov.pav.al@gmail.com?subject=Web-разработка&body=${text}%0A${name}%20${email}&amp`;
}, false);

//Движение элементов относительно указателя мыши и наклона девайса
const promo = document.querySelector('.promo');
promo.addEventListener('mousemove', (ev) => {
    ev.target.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.dataset.speed;
        const x = (window.innerWidth - ev.pageX*speed)/100;
        const y = (window.innerHeight - ev.pageY*speed)/100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    })
})
window.addEventListener('deviceorientation', function(ev) {
    document.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.dataset.speed;
        const x = (window.innerWidth - ev.gamma*speed)/10 - (window.innerWidth/10);
        const y = (window.innerHeight - ev.beta*speed)/10 - (window.innerHeight/10);
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    })
});

//Параллакс для изображений
jarallax(document.querySelectorAll('.jarallax'), {
    speed: 0.5,
    type: "scroll",
});

//Появление элементов в зоне видимости
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        entry.isIntersecting ? entry.target.classList.add('active') : entry.target.classList.remove('active');
    })
}, {
    threshold: [0.1, 0.5, 0.9]
})

const skillCard = document.querySelectorAll('.skills__card');
const workItem = document.querySelectorAll('.work__item');
const cardLine = document.querySelectorAll('.me__card_line');
skillCard.forEach(i => observer.observe(i));
workItem.forEach(i => observer.observe(i));
cardLine.forEach(i => observer.observe(i));
