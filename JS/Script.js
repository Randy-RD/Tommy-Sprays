/******************************************
		/* Nav
	/*******************************************/
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

$(window).scroll(function () {
    if ($(window).width() <= 768) {
        if ($(window).scrollTop() > 0) {
            $('.nav div.logo').addClass('fixedLogo');
        } else {
            $('.nav div.logo').removeClass('fixedLogo');
        }
    } else {
        $('.nav div.logo').removeClass('fixedLogo');
    }
});

$(document).ready(function () {
    const nav = document.querySelector(".nav");
  
    function setNavHeight() {
      nav.style.height = window.innerWidth > 767 ? "120px" : "90px";
    }
  
    setNavHeight();
  
    $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        if (window.innerWidth > 767) {
          nav.style.height = "90px";
        }
      } else {
        $('.nav').removeClass('affix');
        if (window.innerWidth > 767) {
          nav.style.height = "120px";
        }
      }
    });
    
    $(window).resize(function () {
      setNavHeight();
    });
  });


/******************************************
		/* Slideshow
	/*******************************************/

    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.slide');
        const next = document.querySelector('#next');
        const prev = document.querySelector('#prev');
        const auto = true; // Auto scroll
        const intervalTime = 5000;
        let slideInterval;
    
        const nextSlide = () => {
            // Get current class
            const current = document.querySelector('.current');
            // Remove current class
            current.classList.remove('current');
            // Check for next slide
            if (current.nextElementSibling) {
                // Add current to next sibling
                current.nextElementSibling.classList.add('current');
            } else {
                // Add current to start
                slides[0].classList.add('current');
            }
            setTimeout(() => current.classList.remove('current'));
        };
    
        const prevSlide = () => {
            // Get current class
            const current = document.querySelector('.current');
            // Remove current class
            current.classList.remove('current');
            // Check for prev slide
            if (current.previousElementSibling) {
                // Add current to prev sibling
                current.previousElementSibling.classList.add('current');
            } else {
                // Add current to last
                slides[slides.length - 1].classList.add('current');
            }
            setTimeout(() => current.classList.remove('current'));
        };
    
        // Button events
        if (next && prev) {
            next.addEventListener('click', e => {
                nextSlide();
                if (auto) {
                    clearInterval(slideInterval);
                    slideInterval = setInterval(nextSlide, intervalTime);
                }
            });
    
            prev.addEventListener('click', e => {
                prevSlide();
                if (auto) {
                    clearInterval(slideInterval);
                    slideInterval = setInterval(nextSlide, intervalTime);
                }
            });
    
            // Auto slide
            if (auto) {
                // Run next slide at interval time
                slideInterval = setInterval(nextSlide, intervalTime);
    
                // Pause auto slide on mouseenter
                const slider = document.querySelector('.slider');
                if (slider) {
                    slider.addEventListener('mouseenter', e => {
                        clearInterval(slideInterval);
                    });
    
                    // Resume auto slide on mouseleave
                    slider.addEventListener('mouseleave', e => {
                        slideInterval = setInterval(nextSlide, intervalTime);
                    });
                } else {
                    console.error("The 'slider' element was not found");
                }
            }
        } else {
            console.error("The 'next' or 'prev' element was not found");
        }
    });


/******************************************
		/* FAQ Page
	/*******************************************/

    const toggles = document.querySelectorAll('.faq-toggle');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const parent = toggle.closest('.faq-question');
        parent.classList.toggle('active');
        const panel = parent.querySelector('.panel');
        panel.checked = !panel.checked;
      });
    });
    
    const plusSigns = document.querySelectorAll('.plus');
    
    plusSigns.forEach(sign => {
      sign.addEventListener('click', () => {
        const parent = sign.closest('.faq-question');
        parent.classList.toggle('active');
        const panel = parent.querySelector('.panel');
        panel.checked = !panel.checked;
      });
    });




// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});


$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });





   



