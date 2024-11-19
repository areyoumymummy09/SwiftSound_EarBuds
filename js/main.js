(() => {

    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    function showInfo() {
        const slotId = this.getAttribute("slot");  
        let selected = document.querySelector(`[slot='${slotId}'] .HotspotAnnotation`);
        if (selected) {
          gsap.to(selected, 1, { autoAlpha: 1 });
        }
      }
  
      function hideInfo() {
        const slotId = this.getAttribute("slot");
        let selected = document.querySelector(`[slot='${slotId}'] .HotspotAnnotation`);
        if (selected) {
          gsap.to(selected, 1, { autoAlpha: 0 });
        }
      }
    
  // Data
  
  const infoBoxes = [
    {
      image: "../images/earhooks.png",
      title:"Adjustable Ear Hooks",
      text: "Ear hooks that can be adjusted for a secure fit.",
   
    },
    {
      image: "../images/sweat_proof.png",
      title:"Sweat Guard",
      text: "Designed with a sweat guard to withstand intense workouts."
    },
    {
        image: "../images/noise_cancelling.png",
        title:"Strong Noise Cancelling",
        text: "Powerful noise cancellation for immersive sound quality."
      }
  ]
  
  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      const selected = document.querySelector(`[slot='hotspot-${index + 1}'] .HotspotAnnotation`);
      if (selected) {

        let img = document.createElement("img");
        img.src = infoBox.image;
        img.alt = infoBox.title; 

        let title = document.createElement("h2");
        title.textContent = infoBox.title;

        let des = document.createElement("p");
        des.textContent = infoBox.text;

        selected.appendChild(img);
        selected.appendChild(title);
        selected.appendChild(des);
      } else {
        console.warn(`Element with slot hotspot-${index + 1} not found`);
      }
    });
  }

  
  // call the funcation to load data
  loadInfo();
  
  function modelLoaded() {
    console.log("Model loaded successfully");
  }
    //Event listeners
    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });


// scroll explodsion 
gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

function setCanvasSize() {
  if (window.innerWidth <= 768) {
      // For mobile screens
      canvas.width = 400; // Adjust for mobile
      canvas.height = 300;
  } else if (window.innerWidth <= 1024) {
      // For tablet screens
      canvas.width = 800; // Adjust for tablets
      canvas.height = 600;
  } else {
      // For desktop screens
      canvas.width = 1200; // Default for desktop
      canvas.height = 900;
  }
}
canvas.width = 1200;
canvas.height = 900;

const frameCount = 91; //how many still frames 
const images = []; //arrey to hold images

//Fill the arrey with images and point to the images 

for(let i = 0; i < frameCount; i++){
   const img = new Image();
   //recreating the path: images/explode_000.1.webp
   img .src = `images/explode_${(i+1).toString().padStart(4, '0')}.webp`;
   images.push(img);
}

   const buds = {
       frame: 0 
   }

   // Set up ScrollTrigger with media queries
ScrollTrigger.matchMedia({
    // For screens 768px or smaller (mobile)
    "(max-width: 768px)": function () {
        gsap.to(buds, {
            frame: 91,
            snap: "frame",
            scrollTrigger: {
                trigger: "#explode-view",
                pin: true,
                scrub: 1,
                start: "top top", // Adjust the start point for mobile
                end: "+=300", // Shorter scroll duration for mobile
                pinSpacing: true,
            },
            onUpdate: render,
        });
    },

    // For screens between 768px and 1024px (tablet)
    "(min-width: 769px) and (max-width: 1024px)": function () {
        gsap.to(buds, {
            frame: 91,
            snap: "frame",
            scrollTrigger: {
                trigger: "#explode-view",
                pin: true,
                scrub: 1.5, // Slightly smoother scroll for tablets
                markers: true,
                start: "top+=50 top", // Adjusted start for tablets
                end: "+=400", // Medium scroll duration
                pinSpacing: true,
            },
            onUpdate: render,
        });
    },

    // For screens larger than 1024px (desktop)
    "(min-width: 1025px)": function () {
        gsap.to(buds, {
            frame: 91,
            snap: "frame",
            scrollTrigger: {
                trigger: "#explode-view",
                pin: true,
                scrub: 1,
                markers: true,
                start: "top+=120 top", // Original start
                end: "+=500", // Original end duration
                pinSpacing: true,
            },
            onUpdate: render,
        });
    },
});

images[0].addEventListener("load", render);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[Math.floor(buds.frame)];
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Adjust the scale factor for responsive sizes
    let scaleFactor = 0.6;
    if (window.innerWidth <= 768) {
        scaleFactor = 0.6; // Smaller scaling for mobile
    } else if (window.innerWidth <= 1024) {
        scaleFactor = 0.5; // Medium scaling for tablets
    }

    const scaledWidth = imgWidth * scaleFactor;
    const scaledHeight = imgHeight * scaleFactor;

    const drawX = (canvas.width - scaledWidth) / 2;
    const drawY = (canvas.height - scaledHeight) / 2;

    context.drawImage(
        img,
        0, 0,
        imgWidth, imgHeight,
        drawX, drawY,
        scaledWidth, scaledHeight
    );

    
}

  //x-ray

  const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");
  
    function moveDivisor() {
      console.log("slider.value");
      divisor.style.width = slider.value+"%";
    // divisor.style.width = `${slider.value+"%"}`;

  
    }
  
    slider.addEventListener("input", moveDivisor);




    // Animate each feature section
    gsap.registerPlugin(ScrollTrigger);

// Animate each feature section
gsap.utils.toArray(".feature").forEach((feature) => {
  gsap.from(feature, {
    y: 100, // Start position: 100px below its original position
    opacity: 0, // Start fully transparent
    duration: 1, // Animation duration
    ease: "power3.out", // Smooth easing
    scrollTrigger: {
      trigger: feature, // Trigger animation when the feature enters the viewport
      start: "top 80%", // Trigger when the top of the feature is 80% of the viewport height
      end: "top 50%", // End animation when it reaches 50% of the viewport height
      scrub: false, // Smooth animation is off
      markers: true, // Show debugging markers
    },
  });
});

    
  
  //Colour-selector

    const earbuds  =document.querySelector("#earbuds-samples");
    const buttons = document.querySelectorAll("#color-con button");

    function swapColor(e){
            console.log(e.currentTarget.id);
            const selected = e.currentTarget.id;
            earbuds.src =`images/${selected}.jpg`;
    }

    buttons.forEach(button =>{
        button.addEventListener("click",swapColor);
    })



//hamburger
    const hamburger = document.querySelector('#hamburger');
    const menuOverlay = document.querySelector('#menu');

    hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); 
    menuOverlay.classList.toggle('active'); 
});


//dots
const dots = document.querySelectorAll('.scroll-indicator .dot');

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

// Animate the highlight to slide from dot to dot
dots.forEach((dot, index) => {
  tl.to(".highlight", {
    y: index * 18, 
    duration: 0.3,
    ease: "power1.inOut",
  });
});


})();

