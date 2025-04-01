const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create floating hearts with improved geometry
const hearts = [];
const heartShape = new THREE.Shape();

// Create a heart shape using bezier curves
function createHeartShape() {
  const x = 0, y = 0;
  
  heartShape.moveTo(x + 0, y + 0);
  heartShape.bezierCurveTo(x + 0, y + 5, x + 5, y + 5, x + 5, y + 0);
  heartShape.bezierCurveTo(x + 5, y - 5, x + 0, y - 5, x + 0, y - 10);
  heartShape.bezierCurveTo(x + 0, y - 5, x - 5, y - 5, x - 5, y + 0);
  heartShape.bezierCurveTo(x - 5, y + 5, x + 0, y + 5, x + 0, y + 0);
  
  return heartShape;
}

const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
  depth: 1,
  bevelEnabled: true,
  bevelSegments: 2,
  bevelThickness: 0.5,
  bevelSize: 0.5,
  curveSegments: 12
});

// Enhanced gradient colors for hearts
const heartColors = [
  0xffb6c1, // Light pink
  0xfa8072, // Salmon
  0xff69b4, // Hot pink
  0xffc0cb, // Pink
  0xd4a373, // Tan
  0xfaedcd, // Light cream
  0xffe4e1, // Misty rose
  0xdda0dd  // Plum
];

// Create more hearts with enhanced appearance
function createHeart(x, y, z, scale, color) {
  const heartMaterial = new THREE.MeshPhongMaterial({ 
    color: color,
    shininess: 100,
    specular: 0xffffff,
    emissive: color,
    emissiveIntensity: 0.2,
  });
  
  const heart = new THREE.Mesh(heartGeometry, heartMaterial);
  heart.position.set(x, y, z);
  heart.scale.set(scale, scale, scale);
  heart.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  
  scene.add(heart);
  hearts.push({
    mesh: heart,
    speed: 0.005 + Math.random() * 0.01,
    rotSpeed: 0.01 + Math.random() * 0.02,
    direction: new THREE.Vector3(
      Math.random() * 0.02 - 0.01,
      Math.random() * 0.02 - 0.01,
      Math.random() * 0.02 - 0.01
    ),
    pulsePhase: Math.random() * Math.PI * 2, // Random starting phase for pulsing
    pulseSpeed: 0.05 + Math.random() * 0.05 // Random pulse speed
  });
}

// Create more hearts for a richer scene
for (let i = 0; i < 35; i++) {
  const x = Math.random() * 60 - 30;
  const y = Math.random() * 60 - 30;
  const z = Math.random() * 30 - 45;
  const scale = 0.15 + Math.random() * 0.25;
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  createHeart(x, y, z, scale, color);
}

// Enhanced lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Add directional light for better 3D effect
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add a soft point light
const pointLight = new THREE.PointLight(0xffccdd, 1, 100);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

// Position camera
camera.position.z = 15;

// Create enhanced floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800; // More particles

const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);
const sizeArray = new Float32Array(particlesCount);

// Generate particle properties
for (let i = 0; i < particlesCount; i++) {
  // Position
  posArray[i * 3] = (Math.random() - 0.5) * 60;
  posArray[i * 3 + 1] = (Math.random() - 0.5) * 60;
  posArray[i * 3 + 2] = (Math.random() - 0.5) * 60;
  
  // Color - pastels and wedding colors
  const colorChoice = Math.random();
  if (colorChoice < 0.3) {
    // Light gold
    colorArray[i * 3] = 1.0;     // R
    colorArray[i * 3 + 1] = 0.9; // G
    colorArray[i * 3 + 2] = 0.7; // B
  } else if (colorChoice < 0.6) {
    // Light pink
    colorArray[i * 3] = 1.0;     // R
    colorArray[i * 3 + 1] = 0.8; // G
    colorArray[i * 3 + 2] = 0.9; // B
  } else {
    // Light cream
    colorArray[i * 3] = 0.98;    // R
    colorArray[i * 3 + 1] = 0.96; // G
    colorArray[i * 3 + 2] = 0.94; // B
  }
  
  // Size - varied
  sizeArray[i] = Math.random() * 2 + 0.5;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colorArray, 3)
);

particlesGeometry.setAttribute(
  "size",
  new THREE.BufferAttribute(sizeArray, 1)
);

// Create custom shader material for particles
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.2,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

scene.add(particlesMesh);

// Create floating rings as a wedding symbol
const rings = [];
const ringGeometry = new THREE.TorusGeometry(1, 0.2, 16, 50);

