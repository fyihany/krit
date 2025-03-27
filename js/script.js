const contactForm = document.querySelector("#contact__form");
const phoneInput = document.querySelector("#phone");
const mailInput = document.querySelector("#mail");

const API_URL =
  "https://script.google.com/macros/s/AKfycbzLV1W4cZzfsOw2Rt5UXZ5O5gJljlrOvbDl8yhz1nsyuFCjyBq6T3KF4Y7T5UOCKck5/exec";

// Funkce pro vytvoření modálního okna
function createModal(message) {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalMessage = document.createElement("p");
  modalMessage.classList.add("modal-message");
  modalMessage.innerHTML = message;
  modalContent.appendChild(modalMessage);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Zavřít";
  closeButton.classList.add("btn", "modal-close-button");
  closeButton.style.display = "none";
  closeButton.addEventListener("click", () => {
    modal.remove();
  });

  // Zavření modalu kliknutím mimo obsah
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  return modal;
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (phoneInput.validity.valid && mailInput.validity.valid) {
      const formData = {
        phone: phoneInput.value,
        email: mailInput.value
      };

      const modal = createModal("Odesílám váš kontakt...");
      modal.style.display = "flex";

      fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(() => {
          modal.querySelector(".modal-message").textContent =
            "Váš kontakt byl odeslán.";
          modal.querySelector(".modal-close-button").style.display =
            "inline-block";
          phoneInput.value = "";
          mailInput.value = "";
        })
        .catch((error) => {
          modal.querySelector(
            ".modal-message"
          ).innerHTML = `Při odesílání kontaktu došlo k chybě, kontaktujte nás, prosím, přímo:<br /><br />
             Tel: <a href="tel:+420602612216" class="link">+420 602 612 216</a><br /><br />
             E-mail: <a href="mailto:jan.macecek@krit.cz" class="link">jan.macecek@krit.cz</a>.`;
          modal.querySelector(".modal-close-button").style.display =
            "inline-block";
          console.error("Chyba při odesílání:", error);
        });
    }
  });
}
