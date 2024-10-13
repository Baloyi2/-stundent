const translations = {
    en: {
        aboutTitle: "About This App",
        aboutText: "This app is designed to assist students in their mathematical journey by providing resources that enhance learning and understanding. Here’s what you can find:",
        helpfulExplanations: "Helpful Mathematical Explanations",
        helpfulExplanationsText: "Our app offers detailed explanations of mathematical concepts ranging from basic arithmetic to advanced calculus. Each topic is broken down into manageable sections to facilitate better understanding.",
        moreHelpfulText: "This section includes interactive examples and exercises to help reinforce your understanding.",
        pastQuestionPapers: "Past Question Papers",
        pastQuestionPapersText: "Students can access a collection of past question papers to help them prepare for their exams.",
        morePastText: "These resources allow users to practice and familiarize themselves with the types of questions they might encounter.",
        shortVideos: "Short Videos",
        shortVideosText: "We provide a selection of short videos that visually explain key mathematical concepts.",
        moreVideosText: "These videos are perfect for quick reviews or clarifying difficult topics.",
        closeButton: "Close"
    },
    es: {
        aboutTitle: "Acerca de esta aplicación",
        aboutText: "Esta aplicación está diseñada para ayudar a los estudiantes en su viaje matemático al proporcionar recursos que mejoran el aprendizaje y la comprensión. Esto es lo que puedes encontrar:",
        helpfulExplanations: "Explicaciones matemáticas útiles",
        helpfulExplanationsText: "Nuestra aplicación ofrece explicaciones detalladas de conceptos matemáticos que van desde la aritmética básica hasta el cálculo avanzado. Cada tema se descompone en secciones manejables para facilitar una mejor comprensión.",
        moreHelpfulText: "Esta sección incluye ejemplos interactivos y ejercicios para ayudar a reforzar tu comprensión.",
        pastQuestionPapers: "Exámenes anteriores",
        pastQuestionPapersText: "Los estudiantes pueden acceder a una colección de exámenes anteriores para ayudarles a prepararse para sus exámenes.",
        morePastText: "Estos recursos permiten a los usuarios practicar y familiarizarse con los tipos de preguntas que podrían encontrar.",
        shortVideos: "Videos cortos",
        shortVideosText: "Proporcionamos una selección de videos cortos que explican visualmente conceptos matemáticos clave.",
        moreVideosText: "Estos videos son perfectos para revisiones rápidas o para aclarar temas difíciles.",
        closeButton: "Cerrar"
    },
    fr: {
        aboutTitle: "À propos de cette application",
        aboutText: "Cette application est conçue pour aider les étudiants dans leur parcours mathématique en fournissant des ressources qui améliorent l'apprentissage et la compréhension. Voici ce que vous pouvez trouver:",
        helpfulExplanations: "Explications mathématiques utiles",
        helpfulExplanationsText: "Notre application offre des explications détaillées sur des concepts mathématiques allant de l'arithmétique de base au calcul avancé. Chaque sujet est décomposé en sections gérables pour faciliter une meilleure compréhension.",
        moreHelpfulText: "Cette section comprend des exemples interactifs et des exercices pour aider à renforcer votre compréhension.",
        pastQuestionPapers: "Examens précédents",
        pastQuestionPapersText: "Les étudiants peuvent accéder à une collection d'examens précédents pour les aider à se préparer à leurs examens.",
        morePastText: "Ces ressources permettent aux utilisateurs de pratiquer et de se familiariser avec les types de questions qu'ils pourraient rencontrer.",
        shortVideos: "Courtes vidéos",
        shortVideosText: "Nous proposons une sélection de courtes vidéos qui expliquent visuellement des concepts mathématiques clés.",
        moreVideosText: "Ces vidéos sont parfaits pour des révisions rapides ou pour clarifier des sujets difficiles.",
        closeButton: "Fermer"
    }
};

function showAbout() {
    document.getElementById("aboutOverlay").style.display = "flex"; // Show overlay
    updateAboutContent(); // Update content based on current language
}

function closeOverlay() {
    document.getElementById("aboutOverlay").style.display = "none"; // Hide overlay
}

function toggleDropdown() {
    const dropdown = document.getElementById("settingsDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function toggleThemeDropdown() {
    const themeDropdown = document.getElementById("themeDropdown");
    themeDropdown.style.display = themeDropdown.style.display === "block" ? "none" : "block";
}

function changeLanguage() {
    const langDropdown = document.getElementById("languageDropdown");
    langDropdown.style.display = langDropdown.style.display === "block" ? "none" : "block";
}

function updateLanguage() {
    const selectedLanguage = document.getElementById("languageSelect").value;
    
    // Update about overlay content
    document.querySelector("#aboutOverlay h2").textContent = translations[selectedLanguage].aboutTitle;
    document.querySelector("#aboutOverlay p").textContent = translations[selectedLanguage].aboutText;

    // Update content in the main container
    const headings = document.querySelectorAll('.container h3');
    const firstInfos = document.querySelectorAll('.container .first-info');
    const moreInfos = document.querySelectorAll('.container .more-info');

    headings[0].textContent = translations[selectedLanguage].helpfulExplanations;
    firstInfos[0].textContent = translations[selectedLanguage].helpfulExplanationsText;
    moreInfos[0].textContent = translations[selectedLanguage].moreHelpfulText;

    headings[1].textContent = translations[selectedLanguage].pastQuestionPapers;
    firstInfos[1].textContent = translations[selectedLanguage].pastQuestionPapersText;
    moreInfos[1].textContent = translations[selectedLanguage].morePastText;

    headings[2].textContent = translations[selectedLanguage].shortVideos;
    firstInfos[2].textContent = translations[selectedLanguage].shortVideosText;
    moreInfos[2].textContent = translations[selectedLanguage].moreVideosText;

    document.querySelector("#aboutOverlay button").textContent = translations[selectedLanguage].closeButton;
}

function selectColor() {
    const newColor = prompt("Enter a color for the background (e.g., 'lightblue', '#f0f0f0'):");
    if (newColor) {
        document.body.style.backgroundColor = newColor;
    }
}

function selectImage() {
    const imageUrl = prompt("Enter the URL of the image for the background:");
    if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = "cover"; // Cover the whole page
        document.body.style.backgroundRepeat = "no-repeat"; // Don't repeat the image
    }
}

// Function to handle the selection from the dropdown
function handleSelection() {
    const selectElement = document.getElementById("infoSelect");
    const selectedValue = selectElement.value;

    if (selectedValue === "highschool") {
        window.location.href = "grades.html"; // Navigate to the grades page
    }
}

// Event listeners for 'More' buttons
document.querySelectorAll('.more-button').forEach(button => {
    button.addEventListener('click', () => {
        const moreInfo = button.nextElementSibling; // Get the associated second paragraph
        if (moreInfo.style.display === "none") {
            moreInfo.style.display = "block"; // Show the second paragraph
            button.textContent = "Less"; // Change button text
        } else {
            moreInfo.style.display = "none"; // Hide the second paragraph
            button.textContent = "More"; // Reset button text
        }
    });
});

// Event listener for language selection
document.getElementById("languageSelect").addEventListener("change", updateLanguage);