function createRing(x, y, z, scale, color) {
  const ringMaterial = new THREE.MeshPhongMaterial({ 
    color: color,
    shininess: 100,
    specular: 0xffffff,
  });
  
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.set(x, y, z);
  ring.scale.set(scale, scale, scale);
  ring.rotation.x = Math.PI / 2;
  
  scene.add(ring);
  rings.push({
    mesh: ring,
    rotSpeed: {
      x: 0.002 + Math.random() * 0.005,
      y: 0.002 + Math.random() * 0.005,
      z: 0.002 + Math.random() * 0.005
    },
    orbitSpeed: 0.003 + Math.random() * 0.002,
    orbitDistance: 5 + Math.random() * 5,
    orbitOffset: Math.random() * Math.PI * 2
  });
}

// Create gold and silver rings
createRing(10, 5, -30, 0.7, 0xffd700); // Gold
createRing(9, 6, -30, 0.6, 0xc0c0c0); // Silver

// Time for animations
let clock = new THREE.Clock();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  const elapsedTime = clock.getElapsedTime();

  // Animate hearts
  hearts.forEach((heart) => {
    // Rotation animation
    heart.mesh.rotation.x += heart.rotSpeed;
    heart.mesh.rotation.z += heart.rotSpeed * 0.8;
    
    // Movement animation
    heart.mesh.position.x += heart.direction.x;
    heart.mesh.position.y += heart.direction.y;
    heart.mesh.position.z += heart.direction.z;
    
    // Pulse animation - make hearts beat
    const pulseFactor = Math.sin(elapsedTime * heart.pulseSpeed + heart.pulsePhase) * 0.1 + 1;
    heart.mesh.scale.x = heart.mesh.scale.y = heart.mesh.scale.z = 
      heart.mesh.scale.originalSize || heart.mesh.scale.x * pulseFactor;
    
    // Store original size if not set
    if (!heart.mesh.scale.originalSize) {
      heart.mesh.scale.originalSize = heart.mesh.scale.x / pulseFactor;
    }

    // Reset position if heart goes out of bounds
    if (heart.mesh.position.x > 30 || heart.mesh.position.x < -30) {
      heart.direction.x *= -1;
    }
    if (heart.mesh.position.y > 30 || heart.mesh.position.y < -30) {
      heart.direction.y *= -1;
    }
    if (heart.mesh.position.z > 5 || heart.mesh.position.z < -50) {
      heart.direction.z *= -1;
    }
  });
  
  // Animate wedding rings - orbit around each other
  rings.forEach((ring, index) => {
    // Rotate the rings
    ring.mesh.rotation.x += ring.rotSpeed.x;
    ring.mesh.rotation.y += ring.rotSpeed.y;
    ring.mesh.rotation.z += ring.rotSpeed.z;
    
    // Make rings orbit around a center point
    const orbitRadius = ring.orbitDistance;
    const orbitSpeed = ring.orbitSpeed;
    const centerX = 10;
    const centerY = 5;
    const centerZ = -30;
    
    // Orbital motion
    const angle = elapsedTime * orbitSpeed + ring.orbitOffset + (index * Math.PI); // Offset by PI for second ring
    ring.mesh.position.x = centerX + Math.cos(angle) * orbitRadius;
    ring.mesh.position.y = centerY + Math.sin(angle) * orbitRadius * 0.5; // Flattened orbit
    
    // Occasional sparkle effect on rings
    if (Math.random() < 0.01) {
      const originalEmissive = ring.mesh.material.emissive.getHex();
      ring.mesh.material.emissive.set(0xffffff);
      
      setTimeout(() => {
        ring.mesh.material.emissive.setHex(originalEmissive);
      }, 100);
    }
  });

  // Rotate particles and make them twinkle
  particlesMesh.rotation.x += 0.0002;
  particlesMesh.rotation.y += 0.0003;
  
  // Make particles move in waves
  const positions = particlesMesh.geometry.attributes.position.array;
  const sizes = particlesMesh.geometry.attributes.size.array;
  
  for (let i = 0; i < particlesCount; i++) {
    // Gentle wave motion
    positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.005;
    
    // Twinkle effect - size variation
    sizes[i] = Math.abs(Math.sin(elapsedTime * 0.5 + i)) * 2 + 0.5;
  }
  
  particlesMesh.geometry.attributes.position.needsUpdate = true;
  particlesMesh.geometry.attributes.size.needsUpdate = true;

  // Moving point light to create dynamic shadows
  pointLight.position.x = Math.sin(elapsedTime * 0.5) * 15;
  pointLight.position.y = Math.cos(elapsedTime * 0.3) * 15;
  pointLight.position.z = Math.cos(elapsedTime * 0.2) * 5 + 10;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize animation
animate();

