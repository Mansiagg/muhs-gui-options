function hidePreloader() {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');

  preloader.style.display = 'none';
  mainContent.style.display = 'block';
  
}
// Automatically hide after 5 seconds as a fallback
setTimeout(hidePreloader, 8000);


const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


