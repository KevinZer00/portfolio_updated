document.addEventListener("mousemove", (event) => {
    const avatarContainer = document.getElementById("avatar-container");
    const leftPupil = document.getElementById("left-pupil");
    const rightPupil = document.getElementById("right-pupil");

    // get the dimensions and center of the avatar container
    const avatarRect = avatarContainer.getBoundingClientRect();
    const centerX = avatarRect.left + avatarRect.width / 2;
    const centerY = avatarRect.top + avatarRect.height / 2;

    // calculate offset of cursor relative to the center of the avatar
    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    // calculate movement limits for the pupils (maximum movement is 10 pixels)
    const maxMovement = 10;

    // normalize the direction vector and apply the offset limit
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const angle = Math.atan2(offsetY, offsetX);
    const limitedDistance = Math.min(maxMovement, distance / 20);
    const pupilOffsetX = Math.cos(angle) * limitedDistance;
    const pupilOffsetY = Math.sin(angle) * limitedDistance;

    // update the positions of the pupils relative to their original center positions
    leftPupil.setAttribute("cx", 168 + pupilOffsetX);
    leftPupil.setAttribute("cy", 218 + pupilOffsetY);
    rightPupil.setAttribute("cx", 343 + pupilOffsetX);
    rightPupil.setAttribute("cy", 218 + pupilOffsetY);
});
const darkToggleButton = document.getElementById('dark-mode-toggle');



/*

// function to switch between light and dark mode 
darkToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // update button text based on current mode 
    if (document.body.classList.contains('light-mode')) {
        darkToggleButton.textContent = 'DARK MODE';
    } else {
        darkToggleButton.textContent = 'LIGHT MODE';
    }
});

*/


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("interactiveDotsCanvas");
    const ctx = canvas.getContext("2d");

    // set canvas size to cover the entire page
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    }
    resizeCanvas();

    // create a list of dots
    const dots = [];
    const dotSize = 1.5;
    const spacing = 30;

    // generate dots across the entire canvas area
    for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
            dots.push({ x, y, radius: dotSize, color: "#333333" });
        }
    }

    // draw dots
    function drawDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = dot.color;
            ctx.fill();
        });
    }

    // track mouse position
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // update dot colors based on mouse position
    function updateDots() {
        dots.forEach(dot => {
            const distance = Math.sqrt(
                (mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2
            );

            // set glow radius effect
            if (distance < 60) {
                dot.color = "#03dac6"; // glow color
            } else {
                dot.color = "#333333"; // default color
            }
        });
    }

    // animation loop
    function animate() {
        updateDots();
        drawDots();
        requestAnimationFrame(animate); // schedule animate function to run again on next redraw
    }

    animate();
});


// create code box from Highlight.js
document.addEventListener("DOMContentLoaded", (event) => {
    hljs.highlightAll();
});



/* TO MAKE A GLOWING TRAIL BEHIND CURSOR
document.body.addEventListener('mousemove', function(e) {
    // Create the glow dot element
    const glowDot = document.createElement('div');
    glowDot.classList.add('glow-dot');

    // Set the position of the glow dot
    glowDot.style.left = `${e.clientX - glowDot.offsetWidth / 2}px`; // center the dot
    glowDot.style.top = `${e.clientY - glowDot.offsetHeight / 2 }px`; // center the dot

    // append the glow dot to the body
    document.body.appendChild(glowDot);

    // remove the glow dot after animation
    glowDot.addEventListener('animationend', () => {
        glowDot.remove();
    });
});
*/


