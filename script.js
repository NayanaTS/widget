document.getElementById('file-input').addEventListener('change', function(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('image-container');
    const slides = document.getElementById('slides');
    let imageCount = imageContainer.getElementsByTagName('img').length;
    let currentSlide = 0;

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'fade-in';

                if (imageCount < 3) {
                    imageContainer.appendChild(img);
                } else {
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    slide.appendChild(img);
                    slides.appendChild(slide);
                }
                imageCount++;
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please upload only image files.');
        }
    }

    if (slides.children.length > 0) {
        showSlide(currentSlide);
    }
});

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}
