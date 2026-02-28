# SportSphere – Simple Sports Website for Git/GitHub Training

SportSphere is a very simple static web application designed for **hands-on Git and GitHub practice** with freshers.  
It uses plain **HTML**, **CSS**, and a bit of **JavaScript**, and is intentionally small so that learners can safely experiment with:

- Making and reviewing changes
- Creating branches
- Merging changes
- Handling basic merge conflicts
- Working with GitHub pull requests

---

## Project Structure
```
.
├── index.html       # Home page
├── teams.html       # Teams overview
├── schedule.html    # Match schedule
├── contact.html     # Feedback form
├── styles.css       # Site styling
├── script.js        # Simple interactive behaviours
└── README.md        # This file
```

### Pages

- **`index.html`**  
  Landing page with a short description, top stories, and a “Today’s Highlight” button.

- **`teams.html`**  
  List of teams (City Tigers, River Hawks, Mountain Bears, Coastal Sharks) with “Set as Favorite” buttons.

- **`schedule.html`**  
  Simple table of fixtures with a dropdown to filter matches by team.

- **`contact.html`**  
  Basic feedback form (name, email, favorite team, message). Submitting shows a “thank you” message (no real backend).

---

## Technologies Used

- **HTML5** – static pages
- **CSS3** – layout and styling
- **Vanilla JavaScript** – small interactive features:
  - Toggle today’s highlight
  - Store favorite team in `localStorage`
  - Filter schedule by team
  - Show a fake success message on contact form submit

No frameworks or build tools are used, so learners can focus on Git concepts.

---

## Getting Started (For Learners)

1. **Clone the repository**
```
git clone <repo-url>
cd <repo-folder>
```

2. **Open the site**

   Since this is a static site, you can simply open `index.html` in a browser:

   - Option 1: Double-click `index.html`
   - Option 2: Open the <repo-folder> in VS Code and use an extension like Live Preview
   - Option 3: Use a simple local server (recommended for demos), like the below. Then open http://localhost:8000 in your browser:

    ```
    # Example using Python 3
    python -m http.server 8000
    ```
    