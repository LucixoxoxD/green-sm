// ============ Toast ============
const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(msg, isError = false) {
  if (!toastEl) return;
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.toggle("error", isError);
  toastEl.classList.add("show");
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3500);
}

// ============ Mobile nav toggle ============
const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");
const navClose = document.querySelector(".nav-close");
const navBackdrop = document.querySelector(".nav-backdrop");

function setNav(open) {
  if (!navMobile) return;
  navMobile.classList.toggle("open", open);
  if (navBackdrop) navBackdrop.classList.toggle("show", open);
  if (navToggle) navToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
}

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () =>
    setNav(!navMobile.classList.contains("open"))
  );
  navClose?.addEventListener("click", () => setNav(false));
  navBackdrop?.addEventListener("click", () => setNav(false));
  navMobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setNav(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });
}

// ============ Flash Contact Details (navbar "Contact" link only) ============
const contactBox = document.getElementById("contact-details");
function flashContact() {
  if (!contactBox) return;
  contactBox.classList.remove("flash");
  void contactBox.offsetWidth; // restart the animation if already running
  contactBox.classList.add("flash");
  setTimeout(() => contactBox.classList.remove("flash"), 2600);
}
document
  .querySelectorAll('.nav-links a[href="#kontak"], .nav-mobile a[href="#kontak"]')
  .forEach((a) =>
    a.addEventListener("click", () => {
      // wait for the smooth-scroll to reach the footer, then highlight
      setTimeout(flashContact, 650);
    })
  );

// ============ Form handling ============
document.querySelectorAll(".reg-form").forEach((form) => {
  // mobile: digits only, max 10
  const mob = form.querySelector('[name="mobile"]');
  if (mob) {
    mob.addEventListener("input", () => {
      mob.value = mob.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll("input, select");
    let firstInvalid = null;
    fields.forEach((f) => {
      f.classList.remove("invalid");
      const empty = f.type === "checkbox" ? !f.checked : !f.value.trim();
      if (f.hasAttribute("required") && empty) {
        f.classList.add("invalid");
        if (!firstInvalid) firstInvalid = f;
      }
    });

    const mobile = form.querySelector('[name="mobile"]');
    if (mobile && /^\d{0,9}$/.test(mobile.value.trim()) && mobile.value.trim() !== "") {
      mobile.classList.add("invalid");
      if (!firstInvalid) firstInvalid = mobile;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      showToast("Kripya saari zaroori jankari sahi se bharein.", true);
      return;
    }

    const nama = (form.querySelector('[name="nama"]')?.value || "").trim();
    form.reset();
    showToast(`Dhanyavaad${nama ? ", " + nama : ""}! Aapka registration mil gaya hai.`);
  });
});
