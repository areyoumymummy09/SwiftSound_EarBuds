(() => {

   //Hotpots
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

    // Explode scroll trigger
    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

    canvas.width = 1920;
    canvas.height = 1080;
 
 const frameCount = 91; 
 const images = []; 

//Fill the arrey with images and point to the images 
 
for(let i = 0; i < frameCount; i++){
    const img = new Image();
    img .src = `images/explode_${(i+1).toString().padStart(4, '0')}.webp`;
    images.push(img);
}

    const buds = {
        frame: 0 
    }
    gsap.to(buds,{
        frame: 90, 
        snap: "frame", 
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            start: "top top",
        },
        onUpdate: render
    })
    images[0].addEventListener("load",render)

    function render(){
  
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0)

    }

    //scroll trigger with product image

      gsap.registerPlugin(ScrollTrigger);
    
      gsap.utils.toArray(".feature").forEach((feature) => {
        console.log("Animating feature:", feature); 
    
        gsap.from(feature, {
          y: 100, 
          opacity: 0, 
          duration: 1, 
          ease: "power3.out", 
          scrollTrigger: {
            trigger: feature, 
            toggleActions: "play pause none none",
            start: "top 80%", 
            scrub: 1, 
          },
        });
    });
    

  //x-ray

  const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");
  
    function moveDivisor() {
      console.log("slider.value");
      divisor.style.width = slider.value+"%";
  
    }
  
    slider.addEventListener("input", moveDivisor);

//Colour-selector

const earbuds1 = document.querySelector("#ear-buds-1");
const earbuds2 = document.querySelector("#ear-buds-2");
const buttons = document.querySelectorAll("#color-con button");

function swapColor(e) {
  const selectedColor = e.currentTarget.getAttribute("data-color");

  // Construct file paths dynamically
  const caseImagePath = `images/${selectedColor}_case.png`;
  const earbudsImagePath = `images/${selectedColor}_earbuds.png`;

  // Log to ensure correct paths
  console.log("Case image path:", caseImagePath);
  console.log("Earbuds image path:", earbudsImagePath);

  // Update image sources
  earbuds1.src = `${caseImagePath}?t=${new Date().getTime()}`; 
  earbuds2.src = `${earbudsImagePath}?t=${new Date().getTime()}`;

  // Log updated src values
  console.log("Updated ear-buds-1 src:", earbuds1.src);
  console.log("Updated ear-buds-2 src:", earbuds2.src);
}

buttons.forEach((button) => {
  button.addEventListener("click", swapColor);
});


//hamburger
const hamburger = document.querySelector('#hamburger');
const menuOverlay = document.querySelector('#menu');
const menuLinks = document.querySelectorAll('#menu a');

// Toggle menu visibility with the hamburger button
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); 
  menuOverlay.classList.toggle('active'); 
});

// Close menu when a menu item is clicked
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active'); // Reset hamburger button
    menuOverlay.classList.remove('active'); // Close the menu
  });
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

