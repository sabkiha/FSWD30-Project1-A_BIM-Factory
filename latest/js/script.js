const nav = document.getElementById("nav");
let state = "about";
let initialized = false;
const hero = document.getElementById("hero");
const elements = document.querySelectorAll('.section');
let images = [];

function initialize() {
	setTimeout(() => hero.classList.remove("fade-in"), 500);
	setTimeout(() => initialized = true, 500);
	location.hash = "#about"
	preloadImages();
}

function preloadImages() {
	elements.forEach(el => {
		const image = new Image();
		image.src = `img/${el.id.substr(8)}.jpg`;
		images.push(image);
	})
}

function toggleNav() {
	nav.classList.toggle("nav-open");
}

function changeState(to) {
	state = location.hash.substr(1);
	if (to = state) changeSection(state);
}

function changeHero(image) {
	setTimeout(() => hero.style.backgroundImage = `url('img/${image}.jpg')`, 500);
}

function changeSection(section) {

	changeHero(section);
	if (section == "courses") {
		setTimeout(() => hero.classList.add("hero-big"), 500);
	} else {
		setTimeout(() => hero.classList.remove("hero-big"), 500);
	}

	elements.forEach(element => {
		if (element.id != `section-${section}`) {
			element.classList.add("fade-out");
			setTimeout(() => element.classList.add("hidden"), 500);
			setTimeout(() => element.classList.remove("fade-out"), 500);
		} else {
			element.classList.add("fade-in");
			setTimeout(() => element.classList.remove("hidden"), 500);
		}
	});
	hero.classList.add("fade-next");
	setTimeout(() => hero.classList.remove("fade-next"), 500);
}

document.getElementById("logo").addEventListener("click", toggleNav);
document.addEventListener("load", () => init);
window.addEventListener("hashchange", changeState);
window.onload = initialize();