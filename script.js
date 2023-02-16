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
  if (location.href.includes("msgv3")) {
    window.history.pushState('data', title, new_url);
  } else {
    window.history.pushState('data', title, new_url);
  }
  
  
}

function settingsChange() {
  var url = "msgv3/settings/";
  changeurl(url, "Settings"); 
  getHTML( '../settings/', function (response) {
    var siteContent = document.querySelector( '#siteContent' );
    var otherSiteContent = response.querySelector( '#siteContent' );
    var children = otherSiteContent.querySelectorAll(".settings-container, .first-content");
    var pageTitle = document.querySelector("#pageTitle");
    pageTitle.innerHTML = "Settings";
    [].forEach.call(siteContent.children, function (child) {
      child.remove();
    });
    [].forEach.call(children, function (child) {
      siteContent.appendChild(child.cloneNode(true));
    });
    settingsLoad();
  });
  [].forEach.call(siteContent.children, function (child) {
    if (child.id != "games") {
      child.remove();
    }
});
}

function homeChange() {
  var url = "msgv3/";
  changeurl(url, "Home"); 
  getHTML( '../msgv3/', function (response) {
    var siteContent = document.querySelector( '#siteContent' );
    var games = document.querySelectorAll("#games");
    var otherSiteContent = response.querySelector( '#siteContent' );
    var children = otherSiteContent.querySelectorAll(".settings-container, .first-content, #games");
    var pageTitle = document.querySelector("#pageTitle");
    pageTitle.innerHTML = "Welcome to MSGv3";
    [].forEach.call(children, function (child) {
      siteContent.appendChild(child.cloneNode(true));
    });
  games.forEach(game => {
    game.remove();
   });
  });
  [].forEach.call(siteContent.children, function (child) {
    if (child.id != "games") {
      child.remove();
    }
});
}
console.log(window.location.pathname + window.location.search + window.location.hash);

function gameChange() {
  var url = "msgv3/games/";
  changeurl(url, "Games"); 
  getHTML( '../games/', function (response) {
    var siteContent = document.querySelector( '#siteContent' );
    var otherSiteContent = response.querySelector( '#siteContent' );
    var children = otherSiteContent.querySelectorAll("*");
    var pageTitle = document.querySelector("#pageTitle");
    pageTitle.innerHTML = "Games";

    var gamesDiv = document.querySelector("#games");
    if (!gamesDiv) {
      gamesDiv = document.createElement("div");
      gamesDiv.id = "games";
      siteContent.appendChild(gamesDiv);
    } else {
      while (gamesDiv.firstChild) {
        gamesDiv.removeChild(gamesDiv.firstChild);
      }
    }

    games.forEach(game => {
      var card = document.createElement("div");
      var content = document.createElement("div");
      var image = document.createElement("img");
      var title = document.createElement("h1");
      var desc = document.createElement("p");
    
      card.classList.add("card");
      image.src = game.image || "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg" // placeholder image
      image.style = "width: 100%"
      image.alt = "Game image"
      content.classList.add("card-content");
      title.innerHTML = game.title
      desc.innerHTML = game.description
      image.classList.add("game-image")
      content.appendChild(title)
      card.appendChild(image)
      content.appendChild(image)
      content.appendChild(desc)
      card.appendChild(content)
      gamesDiv.appendChild(card);
    
      _.on(card, "click", () => {
        location.href = game.file
      })
    })
  });
  [].forEach.call(siteContent.children, function (child) {
    if (child.id != "games") {
      child.remove();
    }
});
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
  if (f.files[0].type.indexOf('audio/') !== 0) {
    console.warn('not an audio file');
    return;
  }
  const reader = new FileReader();
  reader.onload = function() {
    var str = this.result;
    // Get the name of the audio file
    const fileName = f.files[0].name.replace(/\s/g, "_");
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
      objectStore.add({ name: fileName, data: str });
      console.log(str);
      aud = new Audio(str);
      localStorage.setItem("loaded", "1")
    };

    openRequest.onerror = function(event) {
      console.error("IndexedDB error: ", event.target.errorCode);
    };
  };
  reader.readAsDataURL(f.files[0]);
};

