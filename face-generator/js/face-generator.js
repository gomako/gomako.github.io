
// (function(){
  
  const faceW = 64;
  const faceH = 64;  

  // Array of faces
  const faces = [];
  const numFaces = 16;

  // To hold the source images
  const layers = [];
  const styles = 3; // How many original faces to pick from 

  // Keep track of loading
  let loaded = 0;

  // Image sources
  const images = [
    'img/mn_back.png',
    'img/mn_neck.png',
    'img/mn_head.png',
    'img/mn_mouth.png',
    'img/mn_eyes.png',
    'img/mn_nose.png',
  ];

  // Load all images
  const loadImages = () => {
    for(let i = 0; i < images.length; i++){
      let img = new Image();
      layers.push(img);
      img.onload = function() {
        loaded++;
        if(loaded >= images.length) start();
      }   
      img.src = images[i];
    }
  }

  // Draw Face
  const drawFace = (x, y) => {

    ctx.save();
    ctx.translate(x,y);
    ctx.imageSmoothingEnabled = false;


    // Declare our colour vars here so we can 
    // apply them over all the layers equally
    // Hue
    let hueRotation = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
    // Contrast
    let contrast = `contrast(${Math.random() * (150 - 90) + 90}%)`;
    // Brightness
    let brightness = `brightness(${Math.random() * (1 - .9) + .9})`;
    
    layers.forEach((img, k) => {

      // Pick a random style
      let style = Math.floor(Math.random() * styles ) * faceW;

      // Check whether to filter the base layer or skin
      if(k == 0) {
        ctx.filter = `brightness(${Math.random() * (1 - .3) + .3})`;
      } else {
        ctx.filter = `${hueRotation} ${contrast} ${brightness}`;
      }

      ctx.drawImage(img, style, 0, 64, 64, 0, 0, 64, 64);
      ctx.filter = `none`;

    });
    
    ctx.restore();

  }

   // Render 
  const drawFaces = () => {
    
    // Clear the canvas
    ctx.fillStyle="#cccccc";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    // Start coordinates
    let x = 0;
    let y = 0;
    
    for(let i = 0; i < numFaces; i++) {
      // Draw Face
      drawFace(x, y);
      // Move coordinates
      x += faceW;
      if(x >= canvas.width) {
        x = 0;
        y += faceH;
      } 
    
    }
    
  }

  // Called after all images are loaded
  const start = () => {
    // Hide loading screen and show canvas
    document.querySelector('.loading').style.display = 'none';
    canvas.style.display = 'block';  
    
    drawFaces();
  }

  // Init
  // 
  // Set up canvas dom element
  const canvas = document.querySelector('canvas');
  // Set dimensions
  canvas.width  = 256;
  canvas.height = 256;
  // Scale up for viewport
  
  canvas.style.height = "100%";
  // add event listener
  canvas.addEventListener("click", drawFaces);
  // Get context
  const ctx = canvas.getContext("2d");

  // Load all source images
  loadImages();

