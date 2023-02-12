window.onscroll = function() {scrollFunction()};
const navLinks = document.querySelectorAll(".link");
const linkBack = document.querySelectorAll(".linkBack");

function scrollFunction() {
  if (document.body.scrollTop > 235 || document.documentElement.scrollTop > 235) {
    _.setCSS("#nav", "padding", "2.5vw 0.3vw");
   navLinks.forEach(navLinks => {
     navLinks.style.fontSize = "2vw"
     navLinks.style.height = "2vw"
      navLinks.style.width = "7vw"
      navLinks.style.paddingTop = "0.3vw"
      navLinks.style.marginLeft = "0.3vw"

   })
   linkBack.forEach(linkBack => {
    linkBack.style.height = "3vw"
    linkBack.style.width = "9vw"
  })
    _.setCSS("#logoMain", "height", "5vw");
    _.setCSS("#logoMain", "margin-left", "5vw");

    // Set Media Sizes 
    _.setCSS("#mediaPlayerOuter", "margin-bottom", "1vh");
    _.setCSS("#mediaPlayerOuter", "margin-left", "53vw");

    _.setCSS("#mediaPlayerOuter", "height", "11vh");
    _.setCSS("#mediaPlayerOuter", "width", "20vw");

    function checkForSmall(x) {
      if (x.matches) { // If media query matches
        document.getElementById("mediaPlayerWrap").style.marginTop = "0vh";
      } else {
        document.getElementById("mediaPlayerWrap").style.marginTop = "1vh";
      }
    }
    
    var x = window.matchMedia("(max-width: 900px)");
    checkForSmall(x);
    x.addListener(checkForSmall);

    function lowerSize(x) {
      if (x.matches) { // If media query matches
        document.getElementById("backArrow").style.height = "2vw";
        document.getElementById("backArrow").style.width = "2vw";
        document.getElementById("backArrow").style.borderRadius = "2vh";

        document.getElementById("pause").style.height = "2vw";
        document.getElementById("pause").style.width = "2vw";
        document.getElementById("pause").style.borderRadius = "2vh";

        document.getElementById("forwardArrow").style.height = "2vw";
        document.getElementById("forwardArrow").style.width = "2vw";
        document.getElementById("forwardArrow").style.borderRadius = "2vh";
      } else {
        document.getElementById("backArrow").style.height = "3vw";
        document.getElementById("backArrow").style.width = "3vw";
        document.getElementById("backArrow").style.borderRadius = "3vh";

        document.getElementById("pause").style.height = "3vw";
        document.getElementById("pause").style.width = "3vw";
        document.getElementById("pause").style.borderRadius = "3vh";

        document.getElementById("forwardArrow").style.height = "3vw";
        document.getElementById("forwardArrow").style.width = "3vw";
        document.getElementById("forwardArrow").style.borderRadius = "3vh";
      }
    }
    
    var x = window.matchMedia("(max-width: 900px)");
    lowerSize(x);
    x.addListener(lowerSize);
    // Set Quick Setting Sizes
    _.setCSS("#quickSettingsOuter", "margin-top", "0vh");
    _.setCSS("#quickSettingsOuter", "margin-left", "74vw");


    _.setCSS("#quickSettingsOuter", "height", "11vh");
    _.setCSS("#quickSettingsOuter", "width", "20vw");

    _.setCSS("#quickSettingsWrap", "margin-top", "1.5vh");

    _.setCSS("#themeSwitch", "height", "4vw");
    _.setCSS("#themeSwitch", "width", "4vw");
    _.setCSS("#themeSwitch", "border-radius", "3vh");
    _.setCSS("#themeSwitch", "margin-right", "1vw");

    _.setCSS("#reloadSwitch", "height", "4vw");
    _.setCSS("#reloadSwitch", "width", "4vw");
    _.setCSS("#reloadSwitch", "border-radius", "3vh");
    _.setCSS("#reloadSwitch", "margin-right", "1vw");

    _.setCSS("#fullScreenSwitch", "height", "4vw");
    _.setCSS("#fullScreenSwitch", "width", "4vw");
    _.setCSS("#fullScreenSwitch", "border-radius", "3vh");
    _.setCSS("#fullScreenSwitch", "margin-right", "1vw");
  } else {
    _.setCSS("#nav", "padding", "10vw 0.5vw");
    navLinks.forEach(navLinks => {
     navLinks.style.fontSize = "2vw"
     navLinks.style.height = "5vw"
      navLinks.style.width = "10vw"
    navLinks.style.paddingTop = "2vh"
     navLinks.style.marginLeft = "0vw"
   })
  linkBack.forEach(linkBack => {
   linkBack.style.height = "9vh"
   linkBack.style.width = "12%"
 })
   _.setCSS("#logoMain", "height", "15vw");
   _.setCSS("#logoMain", "margin-left", "1vw");

    // Re-size Media
    _.setCSS("#mediaPlayerOuter", "margin-bottom", "20vh");
    _.setCSS("#mediaPlayerOuter", "margin-left", "70vw");

    function checkForBig(x) {
      if (x.matches) { // If media query matches
        document.getElementById("mediaPlayerWrap").style.marginTop = "1vh";
      } else {
        document.getElementById("mediaPlayerWrap").style.marginTop = "5vh";
      }
    }
    
    var x = window.matchMedia("(max-width: 1500px)");
    checkForBig(x);
    x.addListener(checkForBig);

    _.setCSS("#mediaPlayerOuter", "height", "18vh");
    _.setCSS("#mediaPlayerOuter", "width", "23vw");

    _.setCSS("#backArrow", "height", "4vw");
    _.setCSS("#backArrow", "width", "4vw");
    _.setCSS("#backArrow", "border-radius", "2vh");

    _.setCSS("#pause", "height", "4vw");
    _.setCSS("#pause", "width", "4vw");
    _.setCSS("#pause", "border-radius", "2vh");

    _.setCSS("#forwardArrow", "height", "4vw");
    _.setCSS("#forwardArrow", "width", "4vw");
    _.setCSS("#forwardArrow", "border-radius", "2vh");

    // Re-Size Quick Setting Sizes
    _.setCSS("#quickSettingsOuter", "margin-top", "22vh");
    _.setCSS("#quickSettingsOuter", "margin-left", "70vw");


    _.setCSS("#quickSettingsOuter", "height", "18vh");
    _.setCSS("#quickSettingsOuter", "width", "23vw");

    _.setCSS("#quickSettingsWrap", "margin-top", "3vh");

    _.setCSS("#themeSwitch", "height", "6vw");
    _.setCSS("#themeSwitch", "width", "6vw");
    _.setCSS("#themeSwitch", "border-radius", "2vh");
    _.setCSS("#themeSwitch", "margin-right", "0.5vw");

    _.setCSS("#reloadSwitch", "height", "6vw");
    _.setCSS("#reloadSwitch", "width", "6vw");
    _.setCSS("#reloadSwitch", "border-radius", "2vh");
    _.setCSS("#reloadSwitch", "margin-right", "0.5vw");

    _.setCSS("#fullScreenSwitch", "height", "6vw");
    _.setCSS("#fullScreenSwitch", "width", "6vw");
    _.setCSS("#fullScreenSwitch", "border-radius", "2vh");
    _.setCSS("#fullScreenSwitch", "margin-right", "0.5vw");
  }
}

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
  getHTML( '../settings', function (response) {
    var siteContent = document.querySelector( '#siteContent' );
    var otherSiteContent = response.querySelector( '#siteContent' );
    var children = otherSiteContent.querySelectorAll(".settings-container, .first-content");
    var games = document.querySelector("#games");
    var pageTitle = document.querySelector("#pageTitle");
    pageTitle.innerHTML = "Settings";
    [].forEach.call(children, function (child) {
      siteContent.appendChild(child.cloneNode(true));
    });
  
    [].forEach.call(siteContent.children, function (child) {
      if (child !== games) {
        child.remove();
      }
    });
    games.remove();
    settingsLoad();
  });
}