if (localStorage.getItem("loaded") === "1") {
  displaySongs();
}

const songs = [];
function displaySongs() {
  const songData = document.getElementById("songData");
  const openRequest = indexedDB.open("songs_db", 2);

  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["songs"], "readonly");
    const objectStore = transaction.objectStore("songs");

    objectStore.openCursor().onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        songs.push(cursor.value.name);
        cursor.continue();
      } else {
        let html = "";
        const totalSongs = songs.length;
        const maxSongsToDisplay = 10;
        const songsToDisplay =
          totalSongs > maxSongsToDisplay
            ? maxSongsToDisplay
            : totalSongs;
        for (let i = 0; i < songsToDisplay; i++) {
          const song = songs[i];
          html += `<div class="song" onclick="playSong('${song}'); currentSongIndex = ${i};">${song.replace(
            "_",
            " "
          )}</div>`;
        }
        if (totalSongs > maxSongsToDisplay) {
          html += `<button class="show-more" id="showMoreSongsBtn">Show All </button>`;
        }
        songData.innerHTML = html;
        if (totalSongs > maxSongsToDisplay) {
          const showMoreSongsBtn = document.getElementById(
            "showMoreSongsBtn"
          );
          showMoreSongsBtn.addEventListener("click", function() {
            let moreHtml = "";
            for (let i = maxSongsToDisplay; i < totalSongs; i++) {
              const song = songs[i];
              moreHtml += `<div class="song" onclick="playSong('${song}'); currentSongIndex = ${i};">${song.replace(
                "_",
                " "
              )}</div>`;
            }
            songData.innerHTML = html + moreHtml;
            showMoreSongsBtn.remove();
          });
        }
      }
    };
  };

  openRequest.onerror = function(event) {
    console.error("IndexedDB error: ", event.target.errorCode);
  };
}
let aud;
let currentSongIndex = 0;
let isPlaying = false;
var data_streams = localStorage.getItem("data_streams") || 0;

