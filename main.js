// Create an audio object
var audio = new Audio();
audio.preload = "auto";

// Music data stored in an array of objects
var musics = [
  { name: "Aaye Kuch Abr", url: "./audio/Aaye Kuch Abr Kuch - Mehdi Hassan.m4a", img: "./images/mehdi.jpeg" },
  { name: "Mujhe Tum Nazar Se", url: "./audio/Mujhe Tum Nazar Se Gira To Rahe Ho - Mehdi Hassan.m4a", img: "./images/mehdi.jpeg" },
  { name: "Yeh Jo Halka Halka", url: "/audio/Yeh Jo Halka Saroor Hae - Nusrat Fateh Ali Khan.m4a", img: "./images/nafak.jpg" },
  { name: "Kali Kali Zulfon Ke", url: "./audio/Kali Kali Zulfon Ke Phande Na Dalo - Nusrat Fateh Ali Khan.m4a", img: "./images/nafak.jpg" },
  { name: "Un Ka Andaze Karam", url: "/audio/Un Ka Andaz-E-Karam - Complete Original Version - Nusrat Fateh Ali Khan.m4a", img: "./images/nafak.jpg" },
  {name: "Tumhe Dil Lagi Bhool", url:"/audio/Tumhe Dil Lagi Bhool Jani Padegi - Nusrat Fateh Ali Khan.m4a",img:"./images/nafak.jpg"}
];

// Select HTML elements
var musicList = document.querySelector('.music-list');
var playBtn = document.querySelector('#play');
var backwardBtn = document.querySelector('#backward');
var forwardBtn = document.querySelector('#forward');
var trackArt = document.querySelector('.track-art');
var trackTitle = document.querySelector('.track-title');
var trackDuration = document.querySelector('.track-duration');

// Initialize variables
var selectedSong = 0; // Tracks the current song index
var isPlaying = false; // Keeps track of the play/pause state

// Function to render the music list dynamically
function renderMusicList() {
  var listHTML = musics.map((music, idx) => `
    <div class="music-card" data-index="${idx}">
      <img src="${music.img}" alt="Cover Art">
      <h3>${music.name}</h3>
    </div>
  `).join('');
  musicList.innerHTML = listHTML;
}

// Function to load a track and update the player UI
function loadTrack(index) {
  audio.src = musics[index].url; // Set audio source
  trackArt.src = musics[index].img; // Update track art
  trackTitle.textContent = musics[index].name; // Update track title

  // Update track duration once metadata is loaded
  audio.addEventListener('loadedmetadata', () => {
    var minutes = Math.floor(audio.duration / 60);
    var seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    trackDuration.textContent = `${minutes}:${seconds}`;
    updateCountdown(); // Start countdown when track loads
  });
}

// Function to update the countdown duration during playback
function updateCountdown() {
  audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
      var remainingTime = audio.duration - audio.currentTime;
      var minutes = Math.floor(remainingTime / 60);
      var seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
      trackDuration.textContent = `${minutes}:${seconds}`;
    }
  });
}

// Function to play or pause the track
function playPause() {
  if (isPlaying) {
    audio.pause(); // Pause audio
    playBtn.innerHTML = `<i id="paused" class="ri-play-fill"></i>`;
  } else {
    audio.play(); // Play audio
    playBtn.innerHTML = `<i class="ri-pause-fill"></i>`;
  }
  isPlaying = !isPlaying; // Toggle play/pause state
}

// Event listener for clicking on music cards
musicList.addEventListener('click', (event) => {
  var musicCard = event.target.closest('.music-card');
  if (musicCard) {
    selectedSong = parseInt(musicCard.dataset.index); // Get the selected song index
    loadTrack(selectedSong); // Load the selected track
    audio.play(); // Start playing
    isPlaying = true;
    playBtn.innerHTML = `<i class="ri-pause-fill"></i>`;
  }
});

// Event listener for play button
playBtn.addEventListener('click', playPause);

// Event listener for backward button
backwardBtn.addEventListener('click', () => {
  selectedSong = (selectedSong > 0) ? selectedSong - 1 : musics.length - 1; // Move to the previous track
  loadTrack(selectedSong);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="ri-pause-fill"></i>`;
});

// Event listener for forward button
forwardBtn.addEventListener('click', () => {
  selectedSong = (selectedSong < musics.length - 1) ? selectedSong + 1 : 0; // Move to the next track
  loadTrack(selectedSong);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="ri-pause-fill"></i>`;
});

// Event listener for when the audio ends (auto-play next track)
audio.addEventListener('ended', () => {
  forwardBtn.click(); // Simulate clicking the forward button
});

// Render the music list and load the first track
renderMusicList();
loadTrack(selectedSong);