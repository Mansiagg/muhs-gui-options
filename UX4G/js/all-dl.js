  // Start custom-v5.js

  // Function to extract the parent domain (to use for setting cookies)
function getParentDomain(hostname) {
    const parts = hostname.split('.');
    const len = parts.length;

    if (len >= 3) {
        // For domains like 'digilocker.gov.in', 'example.com', etc.
        return `.${parts.slice(-3).join('.')}`;
    }
    return hostname; // Return hostname if not valid
}

function setCookie(name, value, days) {
    try {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + d.toUTCString();
        const hostname = window.location.hostname;
        const parentDomain = getParentDomain(hostname);
        const encodedValue = encodeURIComponent(value);
        document.cookie = `${name}=%22${encodedValue}%22; domain=${parentDomain}; path=/; max-age=31536000; secure=false; SameSite=strict; Secure`;

        } catch (error) {
        console.error("Error setting cookie:", error);
    }
}

function getValueFromCookie(name) {
    const cookies = document.cookie.split(';');
    const themeMode = cookies
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(name+'='));

    if (themeMode) {
        // Get everything after 'language=' and decode it
        const value = decodeURIComponent(themeMode.split('=')[1]);
        // Remove any surrounding quotes and return the clean value
        return value.replace(/^["']|["']$/g, '');
    }
    return 'light';
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    setCookie('themeMode', 'dark', 7);  // Set cookie for 7 days
    toggleIcons('moon');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    setCookie('themeMode', 'light', 7);  // Set cookie for 7 days
    toggleIcons('sun');
}

function toggleIcons(mode) {
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    if (mode === 'moon') {
        moonIcon.style.display = 'inline';
        sunIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
}

function toggleDarkMode() {
    const darkMode = getValueFromCookie('themeMode');

    if (darkMode !== 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

window.addEventListener('load', () => {
    const darkMode = getValueFromCookie('themeMode');
    if (darkMode === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});



// code for screen size
const originalFontSizes = new Map();
let elementsToAdjust = [];
let increaseClickCount = 0;
let decreaseClickCount = 0;
const MAX_CLICKS = 3;

// Store initial font sizes and cache elements, excluding elements within .header-top
function storeInitialFontSizes() {
    elementsToAdjust = Array.from(
        document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, a')
    ).filter(element => !element.closest('header')); // Exclude elements inside .header-top

    elementsToAdjust.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        if (!originalFontSizes.has(element)) {
            originalFontSizes.set(element, parseFloat(computedStyle.fontSize));
        }
    });
}

// Adjust font size by a given change value
function adjustFontSize(change) {
    elementsToAdjust.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const currentSize = parseFloat(computedStyle.fontSize);
        const newSize = currentSize + change;
        element.style.fontSize = newSize + 'px';
    });
}

// Reset font sizes to their original values and reset counters
function resetFontSizes() {
    originalFontSizes.forEach((size, element) => {
        element.style.fontSize = size + 'px';
    });
    increaseClickCount = 0;
    decreaseClickCount = 0;
}

// Button handlers
function increaseFontSize() {
    if (increaseClickCount < MAX_CLICKS) {
        adjustFontSize(2); // Increase font size by 2px
        increaseClickCount++;
    }
}

function decreaseFontSize() {
    if (decreaseClickCount < MAX_CLICKS) {
        adjustFontSize(-2); // Decrease font size by 2px
        decreaseClickCount++;
    }
}

window.onload = function() {
    storeInitialFontSizes();
    document.getElementById('btn-orig').addEventListener('click', resetFontSizes);
    document.getElementById('btn-increase').addEventListener('click', increaseFontSize);
    document.getElementById('btn-decrease').addEventListener('click', decreaseFontSize);
};


//Code ends



document.addEventListener('DOMContentLoaded', () => {

    // Owl Carousel Initialization
    $(document).ready(function() {
        // First Owl Carousel instance
        $(".owl-carousel.first-carousel").each(function() {
            const $this = $(this);

            const owl1 = $this.owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                items: 6,
                slideBy: 1,
                autoplay: true, // Enable auto-scroll
                autoplayTimeout: 4000, // 4 seconds interval
                autoplayHoverPause: true, // Pause on hover
                responsive: {
                    0: { items: 1 },
                    600: { items: 3 },
                    992: { items: 4 },
                    1440: { items: 4 }
                }
            });

            owl1.on('changed.owl.carousel', function(event) {
                const totalItems = event.item.count;
                const currentIndex = event.item.index;
                $this.find(".owl-next").toggleClass('disabled', currentIndex >= totalItems - 1);
                $this.find(".owl-prev").toggleClass('disabled', currentIndex <= 0);
            });
        });

        // Second Owl Carousel instance with different responsive settings
        $(".owl-carousel.second-carousel").each(function() {
            const $this = $(this);

            const owl2 = $this.owlCarousel({
                loop: false,
                margin: 15,
                nav: true,
                items: 4,
                slideBy: 1,
                autoplay: true, // Enable auto-scroll
                autoplayTimeout: 4000, // 4 seconds interval
                autoplayHoverPause: true, // Pause on hover
                responsive: {
                    0: { items: 2 },
                    600: { items: 3 },
                    992: { items: 5 },
                    1440: { items: 6 }
                }
            });

            owl2.on('changed.owl.carousel', function(event) {
                const totalItems = event.item.count;
                const currentIndex = event.item.index;
                $this.find(".owl-next").toggleClass('disabled', currentIndex >= totalItems - 1);
                $this.find(".owl-prev").toggleClass('disabled', currentIndex <= 0);
            });
        });
    });




});

//Get to top  button
let mybutton = document.getElementById("btn-back-to-top");
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//Get to top  button end
function redirectToHomeIfJTokenExists() {
      const cookies = document.cookie.split(';');
      const jTokenCookie = cookies
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith('jtoken='));

          if (jTokenCookie) {
              window.location.href = '/web/home';
          }
}

