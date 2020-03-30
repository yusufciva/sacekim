$(document).ready(() => {

	//toastr options
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	//socket
	let socket = io();

	//for form wizard
	let gender = 0;

	AOS.init({
		duration: 800,
		easing: 'slide'
	});
	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();
	"use strict";
	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});

	// Scrollax
	$.Scrollax();
	let carousel = () => {
		$('.home-slider').owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: false,
			autoplayHoverPause: false,
			items: 1,
			navText: ["<span class='ion-md-arrow-back'></span>", "<i class='fa fa-rotate-right'></span>"],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
			}
		});
		$('.carousel-testimony').owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<i class="fa fa-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});
	};
	carousel();
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();
	var counter = function () {

		$('#section-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					console.log(num);
					$this.svkn - animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();

	var contentWayPoint = function () {
		var i = 0;
		$('.svkn-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .svkn-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();
	//Form Wizard

	let formWizard = $("#sacAnaliziFormWizard").show();
	$("#sacAnaliziFormWizard").steps({
		headerTag: "h3",
		bodyTag: "section",
		transitionEffect: "slideLeft",
		stepsOrientation: "horizontal",
		onInit: function (event, currentIndex) {
			//Form Wizard Select Gender
			$(".cinsiyet").click(function () {
				let elem = $(this);
				if (elem.attr('class').indexOf("secim") == -1) {//
					if (elem.attr('class').indexOf("mtip") > -1) {
						$("#ftip1cinsiyet").removeClass("secim");
						gender = 0;
					}
					else {
						$("#tip1cinsiyet").removeClass("secim");
						gender = 1;
					};
					elem.addClass("secim");
				};
			});
			$(".mtip").click(function () {
				let elem = $(this);
				$("#erkektip .mtip").removeClass("secim");
				elem.addClass("secim");
			});
			$(".ftip").click(function () {
				let elem = $(this);
				$("#kadintip .ftip").removeClass("secim");
				elem.addClass("secim");
			});
			//Form Wizard Genetic Buton
			$(".btnSacDokulme").click(function () {
				let elem = $(this);
				if (elem.attr('class').indexOf("btn-danger") == -1) {
					if (elem.attr('id').indexOf("btnEvet") == -1) {
						elem.removeClass("btn-dark");
						elem.addClass("btn-danger");
						$("#btnEvet").removeClass("btn-danger");
						$("#btnEvet").addClass("btn-dark");
					}
					else {
						elem.removeClass("btn-dark");
						elem.addClass("btn-danger");
						$("#btnHayir").removeClass("btn-danger");
						$("#btnHayir").addClass("btn-dark");
					}
				};
			});
			$(".select-elem").select2({
				minimumResultsForSearch: -1
			});
		},
		onStepChanging: function (event, currentIndex, newIndex) {
			// Allways allow previous action even if the current form is not valid!
			if (currentIndex > newIndex) {
				return true;
			}
			if (newIndex == 2) {
				if (gender == 1) {
					$("#erkektip").hide();
					$("#kadintip").show();

				}
				else {
					$("#kadintip").hide();
					$("#erkektip").show();
				}
				return true;
			}
			else if (newIndex == 3) {
				let controler = 0;
				let ctrlClass = (gender == 0 ? "#erkektip .mtip" : "#kadintip .ftip");
				let len = $("" + ctrlClass).length;
				for (let i = 0; i < len; i++) {
					let elem = $("" + ctrlClass).eq(i);
					if (elem.attr("class").indexOf("secim") > -1) {
						controler++;
					};
				};
				if (controler >= 1) {
					return true;
				}
				else {
					return false;
				}
			}
			else {

				return true;
			}
		},
		onStepChanged: function (event, currentIndex, priorIndex) {
			// Used to skip the "Warning" step if the user is old enough.
			if (currentIndex === 2) {
				if (gender == 1) {

					$("#erkektip").hide();
					$("#kadintip").show();
				}
				else {
					$("#kadintip").hide();
					$("#erkektip").show();
				}
				return true;
			}
			else {

				return true;
			}
		},
		onFinishing: function (event, currentIndex) {
			if ($("#analizAd").val().length < 3 || $("#analizTel").val().length < 5) {
				toastr["info"]("Lütfen bilgilerinizi tamamlayınız.", "Eksik yada boş bilgi girişi yaptınız.Lütfen bilgilerinizi eksiksiz giriniz.");
			}
			else {
				return true;
			}
		},
		onFinished: function (event, currentIndex) {
			alert("Buraya soket yazılacak!");
		}
	});
	$("#languageSelector").change(function () {
		let val = this.value;
		if (val == "English") {
			Cookies.set('lang', 'EN');
		}
		else if (val == "Español") {
			Cookies.set('lang', 'ES');
		}
		else if (val == "Français") {
			Cookies.set('lang', 'FR');
		}
		else if (val == "Deutsch") {
			Cookies.set('lang', 'DE');
		}
		else if (val == "Italiano") {
			Cookies.set('lang', 'IT');
		}
		else if (val == "العربية") {
			Cookies.set('lang', 'AR');
		}
		else if (val == "Português") {
			Cookies.set('lang', 'PT');
		}
		else if (val == "Pусский") {
			Cookies.set('lang', 'RU');
		}
		else {
			Cookies.set('lang', 'TR');
		}
		location.reload();
	});
	$(".selectpicker").selectpicker();
	let browserLangs = Cookies.get('lang');
	if (browserLangs == 'TR') {
		$('#languageSelector').selectpicker('val', "Türkçe");
	}
	else if (browserLangs == 'EN') {
		$('#languageSelector').selectpicker('val', "English");

	}
	else if (browserLangs == 'RU') {
		$('#languageSelector').selectpicker('val', "Pусский");
	}
	else if (browserLangs == 'FR') {
		$('#languageSelector').selectpicker('val', "Français");
	}
	else if (browserLangs == 'AR') {
		$('#languageSelector').selectpicker('val', "العربية");
	}
	else if (browserLangs == 'PT') {
		$('#languageSelector').selectpicker('val', "Português");
	}
	else if (browserLangs == 'IT') {
		$('#languageSelector').selectpicker('val', "Italiano");
	}
	else if (browserLangs == 'DE') {
		$('#languageSelector').selectpicker('val', "Deutsch");
	}
	else if (browserLangs == 'ES') {
		$('#languageSelector').selectpicker('val', "Español");
	};

	$("#loader").removeClass("show");
	$("#contactInfoBtn").click(() => {
		let ctrlContact = Cookies.get('contact');
		let name = $("#contactNameInput").val();
		let mail = $("#contactEmailInput").val();
		let text = $("#contactTextarea").val();
		if (name.length < 155 && name.length > 4) {
			if (mail.length < 255 && mail.length > 4) {
				if (text.length < 155 && text.length > 4) {
					if (!ctrlContact) {
						Cookies.set('contact', true, { expires: 3600 * 24 }); // Expires in 10 minutes
						socket.emit('sacEkim_IletisimTalebi_Insert', {
							name,
							mail,
							text
						});
					}
					else {
						alert(contactLimitErr);
					}
				}
				else {
					$("#contactTextarea").css("border", "2px solid #C0392B")
				}
			}
			else {
				$("#contactEmailInput").css("border", "2px solid #C0392B")
			}
		}
		else {
			$("#contactNameInput").css("border", "2px solid #C0392B")
			//
		};
	});
	$(".contactInputs").keyup(function () {
		let len = $(this).val().length;
		if (len > 4) {
			$(this).css("border", "1px solid #CACFD2")
		}
	});
	socket.on("sacEkim_IletisimTalebi_Insert_Result", (data) => {
		if (data.status) {
			alert(contactSuccess);
		}
		else {
			alert(contactDbError);
		};
	});
	let phoneInput;
	let telephone;
	if (window.location.pathname == "/") {
		phoneInput = document.querySelector("#phoneInput");
		telephone = window.intlTelInput(phoneInput, {
			preferredCountries: ["tr", "us"],
			utilsScript: "/public/js/utils.js",
		});
	}
	//Analiz
	let analizJSON = {
		gender: "",
		tip: "",
		yas: "",
		ilac: "",
		kronik: "",
		ulke: "",
		telefon: "",
		ad: "",
		eposta: "",
	};
	const stepManagement = (goTo, prevAndNext) => {
		if (goTo == 2 && prevAndNext == "next") {//1 to 2
			$("#step1").hide();
			$("#headerAnaliz1").show();
			$("#step2").show();
			if (analizJSON["gender"] == "Erkek") {
				$(".dokulmeErkek").show();
				$(".dokulmeKadin").hide();
			}
			else {
				$(".dokulmeErkek").hide();
				$(".dokulmeKadin").show();
			};
		}
		else if (goTo == 1 && prevAndNext == "prev") {
			$("#step2").hide();
			$("#headerAnaliz1").hide();
			$("#step1").show();
		}
		else if (goTo == 3 && prevAndNext == "next") {
			$("#step2").hide();
			$("#headerAnaliz1").hide();
			$("#headerAnaliz2").show();
			$("#prevButtons1").show();
			$("#step3").show();
		}
		else if (goTo == 2 && prevAndNext == "prev") {
			$("#step3").hide();
			$("#headerAnaliz1").show();
			$("#headerAnaliz2").hide();
			$("#prevButtons1").hide();
			$("#step2").show();
		}
		else if (goTo == 4 && prevAndNext == "next") {
			$("#step3").hide();
			$("#headerAnaliz2").hide();
			$("#headerAnaliz3").show();
			$("#prevButtons1").hide();
			$("#prevButtons2").show();
			$("#ilacEvet").hide();
			$("#ilacInputEvet").hide();
			$("#step4").show();
		}
		else if (goTo == 3 && prevAndNext == "prev") {
			$("#step4").hide();
			$("#headerAnaliz2").show();
			$("#headerAnaliz3").hide();
			$("#prevButtons1").show();
			$("#prevButtons2").hide();
			$("#step3").show();
		}
		else if (goTo == 5 && prevAndNext == "next") {
			$("#step4").hide();
			$("#headerAnaliz3").hide();
			$("#prevButtons2").hide();
			$("#prevButtons3").show();
			$("#headerAnaliz4").show();
			$("#step5").show();
		}
		else if (goTo == 5 && prevAndNext == "next") {
			$("#step4").hide();
			$("#headerAnaliz3").hide();
			$("#prevButtons2").hide();
			$("#prevButtons3").show();
			$("#headerAnaliz4").show();
			$("#step5").show();
		}
		else if (goTo == 4 && prevAndNext == "prev") {
			$("#step5").hide();
			$("#headerAnaliz4").hide();
			$("#prevButtons3").hide();
			$("#prevButtons2").show();
			$("#headerAnaliz3").show();
			$("#step4").show();
		}
		else if (goTo == 6 && prevAndNext == "next") {
			$("#step5").hide();
			$("#headerAnaliz4").hide();
			$("#prevButtons3").hide();
			$("#prevButtons4").show();
			$("#headerAnaliz5").show();
			$("#step6").show();
		}
		else if (goTo == 5 && prevAndNext == "prev") {
			$("#step6").hide();
			$("#headerAnaliz4").show();
			$("#prevButtons3").show();
			$("#prevButtons4").hide();
			$("#headerAnaliz5").hide();
			$("#step5").show();
		}
		else if (goTo == 7 && prevAndNext == "next") {
			$("#step6").hide();
			$("#prevButtons4").hide();
			$("#headerAnaliz5").hide();
			$("#headerAnaliz6").show();
			$("#step7").show();
		}
	};
	$("#hideShowAnaliz").click(() => {
		$("#analiz").hide();
		$(".analizHeader2").show();
		Cookies.set("cookieClose", "off");
	});
	$(".analizHeader2").click(() => {
		$(".analizHeader2").hide();
		$("#analiz").show();
		Cookies.set("cookieClose", "on");
	});
	$(".genderMale").click(() => {
		analizJSON.gender = "Erkek";
		stepManagement(2, "next");
	});
	$(".genderWoman").click(() => {
		analizJSON.gender = "Bayan";
		stepManagement(2, "next");
	});
	$(".prevBtn").click(function () {
		let elemName = $(this).attr("name");
		if (elemName == "goTo1") {
			stepManagement(1, "prev");
		}
		else if (elemName == "goTo4") {
			stepManagement(4, "prev");
		}
		else if (elemName == "goTo5") {
			stepManagement(5, "prev");
		}
	});
	$("#notSureBtn").click(() => {
		analizJSON.tip = "Emin Değil";
		stepManagement(3, "next");
	});
	$(".selectTip").click(function () {
		let tip = $(this).attr("src");
		analizJSON.tip = tip;
		stepManagement(3, "next");
	});
	$("#prevButtons1").click(() => {
		stepManagement(2, "prev");
	});
	$(".yasBtn").click(function () {
		analizJSON.yas = $(this).text();
		stepManagement(4, "next");
	});
	$("#prevButtons2").click(() => {
		stepManagement(3, "prev");
	});
	$("#ilacEvet").keyup(() => {
		$("#ilacEvet").css("box-shadow", "0px 0px 6px 1px #6c757d");
		$("#ilacEvet").css("border", "1px solid white");
	});
	$("#ilacEvetBtn").click(() => {
		$("#ilacEvet").show();
		$("#ilacInputEvet").show();
	});
	$("#ilacHayirBtn").click(() => {
		analizJSON.ilac = "Hayır";
		stepManagement(5, "next");
	});
	$("#ilacInputEvet").click(() => {
		let len = $("#ilacEvet").val().length;
		if (len > 0 && len <= 100) {
			analizJSON.ilac = $("#ilacEvet").val();
			stepManagement(5, "next");
		}
		else {
			$("#ilacEvet").css("border", "1px solid #C0392B");
		}
	});
	$(".yasBtn2").click(function () {
		analizJSON.kronik = $(this).text();
		stepManagement(6, "next");
	});
	$("#phoneInput").keyup(() => {
		$("#phoneInput").css("border", "1px solid #CACFD2");
	});
	$("#analizInputNameSurname").keyup(() => {
		$("#analizInputNameSurname").css("border", "1px solid #CACFD2");
	});
	$("#analizInputMail").keyup(() => {
		$("#analizInputMail").css("border", "1px solid #CACFD2");
	});
	$("#completeBtn").click(() => {
		let nameLen = $("#analizInputNameSurname").val().length;
		let mailLen = $("#analizInputMail").val().length;
		analizJSON.ulke = telephone.getSelectedCountryData().name;
		if (telephone.getValidationError() != 0) {
			$("#phoneInput").css("border", "1px solid #C0392B");
		}
		else if (nameLen == 0 || nameLen > 100) {
			$("#analizInputNameSurname").css("border", "1px solid #C0392B");
		}
		else if (mailLen == 0 || mailLen > 100) {
			$("#analizInputMail").css("border", "1px solid #C0392B");
		}
		else {
			analizJSON.telefon = telephone.getNumber();
			analizJSON.ad = $("#analizInputNameSurname").val();
			analizJSON.eposta = $("#analizInputMail").val();
			stepManagement(7, "next");
			Cookies.set("analiz", true, { expires: 3600 * 24 });
			Cookies.set("cookieClose", true);
			socket.emit("sacEkim_SacAnalizTalebi_Insert", {
				json: analizJSON
			});;
		};
	});
	$("#closeBtn").click(() => {
		$("#analiz").hide();
		$(".analizHeader2").show();
		Cookies.set("cookieClose", "off");
	});
	$("#homeIndexHairAnalysisFree").click(() => {
		$("#analiz").show();
		$(".analizHeader2").hide();
	});
	let analizCookie = Cookies.get("analiz");
	let cookieClose = Cookies.get("cookieClose");
	if (analizCookie == "true") {
		$("#step1").hide();
		$("#headerAnaliz1").hide();
		$("#headerAnaliz6").show();
		$("#step7").show();
	};
	if (cookieClose == "off") {
		$("#analiz").hide();
		$(".analizHeader2").show();
	}
	else {
		$("#analiz").show();
		$(".analizHeader2").hide();
	};
	(function () {
		let phoneNumber = "90" + $("#phoneNumber").attr("name");
        var options = {
            whatsapp: ""+phoneNumber, // WhatsApp numaranızı buraya girin
            call_to_action: "Merhaba, nasıl yardımcı olabilirim?", // Görünecek metin
            position: "left", // Position may be 'right' or 'left'
        };
        var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();
});