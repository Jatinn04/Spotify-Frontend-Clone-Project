let audio = new Audio();
let playBtn = document.getElementById("play");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");
let songList = document.querySelectorAll("#songList li");
let cover = document.getElementById("cover");
let songTitle = document.getElementById("songTitle");

let currentSongIndex = 0;

// Highlight active song
function highlightActiveSong() {
  songList.forEach((s, i) => {
    if (i === currentSongIndex) {
      s.style.background = "#1db954";
      s.style.color = "#000";
    } else {
      s.style.background = "#282828";
      s.style.color = "#fff";
    }
  });
}

// Load a song
function loadSong(index) {
  let song = songList[index];
  audio.src = song.getAttribute("data-src");

  let coverSrc = song.getAttribute("data-cover");
  cover.src = coverSrc ? coverSrc : "covers/default.jpg";

  songTitle.textContent = song.textContent;
  audio.play();
  playBtn.textContent = "⏸";
  highlightActiveSong();
  addToRecentlyPlayed(song.textContent, cover.src);
}

// Play/Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Next
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  loadSong(currentSongIndex);
});

// Previous
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
  loadSong(currentSongIndex);
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Play from list
songList.forEach((song, index) => {
  song.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
  });
});

// Cover animation toggle
audio.addEventListener("play", () => cover.classList.add("playing"));
audio.addEventListener("pause", () => cover.classList.remove("playing"));

// Recently Played Section
function addToRecentlyPlayed(songName, coverSrc) {
  let container = document.querySelector(".main-content");
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${coverSrc}" alt="cover"><p>${songName}</p>`;
  container.appendChild(card);
  setTimeout(() => card.classList.add("show"), 50);
}
