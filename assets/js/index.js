const rootElement = document.querySelector(":root");
const themeBtn = document.querySelector(".js-theme");
const themeText = document.querySelector(".js-theme-text");
let rs = getComputedStyle(rootElement);

themeBtn.addEventListener("click", function () {
  if (themeText.textContent.toLowerCase() === "dark") {
    rootElement.style.setProperty(
      "--color2",
      rs.getPropertyValue("--color-dark1")
    );
    rootElement.style.setProperty(
      "--color3",
      rs.getPropertyValue("--color-dark1")
    );
    rootElement.style.setProperty(
      "--color4",
      rs.getPropertyValue("--color-dark1")
    );
    rootElement.style.setProperty(
      "--color5",
      rs.getPropertyValue("--color-dark2")
    );
    rootElement.style.setProperty(
      "--color6",
      rs.getPropertyValue("--color-dark3")
    );
    rootElement.style.setProperty(
      "--color7",
      rs.getPropertyValue("--color-dark1")
    );

    themeText.textContent = "light";
  } else {
    rootElement.style.setProperty("--color2", "#697c9a");
    rootElement.style.setProperty("--color3", "#4b6a9b");
    rootElement.style.setProperty("--color4", "#2b3442");
    rootElement.style.setProperty("--color5", "#f6f8ff");
    rootElement.style.setProperty("--color6", "#fefefe");
    rootElement.style.setProperty("--color7", "#222731");
    themeText.textContent = "dark";
  }
});
