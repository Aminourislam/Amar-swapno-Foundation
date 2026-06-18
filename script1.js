const video = document.getElementById("intro-video");
const preloader = document.getElementById("preloader");

// ==========================================================================
// 1. THE ONE-TIME CHECK
// ==========================================================================
// Check if the browser memory says they've already seen the intro
if (sessionStorage.getItem("introWatched") === "true") {
    
    // IF SEEN: Permanently delete the loader immediately before it even renders
    preloader.remove();
    document.body.style.overflow = "auto";
    console.log("Intro skipped: User already watched it during this session.");

} else {
    
    // IF NOT SEEN: Run the preloader video normally
    runPreloader();
}

// ==========================================================================
// 2. PRELOADER ENGINE (Wrapped inside a function)
// ==========================================================================
function runPreloader() {
    // Detect when the video finishes playing naturally
    video.addEventListener("ended", () => {
        // Save a flag in the browser memory so it doesn't play again
        sessionStorage.setItem("introWatched", "true");

        // Start fading out the preloader overlay via CSS
        preloader.classList.add("preloader-hidden");
        
        // Instantly bring back standard scrolling for your website
        document.body.style.overflow = "auto"; 
    });

    // Completely erase the preloader from the website code after it finishes fading out
    preloader.addEventListener("transitionend", () => {
        preloader.remove(); 
    });

    // Emergency Bypass (If the video fails to load or browser blocks it)
    video.addEventListener("error", () => {
        preloader.remove();
        document.body.style.overflow = "auto";
    });
}



document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
