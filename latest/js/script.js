const nav = document.getElementById("nav");
const hero = document.getElementById("hero");
const elements = document.querySelectorAll('[data-section]');
const courses = document.getElementById('section-courses');
let state = "about";
let images = [];

function initialize() {
	location.hash = "#about";
	preloadImages();
	setTimeout(() => hero.classList.remove("fade-in"), 500);
}

function preloadImages() {
	elements.forEach(el => {
		const image = new Image();
		image.src = `img/${el.id.substr(8)}.jpg`;
		images.push(image);
	})
}

function handleResize() {
	if (window.innerWidth > 1170) navClose();
}

function navToggle() {
	nav.classList.toggle("nav-open");
}

function navOpen() {
	nav.classList.add("nav-open");
}

function navClose() {
	nav.classList.remove("nav-open");
}

function changeState(to) {
	state = location.hash.substr(1);
	if (to = state) changeSection(state);
}

function changeHero(image) {
	setTimeout(() => hero.style.backgroundImage = `url('img/${image}.jpg')`, 500);
}

function changeSection(section) {
	navClose();
	changeHero(section);
	setTimeout(() => window.scroll(0, 0), 500);

	if (section == "courses") {
		setTimeout(() => {
			hero.classList.add("hidden");
			hero.classList.remove("fade-in");
		}, 500);
	} else {
		setTimeout(() => { 
			hero.classList.remove("hidden");
			hero.classList.add("fade-in");
		}, 500);
	}

	elements.forEach(element => {
		if (element.dataset.section != section) {
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

document.getElementById("logo").addEventListener("click", navToggle);
document.addEventListener("load", () => init);
window.addEventListener("hashchange", changeState);
window.addEventListener('resize', handleResize);
window.onload = initialize();

