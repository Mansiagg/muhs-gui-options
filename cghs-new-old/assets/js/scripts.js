document.addEventListener("DOMContentLoaded", function() {
	// Select all dropdown elements
	let dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach(dropdown => {
		dropdown.addEventListener('mouseenter', function() {
			if (window.innerWidth >= 992) { // Only apply on large screens
				let dropdownMenu = this.querySelector('.dropdown-menu');
				if (dropdownMenu) {
					dropdownMenu.classList.add('show');
				}
			}
		});

		dropdown.addEventListener('mouseleave', function() {
			if (window.innerWidth >= 992) {
				let dropdownMenu = this.querySelector('.dropdown-menu');
				if (dropdownMenu) {
					dropdownMenu.classList.remove('show');
				}
			}
		});

		// Ensure click behavior works on mobile
		dropdown.addEventListener('click', function(event) {
			if (window.innerWidth < 992) {
				let dropdownMenu = this.querySelector('.dropdown-menu');
				if (dropdownMenu) {
					event.stopPropagation(); // Prevent event bubbling
					dropdownMenu.classList.toggle('show');
				}
			}
		});
	});

	// Close dropdowns when clicking outside on mobile
	document.addEventListener('click', function(event) {
		if (window.innerWidth < 992) {
			document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
				menu.classList.remove('show');
			});
		}
	});
});