function playSong(songName) {
  const openRequest = indexedDB.open("songs_db", 2);

  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["songs"], "readonly");
    const objectStore = transaction.objectStore("songs");
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



      // Automatically play the next song when this one is done
      aud.addEventListener("ended", function() {
        if (currentSongIndex === songs.length - 1) {
          currentSongIndex = 0;
        } else {
          currentSongIndex += 1;
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
document.getElementById("backArrow").addEventListener("click", function() {
if (aud) {
aud.pause();
}
if (currentSongIndex === 0) {
currentSongIndex = songs.length - 1;
} else {
currentSongIndex -= 1;
}
playSong(songs[currentSongIndex]);
});

document.getElementById("forwardArrow").addEventListener("click", function() {
if (aud) {
aud.pause();
}
if (currentSongIndex === songs.length - 1) {
currentSongIndex = 0;
} else {
currentSongIndex += 1;
}
playSong(songs[currentSongIndex]);
});

let pause = document.getElementById("pause");

pause.addEventListener("click", function() {
  // updated the isPlaying flag based on the state of audio
  if (aud && !aud.paused) {
    aud.pause();
    isPlaying = false;
  } else if (aud) {
    aud.play();
    isPlaying = true;
  }
});

let mute = document.getElementById("mute");
let muted = document.getElementById("muted");

mute.addEventListener("click", function() {
  if (aud && !aud.muted) {
    aud.muted = true;
    muted.style.display = "block";
    mute.style.display = "none";
  }
});

muted.addEventListener("click", function() {
  if (aud && aud.muted) {
    aud.muted = false;
    mute.style.display = "block";
    muted.style.display = "none";
  }
});


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

        if (localStorage.getItem("webhookURL") === null) {
        } else if (localStorage.getItem("webhookURL") === "") {
          } else {
            webhookURL = localStorage.getItem("webhookURL");
          }
    const webhookUser = localStorage.getItem("webhookUser");


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
              "color": 15879747,
              "timestamp": "2023-02-15T21:30:58.894Z",
              "footer": {
                  "text": "Powered By: MSGv3",
                  "icon_url": "https://i.ibb.co/mHkm064/MSG-Logo-3.png"
              },
              "fields": [
                  {
                  "name": "Release Date:",
                  "value": "*" + lyrics + "*",
                  "inline": true
                  },
                  {
                      "name": "Song Name:",
                      "value": "*" + songTitle + "*",
                      "inline": true
                  },
                  {
                      "name": "Artist:",
                      "value": "*" + songArtist + "*",
                      "inline": true
                  },
                  {
                      "name": "Album",
                      "value": "*" + songAlbum + "*",
                      "inline": true
                  },
                  {
                      "name": "Song Length:",
                      "value": "__**" + songLength + "s**__",
                      "inline": false
                  }
              ],
              "title": webhookUser + " Has Starting Listening to:"
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

document.addEventListener('mouseup', function(e) {
  var container = document.getElementById('musicSettings');
  if (!container.contains(e.target)) {
      container.classList.add("settings-card");
      container.classList.remove("musicSettingsOpen");
      document.getElementById("musicSettingsContainer").style.display = "none";
  }
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

function returnID3Data(songData, cursor) {
  let title = "Unknown Title";
  let artist = "Unknown Artist";
  let album = "Unknown Album";
  let year = "Unknown Year";
  let picture = "Unknown Picture";

  let x = dataURItoBlob(songData);
  jsmediatags.read(x, {
    onSuccess: function(tag) {
      title = tag.tags.title || "Unknown Title";
      artist = tag.tags.artist || "Unknown Artist";
      album = tag.tags.album || "Unknown Album";
      year = tag.tags.year || "Unknown Year";
      picture = tag.tags.picture || "Unknown Picture";

      if (picture) {
        let base64String = "";
        for (let i = 0; i < picture.data.length; i++) {
          base64String += String.fromCharCode(picture.data[i]);
        }
        let base64 = "data:" + picture.format + ";base64," + window.btoa(base64String);
        songPhoto.src = base64;
      }

      const aud = new Audio(songData);
      aud.addEventListener("loadedmetadata", function() {
        const songDuration = formatTime(this.duration);
        const songTile = `
          <div class="song" onclick="playSong('${cursor.value.name}'); currentSongIndex = ${cursor.key};">
            <div class="song-title">${title}</div>
            <div class="song-duration">${songDuration}</div>
            <div class="song-date">${year}</div>
          </div>
        `;
        document.getElementById("song-tiles").innerHTML += songTile;
      });
    }
  });
}

      

function getID3Data(songData) {
  let x = dataURItoBlob(songData);
  jsmediatags.read(x, {
    onSuccess: function(tag) {
      console.log(tag);
      const title = tag.tags.title || "Unknown Title";
      const artist = tag.tags.artist || "Unknown Artist";
      const album = tag.tags.album || "Unknown Album";
      const year = tag.tags.year || "Unknown Year";
      let picture = tag.tags.picture;

      let songTitle = document.getElementById("songTitle");
      if (title === null) {
        title = "Unknown Title";
        localStorage.setItem("songTitle", title);
      } else if (title === "") {
        title = "Unknown Title";
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
      let duration = aud.duration;
      let songPhoto = document.getElementById("songPhoto");
      if (picture) {
        let base64String = "";
        for (let i = 0; i < picture.data.length; i++) {
          base64String += String.fromCharCode(picture.data[i]);
        }
        let base64 = "data:" + picture.format + ";base64," +
          window.btoa(base64String);
        songPhoto.src = base64;
        localStorage.setItem("songArt", base64);
      } else {
        console.log("No picture found.");
      }
      console.log("Title: " + title + ", Artist: " + artist);
      webhookSend(title, artist, album, duration, year);
    },
    onError: function(error) {
      console.log(error);
    }
  });
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

let hamburgerSidebar = document.getElementById("hamburgerSidebar");

hamburgerSidebar.addEventListener("click", function() {
  let sidebar = document.getElementById("sidebarWrap");
  if (sidebar.style.width === "20vw") {
    sidebar.style.width = "0vw";
  } else {
  sidebar.style.width = "20vw";
  }
});

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
