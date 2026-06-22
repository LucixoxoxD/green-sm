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
