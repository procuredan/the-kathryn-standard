// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Newsletter form handler
const form = document.getElementById("newsletter-form");
const messageEl = document.getElementById("newsletter-message");

if (form && messageEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageEl.textContent = "";
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!email) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        messageEl.textContent =
          data.error || "Something went wrong. Please try again.";
        messageEl.style.color = "#b04141";
      } else {
        messageEl.textContent =
          "You’re in. Welcome to The Kathryn Standard.";
        messageEl.style.color = "#2f7a3e";
        form.reset();
      }
    } catch (err) {
      console.error(err);
      messageEl.textContent = "Network error. Please try again.";
      messageEl.style.color = "#b04141";
    }
  });
}