function homeChange() {
  var url = "msgv3/";
  changeurl(url, "Home"); 
  getHTML( '../msgv3/', function (response) {
    var siteContent = document.querySelector( '#siteContent' );
    var otherSiteContent = response.querySelector( '#siteContent' );
    var children = otherSiteContent.querySelectorAll("*");
    var games = document.querySelector("#games");
    var pageTitle = document.querySelector("#pageTitle");
    pageTitle.innerHTML = "Welcome to MSGv3";
    [].forEach.call(children, function (child) {
      siteContent.appendChild(child.cloneNode(true));
    });
  
    [].forEach.call(siteContent.children, function (child) {
      if (child !== games) {
        child.remove();
      }
    });
    games.remove();
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
    [].forEach.call(children, function (child) {
      siteContent.appendChild(child.cloneNode(true));
    });
    games.forEach(game => {
      /*
      <div class="card">
        <img src="img_avatar.png" alt="Avatar" style="width:100%">
        <div class="card-content">
          <h4><b>John Doe</b></h4>
          <p>Architect & Engineer</p>
        </div>
      </div>
      */
    
      var card = document.createElement("div")
      var content = document.createElement("div")
      var image = document.createElement("img")
      var title = document.createElement("h1")
      var desc = document.createElement("p")
    
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
      _.get("#games").appendChild(card)
    
      _.on(card, "click", () => {
        location.href = game.file
      })
      
      
    })
  });
  [].forEach.call(siteContent.children, function (child) {
    child.remove();
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
          html += `<button id="showMoreSongsBtn">Show More </button>`;
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
let data_streams = localStorage.getItem("data_streams") || 0;

function playSong(songName) {
  const openRequest = indexedDB.open("songs_db", 2);

  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["songs"], "readonly");
    const objectStore = transaction.objectStore("songs");
    const getRequest = objectStore.get(songName);
    data_streams += 1;
    getRequest.onsuccess = function(event) {
      // pause the previous audio element before creating a new one
      if (aud) {
        aud.pause();
      }
      const songData = event.target.result;
      aud = new Audio(songData.data);
      isPlaying = !aud.paused;
      aud.play();
      sendMessage();


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

lastSentTime = 0;

function sendMessage() {
  if (localStorage.getItem("webhookUser") === null) {
  } else if (localStorage.getItem("webhookUser") === "") {
    } else {
      console.log("work")
    const webhookUser = localStorage.getItem("webhookUser");

  const currentTime = Date.now();
  if (currentTime - lastSentTime < 1000) {
    return;
  }
  lastSentTime = currentTime;
  
  const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1074185746644209675/UN1iui7rUNN2Ak50xJ1UVlcYWruvgOXyMvsMf_Atn1nuuKHeqsxzTNWkRNzBrDLKDg4c");
  request.setRequestHeader('Content-type', 'application/json');
  const params = {
    username: webhookUser,
    avatar_url: "",
    content:"Currently Playing: " + songs[currentSongIndex]
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