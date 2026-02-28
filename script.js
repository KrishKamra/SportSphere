// Simple JS for basic interactivity across pages

// Helper: get favorite team from localStorage
function getFavoriteTeam() {
    return localStorage.getItem("favoriteTeam");
}

// Helper: set favorite team in localStorage
function setFavoriteTeam(teamName) {
    localStorage.setItem("favoriteTeam", teamName);
}

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    setupHeroHighlight();
    setupFavoriteButtons();
    setupFavoriteTeamDisplay();
    setupScheduleFilter();
    setupContactForm();
});

/**
 * Home page: show a highlight when button is clicked
 */
function setupHeroHighlight() {
    const button = document.getElementById("hero-cta-btn");
    const highlight = document.getElementById("hero-highlight");

    if (!button || !highlight) return;

    button.addEventListener("click", function () {
        highlight.classList.toggle("hidden");
    });
}

/**
 * All pages: handle "Set as Favorite" / "Mark as Favorite" buttons
 */
function setupFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-btn");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const team = btn.getAttribute("data-team");
            if (!team) return;

            setFavoriteTeam(team);
            alert("Favorite team set to: " + team);
        });
    });
}

/**
 * Teams page: show currently selected favorite team in a paragraph
 */
function setupFavoriteTeamDisplay() {
    const button = document.getElementById("show-favorite-team-btn");
    const display = document.getElementById("favorite-team-display");

    if (!button || !display) return;

    button.addEventListener("click", function () {
        const favorite = getFavoriteTeam();
        if (favorite) {
            display.textContent = "Your current favorite team is: " + favorite;
            display.classList.remove("hidden");
        } else {
            display.textContent = "You have not selected a favorite team yet.";
            display.classList.remove("hidden");
        }
    });
}

/**
 * Schedule page: filter matches by team
 */
function setupScheduleFilter() {
    const select = document.getElementById("team-filter-select");
    const table = document.getElementById("schedule-table");

    if (!select || !table) return;

    select.addEventListener("change", function () {
        const value = select.value;
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row) => {
            const teams = row.getAttribute("data-teams") || "";
            if (value === "all" || teams.includes(value)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}

/**
 * Contact page: fake submit handler
 * Shows a success message instead of actually sending data anywhere
 */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const message = document.getElementById("contact-success-message");

    if (!form || !message) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name-input").value.trim();
        message.textContent = "Thank you for your feedback, " + (name || "fan") + "!";
        message.classList.remove("hidden");

        form.reset();
    });
}