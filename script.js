const navLinks = document.querySelectorAll(".link");
const linkBack = document.querySelectorAll(".linkBack");
var jsmediatags = window.jsmediatags;



function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
   !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
     if (document.cancelFullScreen) {
        document.cancelFullScreen();
     } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
     } else if (document.webkitCancelFullScreen) {
       document.webkitCancelFullScreen();
     }
  }
}

function noDiscord() {
  let widg = document.getElementsByTagName("widgetbot-crate")[0];
  if (widg.style.display == "none") {
    widg.style.display = "block";
  }
  else {
    widg.style.display = "none";
  }
}

function reloadSite () {
  location.reload();
}

function darkLightSwitch() {
  if (document.documentElement.getAttribute('data-theme') == 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}

function changeurl(url, title) {
  var new_url = '/' + url;
  if (location.href.includes("msgweb")) {
    window.history.pushState('data', title, new_url);
  } else {
    window.history.pushState('data', title, new_url);
  }
  
  
}

function settingsChange() {
    let host = window.location.hostname;
    let port = window.location.port;
    if (port != "") {
      host = host + ":" + port;
    }
    window.location.href = "https://" + host + "/msgweb/settings/";
}

function homeChange() {
    let host = window.location.hostname;
  let port = window.location.port;
  if (port != "") {
    host = host + ":" + port;
  }
  window.location.href = "https://" + host + "/msgweb/";
}

function musicChange() {
    let host = window.location.hostname;
  let port = window.location.port;
  if (port != "") {
    host = host + ":" + port;
  }
  window.location.href = "https://" + host + "/msgweb/library/";

}

function gameChange() {
    let host = window.location.hostname;
    let port = window.location.port;
    if (port != "") {
      host = host + ":" + port;
    }
    window.location.href = "https://" + host + "/msgweb/games/";
}

function gptChange() {
    let host = window.location.hostname;
    let port = window.location.port;
    if (port != "") {
      host = host + ":" + port;
    }
    window.location.href = "https://" + host + "/msgweb/gpt/";
}



/**
 * Get HTML asynchronously
 * @param  {String}   url      The URL to get HTML from
 * @param  {Function} callback A callback funtion. Pass in "response" variable to use returned HTML.
 */
var getHTML = function ( url, callback ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();

};

// AUDIO HANDLING 

f.onchange = e => {
  const files = f.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.indexOf('audio/') !== 0) {
      console.warn(`File ${files[i].name} is not an audio file`);
      continue;
    }

    const reader = new FileReader();
    reader.onload = function() {
      const str = this.result;
      const fileName = files[i].name.replace(/\s/g, "_");

      // Get the ID3 data for the song
      getID3Data(str, true, fileName, function(id3Data) {
        // Add the song data and ID3 data to indexedDB
        const openRequest = indexedDB.open("songs_db", 2);
        openRequest.onupgradeneeded = function(event) {
          const db = event.target.result;
          if (!db.objectStoreNames.contains("songs")) {
            db.createObjectStore("songs", { keyPath: "name" });
          }
        };

        openRequest.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction(["songs"], "readwrite");
          const objectStore = transaction.objectStore("songs");
          objectStore.add({ name: fileName, data: str, id3Data: id3Data });
          aud = new Audio(str);
          localStorage.setItem("loaded", "1")
        };

        openRequest.onerror = function(event) {
          console.error("IndexedDB error: ", event.target.errorCode);
        };
      });
    };

    reader.readAsDataURL(files[i]);
  }
};

const songs = [];
let aud;
let currentSongIndex = 0;
let isPlaying = false;
var data_streams = localStorage.getItem("data_streams") || 0;
let recentSongs = [];
function playSong(songName) {
  const openRequest = indexedDB.open("songs_db", 2);

  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["songs"], "readonly");
    const objectStore = transaction.objectStore("songs");
    console.log(event);
    console.log(objectStore);
    console.log(objectStore.get(songName));
    const getRequest = objectStore.get(songName);
    data_streams ++;
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
      let sidebar = document.getElementById("sidebarWrap");
      if (sidebar.style.height === "22vw") {
      } else {
        raiseSidebar();
      }
      let recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      if (!recentlyPlayed.includes(songName)) {
        recentlyPlayed.unshift(songName);
      }
      // Save the recently played array to localStorage, with a maximum length of 5
      localStorage.setItem(
        "recentlyPlayed",
        JSON.stringify(recentlyPlayed.slice(0, 10))
      );  
