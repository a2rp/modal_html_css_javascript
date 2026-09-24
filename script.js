const page = document.querySelector(".container");
const modal = document.querySelector(".formContainer");
const openButton = document.querySelector(".modalOpenButton");
const closeButtons = document.querySelectorAll(".closeButton");
const form = document.querySelector("#subscriptionForm");
const message = document.querySelector(".formMessage");
const year = document.querySelector("#currentYear");

const setModalState = (isOpen) => {
    modal.classList.toggle("isOpen", isOpen);
    modal.setAttribute("aria-hidden", String(!isOpen));
    page.classList.toggle("isBlurred", isOpen);
    document.body.classList.toggle("modalOpen", isOpen);
    if (isOpen) modal.querySelector("input")?.focus();
};

openButton.addEventListener("click", () => setModalState(true));
closeButtons.forEach((button) => button.addEventListener("click", () => setModalState(false)));
modal.addEventListener("mousedown", (event) => { if (event.target === modal) setModalState(false); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("isOpen")) setModalState(false); });
form.addEventListener("submit", (event) => { event.preventDefault(); message.textContent = "Thanks for subscribing."; form.reset(); });
year.textContent = new Date().getFullYear();