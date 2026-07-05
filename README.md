# My CashTracker Plus - Personal Finance Manager

Hey there! This is my personal finance manager project. I built it using pure HTML, CSS, and vanilla JavaScript to keep track of my income, expenses, and overall daily balance directly in the browser. 

---

## 🚀 Features I Implemented

- **Sequential Navigation Flow**: I configured the app flow so that when you first open it, it asks you to **Register**, then **Log In**, and finally redirects you to the **Dashboard**.
- **Simple Authentication**: I set up user registration and active login session tracking using browser `localStorage`.
- **My Dashboard**:
  - Automatically calculates my Current Balance, Total Income, and Total Expenses.
  - Interactive **Cash Flow Analysis** line chart (using Chart.js).
  - A clean transaction table where I can search and filter through my entries.
- **Custom settings**:
  - I can edit my profile name.
  - I can switch my default currency symbol (supports `$`, `₹`, `€`, `£`).
- **Dark Mode**: Added a simple toggle button to switch between light and dark themes.

---

## 📁 Project Structure

Here is how I structured all the files:

```text
CashTracker-Personal-Finance-Tracker/
├── index.html            # Main router and entry point
├── Registration.html     # User registration form
├── LoginPage.html        # Login form
├── Dashboard.html        # Main application dashboard
├── css/
│   ├── Registration.css  # Styles for registration card
│   ├── Login.css         # Styles for login card
│   └── Dashboard.css     # Styles for the dashboard interface
└── js/
    ├── auth.js           # Session handling, authentication, and page access control
    ├── Startpoint.js     # Dashboard layout initialization and active user greetings
    ├── Chart.js          # Chart.js integration logic for cash flow visualization
    ├── transaction.js    # Incomes, expenses, filtering, and settings controller
    └── Storage.js        # Helper storage utilities (optional)
```



## 💻 Tech Stack I Used

- **Structure**: HTML5
- **Styling**: Vanilla CSS3
- **Icons**: Remix Icon
- **Charts**: Chart.js
- **Logic**: ES6 JavaScript Modules
- **Storage**: HTML5 Web Storage (`localStorage`)
