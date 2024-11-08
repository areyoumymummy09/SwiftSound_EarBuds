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
  
  })();
  
  