/*
        // Store the start time of the song in localStorage
      const startTime = new Date().getTime();
      localStorage.setItem(`${songName}_start_time`, startTime);

      // Update the total listening time every second
      const updateTimer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        let minSec = formatMs(elapsedTime);
        localStorage.setItem(`${songName}_time_listened`, minSec);
      }, 1000);
*/
      // Automatically play the next song when this one is done
      aud.addEventListener("ended", function() {
        //clearInterval(updateTimer);
        if (currentSongIndex === songs.length - 1) {
          currentSongIndex = 0;
          console.log(currentSongIndex);
        } else {
          currentSongIndex += 1;
          console.log(currentSongIndex);
        }
        playSong(songs[currentSongIndex]);
      });
    };
  };

  openRequest.onerror = function(event) {
    console.error("Error accessing database", event.target.error);
  };
  localStorage.setItem("data_streams", data_streams);
}


async function displayRecentSongs() {
  const songData = document.getElementById("songData");
  const recentlyPlayedData = document.getElementById("recentlyPlayed");

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
displayRecentSongs();

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

document.getElementById("songData").addEventListener("click", function(event) {
  // pause the current audio if it's being played and a different song is clicked
  if (aud && isPlaying) {
    aud.pause();
  }

  // update the current song index based on the song being clicked
  currentSongIndex = songs.indexOf(event.target.innerHTML.replace(" ", "_"));
  playSong(songs[currentSongIndex]);
});


document.getElementById("volumeControl").addEventListener("input", function(event) {
  if (aud) {
    aud.volume = event.target.value;
  }
});
function goBack() {
if (aud) {
aud.pause();
}
if (currentSongIndex === 0) {
currentSongIndex = songs.length - 1;
} else {
currentSongIndex -= 1;
}
console.log(songs);
playSong(songs[currentSongIndex]);
  }

function goForward() {
if (aud) {
aud.pause();
}
if (currentSongIndex === songs.length - 1) {
currentSongIndex = 0;
} else {
currentSongIndex += 1;
}
console.log(songs);
playSong(songs[currentSongIndex]);
} 


function pausePlay() {
let pause = document.getElementById("pause");

  // updated the isPlaying flag based on the state of audio
  if (aud && !aud.paused) {
    aud.pause();
    isPlaying = false;
  } else if (aud) {
    aud.play();
    isPlaying = true;
  }

}

function mutePlay() {
let mute = document.getElementById("mute");
let muted = document.getElementById("muted");

  if (aud && !aud.muted) {
    aud.muted = true;
    muted.style.display = "block";
    mute.style.display = "none";
  }
}

function unmutePlay() {
  if (aud && aud.muted) {
    aud.muted = false;
    mute.style.display = "block";
    muted.style.display = "none";
  }
}


function progressBar() {
  if (!isPlaying) {
    setInterval(function() {
      const currentTime = aud.currentTime;
      const duration = aud.duration;
      const progress = (currentTime / duration) * 100;
      document.getElementById("progressBar").style.width = `${progress}%`;
    }, 1000); // update the progress bar every 1000 milliseconds (1 second)
  }
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

function logCurrentTime() {
  let timeDiv = document.getElementById("currentTime");
  setInterval(function() {
    const currentTime = aud.currentTime;
    const duration = aud.duration;
    const elapsedMinutes = Math.floor(currentTime / 60);
    const elapsedSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    const timeString = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSeconds.toString().padStart(2, '0')}/` +
                       `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
    timeDiv.innerHTML = timeString;
  }, 1000); // update the log every 1000 milliseconds (1 second)
}


lastSentTime = 0;

function webhookSend(songTitle, songArtist, songAlbum, songLength, lyrics) {
  console.log(songTitle, songArtist, songAlbum, songLength);
  if (localStorage.getItem("webhookUser") === null) {
  } else if (localStorage.getItem("webhookUser") === "") {
    } else {
    }
      console.log("work")
      var webhookPic = "";
      var webhookURL = "https://discord.com/api/webhooks/1074185746644209675/UN1iui7rUNN2Ak50xJ1UVlcYWruvgOXyMvsMf_Atn1nuuKHeqsxzTNWkRNzBrDLKDg4c";
      if (localStorage.getItem("webhookPic") === null) {
      } else if (localStorage.getItem("webhookPic") === "") {
        } else {
          webhookPic = localStorage.getItem("webhookPic");
        }

        if (localStorage.getItem("webhookURL") === null) {
        } else if (localStorage.getItem("webhookURL") === "") {
          } else {
            webhookURL = localStorage.getItem("webhookURL");
          }
                              
    const webhookUser = localStorage.getItem("webhookUser");
  

  if (localStorage.getItem("webhookUser") === null) {
  } else if (localStorage.getItem("webhookUser") === "") {
    } else {
      console.log("work !! !")
      var webhookPic = "";
      var webhookURL = "https://discord.com/api/webhooks/1074185746644209675/UN1iui7rUNN2Ak50xJ1UVlcYWruvgOXyMvsMf_Atn1nuuKHeqsxzTNWkRNzBrDLKDg4c";
      if (localStorage.getItem("webhookPic") === null) {
      } else if (localStorage.getItem("webhookPic") === "") {
        } else {
          webhookPic = localStorage.getItem("webhookPic");
        }
    const webhookUser = localStorage.getItem("webhookUser");
    let date = new Date();

  const currentTime = Date.now();
  if (currentTime - lastSentTime < 1000) {
    return;
  }
  lastSentTime = currentTime;
  
  const request = new XMLHttpRequest();
  request.open("POST", webhookURL);
  request.setRequestHeader('Content-type', 'application/json');
  const params = 
  {
    "embeds": [
        {
            "color": 3092790,
            "timestamp": date,
            "footer": {
                "text": "Powered by MSGv3",
                "icon_url": "https://i.ibb.co/mHkm064/MSG-Logo-3.png"
            },
            "fields": [
                
                {
                    "name": "Song Name:",
                    "value": "*" + songTitle + "*",
                    "inline": true
                },
          {
                    "name": "Album",
                    "value": "*" + songAlbum + "*",
                    "inline": true
                },
                {
                    "name": "Artist:",
                    "value": "*" + songArtist + "*",
                    "inline": true
                },
                {
                    "name": "Song Length:",
                    "value": "__**" + songLength + "s**__",
                    "inline": true
                },
          {
                "name": "Release Date:",
                "value": "*" + lyrics + "*",
                "inline": true
                }
            ],
            "title": webhookUser + " started listening to a song!"
        }
    ]
  }
  request.send(JSON.stringify(params));
}
}

function settingsLoad() {
  let musicSettingsOpen = document.getElementById("musicSettings");
musicSettingsOpen.addEventListener("click", function() {
  musicSettingsOpen.className = '';
  musicSettingsOpen.classList.add("musicSettingsOpen");
  console.log(musicSettingsOpen.classList);
  document.getElementById("musicSettingsContainer").style.display = "block";
});

let webhookUser = document.getElementById("webhookUser");
webhookUser.addEventListener("change", function() {
  localStorage.setItem("webhookUser", webhookUser.value);
  console.log(webhookUser.value);
});

let webhookPic = document.getElementById("webhookPic");
webhookPic.addEventListener("change", function() {
  localStorage.setItem("webhookPic", webhookPic.value);
  console.log(webhookPic.value);
});

let webhookURL = document.getElementById("webhookURL");
webhookURL.addEventListener("change", function() {
  localStorage.setItem("webhookURL", webhookURL.value);
  console.log(webhookURL.value);
});
}


function musicSettings() {
  let musicSettingsOpen = document.getElementById("musicSettings");
  musicSettingsOpen.className = '';
  musicSettingsOpen.classList.add("musicSettingsOpen");
  console.log(musicSettingsOpen.classList);
  document.getElementById("musicSettingsContainer").style.display = "block";
  console.log(document.getElementById("musicSettingsContainer").style.display);
  }
/*
    var container = document.getElementById('musicSettings');
        container.classList.add("settings-card");
        container.classList.remove("musicSettingsOpen");
        document.getElementById("musicSettingsContainer").style.display = "none";
  
  let webhookUser = document.getElementById("webhookUser");
  webhookUser.addEventListener("change", function() {
    localStorage.setItem("webhookUser", webhookUser.value);
    console.log(webhookUser.value);
  });
  
  let webhookPic = document.getElementById("webhookPic");
  webhookPic.addEventListener("change", function() {
    localStorage.setItem("webhookPic", webhookPic.value);
    console.log(webhookPic.value);
  });
  
  let webhookURL = document.getElementById("webhookURL");
  webhookURL.addEventListener("change", function() {
    localStorage.setItem("webhookURL", webhookURL.value);
    console.log(webhookURL.value);
  });
  console.log("Clicked")

*/
function clearDatabase() {
  const openRequest = indexedDB.open("songs_db", 2);
  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["songs"], "readwrite");
    const objectStore = transaction.objectStore("songs");
    const objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = function(event) {
      console.log("Successfully cleared the object store.");
    };

    objectStoreRequest.onerror = function(event) {
      console.error("Failed to clear the object store: ", event.target.errorCode);
    };
  };
  localStorage.setItem("loaded", "0");
  openRequest.onerror = function(event) {
    console.error("IndexedDB error: ", event.target.errorCode);
  };
}

