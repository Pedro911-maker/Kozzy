// GALLERY
var gallery = document.getElementById('gallery');

fetch('./js/img.json')
  .then(function (res) {
    return res.json();
  })
  .then(function (json) {
    json.forEach(function (el) {
      var galleryItem = document.createElement('div');
      galleryItem.setAttribute('class', 'gallery-item');

      var image = document.createElement('img');
      image.setAttribute('src', el.url);
      image.setAttribute('alt', el.caption);
      image.setAttribute('title', el.caption);
      image.setAttribute('loading', 'lazy');

      var caption = document.createElement('p');
      caption.className = 'gallery-caption';
      caption.innerText = el.caption;

      galleryItem.appendChild(image);
      galleryItem.appendChild(caption);
      gallery.appendChild(galleryItem);
    });
  })
  .catch(function(err) {
    console.error('Erreur gallery:', err);
    var mess = document.createElement('p');
    mess.innerText = 'Erreur de chargement: ' + err.message;
    gallery.appendChild(mess);
  });

// CAROUSEL
var carouselImages = document.getElementById('carouselImages');
var carouselCaption = document.getElementById('carouselCaption');
var carouselPrev = document.getElementById('carouselPrev');
var carouselNext = document.getElementById('carouselNext');

if (carouselImages && carouselCaption && carouselPrev && carouselNext) {
  fetch('js/Constellations.json')
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      json.forEach(function(el, i) {
        var image3 = document.createElement('img');
        image3.setAttribute('src', el.url);
        image3.setAttribute('alt', el.caption);
        image3.setAttribute('title', el.caption);
        carouselImages.appendChild(image3);
      });
      setupCarousel(json);
    });

  function setupCarousel(json) {
    var imageCount = carouselImages.childElementCount;
    var currentImage = 1;
    var imageWidth = 1200;

    carouselPrev.addEventListener('click', function() {
      if(currentImage != 1) {
        --currentImage;
        carouselImages.style.left = imageWidth - (currentImage * imageWidth) + 'px';
      }
      carouselCaption.innerText = json[currentImage - 1].caption;
    });

    carouselNext.addEventListener('click', function() {
      if(currentImage != imageCount) {
        ++currentImage;
        carouselImages.style.left = imageWidth - (currentImage * imageWidth) + 'px';
      }
      carouselCaption.innerText = json[currentImage - 1].caption;
    });

    carouselCaption.innerText = json[currentImage - 1].caption;
  }
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      var headerOffset = 100;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// PROGRESS BARS
var observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

var progressObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('style').split(':')[1];
    }
  });
}, observerOptions);

document.querySelectorAll('.progress-fill').forEach(function(bar) {
  progressObserver.observe(bar);
});