//Footer model pop up start ////////////
document.addEventListener('DOMContentLoaded', () => {

  redirectToHomeIfJTokenExists();

    function getLanguageFromCookie() {
        const cookies = document.cookie.split(';');
        const languageCookie = cookies
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('language='));

        if (languageCookie) {
            // Get everything after 'language=' and decode it
            const value = decodeURIComponent(languageCookie.split('=')[1]);
            // Remove any surrounding quotes and return the clean value
            return value.replace(/^["']|["']$/g, '');
        }
        return 'en';
    }
    const languageMessages = {
        en: "You are being redirected to an external website. Please note that DigiLocker is not responsible for external websites content & privacy policies.",
        hi: "आपको एक बाहरी वेबसाइट पर पुनः निर्देशित किया जा रहा है। कृपया ध्यान दें कि डिजिलॉकर बाहरी वेबसाइटों की सामग्री और गोपनीयता नीतियों के लिए जिम्मेदार नहीं है।",
        as:"আপোনাক এটা বাহ্যিক ৱেবছাইটলৈ পুনৰ নিৰ্দেশিত কৰা হৈছে। অনুগ্ৰহ কৰি মন কৰিব যে ডিজিলকাৰ বাহ্যিক ৱেবছাইটৰ বিষয়বস্তু আৰু গোপনীয়তা নীতিৰ বাবে দায়বদ্ধ নহয়।",
        bn: "আপনাকে একটি বাহ্যিক ওয়েবসাইটে পুনঃনির্দেশিত করা হচ্ছে। দয়া করে মনে রাখবেন যে ডিজিলকার বাইরের ওয়েবসাইটের বিষয়বস্তু এবং গোপনীয়তা নীতির জন্য দায়ী নয়।",
        gu:"તમને બાહ્ય વેબસાઇટ પર રીડાયરેક્ટ કરવામાં આવી રહ્યા છે. મહેરબાની કરીને નોંધ કરો કે ડિજિલોકર બાહ્ય વેબસાઇટની સામગ્રી અને ગોપનીયતા નીતિઓ માટે જવાબદાર નથી.",
        ml: "നിങ്ങളെ ഒരു ബാഹ്യ വെബ്സൈറ്റിലേക്ക് റീഡയറക്ട് ചെയ്യുന്നു. ബാഹ്യ വെബ്സൈറ്റുകളുടെ ഉള്ളടക്കത്തിനും സ്വകാര്യതാ നയങ്ങൾക്കും ഡിജിലോക്കർ ഉത്തരവാദിയല്ലെന്ന് ദയവായി ശ്രദ്ധിക്കുക.",
        mr: "तुम्हाला बाह्य संकेतस्थळावर पुनर्निर्देशित केले जात आहे. कृपया लक्षात घ्या की डिजिलॉकर बाह्य संकेतस्थळ सामग्री आणि गोपनीयता धोरणांसाठी जबाबदार नाही.",
        or: "ଆପଣଙ୍କୁ ଏକ ବାହ୍ଯ଼ ୱେବସାଇଟକୁ ପୁନଃନିର୍ଦେଶିତ କରାଯାଉଛି। ଦଯ଼ାକରି ଧ୍ଯ଼ାନ ଦିଅନ୍ତୁ ଯେ ଡିଜିଲକର ବାହ୍ଯ଼ ୱେବସାଇଟର ବିଷଯ଼ବସ୍ତୁ ଏବଂ ଗୋପନୀଯ଼ତା ନୀତି ପାଇଁ ଦାଯ଼ୀ ନୁହେଁ।",
        pa: "ਤੁਹਾਨੂੰ ਇੱਕ ਬਾਹਰੀ ਵੈੱਬਸਾਈਟ ਉੱਤੇ ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਨੋਟ ਕਰੋ ਕਿ ਡਿਜੀਲਾਕਰ ਬਾਹਰੀ ਵੈਬਸਾਈਟਾਂ ਦੀ ਸਮੱਗਰੀ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੀਤੀਆਂ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ।",
        ta: "நீங்கள் ஒரு வெளிப்புற வலைத்தளத்திற்கு திருப்பி விடப்படுகிறீர்கள். வெளிப்புற வலைத்தளங்களின் உள்ளடக்கம் மற்றும் தனியுரிமைக் கொள்கைகளுக்கு டிஜிலாக்கர் பொறுப்பல்ல என்பதை நினைவில் கொள்க.",
        te: "మీరు బాహ్య వెబ్సైట్కు మళ్ళించబడుతున్నారు. బయటి వెబ్సైట్ల కంటెంట్ & గోప్యతా విధానాలకు డిజిలాకర్ బాధ్యత వహించదని దయచేసి గమనించండి.",
        kn: "ನಿಮ್ಮನ್ನು ಬಾಹ್ಯ ಜಾಲತಾಣಕ್ಕೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ. ಬಾಹ್ಯ ಜಾಲತಾಣಗಳ ವಿಷಯ ಮತ್ತು ಗೌಪ್ಯತೆ ನೀತಿಗಳಿಗೆ ಡಿಜಿಲಾಕರ್ ಜವಾಬ್ದಾರನಾಗಿರುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ದಯವಿಟ್ಟು ಗಮನಿಸಿ."
    };
    const links = document.querySelectorAll('.listAlert'); // Select all links with the class 'listBtn'
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalActionButton = document.getElementById('modalActionButton');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const savedLanguage = getLanguageFromCookie();
            const title = link.getAttribute('data-title') || '';
            const content = languageMessages[savedLanguage] || languageMessages['en'];
            const buttonText = link.getAttribute('data-button') || 'ok';
            const buttonLink = link.getAttribute('data-link') || '#';

            if (!title || !buttonLink) {
                console.error('Missing required attributes');
                return;
            }

            modalTitle.textContent = title;
            modalBody.textContent = content;
            modalActionButton.textContent = buttonText;
            modalActionButton.href = buttonLink;
            modalActionButton.target = "_blank";

            try {
                $('#contentModal').modal('show');
            } catch (error) {
                console.error('Error showing modal:', error);
            }
        });
    });

});

  // Close the modal when the "OK" button (modalActionButton) is clicked
  modalActionButton.addEventListener('click', (event) => {
    // Close the modal
    $('#contentModal').modal('hide');
});

document.querySelector('.btnClose[data-dismiss="modal"]').addEventListener('click', () => {
    $('#contentModal').modal('hide');

});

//Footer model pop up End ////////////


 // Close the menu when clicking outside
 document.addEventListener("click", function (event) {
    const menuToggle = document.querySelector("#menuToggle1");
    const checkbox = document.querySelector("#menuCheckbox");

    if (!menuToggle.contains(event.target)) {
        checkbox.checked = false;
    }
});

 // Slider play and pause script

const carousel = document.querySelector('#carouselExampleControls');
const pauseBtn = document.querySelector('#pauseBtn');
const playPauseIcon = document.querySelector('#playPauseIcon');

let isPlaying = true; // Initially playing

pauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        bootstrap.Carousel.getInstance(carousel).pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    } else {
        bootstrap.Carousel.getInstance(carousel).cycle();
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
    }
    isPlaying = !isPlaying;
});


//End custom-v5.js

//popper min js start

/**
 * @popperjs/core v2.4.4 - MIT License
 */

