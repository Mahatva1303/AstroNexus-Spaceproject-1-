
function createStars(count) {
  const container = document.getElementById('star-container');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
}


function createShootingStars(count) {
  const container = document.getElementById('star-container');
  for (let i = 0; i < count; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    shootingStar.style.top = `${Math.random() * 100}%`;
    shootingStar.style.left = `${Math.random() * 100}%`;
    shootingStar.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(shootingStar);
  }
}


createStars(600);
createShootingStars(5);


function launchRocket() {
  const container = document.getElementById('rocket-container');
  
  const rocket = document.createElement('img');
  rocket.src = 'rocket.svg'; // use your actual image path
  rocket.classList.add('rocket');
  
  container.appendChild(rocket);

  // Remove the rocket after the animation completes (8s here)
  setTimeout(() => {
    rocket.remove();
  }, 8);
}

// Launch a rocket every 12 seconds (8s animation + 4s delay)
setInterval(launchRocket, 14 );

// Launch the first rocket immediately
launchRocket();


function triggerWarpEffectAndRedirect(url) {
  const line = document.getElementById('line-sweep');
  const flash = document.getElementById('flash-overlay');

  // Reset initial states
  line.style.opacity = '1';
  line.style.width = '0';
  flash.style.opacity = '0';
  flash.style.width = '0';
  flash.style.height = '0';

  // Animate line sweep
  line.animate([
    { width: '0', opacity: 1 },
    { width: '100vw', opacity: 1 }
  ], {
    duration: 400,
    easing: 'ease-out'
  });
  setTimeout(() => {
    line.style.width = '100vw';
  }, 10);

  // After line, trigger flash from center
  setTimeout(() => {
    line.style.opacity = '0';
    flash.style.opacity = '1';
    flash.animate([
      { width: '0', height: '0', opacity: 1 },
      { width: '300vw', height: '300vh', opacity: 1 }
    ], {
      duration: 400,
      easing: 'ease-out',
      fill: 'forwards'
    });

    // Redirect after delay (flash effect duration + hold time)
    setTimeout(() => {
      window.location.href = url;
    }, 2000); // adjust timing to match your animation
  }, 450);
}



