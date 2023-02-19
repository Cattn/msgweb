
function displayAllSongs() {
    const openRequest = indexedDB.open("songs_db", 2);
  
    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("songs")) {
        db.createObjectStore("songs", { keyPath: "name" });
      }
    };
  
    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["songs"], "readonly");
      const objectStore = transaction.objectStore("songs");
        let songName;
      objectStore.getAll().onsuccess = function(event) {
        const allSongs = event.target.result;
        const songsDiv = document.getElementById("songsDiv");
        allSongs.forEach(function(song) {
          const songDiv = document.createElement("div");
          songDiv.classList.add("songDiv");
          if (song.name == "Unknown Title") {
            songName = song.filename;
          } else {
            songName = song.name;
          }
          if (song.artist == "Unknown Artist") {
            song.artist = "";
            }
            if (song.album == "Unknown Album") {
            song.album = "";
            }
            if (song.year == "Unknown Year") {
            song.year = "";
            }
          songDiv.innerHTML = `<img class="songImage" src="${song.image || '../assets/defaultSong.jpg'}" onclick="playSong('${song.name}'); currentSongIndex = 0;">
                            <div class="songTitle">${songName}</div>
                               <div class="songArtist">${song.artist || ''}</div>
                               <div class="songAlbum">${song.album || ''}</div>
                               <div class="songYear">${song.year || ''}</div>`;
          songsDiv.appendChild(songDiv);
        });
      };
    };
  
    openRequest.onerror = function(event) {
      console.error("IndexedDB error: ", event.target.errorCode);
    };
  }
  displayAllSongs();
  async function displayRecentSongs() {
    const songData = document.getElementById("songData");
    const recentlyPlayedData = document.getElementById("recentlyPlayedv2");
  
    const db = await openSongsDB();
    const transaction = db.transaction("songs", "readonly");
    const objectStore = transaction.objectStore("songs");
  
    let recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    let recentlyPlayedHtml = "";
  
    const requests = recentlyPlayed.map((songName) => getSong(objectStore, songName).catch(() => null)); // Catch errors and return null
    const songs = await Promise.all(requests);
  
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      if (song) { // Check if song is null or not
        if (song.image) {
          recentlyPlayedHtml += `
            <div class="song-container">
              <img class="song-image" src="${song.image}" onclick="playSong('${song.name}'); currentSongIndex = ${i};">
              <div class="song-Title">${song.name}</div>
            </div>
          `;
        } else {
          console.log(`Missing image property for song: ${JSON.stringify(song)}`);
        }
      }
    }
  
    recentlyPlayedData.innerHTML = recentlyPlayedHtml;
  
    const images = recentlyPlayedData.querySelectorAll(".song-image");
    images.forEach((image) => {
      image.addEventListener("click", () => {
        const audio = new Audio(image.dataset.songUrl);
        audio.play();
      });
    });
  }
  
  
  
  
  async function openSongsDB() {
    const dbName = "songs_db";
    const dbVersion = 2;
  
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);
  
      request.onerror = function(event) {
        console.error("IndexedDB error: ", event.target.errorCode);
        reject(event.target.errorCode);
      };
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        console.log("Database opened successfully");
        resolve(db);
      };
    });
  }
  
  function getSong(objectStore, name) {
    return new Promise((resolve, reject) => {
      const request = objectStore.get(name);
  
      request.onerror = function (event) {
        reject(new Error('Error retrieving song from database'));
      };
  
      request.onsuccess = function (event) {
        const song = event.target.result;
        if (!song) {
          const error = new Error(`Song '${name}' not found in database`);
          error.name = "SongNotFoundError";
          reject(error);
          return;
        }
  
        if (song.image) {
          const imageData = song.image;
          const dataUrl = imageData;
          song.image = dataUrl;
        }
  
        song.data = URL.createObjectURL(new Blob([song.data], {type: 'audio/mpeg'}));
        resolve(song);
      };
    });
  }
  
  function createEventListeners() {
    let menuExpand = document.getElementById("menuExpand");
    let hamburgerMenu = document.getElementById("hamburgerMenu");
    let menuExpanded = document.getElementById("menuExpanded");
    let menuContent = document.getElementById("menuContent");
    let navBar = document.getElementById("nav");
    menuExpand.addEventListener("click", function() {
      if (menuExpanded.classList.contains("menuExpandOpen")) {
        menuExpanded.classList.remove("menuExpandOpen");
        menuExpanded.classList.add("menuExpandClosed");
        menuExpanded.style.height = "";
        menuExpanded.style.width = "";
        menuContent.style.display = "none";
        navBar.style.display = "none";
      } else {
        menuExpanded.classList.remove("menuExpandClosed");
        menuExpanded.classList.add("menuExpandOpen");
        hamburgerMenu.style.height = "";
        hamburgerMenu.style.width = "";
        menuContent.style.display = "block";
        navBar.style.display = "block";
      }
    });
    let nameTitle = document.getElementById("nameTitle");
    if (localStorage.getItem("referredName") === null) {
      nameTitle.innerHTML = "Hello User!";
    } else {
        nameTitle.innerHTML = ("Hello " + localStorage.getItem("referredName") + "!");
    }
    }
  
  
displayRecentSongs();

