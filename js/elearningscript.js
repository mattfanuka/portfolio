const iframe = document.querySelector('.story');
const courseSelections = document.querySelectorAll('.course-name');
const description = document.querySelector('.description');

let courseIndex;

const courses = [
    {
        id: 0,
        name: 'chess',
        src: "https://fanukaportfolio.s3.amazonaws.com/Chess+Principles+Beginner+Course/story.html",
        description: "<p class='desc-paragraph'>This was the first storyline course that I made, back in 2022. I was super into chess at the time, and wanted to make a full chess experience. That was a bit ambitious (ie. I didn't manage scope properly), and after lots of trial and error, settled on a more focused approach. <br></br> I built out a whole chessboard and used basic storyline trigger and variable functionality as well as animations to teach a few basic opening principles. Although it's a bit rough around the edges, I'm still proud of it for being my first Storyline course ever!</p>"
    },
    {
        id: 1,
        name: 'more',
        src: '',
        description:"<p class='desc-paragraph'> While this portfolio is under construction, feel free to see more eLearning examples on my first portfolio <a target='_blank' href='https://mattfanuka.wixsite.com/matt-fanuka/portfolio-landing-page'>here</a>.</p>"
    }
]
//Render page content and manage animation classes
courseSelections.forEach(function (course) {
    course.addEventListener('click', function () {
        const id = this.id;
        iframe.src = '';
        iframe.src = courses[id].src;
        handleIframeClass(courseIndex, id)
        if (courseIndex === id) {
            return
        }
        description.innerHTML = courses[id].description;
        const paragraph = document.querySelector('.desc-paragraph');
            setTimeout(function() {
                paragraph.classList.add('fade-in');
            }, 10); 
        courseIndex = this.id;
    }) 
})

function handleIframeClass(idx, id) {
    if (idx === id) {
        console.log(`${idx} & ${id}`)
        console.log(iframe.classList)
        return
    }
    if (iframe.classList.contains('.slide-in')) {
        return
    }
    iframe.classList.add('slide-in');
}