// Add more beautiful page animations
document.addEventListener("DOMContentLoaded", function() {
  // Animate main title with delay
  const mainTitle = document.querySelector("h1");
  if (mainTitle) {
    mainTitle.style.opacity = "0";
    mainTitle.style.transform = "translateY(-50px)";
    mainTitle.style.transition = "opacity 1s ease, transform 1s ease";
    
    setTimeout(() => {
      mainTitle.style.opacity = "1";
      mainTitle.style.transform = "translateY(0)";
    }, 500);
  }
  
  // Animate names with delay
  const names = document.querySelector(".names");
  if (names) {
    names.style.opacity = "0";
    names.style.transform = "scale(0.8)";
    names.style.transition = "opacity 1s ease, transform 1s ease";
    
    setTimeout(() => {
      names.style.opacity = "1";
      names.style.transform = "scale(1)";
    }, 1000);
  }
  
  // Animate date with delay and special effect
  const date = document.querySelector(".date");
  if (date) {
    date.style.opacity = "0";
    date.style.letterSpacing = "20px";
    date.style.transition = "opacity 1.5s ease, letter-spacing 1.5s ease";
    
    setTimeout(() => {
      date.style.opacity = "1";
      date.style.letterSpacing = "2px";
    }, 1500);
  }
  
  // Animate detail boxes one by one with special effect
  const detailBoxes = document.querySelectorAll(".detail-box");
  detailBoxes.forEach((box, index) => {
    box.style.opacity = "0";
    box.style.transform = "translateY(30px)";
    box.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    
    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }, 2000 + (index * 300));
  });
});

// Enhanced timeline animation on scroll with more effects
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  
  timelineItems.forEach((item, index) => {
    const position = item.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (position < screenPosition) {
      // Add staggered animation delay based on index
      setTimeout(() => {
        item.classList.add("visible");
        
        // Add additional animation to timeline markers
        const marker = item.querySelector(".timeline-marker");
        if (marker) {
          marker.style.transform = "translateX(-50%) scale(1.5)";
          marker.style.transition = "transform 0.5s ease";
          
          setTimeout(() => {
            marker.style.transform = "translateX(-50%) scale(1)";
          }, 500);
        }
      }, index * 150);
    }
  });
}

window.addEventListener("scroll", animateTimeline);
// Initial check on page load
window.addEventListener("load", animateTimeline);

// Add parallax effect to content sections
window.addEventListener("scroll", function() {
  const scrollY = window.scrollY;
  
  // Parallax effect for heading elements
  document.querySelectorAll("h2").forEach((heading) => {
    heading.style.transform = `translateY(${scrollY * 0.05}px)`;
  });
  
  // Reverse parallax for gallery
  const gallery = document.querySelector(".gallery-container");
  if (gallery) {
    const galleryPosition = gallery.getBoundingClientRect().top + scrollY;
    if (scrollY > galleryPosition - window.innerHeight) {
      gallery.style.transform = `translateY(${-(scrollY - galleryPosition + window.innerHeight) * 0.02}px)`;
    }
  }
});

// Enhanced Google Drive Image Loading with fade-in animation
function init() {
  loadGoogleDriveImages();
}

function imageExists(url, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = url;
}

function loadGoogleDriveImages() {
  // Clear existing gallery
  const gallery = document.getElementById("photoGallery");
  
  // Counter to set proper delays
  let successCount = 0;
  
  for (var i = 1; i < 1000; i++) {
    const url = `./images/${i}.JPG`;
    const currentIndex = i;
    
    imageExists(url, function (exists) {
      if (exists) {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        // Enhanced animation with rotation and scale
        galleryItem.style.opacity = "0";
        galleryItem.style.transform = "scale(0.8) rotate(" + (Math.random() * 10 - 5) + "deg)";
        galleryItem.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        
        galleryItem.innerHTML = `<img src="${url}" data-index="${currentIndex}">`;

        // Add hover effect to images
        galleryItem.addEventListener("mouseenter", function() {
          this.style.transform = "scale(1.05) rotate(0deg)";
          this.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
          this.style.zIndex = "2";
        });
        
        galleryItem.addEventListener("mouseleave", function() {
          this.style.transform = "scale(1) rotate(0deg)";
          this.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
          this.style.zIndex = "1";
        });
        
        // Add click event to open fullscreen
        galleryItem.addEventListener("click", function () {
          openFullscreen(`${url}`, currentIndex);
        });

        gallery.appendChild(galleryItem);
        
        // Staggered fade-in for gallery items
        setTimeout(() => {
          galleryItem.style.opacity = "1";
          galleryItem.style.transform = "scale(1) rotate(0deg)";
        }, successCount * 100);
        
        successCount++;
      }
    });
  }
}

// Enhanced fullscreen gallery functionality with transitions
let currentImageIndex = 0;
let galleryImages = [];