function clearStreams() {
  localStorage.setItem("data_streams", 0);
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
/*
let nameTitle = document.getElementById("nameTitle");
if (localStorage.getItem("referredName") === null) {
  nameTitle.innerHTML = "Hello User!";
} else {
    nameTitle.innerHTML = ("Hello " + localStorage.getItem("referredName") + "!");
}*/
}
createEventListeners();
function getID3Data(songData, isUpload, fileName) {
  try {
    let x = dataURItoBlob(songData);
    jsmediatags.read(x, {
      onSuccess: function(tag) {
        console.log(tag);
        let title = tag.tags.title || fileName;
        let artist = tag.tags.artist || "";
        let album = tag.tags.album || "";
        let year = tag.tags.year || "";
        let picture = tag.tags.picture;
        let trackNum = tag.tags.track || "";

        let imageStr = null;
        if (picture) {
          let base64String = "";
          for (let i = 0; i < picture.data.length; i++) {
            base64String += String.fromCharCode(picture.data[i]);
          }
          let base64 = "data:" + picture.format + ";base64," +
            window.btoa(base64String);
          imageStr = base64;
        } else {
          imageStr = "assets/defaultSong.jpg";
        }

        if (isUpload) {
          const openRequest = indexedDB.open("songs_db", 2);
          openRequest.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("songs")) {
              db.createObjectStore("songs", { keyPath: "name" });
            }
          };

          openRequest.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["songs"], "readwrite");
            const objectStore = transaction.objectStore("songs");
            objectStore.add({ name: title, artist: artist, album: album, year: year, data: songData, image: imageStr, filename: fileName, track: trackNum });
            localStorage.setItem("loaded", "1")
          };

          openRequest.onerror = function(event) {
            console.error("IndexedDB error: ", event.target.errorCode);
          };
        }

        let songTitle = document.getElementById("songTitle");
        if (title === null) {
          title = fileName;
          localStorage.setItem("songTitle", title);
        } else if (title === "") {
          title = fileName;
          localStorage.setItem("songTitle", title);
        } else {
          songTitle.innerHTML = title;
          localStorage.setItem("songTitle", title);
        }
        let songArtist = document.getElementById("songArtist");
        if (artist === null) {
          artist = "Unknown Artist";
          localStorage.setItem("songArtist", artist);
        } else if (artist === "") {
          artist = "Unknown Artist";
          localStorage.setItem("songArtist", artist);
        } else {
          songArtist.innerHTML = artist;
          localStorage.setItem("songArtist", artist);
        }

        let songAlbum;
        if (album === null) {
          album = "Unknown Album";
          localStorage.setItem("songAlbum", album);
        } else if (album === "") {
          album = "Unknown Album";
          localStorage.setItem("songAlbum", album);
        } else {
          songAlbum = album;
          localStorage.setItem("songAlbum", album);
        }
        let songPhoto = document.getElementById("songPhoto");
        if (imageStr) {
          songPhoto.src = imageStr;
          localStorage.setItem("songArt", imageStr);
        } else {
          console.log("No picture found.");
        }
        console.log("Title: " + title + ", Artist: " + artist);
        if (!isUpload) {
          let duration = aud.duration;
          webhookSend(title, artist, album, duration, year);
        }
      },
      onError: function(error) {
        let title = fileName || "Unknown Title";
        let artist = "" || "Unknown Artist";
        let album = "" || "Unknown Album";
        let year = "" || "Unknown Year";
        let imageStr = "assets/defaultSong.jpg";
        let trackNum = "" || "Unknown Track Number";
        let songTitle = document.getElementById("songTitle");
    songTitle.innerHTML = title;
    localStorage.setItem("songTitle", title);

    let songArtist = document.getElementById("songArtist");
    songArtist.innerHTML = artist;
    localStorage.setItem("songArtist", artist);

    let songAlbum = album;
    localStorage.setItem("songAlbum", album);

    let songPhoto = document.getElementById("songPhoto");
    songPhoto.src = imageStr;
    localStorage.setItem("songArt", imageStr);
    if (isUpload) {
      const openRequest = indexedDB.open("songs_db", 2);
      openRequest.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("songs")) {
          db.createObjectStore("songs", { keyPath: "name" });
        }
      };

      openRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["songs"], "readwrite");
        const objectStore = transaction.objectStore("songs");
        objectStore.add({ name: title, artist: artist, album: album, year: year, data: songData, image: imageStr, filename: fileName, track: trackNum });
        localStorage.setItem("loaded", "1")
      };
    }
  }
    });

}catch (e) {
  console.log(e);
}
}


