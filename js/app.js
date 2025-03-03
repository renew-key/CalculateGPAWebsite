let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const timeLine = new TimelineMax();

// parameter1  Controled object
// parameter2  duration
// parameter3  original status
// parameter4  endding status
// parameter5  early to start

timeLine
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);