"use strict";
! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {}) }(this, (function(e) {
    function t(e) { return { width: (e = e.getBoundingClientRect()).width, height: e.height, top: e.top, right: e.right, bottom: e.bottom, left: e.left, x: e.left, y: e.top } }

    function n(e) { return "[object Window]" !== e.toString() ? (e = e.ownerDocument) ? e.defaultView : window : e }

    function r(e) { return { scrollLeft: (e = n(e)).pageXOffset, scrollTop: e.pageYOffset } }

    function o(e) { return e instanceof n(e).Element || e instanceof Element }

    function i(e) { return e instanceof n(e).HTMLElement || e instanceof HTMLElement }

    function a(e) { return e ? (e.nodeName || "").toLowerCase() : null }

    function s(e) { return (o(e) ? e.ownerDocument : e.document).documentElement }

    function f(e) { return t(s(e)).left + r(e).scrollLeft }

    function c(e) { return n(e).getComputedStyle(e) }

    function p(e) { return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX) }

    function l(e, o, c) { void 0 === c && (c = !1); var l = s(o);
        e = t(e); var u = i(o),
            d = { scrollLeft: 0, scrollTop: 0 },
            m = { x: 0, y: 0 }; return (u || !u && !c) && (("body" !== a(o) || p(l)) && (d = o !== n(o) && i(o) ? { scrollLeft: o.scrollLeft, scrollTop: o.scrollTop } : r(o)), i(o) ? ((m = t(o)).x += o.clientLeft, m.y += o.clientTop) : l && (m.x = f(l))), { x: e.left + d.scrollLeft - m.x, y: e.top + d.scrollTop - m.y, width: e.width, height: e.height } }

    function u(e) { return { x: e.offsetLeft, y: e.offsetTop, width: e.offsetWidth, height: e.offsetHeight } }

    function d(e) { return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e) }

    function m(e, t) { void 0 === t && (t = []); var r = function e(t) { return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && p(t) ? t : e(d(t)) }(e);
        e = "body" === a(r); var o = n(r); return r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(d(r))) }

    function h(e) { if (!i(e) || "fixed" === c(e).position) return null; if (e = e.offsetParent) { var t = s(e); if ("body" === a(e) && "static" === c(e).position && "static" !== c(t).position) return t } return e }

    function g(e) { for (var t = n(e), r = h(e); r && 0 <= ["table", "td", "th"].indexOf(a(r)) && "static" === c(r).position;) r = h(r); if (r && "body" === a(r) && "static" === c(r).position) return t; if (!r) e: { for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) { if ("none" !== (r = c(e)).transform || "none" !== r.perspective || r.willChange && "auto" !== r.willChange) { r = e; break e }
                e = e.parentNode }
            r = null }
        return r || t }

    function b(e) { var t = new Map,
            n = new Set,
            r = []; return e.forEach((function(e) { t.set(e.name, e) })), e.forEach((function(e) { n.has(e.name) || function e(o) { n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) { n.has(r) || (r = t.get(r)) && e(r) })), r.push(o) }(e) })), r }

    function v(e) { var t; return function() { return t || (t = new Promise((function(n) { Promise.resolve().then((function() { t = void 0, n(e()) })) }))), t } }

    function y(e) { return e.split("-")[0] }

    function O(e, t) { var n = !(!t.getRootNode || !t.getRootNode().host); if (e.contains(t)) return !0; if (n)
            do { if (t && e.isSameNode(t)) return !0;
                t = t.parentNode || t.host } while (t); return !1 }

    function x(e) { return Object.assign(Object.assign({}, e), {}, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }) }

    function w(e, o) { if ("viewport" === o) { o = n(e); var a = s(e);
            o = o.visualViewport; var p = a.clientWidth;
            a = a.clientHeight; var l = 0,
                u = 0;
            o && (p = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = o.offsetLeft, u = o.offsetTop)), e = x(e = { width: p, height: a, x: l + f(e), y: u }) } else i(o) ? ((e = t(o)).top += o.clientTop, e.left += o.clientLeft, e.bottom = e.top + o.clientHeight, e.right = e.left + o.clientWidth, e.width = o.clientWidth, e.height = o.clientHeight, e.x = e.left, e.y = e.top) : (u = s(e), e = s(u), l = r(u), o = u.ownerDocument.body, p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -l.scrollLeft + f(u), l = -l.scrollTop, "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), e = x({ width: p, height: a, x: u, y: l })); return e }

    function j(e, t, n) { return t = "clippingParents" === t ? function(e) { var t = m(d(e)),
                n = 0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e) ? g(e) : e; return o(n) ? t.filter((function(e) { return o(e) && O(e, n) && "body" !== a(e) })) : [] }(e) : [].concat(t), (n = (n = [].concat(t, [n])).reduce((function(t, n) { return n = w(e, n), t.top = Math.max(n.top, t.top), t.right = Math.min(n.right, t.right), t.bottom = Math.min(n.bottom, t.bottom), t.left = Math.max(n.left, t.left), t }), w(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n }

    function M(e) { return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y" }

    function E(e) { var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null; var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2; switch (r) {
            case "top":
                o = { x: o, y: t.y - n.height }; break;
            case "bottom":
                o = { x: o, y: t.y + t.height }; break;
            case "right":
                o = { x: t.x + t.width, y: i }; break;
            case "left":
                o = { x: t.x - n.width, y: i }; break;
            default:
                o = { x: t.x, y: t.y } } if (null != (r = r ? M(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
            case "start":
                o[r] = Math.floor(o[r]) - Math.floor(t[i] / 2 - n[i] / 2); break;
            case "end":
                o[r] = Math.floor(o[r]) + Math.ceil(t[i] / 2 - n[i] / 2) }
        return o }

    function D(e) { return Object.assign(Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }), e) }

    function P(e, t) { return t.reduce((function(t, n) { return t[n] = e, t }), {}) }

    function k(e, n) { void 0 === n && (n = {}); var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n; var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i; var c = r.altBoundary,
            p = void 0 !== c && c;
        r = D("number" != typeof(r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, q)); var l = e.elements.reference;
        c = e.rects.popper, a = j(o(p = e.elements[p ? "popper" === i ? "reference" : "popper" : i]) ? p : p.contextElement || s(e.elements.popper), a, f), p = E({ reference: f = t(l), element: c, strategy: "absolute", placement: n }), c = x(Object.assign(Object.assign({}, c), p)), f = "popper" === i ? c : f; var u = { top: a.top - f.top + r.top, bottom: f.bottom - a.bottom + r.bottom, left: a.left - f.left + r.left, right: f.right - a.right + r.right }; if (e = e.modifiersData.offset, "popper" === i && e) { var d = e[n];
            Object.keys(u).forEach((function(e) { var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                u[e] += d[n] * t })) } return u }

    function L() { for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n]; return !t.some((function(e) { return !(e && "function" == typeof e.getBoundingClientRect) })) }

    function B(e) { void 0 === e && (e = {}); var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? V : e; return function(e, t, i) {
            function a() { f.forEach((function(e) { return e() })), f = [] }
            void 0 === i && (i = r); var s = { placement: "bottom", orderedModifiers: [], options: Object.assign(Object.assign({}, V), r), modifiersData: {}, elements: { reference: e, popper: t }, attributes: {}, styles: {} },
                f = [],
                c = !1,
                p = { state: s, setOptions: function(i) { return a(), s.options = Object.assign(Object.assign(Object.assign({}, r), s.options), i), s.scrollParents = { reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [], popper: m(t) }, i = function(e) { var t = b(e); return N.reduce((function(e, n) { return e.concat(t.filter((function(e) { return e.phase === n }))) }), []) }(function(e) { var t = e.reduce((function(e, t) { var n = e[t.name]; return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, { options: Object.assign(Object.assign({}, n.options), t.options), data: Object.assign(Object.assign({}, n.data), t.data) }) : t, e }), {}); return Object.keys(t).map((function(e) { return t[e] })) }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function(e) { return e.enabled })), s.orderedModifiers.forEach((function(e) { var t = e.name,
                                n = e.options;
                            n = void 0 === n ? {} : n, "function" == typeof(e = e.effect) && (t = e({ state: s, name: t, instance: p, options: n }), f.push(t || function() {})) })), p.update() }, forceUpdate: function() { if (!c) { var e = s.elements,
                                t = e.reference; if (L(t, e = e.popper))
                                for (s.rects = { reference: l(t, g(e), "fixed" === s.options.strategy), popper: u(e) }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) { return s.modifiersData[e.name] = Object.assign({}, e.data) })), t = 0; t < s.orderedModifiers.length; t++)
                                    if (!0 === s.reset) s.reset = !1, t = -1;
                                    else { var n = s.orderedModifiers[t];
                                        e = n.fn; var r = n.options;
                                        r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({ state: s, options: r, name: n, instance: p }) || s) } } }, update: v((function() { return new Promise((function(e) { p.forceUpdate(), e(s) })) })), destroy: function() { a(), c = !0 } }; return L(e, t) ? (p.setOptions(i).then((function(e) {!c && i.onFirstUpdate && i.onFirstUpdate(e) })), p) : p } }

    function W(e) { var t, r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive,
            l = window.devicePixelRatio || 1;
        e = Math.round(a.x * l) / l || 0, l = Math.round(a.y * l) / l || 0; var u = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y"); var d, m = "left",
            h = "top",
            b = window; if (p) { var v = g(r);
            v === n(r) && (v = s(r)), "top" === i && (h = "bottom", l -= v.clientHeight - o.height, l *= c ? 1 : -1), "left" === i && (m = "right", e -= v.clientWidth - o.width, e *= c ? 1 : -1) } return r = Object.assign({ position: f }, p && _), c ? Object.assign(Object.assign({}, r), {}, ((d = {})[h] = a ? "0" : "", d[m] = u ? "0" : "", d.transform = 2 > (b.devicePixelRatio || 1) ? "translate(" + e + "px, " + l + "px)" : "translate3d(" + e + "px, " + l + "px, 0)", d)) : Object.assign(Object.assign({}, r), {}, ((t = {})[h] = a ? l + "px" : "", t[m] = u ? e + "px" : "", t.transform = "", t)) }

    function A(e) { return e.replace(/left|right|bottom|top/g, (function(e) { return U[e] })) }

    function H(e) { return e.replace(/start|end/g, (function(e) { return z[e] })) }

    function T(e, t, n) { return void 0 === n && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x } }

    function R(e) { return ["top", "right", "bottom", "left"].some((function(t) { return 0 <= e[t] })) } var q = ["top", "bottom", "right", "left"],
        C = q.reduce((function(e, t) { return e.concat([t + "-start", t + "-end"]) }), []),
        S = [].concat(q, ["auto"]).reduce((function(e, t) { return e.concat([t, t + "-start", t + "-end"]) }), []),
        N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
        V = { placement: "bottom", modifiers: [], strategy: "absolute" },
        I = { passive: !0 },
        _ = { top: "auto", right: "auto", bottom: "auto", left: "auto" },
        U = { left: "right", right: "left", bottom: "top", top: "bottom" },
        z = { start: "end", end: "start" },
        F = [{ name: "eventListeners", enabled: !0, phase: "write", fn: function() {}, effect: function(e) { var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper); return i && f.forEach((function(e) { e.addEventListener("scroll", r.update, I) })), a && s.addEventListener("resize", r.update, I),
                    function() { i && f.forEach((function(e) { e.removeEventListener("scroll", r.update, I) })), a && s.removeEventListener("resize", r.update, I) } }, data: {} }, { name: "popperOffsets", enabled: !0, phase: "read", fn: function(e) { var t = e.state;
                t.modifiersData[e.name] = E({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement }) }, data: {} }, { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function(e) { var t = e.state,
                    n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e, n = void 0 === (n = n.adaptive) || n, e = { placement: y(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: e }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), W(Object.assign(Object.assign({}, e), {}, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: n })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), W(Object.assign(Object.assign({}, e), {}, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1 })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, { "data-popper-placement": t.placement }) }, data: {} }, { name: "applyStyles", enabled: !0, phase: "write", fn: function(e) { var t = e.state;
                Object.keys(t.elements).forEach((function(e) { var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e];
                    i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) { var t = r[e];!1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t) }))) })) }, effect: function(e) { var t = e.state,
                    n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} }; return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function() { Object.keys(t.elements).forEach((function(e) { var r = t.elements[e],
                                o = t.attributes[e] || {};
                            e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) { return e[t] = "", e }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function(e) { r.removeAttribute(e) }))) })) } }, requires: ["computeStyles"] }, { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function(e) { var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = S.reduce((function(e, n) { var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s = "function" == typeof r ? r(Object.assign(Object.assign({}, o), {}, { placement: n })) : r; return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? { x: s, y: o } : { x: o, y: s }, e[n] = i, e }), {}))[t.placement],
                    i = o.x;
                o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e } }, { name: "flip", enabled: !0, phase: "main", fn: function(e) { var t = e.state,
                    n = e.options; if (e = e.name, !t.modifiersData[e]._skip) { var r = n.mainAxis;
                    r = void 0 === r || r; var o = n.altAxis;
                    o = void 0 === o || o; var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        c = n.altBoundary,
                        p = n.flipVariations,
                        l = void 0 === p || p,
                        u = n.allowedAutoPlacements;
                    p = y(n = t.options.placement), i = i || (p !== n && l ? function(e) { if ("auto" === y(e)) return []; var t = A(e); return [H(e), t, H(t)] }(n) : [A(n)]); var d = [n].concat(i).reduce((function(e, n) { return e.concat("auto" === y(n) ? function(e, t) { void 0 === t && (t = {}); var n = t.boundary,
                                r = t.rootBoundary,
                                o = t.padding,
                                i = t.flipVariations,
                                a = t.allowedAutoPlacements,
                                s = void 0 === a ? S : a,
                                f = t.placement.split("-")[1];
                            0 === (i = (t = f ? i ? C : C.filter((function(e) { return e.split("-")[1] === f })) : q).filter((function(e) { return 0 <= s.indexOf(e) }))).length && (i = t); var c = i.reduce((function(t, i) { return t[i] = k(e, { placement: i, boundary: n, rootBoundary: r, padding: o })[y(i)], t }), {}); return Object.keys(c).sort((function(e, t) { return c[e] - c[t] })) }(t, { placement: n, boundary: s, rootBoundary: f, padding: a, flipVariations: l, allowedAutoPlacements: u }) : n) }), []);
                    n = t.rects.reference, i = t.rects.popper; var m = new Map;
                    p = !0; for (var h = d[0], g = 0; g < d.length; g++) { var b = d[g],
                            v = y(b),
                            O = "start" === b.split("-")[1],
                            x = 0 <= ["top", "bottom"].indexOf(v),
                            w = x ? "width" : "height",
                            j = k(t, { placement: b, boundary: s, rootBoundary: f, altBoundary: c, padding: a }); if (O = x ? O ? "right" : "left" : O ? "bottom" : "top", n[w] > i[w] && (O = A(O)), w = A(O), x = [], r && x.push(0 >= j[v]), o && x.push(0 >= j[O], 0 >= j[w]), x.every((function(e) { return e }))) { h = b, p = !1; break }
                        m.set(b, x) } if (p)
                        for (r = function(e) { var t = d.find((function(t) { if (t = m.get(t)) return t.slice(0, e).every((function(e) { return e })) })); if (t) return h = t, "break" }, o = l ? 3 : 1; 0 < o && "break" !== r(o); o--);
                    t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0) } }, requiresIfExists: ["offset"], data: { _skip: !1 } }, { name: "preventOverflow", enabled: !0, phase: "main", fn: function(e) { var t = e.state,
                    n = e.options;
                e = e.name; var r = n.mainAxis,
                    o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r; var i = n.tether;
                i = void 0 === i || i; var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a;
                n = k(t, { boundary: n.boundary, rootBoundary: n.rootBoundary, padding: n.padding, altBoundary: n.altBoundary }), a = y(t.placement); var f = t.placement.split("-")[1],
                    c = !f,
                    p = M(a);
                a = "x" === p ? "y" : "x"; var l = t.modifiersData.popperOffsets,
                    d = t.rects.reference,
                    m = t.rects.popper,
                    h = "function" == typeof s ? s(Object.assign(Object.assign({}, t.rects), {}, { placement: t.placement })) : s; if (s = { x: 0, y: 0 }, l) { if (o) { var b = "y" === p ? "top" : "left",
                            v = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width";
                        o = l[p]; var x = l[p] + n[b],
                            w = l[p] - n[v],
                            j = i ? -m[O] / 2 : 0,
                            E = "start" === f ? d[O] : m[O];
                        f = "start" === f ? -m[O] : -d[O], m = t.elements.arrow, m = i && m ? u(m) : { width: 0, height: 0 }; var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 };
                        b = D[b], v = D[v], m = Math.max(0, Math.min(d[O], m[O])), E = c ? d[O] / 2 - j - m - b - h : E - m - b - h, c = c ? -d[O] / 2 + j + m + v + h : f + m + v + h, h = t.elements.arrow && g(t.elements.arrow), d = t.modifiersData.offset ? t.modifiersData.offset[t.placement][p] : 0, h = l[p] + E - d - (h ? "y" === p ? h.clientTop || 0 : h.clientLeft || 0 : 0), c = l[p] + c - d, i = Math.max(i ? Math.min(x, h) : x, Math.min(o, i ? Math.max(w, c) : w)), l[p] = i, s[p] = i - o }
                    r && (r = l[a], i = Math.max(r + n["x" === p ? "top" : "left"], Math.min(r, r - n["x" === p ? "bottom" : "right"])), l[a] = i, s[a] = i - r), t.modifiersData[e] = s } }, requiresIfExists: ["offset"] }, { name: "arrow", enabled: !0, phase: "main", fn: function(e) { var t, n = e.state;
                e = e.name; var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = M(i); if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) { var s = n.modifiersData[e + "#persistent"].padding,
                        f = u(r),
                        c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
                    o = o[a] - n.rects.reference[a], l = (r = (r = g(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (l / 2 - o / 2), i = Math.max(s[c], Math.min(l, r - f[i] - s[p])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - l, t) } }, effect: function(e) { var t = e.state,
                    n = e.options;
                e = e.name; var r = n.element; if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) { if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
                    O(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = { padding: D("number" != typeof n ? n : P(n, q)) }) } }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] }, { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function(e) { var t = e.state;
                e = e.name; var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = k(t, { elementContext: "reference" }),
                    a = k(t, { altBoundary: !0 });
                n = T(i, n), r = T(a, r, o), o = R(n), a = R(r), t.modifiersData[e] = { referenceClippingOffsets: n, popperEscapeOffsets: r, isReferenceHidden: o, hasPopperEscaped: a }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, { "data-popper-reference-hidden": o, "data-popper-escaped": a }) } }],
        X = B({ defaultModifiers: F });
    e.createPopper = X, e.defaultModifiers = F, e.detectOverflow = k, e.popperGenerator = B, Object.defineProperty(e, "__esModule", { value: !0 }) }));
