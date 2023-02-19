const albumSongs = [];
let albumIndex = 0;

function displayAlbumSongs(albumName) {
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
  
        const albumSongs = [];
        const songsDiv = document.getElementById("albumsDivs");
        objectStore.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const song = cursor.value;
                if (song.album === albumName) {
                    albumSongs.push(song);
                }
                cursor.continue();
            } else {
                if (albumSongs.length === 0) {
                    songsDiv.textContent = "No songs found in album.";
                    return;
                }
                albumSongs.forEach(function(song, i) {
                    song.index = i;
                    const songDiv = document.createElement("div");
                    songDiv.classList.add("songDiv");
                    let songName;
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
                    songDiv.innerHTML = `<img class="songImage" src="${song.image || '../assets/defaultSong.jpg'}" onclick="playAlbumSong('${song.name}'); currentSongIndex = ${i};">
                                        <div class="songTitle">${songName}</div>
                                        <div class="songArtist">${song.artist || ''}</div>
                                        <div class="songAlbum">${song.album || ''}</div>
                                        <div class="songYear">${song.year || ''}</div>
                                        <div class="expand-song" onclick="showMore('${song.name}')">Song Info</div>
                                        <div class="songInfo" onclick="goBackSong('${albumName}')"> Back </div>`;
                    songsDiv.appendChild(songDiv);
                });
            }
        };
    };
  
    openRequest.onerror = function(event) {
        console.error("IndexedDB error: ", event.target.errorCode);
    };
}


function playAlbumSong(songName) {
    console.log("WOOOO")
    const openRequest = indexedDB.open("songs_db", 2);
  
    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["songs"], "readonly");
      const objectStore = transaction.objectStore("songs");
      const getRequest = objectStore.get(songName);
      getRequest.onsuccess = function(event) {
        // pause the previous audio element before creating a new one
        if (aud) {
          aud.pause();
        }
        const songData = event.target.result.data;
        aud = new Audio(songData);
        isPlaying = !aud.paused;
        aud.play();
        getID3Data(songData);
        progressBar();
        logCurrentTime();
        };
    }
}


  function logAlbumSongs(albumName) {
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
  
      objectStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
          const song = cursor.value;
          if (song.album === albumName) {
            albumSongs.push(song.name);
          }
          cursor.continue();
        } else {
          console.log(`Songs in album "${albumName}":`);
          albumSongs.forEach(function(song) {
            console.log(song);
          });
          console.log(`Album songs array: ${JSON.stringify(albumSongs)}`);
        }
      };
    };
  
    openRequest.onerror = function(event) {
      console.error("IndexedDB error: ", event.target.errorCode);
    };
  }
  

  const urlParams = new URLSearchParams(window.location.search);
  const albumName = urlParams.get("album");
  if (albumName) {
    displayAlbumSongs(albumName);
    logAlbumSongs(albumName);
  }
  const pageTitle = document.getElementById("pageTitle");
  pageTitle.innerHTML = albumName;
  document.title = albumName;

  function gatherGoBack() {
    if (albumIndex === 0) {
      console.log("You are already at the beginning of the album!");
      return;
    }
  
    const prevSongName = albumSongs[albumIndex - 1];
  
    const openRequest = indexedDB.open("songs_db", 2);
  
    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["songs"], "readonly");
      const objectStore = transaction.objectStore("songs");
      const getRequest = objectStore.get(prevSongName);
  
      getRequest.onsuccess = function (event) {
        if (aud) {
          aud.pause();
        }
        const songData = event.target.result.data;
        aud = new Audio(songData);
        isPlaying = !aud.paused;
        aud.play();
        getID3Data(songData);
        progressBar();
        logCurrentTime();
        albumIndex--;
      };
    };
  
    openRequest.onerror = function (event) {
      console.error("IndexedDB error: ", event.target.errorCode);
    };
  }
  