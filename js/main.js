

/**
 * Navigation behavior controller and main content
 * */
const navigationBehavior = () => { //
	const li = document.querySelectorAll("nav ul li");
	const modal_page = document.querySelectorAll(".modal-pages");

	if (window.screen.width > 576) {
		modal_page[0].classList.add("active");
		li[0].classList.add("btn-active");
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
		if (windowWidth >= 576 ) {
			let noneActivated = true;
			modal_page.forEach((el) => {
				if (el.classList.contains("active")) noneActivated = false;
			})

			if (noneActivated) {
				modal_page[0].classList.add("active");
				li[0].classList.add("btn-active");
			}
			modephone = false;
		}
	})
}


/// main 
const main = () => {
	navigationBehavior();

	const main = document.querySelector("main");
	main.addEventListener("click", () => {
		console.log("no work")
	})

};
main();
