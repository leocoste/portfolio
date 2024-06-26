/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});


function switchCompetence(type) {
  var academique = document.getElementById('academique');
  var professionnel = document.getElementById('professionnel');
  var work_aca = document.getElementById('work_aca');
  var work_pro = document.getElementById('work_pro');

  if (type === 'academique') {
    academique.style.display = 'block';
    professionnel.style.display = 'none';
  } else if (type === 'professionnel') {
    academique.style.display = 'none';
    professionnel.style.display = 'block';
  }
  if (type === 'work_aca') {
    work_aca.style.display = 'block';
    work_pro.style.display = 'none';
  } else if (type === 'work_pro') {
    work_aca.style.display = 'none';
    work_pro.style.display = 'block';
  }
}