const startSectionLogo = document.querySelector('.start-section-logo:not(.no-animate)');

if (startSectionLogo) {
  const items = startSectionLogo.querySelectorAll('.start-section-logo__center img');
  const shine = startSectionLogo.querySelector('.start-section-logo__center-shine-container');
  const shineBig = startSectionLogo.querySelector('.start-section-logo__shine-big');
  const shineSmall = startSectionLogo.querySelector('.start-section-logo__shine-small');
  const leftBracket = startSectionLogo.querySelectorAll('.start-section-logo__bracket.is-bracket-left');
  const rightBracket = startSectionLogo.querySelectorAll('.start-section-logo__bracket.is-bracket-right');

  const bracketCollors = [
    { left: '#F9AF9C', right: '#9E97C1', shineBig: '#F6D6E3', shineSmall: '#FFFFFF' },
    { left: '#E3605D', right: '#FF817E', shineBig: '#FFA8A7', shineSmall: '#FFFCFC' },
    { left: '#8B73D0', right: '#FB79BD', shineBig: '#DCAFE0', shineSmall: '#FFFFFF' },
    { left: '#DEB8D7', right: '#FADAFB', shineBig: '#A59FB7', shineSmall: '#FFFFFF' },
  ];

  let activeItem = 0;
  let rotate = 0;
  setInterval(() => {
    items[activeItem].classList.remove('is-active');
    if (activeItem + 1 < items.length) {
      activeItem++;
    } else {
      activeItem = 0;
    }
    items[activeItem].classList.add('is-active');
    rotate += 360 / items.length;
    shine.style.transform = `rotate(${rotate}deg)`;
    leftBracket.forEach((el) => (el.style.fill = bracketCollors[activeItem].left));
    rightBracket.forEach((el) => (el.style.fill = bracketCollors[activeItem].right));

    shineBig.style.fill = bracketCollors[activeItem].shineBig;
    shineSmall.style.fill = bracketCollors[activeItem].shineSmall;
  }, 1300);
}
