window.addEventListener('DOMContentLoaded', function () {

	// ПЛАВНЫЙ СКРОЛЛ ДО ЯКОРЯ
	function smoothScroll() {
		const anchors = document.querySelectorAll('a[href*="#"]');

		for (let anchor of anchors) {
			anchor.addEventListener('click', (event) => {
				event.preventDefault();
				const blockID = anchor.getAttribute('href');
				document.querySelector('' + blockID).scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			});
		}
	}

	smoothScroll();

	// ===========================================================

	// ИНИЦИАЛИЗАЦИЯ SWIPER.JS
	const mySlider = document.querySelector(".swiper-container");

	if (mySlider) {
		let mySwiper = new Swiper(mySlider, {
			// Optional parameters
			direction: 'horizontal',
			loop: true,
			slidesPerView: 2,
			spaceBetween: 0,
			// autoHeight: true,

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			slideToClickedSlide: true,
			centeredSlides: true,

			breakpoints: {
				768: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 5,
					centeredSlides: true,
				}
			},
		});
	}


	// ===========================================================

	// ИНИЦИАЛИЗАЦИЯ IntelTelInput.js
	let input = document.querySelector("#phone");

	if (input) {

		let iti = window.intlTelInput(input, {
			hiddenInput: 'full_phone',
			utilsScript: './script/utils.js',
		});

		// Валидация ошибок ввода
		let validMsg = document.querySelector('#valid-msg');
		let errorMsg = document.querySelector('#error-msg');
		let errorMap = ["Invalid number", "Invalid country", "Too short", "Too long", "Invalid number"];

		let reset = function () {
			input.classList.remove("error");
			errorMsg.innerHTML = "";
			errorMsg.classList.add("hide");
			validMsg.classList.add("hide");
		}

		input.addEventListener('blur', function () {
			reset();
			if (input.value.trim()) {
				if (iti.isValidNumber()) {
					validMsg.classList.remove("hide");
				} else {
					input.classList.add("error");
					let errorCode = iti.getValidationError();
					errorMsg.innerHTML = errorMap[errorCode];
					errorMsg.classList.remove("hide");
				}
			}
		});

		input.addEventListener('change', reset);
		input.addEventListener('keyup', reset);
		// конец валидации ошибок ввода

		// Выбор страны из выпадающего списка
		let countryData = window.intlTelInputGlobals.getCountryData();
		let addressDropdown = document.querySelector('#address-country');

		for (let i = 0; i < countryData.length; i++) {
			let country = countryData[i];
			let optionNode = document.createElement("option");
			optionNode.value = country.iso2;
			let textNode = document.createTextNode(country.name);
			optionNode.appendChild(textNode);
			addressDropdown.appendChild(optionNode);
		}

		addressDropdown.value = iti.getSelectedCountryData().iso2;
		input.addEventListener('countrychange', function () {
			addressDropdown.value = iti.getSelectedCountryData().iso2;
		});

		addressDropdown.addEventListener('change', function () {
			iti.setCountry(this.value);
		});
		//  конец выбора страны из выпадающего списка
	}

	// ===========================================================


	// ВАЛИДАЦИЯ ПОЛЕЙ И ОТПРАВКА НА ПОЧТУ ФОРМЫ ОБРАТНОЙ СВЯЗИ

	const validateForm = document.querySelector(".contform");

	if (validateForm) {
		const validation = new JustValidate(validateForm);

		validation
			.addField('.input-firstname', [
				{
					rule: 'required',
					errorMessage: 'The field is required.',
				},
			])
			.addField('.input-lastname', [
				{
					rule: 'required',
					errorMessage: 'The field is required.',
				},
			])

			.addField('.input-email', [
				{
					rule: 'required',
					errorMessage: 'The field is required.',
				},
				{
					rule: 'email',
					errorMessage: 'The format is wrong',
				},
			])
			.addField('.input-tel', [
				{
					rule: 'required',
					errorMessage: 'The field is required.',
				},
			])
			.addField('.select-country', [
				{
					rule: 'required',
					errorMessage: 'The field is required.',
				},
			])
			.addField('.textarea-message', [
				{
					rule: 'required',
					errorMessage: 'The field is required.',
				},
			])
			.onSuccess((event) => {
				formSend(event.target);
			});


		function formSend(thisForm) {
			let formData = new FormData(thisForm);
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Well');
					}
				}
			}
			xhr.open('POST', './sendmail.php', true);
			xhr.send(formData);
			thisForm.reset();

			window.location.href = './thanks.html';
		}
	}

	// ===========================================================


});