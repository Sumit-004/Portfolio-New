// setTimeout(() => {
//     const loader = document.querySelector(".main-loader")
//     const website = document.querySelector("#site")
//     loader.style.display = "none"
//     website.style.display = "block"
// }, 2000)

// let loadCount = 0
// setInterval(() => {
//     if(loadCount < 100){
//         loadCount++
//     }
//     document.querySelector("#loadCount").innerHTML = `${loadCount}%`
// }, 2000/120)



const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

function setMenu(open) {
    menu.classList.toggle('grid-rows-[1fr]', open);
    menu.classList.toggle('grid-rows-[0fr]', !open);
    btn.setAttribute('aria-expanded', open);
    icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 768px)').addEventListener('change', e => e.matches && setMenu(false));


// Running Words
const word = ["a Developer", "a Designer", "a Freelancer"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const element = document.querySelector("#text");

function runningText() {

    const currentWord = word[wordIndex];

    element.innerText = currentWord.slice(0, charIndex);

    if (isDeleting === false) {
        charIndex++;
    } else {
        charIndex--;
    }

    if (charIndex == currentWord.length + 1) {
        isDeleting = true;

        setTimeout(runningText, 1000);

        return;
    }

    if (charIndex == 0) {

        isDeleting = false;

        wordIndex++;

        if (wordIndex == word.length) {
            wordIndex = 0;
        }
    }

    let speed = 100;

    if (isDeleting == true) {
        speed = 50;
    }

    setTimeout(runningText, speed);
}

runningText();



const wrap = document.getElementById('frame-wrap');
const frame = document.getElementById('frame');

wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    frame.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
});

wrap.addEventListener('mouseleave', () => {
    frame.style.transform = 'rotateY(0) rotateX(0)';
});




const groups = [
    {
        title: "Frontend",
        items: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Tailwind"
        ]
    },

    {
        title: "Backend",
        items: [
            "Node.js",
            "Express",
            "MongoDB"
        ]
    },

    {
        title: "Tooling",
        items: [
            "Git",
            "Figma",
            "Vercel",
            "Postman"
        ]
    }
];


// Create half of flip card

const half = (text, part, extra = "") =>
    `<div class="half ${part} ${extra}">
        <div class="inner">${text}</div>
    </div>`;


// Flip animation

function flip(tile, next) {

    const cur = tile.dataset.cur;

    tile.innerHTML =
        half(next, "top") +
        half(cur, "bottom") +
        half(cur, "top", "flap-a") +
        half(next, "bottom", "flap-b");


    // Old top half animation

    tile.querySelector(".flap-a").animate(
        [
            {
                transform: "rotateX(0deg)"
            },
            {
                transform: "rotateX(-90deg)"
            }
        ],
        {
            duration: 300,
            easing: "ease-in",
            fill: "forwards"
        }
    );


    // New bottom half animation

    tile.querySelector(".flap-b").animate(
        [
            {
                transform: "rotateX(90deg)"
            },
            {
                transform: "rotateX(0deg)"
            }
        ],
        {
            duration: 300,
            delay: 300,
            easing: "ease-out",
            fill: "both"
        }
    );


    // Reset card after animation

    setTimeout(() => {

        tile.dataset.cur = next;

        tile.innerHTML =
            half(next, "top") +
            half(next, "bottom");

    }, 620);
}


// ========================================
// CREATE FLIP GRID
// ========================================

const grid = document.getElementById("flip-grid");


groups.forEach((g, gi) => {

    let i = 0;
    let busy = false;


    // Create card

    const card = document.createElement("div");

    card.innerHTML = `
        <p class="mb-3 text-sm uppercase tracking-widest text-slate-400">
            ${g.title}
        </p>

        <div
            class="tile cursor-pointer"
            data-cur="${g.items[0]}"
        >
            ${half(g.items[0], "top")}
            ${half(g.items[0], "bottom")}
        </div>
    `;


    grid.appendChild(card);


    // Get tile

    const tile = card.querySelector(".tile");


    // Next item

    const next = () => {

        if (busy) return;

        busy = true;

        i = (i + 1) % g.items.length;

        flip(tile, g.items[i]);

        setTimeout(() => {
            busy = false;
        }, 650);
    };


    // Click to flip

    tile.addEventListener("click", next);


    // Automatic flip

    setTimeout(
        () => setInterval(next, 2800),
        gi * 600
    );

});

