
function displayAllSongs(isMore) {
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
        if (isMore) {
          songsDiv.innerHTML = "";
          let i = 0;
          allSongs.forEach(function(song) {
            i++;
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
            songDiv.innerHTML = `<img class="songImage" src="${song.image || '../assets/defaultSong.jpg'}" onclick="playSong('${song.name}'); currentSongIndex = ${i};">
                              <div class="songTitle">${songName}</div>
                                 <div class="songArtist">${song.artist || ''}</div>
                                 <div class="songAlbum">${song.album || ''}</div>
                                 <div class="songYear">${song.year || ''}</div>
                                 <div class="expand-song" onclick="showMore('${song.name}')">Song Info</div>`;
            songsDiv.appendChild(songDiv);
          });
        } else {
          let i = 0;
        allSongs.slice(0, 14).forEach(function(song) {
          i++;
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
          songDiv.innerHTML = `<img class="songImage" src="${song.image || '../assets/defaultSong.jpg'}" onclick="playSong('${song.name}'); currentSongIndex = ${i};">
                            <div class="songTitle">${songName}</div>
                               <div class="songArtist">${song.artist || ''}</div>
                               <div class="songAlbum">${song.album || ''}</div>
                               <div class="songYear">${song.year || ''}</div>
                               <div class="expand-song" onclick="showMore('${song.name}')">Song Info</div>`;
          songsDiv.appendChild(songDiv);
        });
        if (allSongs.length > 14) {
          const moreSongsDiv = document.createElement("div");
          moreSongsDiv.classList.add("moreSongsDiv");
          moreSongsDiv.innerHTML = `<div class="show-moreSongs" onclick="displayAllSongs(true)">Show All Songs</div>`;
          songsDiv.appendChild(moreSongsDiv);
        }
      }
      };
    };
  
    openRequest.onerror = function(event) {
      console.error("IndexedDB error: ", event.target.errorCode);
    };
  }

  function showMore(songName) {
    let url = "songInfo.html?songName=" + songName;
    window.open(url, '_blank').focus();
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



function resizeGrid() {
    let subheadings = document.getElementsByClassName("subheading");
    if (subheadings[0].style.fontSize === "2vw") {
      // Revert all back to default values
      for (let i = 0; i < subheadings.length; i++) {
        subheadings[i].style.fontSize = "";
      }
      let songTitles = document.getElementsByClassName("song-Title");
      for (let i = 0; i < songTitles.length; i++) {
        songTitles[i].style.display = "";
      }
      let songImages = document.getElementsByClassName("song-image");
      for (let i = 0; i < songImages.length; i++) {
        songImages[i].style.width = "";
        songImages[i].style.height = "";
      }
      let songImage = document.getElementsByClassName("songImage");
      for (let i = 0; i < songImage.length; i++) {
        songImage[i].style.width = "10vw";
        songImage[i].style.height = "10vw";
        songImage[i].style.marginLeft = "";
      }
      // Get all elements with songArtist, songAlbum, songYear and display them
      let songArtist = document.getElementsByClassName("songArtist");
      for (let i = 0; i < songArtist.length; i++) {
        songArtist[i].style.display = "";
      }
      let songAlbum = document.getElementsByClassName("songAlbum");
      for (let i = 0; i < songAlbum.length; i++) {
        songAlbum[i].style.display = "";
      }
      let songYear = document.getElementsByClassName("songYear");
      for (let i = 0; i < songYear.length; i++) {
        songYear[i].style.display = "";
      }
      let resizeColor = document.getElementById("resizeColor");
      resizeColor.style.color = "var(--h1-color)";
    } else {
    //For each subheading change font size to 2vw
    for (let i = 0; i < subheadings.length; i++) {
      subheadings[i].style.fontSize = "2vw";
    }
    // Get all elements with the class song-Title and don't display them
    let songTitles = document.getElementsByClassName("song-Title");
    for (let i = 0; i < songTitles.length; i++) {
      songTitles[i].style.display = "none";
    }
    // Get all elements with the class song-Image and change their width to 10vw
    let songImages = document.getElementsByClassName("song-image");
    for (let i = 0; i < songImages.length; i++) {
      songImages[i].style.width = "5vw";
      songImages[i].style.height = "5vw";
    }
    // Get all elements with the name songImage and change their width and height to 4vw
    let songImage = document.getElementsByClassName("songImage");
    for (let i = 0; i < songImage.length; i++) {
      songImage[i].style.width = "4vw";
      songImage[i].style.height = "4vw";
      songImage[i].style.marginLeft = "3vw";
    }

    // Get all elements with songTitle, songArtist, songAlbum, songYear and don't display them
    let songArtist = document.getElementsByClassName("songArtist");
    for (let i = 0; i < songArtist.length; i++) {
      songArtist[i].style.display = "none";
    }
    let songAlbum = document.getElementsByClassName("songAlbum");
    for (let i = 0; i < songAlbum.length; i++) {
      songAlbum[i].style.display = "none";
    }
    let songYear = document.getElementsByClassName("songYear");
    for (let i = 0; i < songYear.length; i++) {
      songYear[i].style.display = "none";
    }
    let resizeColor = document.getElementById("resizeColor");
      resizeColor.style.color = "var(--media-icon-color)";
  }
    
  
}

function showAlbums() {
  const openRequest = indexedDB.open("songs_db", 2);
  openRequest.onerror = (event) => {
    console.log("Failed to open database");
  };
  openRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("songs", "readonly");
    const objectStore = transaction.objectStore("songs");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const songs = event.target.result;
      const albumCounts = {};

      songs.forEach((song) => {
        const album = song.album;
        if (album) {
          if (albumCounts[album]) {
            albumCounts[album]++;
          } else {
            albumCounts[album] = 1;
          }
        }
      });

      const albums = Object.keys(albumCounts).filter(
        (album) => albumCounts[album] > 1
      );

      const albumList = document.getElementById("albumsDiv");
      albumList.innerHTML = "";

      albums.forEach((album) => {
        const albumDiv = document.createElement("div");
        albumDiv.classList.add("album");

        const albumArt = document.createElement("img");
        albumArt.classList.add("album-art");
        albumArt.src = songs.find((song) => song.album === album).image;
        // Add onclick that will link to albuminfo.html with query of ?album=albumName
        albumArt.onclick = () => {
          let url = "albuminfo.html?album=" + album;
          window.open(url, '_blank').focus();
        };

        const albumName = document.createElement("p");
        albumName.classList.add("album-name");
        albumName.textContent = album;

        albumDiv.appendChild(albumArt);
        albumDiv.appendChild(albumName);

        albumList.appendChild(albumDiv);
      });
    };

    request.onerror = (event) => {
      console.log("Failed to get songs");
    };
  };
}

showAlbums();
