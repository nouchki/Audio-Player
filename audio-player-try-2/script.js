const music = document.querySelector(".js-music")
const playButton = document.querySelector(".js-play")
const pauseButton = document.querySelector(".js-pause")
const prevButton = document.querySelector(".js-prev")
const nextButton = document.querySelector(".js-next")
const playhead = document.querySelector(".js-playhead")
const volumeBtn = document.querySelector('.js-volume')
const volumeControls = document.querySelector('.js-volume-controls')
const volumeProgress = document.querySelector('.slider .progress')
const volumeElements = document.querySelector('.js-volume')
const volumeIcon = document.querySelector('.js-volume-icon')
const volumeControlsElement = document.querySelector('.js-volume-controls')
const title = document.querySelector(".js-title")
const artist = document.querySelector(".js-artist")
const poster = document.querySelector(".js-poster-image")
const volumeBarElement = document.querySelector('.js-volume-bar')
const fillElement = volumeBarElement.querySelector('.js-volume-bar-fill')
let timeline = document.querySelector(".js-seek-bar")
let timer = document.querySelector(".js-timer")
let duration = music.duration

let playlist = [
    [
        "Into The Unknown",
        "audios/into-the-unknown.mp3",
        "Panic! at the disco",
        "images/into-the-unknown.png"
    ],
    [
        "BOOM",
        "audios/boom.mp3",
        "NCT Dream",
        "images/boom.png"
    ],
    [
        "lovely",
        "audios/lovely.mp3",
        "Billie Eilish & Khalid",
        "images/lovely.jpg"
    ],
    [
        "Gotta Go",
        "audios/gotta-go.mp3",
        "Chungha",
        "images/gotta-go.jpg"
    ],
    [
        "Gonna Fly Now",
        "audios/gonna-fly-now.mp3",
        "코리안 팝스 오케스트라",
        "images/gonna-fly-now.jpg"
    ],
    [
        "Side Effects",
        "audios/side-effects.mp3",
        "Stray kids",
        "images/side-effects.jpg"
    ],
    [
        "Perfection",
        "audios/black-swan.mp3",
        "Black Swan",
        "images/black-swan.jpeg"
    ]
]

pauseButton.style.visibility = "hidden"

let i = 0

//PREV
prevButton.addEventListener('click', () => {
    if (i === playlist.length - 1) {
        i = 0
    } else {
        i++
    }

    music.src = playlist[i][1]
    title.innerHTML = playlist[i][0]
    artist.innerHTML = playlist[i][2]
    poster.src = playlist[i][3]
    playButton.style.visibility = "hidden"
    pauseButton.style.visibility = "visible"
    music.play()
})


// //NEXT
nextButton.addEventListener('click', () => {
    if (i === 0) {
        i = playlist.length - 1
    } else {
        i--
    }

    music.src = playlist[i][1]
    title.innerHTML = playlist[i][0]
    artist.innerHTML = playlist[i][2]
    poster.src = playlist[i][3]
    playButton.style.visibility = "hidden"
    pauseButton.style.visibility = "visible"
    music.play()
})

//FUNCTIONS
let onplayhead = false

mouseDown = () => {
    onplayhead = true
    window.addEventListener('mousemove', moveplayhead, true)
    music.removeEventListener('timeupdate', timeUpdate, false)
}

mouseUp = (_event) => {
    if (onplayhead == true) {
        moveplayhead(_event)
        window.removeEventListener('mousemove', moveplayhead, true)
        // change current time
        music.currentTime = duration * clickPercent(event)
        music.addEventListener('timeupdate', timeUpdate, false)
    }
    onplayhead = false
}

clickPercent = () => {
    return (event.clientX - getPosition(timeline)) / timelineWidth
}

playhead.addEventListener('mousedown', mouseDown, false)
window.addEventListener('mouseup', mouseUp, false)

moveplayhead = (_event) => {
    let newMargLeft = _event.clientX - getPosition(timeline)

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px"
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px"
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px"
    }
}

timeUpdate = () => {
    let playPercent = timelineWidth * (music.currentTime / duration)
    playhead.style.marginLeft = playPercent + "px"

}


//PLAY 
playButton.addEventListener('click', () => {
    music.play()
    playButton.style.visibility = "hidden"
    pauseButton.style.visibility = "visible"
    poster.classList.add("poster-playing")
    poster.style.animationPlayState = "running"
})


//PAUSE
pauseButton.addEventListener('click', () => {
    music.pause()
    playButton.style.visibility = "visible"
    pauseButton.style.visibility = "hidden"
    poster.style.animationPlayState = "paused"
})

music.addEventListener("canplaythrough", function () {
    duration = music.duration
}, false)

//SEEKBAR
music.addEventListener("canplaythrough", () => {
    duration = music.duration;
}, false);

getPosition = (_element) => {
    return _element.getBoundingClientRect().left;
}

let timelineWidth = timeline.offsetWidth - playhead.offsetWidth
music.addEventListener("timeupdate", timeUpdate, false)

timeline.addEventListener('click', (_event) => {
    moveplayhead(_event)
    music.currentTime = duration * clickPercent(_event)
}, false)


//TIMER

updateProgress = () => {
    let current = Math.floor(music.currentTime)
    let minutes = Math.floor(current / 60)
    let seconds = Math.floor(current % 60)
    if (current <= 9) {
        timer.innerHTML = '0:0' + current
    }
    if (seconds <= 9) {
        timer.innerHTML = minutes + ':0' + seconds
    } else {
        timer.innerHTML = minutes + ':' + seconds
    }
}

music.addEventListener('timeupdate', updateProgress)

// VOLUME

let drag

volumeBarElement.addEventListener('mousedown', (_event) => {
    drag = true
})

volumeBarElement.addEventListener('mousemove', (_event) => {
    if (drag) {
        const bounding = volumeBarElement.getBoundingClientRect() 
        const ratio = (_event.clientX - bounding.left) / bounding.width 
        fillElement.style.transform = `scaleX(${ratio})`
        if (ratio < 0) {
            drag = false
        }
        music.volume = Math.abs(ratio)
    }
})

volumeBarElement.addEventListener('mouseup', (_event) => {
    drag = false
})

//VOLUME ANIMATION

volumeControlsElement.classList.add('hidden')

volumeIcon.addEventListener('click', () =>
{
    volumeElements.classList.toggle('is-active')
    
})
document.addEventListener('keydown', () =>
{
    volumeControlsElement.classList.remove('is-active')
    volumeControlsElement.classList.add('hidden')
})