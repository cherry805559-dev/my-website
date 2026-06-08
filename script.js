const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const backToTop = document.querySelector("#backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 360);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

document.querySelectorAll(".line-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!window.LINE_URL) {
      event.preventDefault();
      alert("尚未設定官方 LINE 連結，請聯絡店家。");
      return;
    }

    link.href = window.LINE_URL;
    link.target = "_blank";
    link.rel = "noopener";
  });
});
