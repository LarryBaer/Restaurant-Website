
const track = document.querySelector('.carousel_track'); 
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button-right');
const previousButton = document.querySelector('.carousel_button-left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;



//arrange the slides next to one another

const setSlidePosition = (slide, index)=>{
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const moveToTextSlide = (textTrack, currentSlide, targetSlide) =>{
    textTrack.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) =>{
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
    
}

const hideShowArrows = (slides, previousButton, nextButton, targetIndex) =>{
    if(targetIndex === 0){
        //not using .ishidden cause there is classList
        previousButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if(targetIndex === slides.length - 1) {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    
    } else{
        previousButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//when I click left, move slides to the left

previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;  
    const currentDot = dotsNav.querySelector('.current-slide');
    const previousDot = currentDot.previousElementSibling;
    
    const previousIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    
    updateDots(currentDot, previousDot);
    hideShowArrows(slides, previousButton, nextButton, previousIndex);
    
    moveToTextSlide(textTrack, currentSlide, prevSlide);
})

//when I click right, move slides to the right

nextButton.addEventListener('click', e => {
    
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    const amountToMove = nextSlide.style.left;
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, previousButton, nextButton, nextIndex);
    
    
    
    moveToTextSlide(textTrack, currentSlide, nextSlide);

})


//when I click, the nav indicators, move to that slide

dotsNav.addEventListener('click', e => {
    //what indicator was clicked on
    const targetDot = e.target.closest('button');
    //stops event listened, keeps going otherwise
    if(!targetDot) return;
    
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    
    updateDots(currentDot, targetDot);
    
    hideShowArrows(slides, previousButton, nextButton, targetIndex);
   
    moveToTextSlide(textTrack, currentSlide, targetSlide);
    
})

//----------------TEXT CAROUSEL-----------//
const textTrack = document.querySelector('.text_track');
const textSlides = Array.from(textTrack.children);


const setTextSlidePosition = (textSlide, index)=>{
    textSlide.style.left = slideWidth * index + 'px';
};
textSlides.forEach(setTextSlidePosition);




