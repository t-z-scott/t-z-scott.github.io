/* originally tested in my codepen: https://codepen.io/typestooloud/details/myeqmoY */

/* Toggle mobile menu */
function toggleMobileMenu() {
  var navbar = document.getElementById("myNavbar");
  if (navbar) {
    navbar.classList.toggle("responsive");
  }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropdown() {
  document.getElementById("posts-dropdown").classList.toggle("show");
}
function showOtherDropdown() {
  document.getElementById("other-dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("posts-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  
  if (!event.target.matches('.dropbtn-two')) {
    var dropdowns = document.getElementsByClassName("other-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}