function openFullscreen(imageUrl, index) {
  const overlay = document.getElementById("fullscreenOverlay");
  const fullscreenImage = document.getElementById("fullscreenImage");

  // Collect all gallery images for navigation
  if (!window.galleryImages || window.galleryImages.length === 0) {
    window.galleryImages = [];
    document.querySelectorAll(".gallery-item img").forEach(img => {
      window.galleryImages.push(img.src);
    });
  }
  
  // Smooth transition
  fullscreenImage.style.opacity = "0";
  fullscreenImage.style.transform = "scale(0.9)";
  
  setTimeout(() => {
    fullscreenImage.src = imageUrl;
    currentImageIndex = index;
    
    // Fade in image
    setTimeout(() => {
      fullscreenImage.style.opacity = "1";
      fullscreenImage.style.transform = "scale(1)";
    }, 100);
  }, 300);

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Enhanced overlay controls
document
  .getElementById("closeFullscreen")
  .addEventListener("click", function () {
    const overlay = document.getElementById("fullscreenOverlay");
    const fullscreenImage = document.getElementById("fullscreenImage");
    
    // Fade out effect
    fullscreenImage.style.opacity = "0";
    fullscreenImage.style.transform = "scale(0.9)";
    
    setTimeout(() => {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  });

// Enhanced navigation with smooth transitions
document
  .getElementById("prevFullscreen")
  .addEventListener("click", function () {
    navigateGallery(-1);
  });

document
  .getElementById("nextFullscreen")
  .addEventListener("click", function () {
    navigateGallery(1);
  });

function navigateGallery(direction) {
  if (!window.galleryImages || window.galleryImages.length === 0) return;
  
  const fullscreenImage = document.getElementById("fullscreenImage");
  
  // Fade out current image
  fullscreenImage.style.opacity = "0";
  fullscreenImage.style.transform = direction > 0 ? "translateX(-20px)" : "translateX(20px)";
  
  setTimeout(() => {
    // Update image index
    currentImageIndex = (currentImageIndex + direction + window.galleryImages.length) % window.galleryImages.length;
    fullscreenImage.src = window.galleryImages[currentImageIndex];
    
    // Fade in new image
    setTimeout(() => {
      fullscreenImage.style.opacity = "1";
      fullscreenImage.style.transform = "translateX(0)";
    }, 100);
  }, 300);
}

// Add keyboard support for gallery navigation
document.addEventListener("keydown", function(e) {
  if (document.getElementById("fullscreenOverlay").style.display === "flex") {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      navigateGallery(-1);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      navigateGallery(1);
    } else if (e.key === "Escape") {
      document.getElementById("closeFullscreen").click();
    }
  }
});

// Initialize the page
init();

// Add index-based animation delays to gallery items
photoGallery.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.style.setProperty('--i', i);
});

// Add a cool banner animation
window.addEventListener("load", function() {
  // Check if the banner already exists, if not, create it
  if (!document.querySelector('.wedding-banner')) {
    createAnimatedBanner();
  }
});

// Create an animated banner at the top of the page
function createAnimatedBanner() {
  const banner = document.createElement('div');
  banner.className = 'wedding-banner';
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.background = 'linear-gradient(135deg, rgba(250, 237, 205, 0.9) 0%, rgba(212, 163, 115, 0.9) 100%)';
  banner.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  banner.style.padding = '10px 0';
  banner.style.textAlign = 'center';
  banner.style.zIndex = '100';
  banner.style.transform = 'translateY(-100%)';
  banner.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
  
  // Add content to the banner
  banner.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; gap: 15px;">
      <span style="font-family: 'Great Vibes', cursive; font-size: 24px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
        Sarah & Michael
      </span>
      <span style="font-size: 16px; color: #fff; font-weight: bold;">
        JUNE 15, 2025
      </span>
      <span style="font-size: 16px; color: #fff; border: 1px solid #fff; padding: 5px 15px; border-radius: 20px;">
        Save the Date
      </span>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  // Animate the banner in after a delay
  setTimeout(() => {
    banner.style.transform = 'translateY(0)';
  }, 1000);
  
  // Add scroll effect for banner (hide when scrolling down, show when scrolling up)
  let lastScrollTop = 0;
  
  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down & past the top area - hide banner
      banner.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up or at top - show banner
      banner.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}
// Add countdown timer functionality for April 27, 2025
function updateCountdown() {
    const weddingDate = new Date("April 27, 2025 14:00:00").getTime(); // 2:00 PM on April 27, 2025
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
  
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
    // Update countdown elements
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  
    // If countdown is finished
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      
      // Update the countdown title to show it's the big day
      const countdownTitle = document.querySelector(".countdown-container h3");
      if (countdownTitle) {
        countdownTitle.textContent = "Today is Our Wedding Day!";
      }
    }
  }
  
  // Initialize countdown
  updateCountdown();
  
  // Update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);