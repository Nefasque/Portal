const { Marked } = globalThis.marked;
const { markedHighlight } = globalThis.markedHighlight;

const marked = new Marked(
	markedHighlight({
		emptyLangClass: 'hljs',
		langPrefix: 'hljs language-',
		highlight(code, lang, _) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);


/**
 * Navigation behavior controller and main content
 * */
const navigationBehavior = () => {
	const li = document.querySelectorAll("nav ul li");
	const modal_page = document.querySelectorAll(".modal-pages");

	if (window.screen.width > 576) {
		modal_page[1].classList.add("active");
		li[1].classList.add("btn-active");
	}

	li.forEach((el, i) => {
		el.addEventListener("click", () => {
			const windowWidth = window.screen.width;
			let hiddenAll = false;

			if (modal_page[i].classList.contains("active")) {
				hiddenAll = true;
			}

			modal_page.forEach((el) => {
				el.classList.remove("active");
			})

			li.forEach((el) => {
				el.classList.remove("btn-active")
			})

			if (hiddenAll && windowWidth <= 576) return;

			modal_page[i].classList.add("active");
			el.classList.add("btn-active");
		})
	});

	window.addEventListener("resize", () => {
		const windowWidth = window.screen.width;
		if (windowWidth >= 576) {
			let noneActivated = true;
			modal_page.forEach((el) => {
				if (el.classList.contains("active")) noneActivated = false;
			})

			if (noneActivated) {
				modal_page[2].classList.add("active");
				li[2].classList.add("btn-active");
			}
		}
	})
}

const createrDivArticle = (content) => {
	const line = content.split("\n");
	const title = line[0]
	const date = line[1]
	const render = marked.parse(line.slice(3).join("\n"));
	const div = document.createElement("div");
	div.innerHTML = `
    <div class="box1-title">
      <h2>${title}</h2>
      <time datetime="2025-01-14">${date}</time>
    </div>
    <div class="box1-content article-content ">${render}</div>
    <span class="read-more active"></span>
  `;
	div.classList.add("box1", "blog-article");

	return div
}

/**
 * Blog article 
 */
const renderAticle = async () => {
	const blogContent = document.querySelector(".blog-content");
	const fragment = document.createDocumentFragment();

	let tb = true
	let i = 1;
	while (tb) {
		const article = await fetch(`../markdwon/t-${i++}.md`)
			.then(response => {
				if (!response.ok) {
					tb = false
					return
				}
				return response.text();
			})
			.then(contenido => { return contenido })
			.catch(error => console.error(error));

		if (tb) {
			fragment.appendChild(createrDivArticle(article))
		}
	}

	blogContent.appendChild(fragment);
}

const btnReadMore = () => {
	const btn = document.querySelectorAll(".read-more");
	btn.forEach((el, i) => {
		el.addEventListener("click", () => {
			const article = document.querySelectorAll(".article-content")[i];
			article.classList.toggle("expanded");
			el.classList.toggle("active");
		})
	})
}


///////////////////////////
/// main 
///////////////////////////
const main = async () => {
	navigationBehavior();
	await renderAticle()
	btnReadMore()
};
main();
