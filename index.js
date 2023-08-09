'use strict';
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn => btn.addEventListener('click',openModal) ))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click',(e)=>{
 // const slcords = section1.getBoundingClientRect();
  section1.scrollIntoView()
})


//code for the tabbed component

const section3 = document.querySelector('#section--2')
const operations = section3.children[1].children
const [tabbedBtn, ...tabbedComp] = operations;
const but = [...tabbedBtn.children];
for (let [i,cur] of but.entries()) {
  but[i].addEventListener(
    'click', function(){
      for (let v = 0 ; v < but.length;v++){
        but[v].classList.remove('operations__tab--active')
        tabbedComp[v].classList.remove('operations__content--active')
      }
      but[i].classList.add('operations__tab--active')
      tabbedComp[i].classList.add('operations__content--active')
    }
  )
}

//menu fade animation
const nav = document.querySelector('.nav')
function linkEffect(e,color,opacity){
  const link = e.target
  link.style.color = color
  const siblings = link.closest('.nav').querySelectorAll('a');
  const logo = link.closest('.nav').querySelector('img');
  siblings.forEach(el => {
    if (el !== link) el.style.opacity = opacity
  });
  logo.style.opacity = opacity
}

nav.addEventListener('mouseover', function(e){
  if (e.target.classList.contains('nav__link')){
    linkEffect(e,'#000',0.5)
  }
})
nav.addEventListener('mouseout', function(e){
  if (e.target.classList.contains('nav__link')){
    linkEffect(e,'#333',1)
  }
})


function sticky(entries) {
  const entry = entries[0];
  if (!entry.isIntersecting ){
    nav.classList.add('sticky')
  } else{
    nav.classList.remove('sticky')
  }
}
const navHeight = nav.getBoundingClientRect().height
const header = document.querySelector('.header')
const headerObserver = new IntersectionObserver(
  sticky ,{root:null,threshold : 0,rootMargin:`-${navHeight}px`}
)
headerObserver.observe(header)

const allSection = document.querySelectorAll('.section');

for (const section of [...allSection]) {
    section.classList.add('section--hidden')
}
//reveal sections;

const revealSection = function(entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
   entry.target.classList.remove('section--hidden');
   sectionObserver.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(
  revealSection,{root:null,threshold:0.14}
)
allSection.forEach( function(cur){
  sectionObserver.observe(cur)
})

//lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');
function loadImg(entries , observer) {
 const [entry] = entries;
 
 if (!entry.isIntersecting) return;
 entry.target.src = entry.target.dataset.src;

entry.target.addEventListener(
  'load', ()=>{
    entry.target.classList.remove('lazy-img')
  }
)
observer.unobserve(entry.target)
}


const media = window.matchMedia('(max-width: 980px)')
if (media.matches) {
  const imgObserver = new IntersectionObserver(loadImg , {root:null,threshold:0,rootMargin:'-30px'});
  imgTarget.forEach(function(cur){
    imgObserver.observe(cur)
  })
}else{
  const imgObserver = new IntersectionObserver(loadImg , {root:null,threshold:0,rootMargin:'-200px'});
  imgTarget.forEach(function(cur){
imgObserver.observe(cur)
  })
}

const allSlides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider');
allSlides.forEach((cur,i) => {
  cur.style.transform = `translateX(${i * 100}%)`
})
//slider.style.overflow  = 'visible'
const maxSlide = allSlides.length
let targetSlide = 0;
let state = 0
const btnSlide = document.querySelectorAll('.slider__btn');
const dots = document.querySelector('.dots').children;
btnSlide[1].addEventListener('click',()=>{
  if(targetSlide === maxSlide -1){
    targetSlide = 0
  } else{
    targetSlide++;
  }
  state++
  allSlides.forEach((cur,i) => { 
    cur.style.transform = `translateX(${100 * (i-targetSlide)}%)`;
  
    if(state === 1){
      dots[0].classList.remove('act')
      dots[1].classList.add('act')
      dots[2].classList.remove('act')
    }else if(state === 2){
      dots[0].classList.remove('act')
      dots[1].classList.remove('act')
      dots[2].classList.add('act')
    }else if(state === 3){
      dots[0].classList.add('act')
      dots[1].classList.remove('act')
      dots[2].classList.remove('act')
      state= 0
    }
  })
  
})

btnSlide[0].addEventListener(
  'click',()=>{
    if(targetSlide === 0){
      targetSlide = 0
    } else{
      targetSlide--;
    }
    allSlides.forEach((cur,i) => { 
      cur.style.transform = `translateX(${100 * (i-targetSlide)}%)`;
    })
     if(dots[1].classList.contains('act')){
     dots[1].classList.remove('act');
     dots[0].classList.add('act')
     state = 0
    }
    else if(dots[2].classList.contains('act')){
      dots[2].classList.remove('act');
      dots[1].classList.add('act')
    }
  }
)
function movement(a1,a2,a3){
  allSlides[0].style.transform =  `translateX(${a1}%)`
  allSlides[1].style.transform =  `translateX(${a2}%)`
  allSlides[2].style.transform =  `translateX(${a3}%)`;
}
dots[0].addEventListener('click',()=>{
  movement(0,100,200)
  for (let x = 0 ;x < dots.length;x++){
    dots[x].classList.remove('act')
  }
  dots[0].classList.add('act');
  state =0;
  targetSlide = 0
})
dots[1].addEventListener('click',()=>{
  movement(-100,0,100)
  for (let x = 0 ;x < dots.length;x++){
    dots[x].classList.remove('act')
  }
  dots[1].classList.add('act')
  state =1;
  targetSlide = 1
})
dots[2].addEventListener('click',()=>{
  movement(-200,-100,0)
  for (let x = 0 ;x < dots.length;x++){
    dots[x].classList.remove('act')
  }
  dots[2].classList.add('act')
  state =2;
  targetSlide = 2
})
 

 //code for the hamburger menu
  const menu = document.querySelector('.menu');
const listItem = document.querySelector('.nav__links');
const body = document.querySelector('body')
const bar = document.querySelectorAll('.bar')
function fog(){
  menu.classList.remove('active')
  listItem.classList.remove('active')
  body.classList.remove('active') 
}
menu.addEventListener(
  'click', ()=>{
      menu.classList.toggle('active')
      listItem.classList.toggle('active')
      body.classList.toggle('active')
  }
)
      
listItem.addEventListener(
  'click',(e)=>{
     fog()
  if(e.target.matches('a')) {
      fog() 
      }
  })