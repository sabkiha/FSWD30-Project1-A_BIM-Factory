const News = [
	{
		title: "Save tons of time and money by managing your information",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar elementum nunc, vel feugiat lacus luctus sed.",
		img: "img/news/0.jpg"
	},
	{
		title: "All the tools you need and will learn how to use",
		text: "Fusce arcu libero, fringilla varius magna at, vehicula placerat erat. Nulla tincidunt congue arcu, vitae faucibus augue blandit non.",
		img: "img/news/1.jpg"
	},
	{
		title: "Impress your clients with amazing digital models.",
		text: "Aliquam vitae enim at metus laoreet varius vel sit amet ante. Sed rhoncus lacus quis mi fringilla, in commodo purus mollis. Curabitur in viverra nisi, non finibus quam.",
		img: "img/news/2.jpg"
	},
	{
		title: "The story of our unique partnership to support training in the construction industry",
		text: "Proin eget turpis eu libero suscipit lacinia et eu leo. Phasellus nunc est, interdum sed tempus at, vehicula vitae augue.",
		img: "img/news/3.jpg"
	},
	{
		title: "Tips and tricks in getting to grips with BIM",
		text: "Morbi convallis, mi ac malesuada scelerisque, purus velit pellentesque lectus, eget suscipit nisl ipsum id diam. Nulla eget velit sodales, ultricies metus at, placerat mi.",
		img: "img/news/4.jpg"
	},
	{
		title: "Case study: How BIM has freed up creative energies of my team",
		text: "Pellentesque convallis orci efficitur, eleifend orci ut, eleifend urna. Nulla quis velit quis nisl lacinia scelerisque. Nunc sit amet finibus risus.",
		img: "img/news/5.jpg"
	},
	{
		title: "In-depth interview with our CEO Theresa May",
		text: "Vivamus eu dapibus erat. Vivamus ac lorem venenatis, molestie quam ac, dictum magna. Cras accumsan tristique diam, vel pellentesque dui laoreet eget.",
		img: "img/news/6.jpg"
	},
	{
		title: "Non-proprietary or openBIM standards",
		text: "Praesent sed nibh et augue pulvinar pharetra at eu ipsum. Pellentesque fermentum, libero vel convallis ornare, risus mauris mattis nibh.",
		img: "img/news/7.jpg"
	}
];

const popup = document.getElementById('popup');
const nav = document.getElementById("nav");
const hero = document.getElementById("hero");
const elements = document.querySelectorAll('[data-section]');
const courses = document.getElementById('section-courses');
const news = document.getElementById('news-content');
let state = "about";
let newsDocs;
let images = [];

function initialize() {
	location.hash = "#about";
	preloadImages();
	populateNews();
	setTimeout(() => hero.classList.remove("fade-in"), 500);
}

function preloadImages() {
	elements.forEach(el => {
		const image = new Image();
		if (el.dataset.section != "news") image.src = `img/${el.id.substr(8)}.jpg`;
		images.push(image);
	})
}

function populateNews() {
	News.forEach(doc => {
		let li = document.createElement('li');
		let img = document.createElement('div');
		let info = document.createElement('div');
		let title = document.createElement('div');
		let text = document.createElement('div');

		li.className = "box-news news-click";
		img.className = "box-news-img";
		info.className = "box-news-info";
		title.className = "box-news-title";
		text.className = "box-news-text";

		title.textContent = doc.title;
		text.textContent = doc.text;
		img.style.backgroundImage = `url('${doc.img}'`;

		info.appendChild(title);
		info.appendChild(text);
		li.appendChild(img);
		li.appendChild(info);
		news.appendChild(li);
	});
	newsDocs = document.querySelectorAll('.news-click');

	newsDocs.forEach(doc => doc.addEventListener('click', () => togglePopup()));
}

function togglePopup() {
	document.body.classList.toggle('overflow');
	popup.classList.toggle('hidden');
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
	if (state != "news") setTimeout(() => hero.style.backgroundImage = `url('img/${image}.jpg')`, 500);
}

function changeSection(section) {
	navClose();
	changeHero(section);
	setTimeout(() => window.scroll(0, 0), 500);

	if (section == "courses" || section == "news" || section == "contact") {
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

