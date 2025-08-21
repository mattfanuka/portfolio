// Disappear intro text on video click
const intro = document.querySelector('.intro');
let introExists = true;

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'VIDEO' && introExists) {
        intro.classList.add('outro');
        introExists = false;
    }
})


// Script for fluffing background on video click
const videos = document.querySelectorAll('video');
let currentVideo = "";

const dot2 = document.querySelector('.dot2');
const dot3 = document.querySelector('.dot3');
let fluffing = false;

//Adds event listener to each video to check if bg is fluffing and if target is same as current video
//Then adds the fluff and sets the timeout to remove the class after the longest animation finishes
videos.forEach(function(video) {
    video.addEventListener('click', function(e) {
        if (!fluffing && e.target.id !== currentVideo) {
            dot2.classList.add('fluff1');
            dot3.classList.add('fluff2');
            fluffing = true;
            setTimeout(removeFluff, 2500);
        }
    })
});

function removeFluff() {
    dot2.classList.remove('fluff1');
    dot3.classList.remove('fluff2');
    fluffing = false;
}


// Video expanding
for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', function() {
        // Collapse other expanded video and collapse 
        if(this.id == currentVideo) {
            this.paused ? this.play() : this.pause();
            return;
        }
        else if(this.id != currentVideo) {
            closeExpandedVideos(videos);
        }

        // Add expanded class to clicked video    
        // Current video is set to the ID of the video that's clicked, and the video const is retrieved by using that value to getElementById
        currentVideo = `${this.id}`;
        const video = document.getElementById(`${currentVideo}`);
        if(!video.parentElement.classList.contains('expanded')) { //Then add the expanded class and set dimensions
            setDimensions(video); //Change CSS dimension variables
            video.parentElement.classList.add('expanded');
            const title = video.parentElement.parentElement.querySelector('.video-title');
            title.classList.add('big-title');
            video.controls = true;
            video.setAttribute("controlsList", "nofullscreen");
             setTimeout(() => {
                 video.play();
             }, 500); // Wait for animation
        }
    });
}

// Grabs the video height and width from DOM and sets the CSS variable that's used to define the video dimensions
function setDimensions(video) {
    const root = document.querySelector(':root')
    const height = video.height;
    const width = video.width;

    root.style.setProperty('--width', `${width}px`);
    root.style.setProperty('--height', `${height}px`);
}


// TODO make a function that doesn't loop through and just accesses the currentVideo to close the expanded one
function closeVideo(video) {
    video.parentElement.classList.remove('expanded');
    video.controls = false;
    video.removeAttribute("controlsList");
    video.pause();
    video.currentTime = 0;
}

// Inefficient because it cycles through all the videos
function closeExpandedVideos(videos) {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].parentElement.classList.contains('expanded')) {
            videos[i].parentElement.classList.remove('expanded');
            const title = videos[i].parentElement.parentElement.querySelector('.video-title');
            title.classList.remove('big-title');
            videos[i].controls = false;
            videos[i].removeAttribute("controlsList", "nofullscreen");
            videos[i].pause();
            videos[i].currentTime = 0;
            currentVideo = '';
        }
    }
}

const closeButton = document.querySelectorAll('.close-btn');

closeButton.forEach(button => button.onclick = () => closeExpandedVideos(videos));

/* Trying to document to future proof a bit

The video tile and expansion works like this:
    The tiles are 100px x 100px and the videos are set to cover
    
    When you click a video, it adds the expanded class to the wrapper div of the video
    
    It does this by setting the currentVideo index variable to the event.target.id
    
    If the currentVideo == event.target.id, the video cycles pause and play

    Otherwise, the videos HTML height and width properties are grabbed and stored as 
    variables
    
    Those variables are passed to the CSS and used to define the height of the wrappers 
    expanded class

    To close, it actually cycles through all the videos and removes the expanded class 
    from each video
    
    There will only ever be one video with expanded though, because the 
    closeExpandedVideos function is run whenever a video with a different id than
    currentVideo index is clicked

    The class for adjusting the video title CSS rules is also applied during this 
    process by accessing parentElement.parentElement.querySelector('.video-title')
*/
