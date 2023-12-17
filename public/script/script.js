document.getElementById('testeButton').addEventListener('click', playRandomSound);
document.getElementById('testeButton').addEventListener('click', logRunning);


function playRandomSound() {
  // List of sound file paths
  const soundFiles = [
    '../audio/chloelaugh.ogg',
    '../audio/kaya.ogg',
    '../audio/mm_mm.mp3',
    // mais no futuro talvez
  ];

  // Get a random sound from the list
  const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];

  // Create an audio element
  const audio = new Audio(randomSound);

  // Play the audio
  audio.play();
}

function logRunning() {
    console.log('Running');
  }