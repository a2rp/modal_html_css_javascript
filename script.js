const page = document.querySelector(".container");
const modal = document.querySelector(".formContainer");
const openButton = document.querySelector(".modalOpenButton");
const closeButtons = document.querySelectorAll(".closeButton");
const form = document.querySelector("#subscriptionForm");
const message = document.querySelector(".formMessage");
const year = document.querySelector("#currentYear");
const goTopButton = document.querySelector(".goTopButton");
const backgroundElements = [
    document.querySelector(".siteHeader"),
    page,
    document.querySelector(".siteFooter"),
].filter(Boolean);
const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lastFocusedElement = null;

const setModalState = (isOpen) => {
    modal.classList.toggle("isOpen", isOpen);
    modal.setAttribute("aria-hidden", String(!isOpen));
    openButton.setAttribute("aria-expanded", String(isOpen));
    page.classList.toggle("isBlurred", isOpen);
    document.body.classList.toggle("modalOpen", isOpen);
    backgroundElements.forEach((element) => {
        element.inert = isOpen;
    });

    if (isOpen) {
        lastFocusedElement = document.activeElement;
        message.textContent = "";
        requestAnimationFrame(() => modal.querySelector("input")?.focus());
        return;
    }

    form.reset();
    message.textContent = "";
    if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
};

openButton.addEventListener("click", () => setModalState(true));
closeButtons.forEach((button) =>
    button.addEventListener("click", () => setModalState(false)),
);

modal.addEventListener("click", (event) => {
    if (event.target === modal) setModalState(false);
});

document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("isOpen")) return;

    if (event.key === "Escape") {
        event.preventDefault();
        setModalState(false);
        return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
        modal.querySelectorAll(focusableSelector),
    ).filter((element) => !element.hidden);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
        event.preventDefault();
        modal.focus();
        return;
    }

    if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
    } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent =
        "Demo only: no subscription was created and no data was sent.";
    form.reset();
});

year.textContent = new Date().getFullYear();

const updateGoTopButton = () => {
    goTopButton.hidden = window.scrollY <= 420;
};

goTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateGoTopButton, { passive: true });
updateGoTopButton();
