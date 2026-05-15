const shotsPanel = document.querySelector("[data-shots-panel]");
const openShotsButton = document.querySelector("[data-open-shots]");
const closeShotsButtons = document.querySelectorAll("[data-close-shots]");
const aboutPanel = document.querySelector("[data-about-panel]");
const openAboutButton = document.querySelector("[data-open-about]");
const closeAboutButtons = document.querySelectorAll("[data-close-about]");
const findPanel = document.querySelector("[data-find-panel]");
const openFindButton = document.querySelector("[data-open-find]");
const closeFindButtons = document.querySelectorAll("[data-close-find]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const closeLightboxButton = document.querySelector("[data-close-lightbox]");
const prevLightboxButton = document.querySelector("[data-lightbox-prev]");
const nextLightboxButton = document.querySelector("[data-lightbox-next]");
const shotImages = Array.from(document.querySelectorAll(".shots-item img"));

if (shotsPanel && openShotsButton) {
  let currentImageIndex = 0;

  const setShotsState = (isOpen) => {
    shotsPanel.classList.toggle("is-open", isOpen);
    shotsPanel.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen && lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  };

  const setAboutState = (isOpen) => {
    if (!aboutPanel) {
      return;
    }

    aboutPanel.classList.toggle("is-open", isOpen);
    aboutPanel.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const setFindState = (isOpen) => {
    if (!findPanel) {
      return;
    }

    findPanel.classList.toggle("is-open", isOpen);
    findPanel.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const renderLightboxImage = () => {
    const activeImage = shotImages[currentImageIndex];
    if (!activeImage || !lightboxImage) {
      return;
    }

    lightboxImage.src = activeImage.src;
    lightboxImage.alt = activeImage.alt;
  };

  const setLightboxState = (isOpen, index = currentImageIndex) => {
    if (!lightbox) {
      return;
    }

    currentImageIndex = index;

    if (isOpen) {
      renderLightboxImage();
    }

    lightbox.classList.toggle("is-open", isOpen);
    lightbox.setAttribute("aria-hidden", String(!isOpen));
  };

  const showNextImage = (direction) => {
    const total = shotImages.length;
    if (!total) {
      return;
    }

    currentImageIndex = (currentImageIndex + direction + total) % total;
    renderLightboxImage();
  };

  openShotsButton.addEventListener("click", () => {
    setAboutState(false);
    setFindState(false);
    setShotsState(true);
  });

  if (openAboutButton) {
    openAboutButton.addEventListener("click", () => {
      setShotsState(false);
      setFindState(false);
      setAboutState(true);
    });
  }

  if (openFindButton) {
    openFindButton.addEventListener("click", () => {
      setShotsState(false);
      setAboutState(false);
      setFindState(true);
    });
  }

  closeShotsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setShotsState(false);
    });
  });

  closeAboutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setAboutState(false);
    });
  });

  closeFindButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setFindState(false);
    });
  });

  shotImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      setLightboxState(true, index);
    });
  });

  if (closeLightboxButton) {
    closeLightboxButton.addEventListener("click", () => {
      setLightboxState(false);
    });
  }

  if (prevLightboxButton) {
    prevLightboxButton.addEventListener("click", () => {
      showNextImage(-1);
    });
  }

  if (nextLightboxButton) {
    nextLightboxButton.addEventListener("click", () => {
      showNextImage(1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        setLightboxState(false);
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (lightbox?.classList.contains("is-open")) {
        setLightboxState(false);
        return;
      }

      if (shotsPanel.classList.contains("is-open")) {
        setShotsState(false);
        return;
      }

      if (aboutPanel?.classList.contains("is-open")) {
        setAboutState(false);
        return;
      }

      if (findPanel?.classList.contains("is-open")) {
        setFindState(false);
      }
    }

    if (lightbox?.classList.contains("is-open")) {
      if (event.key === "ArrowLeft") {
        showNextImage(-1);
      }

      if (event.key === "ArrowRight") {
        showNextImage(1);
      }
    }
  });
}