//# sourceMappingURL=popper.min.js.map


//poper min js end

// Owl Carousel Start

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
    animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);

    // Owl Carousel End

    //Language.js start

    document.addEventListener('DOMContentLoaded', () => {
        const languageButton = document.getElementById('language');
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        const elements = [
            'Sign-In', 'Sign-up', 'Become-a-Partner', 'GovernmentOfIndia', 'Home',
            'AboutUs', 'Statistics', 'FAQ', 'Resources', 'Circulars',
            'Careers', 'Sitemap', 'Partners', 'ContactUs', 'PrivacyPolicy',
            'TermsOfService', 'Disclaimer', 'Tenders', 'DigiLockerPolicy',
            'MerePehchaan', 'DigiLockerServices', 'Feedback', 'NeedHelp', 'Contact',
            'NewInDigiLocker', 'FeaturedImagesCarousel', 'Next', 'Previous',
            'ClassXIIMarksheet', 'ClassXMarksheet', 'DrivingLicence', 'RegistrationOfVehicles',
            'ExploreDocumentsBy', 'Categories', 'State', 'IdentityDocuments',
            'EducationandLearning', 'HealthandWellness', 'TransportInfrastructure',
            'GovernmentPublicSector', 'SkillVocationalTraining', 'IndustryPrivateSector',
            'SportsCulture', 'ExploreMoreCategories', 'ViewAll', 'Rajasthan', 'Odisha',
            'Maharashtra', 'Kerala', 'Karnataka', 'Gujarat', 'Delhi', 'Bihar', 'Assam',
            'ABOUTDIGILOCKER', 'DocumentWalletto', 'EmpowerCitizens', 'EmpowerCitizensdiscription',
            'MoreaboutDigiLocker', 'ViewStatistics', 'RegisteredUsers', 'IssuedDocuments',
            'GettingStartedIsQuickAndEasy', 'RegisterYourself', 'VerifyYourself', 'FetchyourDocuments',
            'BecomeADigiLockerPartnerOrganization', 'getRegisterIssuer', 'GETREGISTERED',
            'DownloadDigiLockerApp', 'FOLLOWUS', 'DigiLockerAims', 'InsightsfromOurExperts', 'DOWNLOADAPP', 'Home1',
            'BecomeAPartner', 'SignUp', 'ExploreDocumentsBy1', 'ViewAll1', 'AboutUs1', 'Careers1', 'Sitemap1', 'Circulars1',
            'Resources1', 'Statistics1', 'FAQ1', 'DigiLockerService1', 'MeriPehchaan1', 'Partners1', 'Tender1', 'Credits1',
            'Feedback1', 'NeedHelp1', 'TermsOfService1', 'DigiLockerPolicy1', 'Copyright1', 'Explore', 'certifications', 'National',
            'lastUpdate', 'ministry', 'government', 'powered', 'dic', 'Visits', 'since', 'ration', 'xii', 'x', 'dl', 'vehicles', 'caste', 'SkipToMain'
        ];

        const languageMessages = {
            en: {
                msg: "By selecting English, the website's language will switch to English. Are you sure you want to continue?",
                confirmMsg:"We are continuously improving the language experiences on DigiLocker, if you have feedback on these translations, please Click <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>here</a> to raise a query. Translations are provided for convenience only and the English version of DigiLocker is the definitive version."
            },
            hi: {
                msg: "हिंदी (Hindi) चुनने पर, वेबसाइट की भाषा हिंदी (Hindi) में बदल जाएगी। क्या आप निश्चित हैं कि आप जारी रखना चाहते हैं?",
                confirmMsg:"हम डिजिलॉकर पर भाषा के अनुभवों में लगातार सुधार कर रहे हैं, यदि आपके पास इन अनुवादों को लेकर कोई सुझाव है, तो कृपया <a style='color:#fff;' href='https://support.digitallocker.gov.in/open' target='_blank'>यहां </a> सूचित करें। अनुवाद केवल सुविधा के लिए है,  डिजिलॉकर का अंग्रेजी संस्करण ही मौलिक संस्करण है।"
            },
            as: {
                msg: "অসমীয়া (Assamese)বাছনি কৰি ৱেবছাইটৰ ভাষা অসমীয়া (Assamese) লৈ সলনি হ 'ব। আপুনি নিশ্চিত যে আপুনি আগবাঢ়িব বিচাৰে?",
                confirmMsg:"আমি ডিজিলকাৰত ভাষাৰ অভিজ্ঞতাবোৰ নিৰন্তৰ উন্নত কৰি আছোঁ, যদি আপোনাৰ এই অনুবাদবোৰৰ ওপৰত মতামত আছে, অনুগ্ৰহ কৰি এটা প্ৰশ্ন উত্থাপন কৰক <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>ইয়াত</a>। অনুবাদবোৰ কেৱল সুবিধাৰ বাবে প্ৰদান কৰা হয় আৰু ডিজিলকাৰৰ ইংৰাজী সংস্কৰণটো হৈছে নিৰ্দিষ্ট সংস্কৰণ।"
            },
            bn: {
                msg: "বাঙ্গালী (Bengali) নির্বাচন করে, ওয়েবসাইটের ভাষা বাঙ্গালী (Bengali)-এ পরিবর্তিত হবে। আপনি কি নিশ্চিত যে আপনি চালিয়ে যেতে চান?",
                confirmMsg:"আমরা প্রতিনিয়ত ডিজিলকারে ভাষার অভিজ্ঞতা উন্নত করছি, যদি এই অনুবাদগুলির জন্য আপনার কোন পরামর্শ থাকে, অনুগ্রহ করে <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>এখানে</a> অবহিত করুন। অনুবাদ শুধুমাত্র সুবিধার জন্য, ডিজিলকারের ইংরেজি সংস্করণটি আসল সংস্করণ।"
            },
            gu: {
                msg: "ગુજરાતી (Gujarati) પસંદ કરીને, વેબસાઇટની ભાષા ગુજરાતી (Gujarati) પર જશે. શું તમે ચાલુ રાખવા માંગો છો?",
                confirmMsg:"અમે ડિજીલોકર પર ભાષાના અનુભવમાં સતત સુધારો કરી રહ્યા છીએ, જો તમારી પાસે આ અનુવાદો માટે કોઈ સૂચનો હોય, તો કૃપા કરીને <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>અહીં </a> સૂચિત કરો અનુવાદ માત્ર સુવિધા માટે છે, ડિજીલોકરનું અંગ્રેજી સંસ્કરણ મૂળ સંસ્કરણ છે."
            },
            ml: {
                msg: "മലയാളം (Malayalam) തിരഞ്ഞെടുക്കുന്നതിലൂടെ, വെബ്സൈറ്റിന്റെ ഭാഷ മലയാളം (Malayalam) ലേക്ക് മാറും. തുടരാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?",
                confirmMsg:"ഡിജിലോക്കറിലെ ഭാഷാനുഭവം ഞങ്ങൾ നിരന്തരം മെച്ചപ്പെടുത്തിക്കൊണ്ടിരിക്കുകയാണ്, ഈ വിവർത്തനങ്ങൾക്കായി നിങ്ങൾക്ക് എന്തെങ്കിലും നിർദ്ദേശങ്ങളുണ്ടെങ്കിൽ, ദയവായി <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>ഇവിടെ അറിയിക്കുക</a> വിവർത്തനം സൗകര്യാർത്ഥം മാത്രമാണ്, ഡിജിലോക്കറിന്റെ ഇംഗ്ലീഷ് പതിപ്പ് യഥാർത്ഥ പതിപ്പാണ്.", "Know More": "കൂടുതൽ അറിയാം", "Change": "മാറ്റം വറുത്തുക", "Select one": "ഒന്ന് തെരഞ്ഞെടുക്കുക"
            },
            mr: {
                msg: "मराठी (Marathi) निवडून, संकेतस्थळाची भाषा मराठी (Marathi) वर जाईल. तुम्हाला नक्की पुढे जायचे आहे का?",
                confirmMsg:"आम्ही डिजिलॉकरवर भाषेचा अनुभव सतत सुधारत आहोत, तुमच्याकडे या भाषांतरांसाठी काही सूचना असल्यास, कृपया <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>येथे </a>सूचित करा. भाषांतर केवळ सोयीसाठी आहे, डिजिलॉकरची इंग्रजी आवृत्ती मूळ आवृत्ती आहे."
            },
            or: {
                msg: "ଓଡ଼ିଆ (Odia) हिंदी (Hindi) ଚଯ଼ନ କରି, ୱେବସାଇଟର ଭାଷା ଓଡ଼ିଆ (Odia) କୁ ବଦଳିବ। ଆପଣ ନିଶ୍ଚିତ କି ଆପଣ ଆଗକୁ ବଢ଼ିବାକୁ ଚାହୁଁଛନ୍ତି?",
                confirmMsg:"ଆମେ ଡିଜିଲୋକରରେ ଭାଷା ଅଭିଜ୍ଞତାକୁ କ୍ରମାଗତ ଭାବରେ ଉନ୍ନତ କରୁଛୁ, ଯଦି ଏହି ଅନୁବାଦଗୁଡ଼ିକ ପାଇଁ ଆପଣଙ୍କର କିଛି ପରାମର୍ଶ ଅଛି, ଦୟାକରି <a style = 'color: #fff;' href = 'https: //support.digitallocker.gov.in/open' target = '_ blank'> ଏଠାରେ ସୂଚିତ କରନ୍ତୁ </a>। ଅନୁବାଦ କେବଳ ସୁବିଧା ପାଇଁ, ଡିଜିଲୋକରର ଇଂରାଜୀ ସଂସ୍କରଣ ହେଉଛି ମୂଳ ସଂସ୍କରଣ |"
            },
            pa: {
                msg: "ਪੰਜਾਬੀ (Punjabi) ਦੀ ਚੋਣ ਕਰਕੇ, ਵੈੱਬਸਾਈਟ ਦੀ ਭਾਸ਼ਾ ਪੰਜਾਬੀ (Punjabi) ਵਿੱਚ ਬਦਲ ਜਾਵੇਗੀ। ਕੀ ਤੁਸੀਂ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
                confirmMsg:"ਅਸੀਂ ਡਿਜੀਲੌਕਰ 'ਤੇ ਭਾਸ਼ਾ ਦੇ ਅਨੁਭਵ ਨੂੰ ਲਗਾਤਾਰ ਸੁਧਾਰ ਰਹੇ ਹਾਂ, ਜੇਕਰ ਤੁਹਾਡੇ ਕੋਲ ਇਹਨਾਂ ਅਨੁਵਾਦਾਂ ਲਈ ਕੋਈ ਸੁਝਾਅ ਹਨ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>ਇੱਥੇ </a> ਸੂਚਿਤ ਕਰੋ। ਅਨੁਵਾਦ ਸਿਰਫ਼ ਸਹੂਲਤ ਲਈ ਹੈ, ਡਿਜੀਲੌਕਰ ਦਾ ਅੰਗਰੇਜ਼ੀ ਸੰਸਕਰਣ ਅਸਲੀ ਸੰਸਕਰਣ ਹੈ।"
            },
            ta: {
                msg: "தமிழ் (Tamil) ஐத் தேர்ந்தெடுக்கும் மூலம், வலைத்தளத்தின் மொழி தமிழ் (Tamil) க்கு மாறும். நீங்கள் தொடர விரும்புகிறீர்களா?",
                confirmMsg:"Digilocker இல் மொழி அனுபவத்தை நாங்கள் தொடர்ந்து மேம்படுத்தி வருகிறோம், இந்த மொழிபெயர்ப்புகளுக்கு ஏதேனும் பரிந்துரைகள் இருந்தால், தயவுசெய்து <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>இங்கே</a> தெரிவிக்கவும். மொழிபெயர்ப்பு வசதிக்காக மட்டுமே, டிஜிலாக்கரின் ஆங்கிலப் பதிப்பு அசல் பதிப்பு."
            },
            te: {
                msg: "తెలుగు (Telugu) ను ఎంచుకోవడం ద్వారా, వెబ్సైట్ భాష తెలుగు (Telugu) కు మారుతుంది. మీరు ఖచ్చితంగా కొనసాగించాలనుకుంటున్నారా?",
                confirmMsg:"మేము డిజిలాకర్‌లో భాషా అనుభవాన్ని నిరంతరం మెరుగుపరుస్తున్నాము, ఈ అనువాదాల కోసం మీకు ఏవైనా సూచనలు ఉంటే, దయచేసి <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>ఇక్కడ</a> తెలియజేయండి. అనువాదం సౌలభ్యం కోసం మాత్రమే, డిజిలాకర్ యొక్క ఆంగ్ల వెర్షన్ అసలు వెర్షన్."
            },
            kn: {
                msg: "ಕನ್ನಡ (Kannada) ಅನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಮೂಲಕ, ಜಾಲತಾಣದ ಭಾಷೆಯು ಕನ್ನಡ (Kannada) ಗೆ ಬದಲಾಗುತ್ತದೆ. ನೀವು ಖಚಿತವಾಗಿ ಅದನ್ನು ಮುಂದುವರಿಸಲು ಬಯಸುವಿರಾ?",
                confirmMsg:"ನಾವು ಡಿಜಿಲಾಕರ್‌ನಲ್ಲಿ ಭಾಷಾ ಅನುಭವವನ್ನು ನಿರಂತರವಾಗಿ ಸುಧಾರಿಸುತ್ತಿದ್ದೇವೆ, ಈ ಅನುವಾದಗಳಿಗೆ ನೀವು ಯಾವುದೇ ಸಲಹೆಗಳನ್ನು ಹೊಂದಿದ್ದರೆ, ದಯವಿಟ್ಟು <a style='color:#fff;' href='https://support.digilocker.gov.in/open' target='_blank'>ಇಲ್ಲಿ ಸೂಚಿಸಿ</a> ಅನುವಾದವು ಅನುಕೂಲಕ್ಕಾಗಿ ಮಾತ್ರ, ಡಿಜಿಲಾಕರ್‌ನ ಇಂಗ್ಲಿಷ್ ಆವೃತ್ತಿಯು ಮೂಲ ಆವೃತ್ತಿಯಾಗಿದೆ."
            }
        };

        function updateContent(translations) {
            elements.forEach((id) => {
                const element = document.getElementById(id);
                if (element && translations[id]) {
                    element.textContent = translations[id];
                }
            });
        }

        async function fetchLanguageFile(lang) {
            try {
                const response = await fetch(`./json/hi.json`);

                if (!response.ok) {
                    throw new Error(`Failed to load language file: hi`);
                }

                const translations = await response.json();
                updateContent(translations);
                setLanguageWithDomain(lang);

                // Update button text with selected language
                const selectedItem = document.querySelector(`.dropdown-item[data-value="hi"]`);
                if (selectedItem && languageButton) {
                    languageButton.textContent = selectedItem.textContent;
                }

                // Update selected state
                dropdownItems.forEach(item => {
                    item.classList.toggle('selected', item.getAttribute('data-value') === lang);
                });
                // Show the alert/modal with the selected language message after the change


            } catch (error) {
                console.error(error);
                updateContent({
                    'Sign-In': 'Sign In'
                });
            }
        }

        function showModalAfterChnaged( lang,autoCloseTime = 50000) {
            const selectedLang = languageMessages[lang] || languageMessages['en'];
            const alertModal = document.getElementById('confirmAlert');
            const alertMessage = document.getElementById('confirmMessage');
            const alertOK = document.getElementById('confirm');

            // Set the message content and show the alert modal
            alertMessage.innerHTML = selectedLang.confirmMsg;
            alertModal.style.display = 'flex';

            // Auto-close the modal after the specified time (default is 5000ms = 5 seconds)
            const timeoutId = setTimeout(() => {
                alertModal.style.display = 'none'; // Hide the alert after the time is up
            }, autoCloseTime);

            // Close the modal manually when the user clicks "OK"
            alertOK.onclick = () => {
                clearTimeout(timeoutId); // Clear the timeout
                alertModal.style.display = 'none'; // Hide the alert
            };
        }

        function setLanguageWithDomain(lang) {
            try {
                let hostname = 'file:///D:/UX4G/digilocker.html'; // Get the current hostname
                let parentDomain = getParentDomain(hostname); // Get the parent domain (e.g., .dl6.in, .gov.in)
                let cookieValue = encodeURIComponent(lang); // Encoding the language value

                // Set the cookie with the dynamic domain
                document.cookie = `language=%22${cookieValue}%22; domain=${parentDomain}; path=/; max-age=31536000; secure=false; SameSite=strict; Secure`;
            } catch (error) {
                console.error('Error setting language cookie:', error);
            }
        }

        // Function to extract the parent domain (to use for setting cookies)
        function getParentDomain(hostname) {
            const parts = hostname.split('.');
            const len = parts.length;

            if (len >= 3) {
                // For domains like 'digilocker.gov.in', 'example.com', etc.
                return `.${parts.slice(-3).join('.')}`;
            }
            return hostname; // Return hostname if not valid
        }


        function getLanguageFromCookie() {
            const cookies = document.cookie.split(';');
            const languageCookie = cookies
                .map(cookie => cookie.trim())
                .find(cookie => cookie.startsWith('language='));

            if (languageCookie) {
                // Get everything after 'language=' and decode it
                const value = decodeURIComponent(languageCookie.split('=')[1]);
                // Remove any surrounding quotes and return the clean value
                return value.replace(/^["']|["']$/g, '');
            }
            return 'en';
        }


        function showAlert(lang, callback) {
            const selectedLang = languageMessages[lang] || languageMessages['en'];
            const alertModal = document.getElementById('customAlert');
            const alertMessage = document.getElementById('alertMessage');
            const alertOK = document.getElementById('alertOK');
            const alertCancel = document.getElementById('alertCancel');

            // Set message and show alert
            alertMessage.textContent = selectedLang.msg;
            alertModal.style.display = 'flex';

            // OK button
            alertOK.onclick = () => {
                alertModal.style.display = 'none'; // Hide the alert
                callback(); // Proceed with language change
            };

            // Cancel button
            alertCancel.onclick = () => {
                alertModal.style.display = 'none'; // Hide the alert
            };
        }


        // Initialize with saved language
        const savedLanguage = getLanguageFromCookie();
        fetchLanguageFile(savedLanguage);

        // Add click event listeners to dropdown items
        dropdownItems.forEach(item => {
            item.addEventListener('click', (event) => {
                const selectedLanguage = event.target.getAttribute('data-value');

                showAlert(selectedLanguage, () => {
                    fetchLanguageFile(selectedLanguage);
                    showModalAfterChnaged(selectedLanguage, 5000); // Pass a customizable time (e.g., 5000 ms = 5 seconds)

                });
            });
        });
    });


    //language.js end

    // visitor count.js start

    // visitors_count: "https://beta-nha-api.dl6.in/web",

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://dl-abha-api.digilocker.gov.in/web';
    const visitorCountElement = document.getElementById('visitor_count');

    // Function to fetch and display data
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            // Check if the response structure is as expected
            if (data && data.status && data.statusCode === 200) {
                const formattedResponse = Number(data.response).toLocaleString('en-IN'); // Format as Indian numbering system
                visitorCountElement.innerHTML = `Visits: ${formattedResponse}`;
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            visitorCountElement.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    // Call the fetch function
    fetchData();
});

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://dashboard.digitallocker.gov.in/users_data.json';
  const registeredUser = document.getElementById('RegisteredUsersCount');

  // Function to fetch and display data
  async function fetchRegisteredData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // Check if the response structure is as expected
      if (data.status) {
          // Use nFormatter to format the number
          registeredUser.innerHTML = nFormatter(data.total_users);
      }
  }
  // Call the fetch function
  fetchRegisteredData();
});

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://cf-media.api-setu.in/statsfiles/statistic_reports.json';
  const getAllStatistic = document.getElementById('getAllStatisticIssuedDocuments');

  // Function to fetch and display data
  async function getAllStatisticData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // Check if the response structure is as expected
      if (data[0]!=undefined) {
          // Use nFormatter to format the number
          getAllStatistic.innerHTML = nFormatter(data[0]['issue_document']);
      }
  }
  // Call the fetch function
  getAllStatisticData();
});


function nFormatter(num) {
    // if (num >= 1000000000000) {
    //     return (Math.floor(num / 1000000000000 * 100) / 100).toFixed(2).replace(/\.0+$/, '') + " Trillion";
    // }
    // if (num >= 1000000000) {
    //     return (Math.floor(num / 1000000000 * 100) / 100).toFixed(2).replace(/\.0+$/, '') + " Billion";
    // }
    if (num >= 10000000) {
        return (Math.floor(num / 10000000 * 100) / 100).toFixed(2).replace(/\.0+$/, '') + " Crore";
    }
    if (num >= 100000) {
        return (Math.floor(num / 100000 * 100) / 100).toFixed(2).replace(/\.0+$/, '') + " Lakh";
    }
    if (num >= 1000) {
        return (Math.floor(num / 1000 * 100) / 100).toFixed(2).replace(/\.0+$/, '') + " Thousand";
    }
    if (num < 1000 && num >= 0) {
        return num.toString();
    }
    if (isNaN(num)) {
        return "Not Available";
    } else {
        return num;
    }
}


//visitor count.js end