function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

function raiseSidebar() {
  let sidebar = document.getElementById("sidebarWrap");
  if (sidebar.style.height === "22vw") {
    sidebar.style.height = "0vw";
  } else {
  sidebar.style.height = "22vw";
  }
  let title = document.getElementById("songTitle");
  let artist = document.getElementById("songArtist");
  let picture = document.getElementById("songPhoto");
  let songTitle = localStorage.getItem("songTitle");
  let songArtist = localStorage.getItem("songArtist");
  let songArt = localStorage.getItem("songArt");

  if (songTitle === null) {
    songTitle = "Unknown Title";
  }
  if (songArtist === null) {
    songArtist = "Unknown Artist";
  }
  if (songArt === null) {
  } else {
  title.innerHTML = songTitle;
  artist.innerHTML = songArtist;
  picture.src = songArt;
  }
  progressBar();
  logCurrentTime();
}

// Listen for CTRL + Spacebar then do something
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.code == 'Space') {
    console.log("CTRL + Spacebar pressed");
  }
});


function createSongTiles() {
  const openRequest = indexedDB.open("songs_db", 2);

  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["songs"], "readonly");
    const objectStore = transaction.objectStore("songs");

    objectStore.openCursor().onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        const songName = cursor.value.name.replace("_", " ");
        const songData = cursor.value.data;
        const aud = new Audio(songData);
        let title, artist, album, year, picture;
        returnID3Data(songData).then(data => {
          [title, artist, album, year, picture] = data;
          console.log(title, artist, album, year, picture);
          aud.addEventListener("loadedmetadata", function() {
            const songDuration = formatTime(this.duration);
            const songTile = `
              <div class="song" onclick="playSong('${cursor.value.name}'); currentSongIndex = ${cursor.key};">
                <div class="song-title">${title || 'Unknown Title'}</div>
                <div class="song-duration">${songDuration}</div>
                <div class="song-date">${year || 'Unknown Year'}</div>
              </div>
            `;
            document.getElementById("song-tiles").innerHTML += songTile;
          });
        });
        cursor.continue();
      }
    };
  };

  openRequest.onerror = function(event) {
    console.error("IndexedDB error: ", event.target.errorCode);
  };
}


function padTime(num) {
  return (num < 10) ? "0" + num : num;
}

// format time in seconds to mm:ss format
function formatTime(time) {
  if (typeof time !== 'number') {
    return '--:--';
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  if (hours > 0) {
    return `${hours}:${padTime(minutes)}:${padTime(seconds)}`;
  } else {
    return `${minutes}:${padTime(seconds)}`;
  }
}

function formatMs(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


let nameTitle = document.getElementById("nameTitle");
if (localStorage.getItem("referredName") === null) {
  nameTitle.innerHTML = "Hello User!";
} else {
    nameTitle.innerHTML = ("Hello " + localStorage.getItem("referredName") + "!");
}

function timeSet() {
var time;
var d = new Date();
time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
document.getElementById("time").innerHTML = time;
console.log(time);
}

function updateTime() {
  console.log("Updating time...");
  setInterval(timeSet, 1000*60); //<---prints the time 
}  
timeSet();
updateTime();

