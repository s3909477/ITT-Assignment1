$(document).ready(function () {

  /* --- SMOOTH SCROLLING --- */

  $('.nav-link').click(function (e) {

    var sectionTo = $(this).attr('href');
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top
    }, 1000);

    history.pushState(null, null, $(this).attr('href'));
  })

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () {
    myFunction()
  }

  window.addEventListener("orientationchange", myFunction, false);

  // Get the navbar
  let navbar = document.getElementById("navbar");

  // Get the offset position of the navbar
  let sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {


    if (window.pageYOffset > sticky) {
      navbar.classList.add("fixed-top");

    } else {
      navbar.classList.remove("fixed-top");
      sticky = navbar.offsetTop;
    }

  }

});

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '![]{}*^?#&©ƒ∂∆µ¨¥®†ª•¶§∞œ†©∫√≈Ωø¢≠';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.25) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}


// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Christopher Smith',

  's3903477',

  'Intro to IT',

  'Assignment 1',

];

const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;

const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1000);
  });
  counter = (counter + 1) % phrases.length;
};

next();



















