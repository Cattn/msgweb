async function showSongInfo() {
    // Get the song name from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const songName = urlParams.get('songName');
    document.title = songName;
  
    // Decode any encoded characters in the song name
    const decodedSongName = decodeURIComponent(songName);
  
    // Retrieve the song from indexedDB
    const db = await new Promise((resolve, reject) => {
      const request = window.indexedDB.open('songs_db');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    const transaction = db.transaction('songs', 'readonly');
    const store = transaction.objectStore('songs');
    const request = store.get(decodedSongName);
    const song = await new Promise((resolve, reject) => {
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  
    const songInfoDiv = document.getElementById('songInfoContainer');
    songInfoDiv.classList.add('song-info');
    // Add ID to songInfoDiv of songsDiv
    songInfoDiv.id = 'songsDivs';
    let pageTitle = document.getElementById('pageTitle');
    pageTitle.innerHTML = song.name;
  
    songInfoDiv.innerHTML = `
        <div class="songsDiv">
      <img class="songsImage" src="${song.image || '../assets/defaultSong.jpg'}" onclick="playSong('${song.name}'); currentSongIndex = 0;">
      <div class="songsArtist">${song.artist || ''}</div>
      <div class="songsAlbum">Album: ${song.album || ''}</div>
      <div class="songsYear">Released: ${song.year || ''}</div>
        </div>
    `;
  
    songInfoDiv.appendChild(songInfoDiv);
  }
  
  showSongInfo();
  