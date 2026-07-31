let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

if (ninjaKeys) {
  if (searchTheme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
}

const openSearchModal = () => {
  if (!ninjaKeys) return;
  // collapse navbarNav if expanded on mobile
  const navbarNav = document.querySelector("#navbarNav");
  if (navbarNav && navbarNav.classList.contains("show")) {
    navbarNav.classList.remove("show");
    const toggler = document.querySelector('[data-nav-toggle="navbarNav"]');
    if (toggler) {
      toggler.classList.remove("collapsed");
      toggler.setAttribute("aria-expanded", "false");
    }
  }
  ninjaKeys.open();
};
