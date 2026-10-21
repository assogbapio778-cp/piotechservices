
"use strict";

// 1. Menu de navigation mobile
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const menuOuvert = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(menuOuvert));

    menuToggle.setAttribute(
        "aria-label",
        menuOuvert ? "Fermer le menu" : "Ouvrir le menu"
    );

    menuToggle.textContent = menuOuvert ? "✕" : "☰";
});

// Fermer le menu après avoir choisi une rubrique
navLinks.querySelectorAll("a").forEach(function (lien) {
    lien.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.textContent = "☰";
    });
});

// 2. Afficher automatiquement l'année
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// 3. Gérer le formulaire de contact
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    // Empêche le rechargement automatique de la page
    event.preventDefault();

    // Vérifie les champs obligatoires
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    // Récupère les informations saisies
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!nom || !email || !service || !message) {
        formMessage.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    // Prépare un récapitulatif de la demande
    const recapitulatif = [
        "Bonjour PioTech Services,",
        "",
        "Nom : " + nom,
        "E-mail : " + email,
        "Service : " + service,
        "",
        "Message :",
        message
    ].join("\n");

    // Affiche le récapitulatif sur la page
    formMessage.textContent =
        "Votre demande a été préparée. " +
        "Aucun message n'a encore été envoyé.";

    // Crée un lien de téléchargement d'un fichier texte
    const fichier = new Blob(
        [recapitulatif],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(fichier);
    const lien = document.createElement("a");

    lien.href = url;
    lien.download = "demande-contact.txt";
    lien.textContent = "Télécharger ma demande";

    lien.style.display = "inline-block";
    lien.style.marginTop = "10px";
    lien.style.color = "#1261a0";
    lien.style.fontWeight = "bold";

    // Remplace le résultat précédent
    const ancienLien = formMessage.parentElement.querySelector(
        ".download-link"
    );

    if (ancienLien) {
        ancienLien.remove();
    }

    lien.className = "download-link";
    formMessage.insertAdjacentElement("afterend", lien);

    lien.addEventListener("click", function () {
        // Libère la ressource après le démarrage du téléchargement
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    });
});
