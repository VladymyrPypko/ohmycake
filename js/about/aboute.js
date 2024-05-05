document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.experience__lightbox');
    let currentSlide = 0;

    function showSlide(index) {
      images.forEach((image, i) => {
        if (i === index) {
          image.style.display = 'block';
        } else {
          image.style.display = 'none';
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide === images.length - 1) ? 0 : currentSlide + 1;
      showSlide(currentSlide);
    }
    setInterval(nextSlide, 2000);
    showSlide(currentSlide);
  });