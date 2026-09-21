window.onload = () => {
    document.querySelector(".modalOpenButton").addEventListener("click", (event) => {
        document.querySelector(".container").style.cssText = `
            filter: blur(8px);
            -webkit-filter: blur(8px);
        `;
        document.querySelector(".formContainer").style.cssText = `
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
        `;
    });

    document.querySelector(".closeButton").addEventListener("click", (event) => {
        document.querySelector(".container").style.cssText = `
            filter: blur(0);
            -webkit-filter: blur(0);
        `;
        document.querySelector(".formContainer").style.cssText = `
            visibility: hidden;
            opacity: 0;
            transform: translateY(-30px);
        `;
    });
};

