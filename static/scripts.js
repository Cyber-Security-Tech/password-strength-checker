document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const strengthLabel = document.getElementById("strength-label").querySelector("span");
    const strengthBar = document.getElementById("strength-bar");
    const togglePassword = document.getElementById("toggle-password");
    const generatePasswordBtn = document.getElementById("generate-password");
    const darkModeCheckbox = document.getElementById("dark-mode-checkbox");
    const body = document.body;

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeCheckbox.checked = true;
    }

    darkModeCheckbox.addEventListener("change", () => {
        body.classList.toggle("dark-mode");
        
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    const requirements = {
        length: document.getElementById("length"),
        lowercase: document.getElementById("lowercase"),
        uppercase: document.getElementById("uppercase"),
        number: document.getElementById("number"),
        special: document.getElementById("special")
    };

    const checkStrength = (password) => {
        let score = 0;
        
        function updateRequirement(el, condition, text) {
            if (condition) {
                el.innerHTML = `✅ ${text}`;
                el.classList.add("valid");
            } else {
                el.innerHTML = `❌ ${text}`;
                el.classList.remove("valid");
            }
        }
        
        updateRequirement(requirements.length, password.length >= 8, "At least 8 characters");
        updateRequirement(requirements.lowercase, /[a-z]/.test(password), "At least one lowercase letter");
        updateRequirement(requirements.uppercase, /[A-Z]/.test(password), "At least one uppercase letter");
        updateRequirement(requirements.number, /\d/.test(password), "At least one number");
        updateRequirement(requirements.special, /[!@#$%^&*(),.?":{}\[\]\-]/.test(password), "At least one special character");
        
        score = Object.values(requirements).filter(el => el.classList.contains("valid")).length;
        updateStrength(score, password);
    };

    const updateStrength = (score, password) => {
        let strength;
        const strengthColors = ["red", "orange", "yellow", "lightblue", "green"];
        const strengthTexts = ["Very Weak", "Weak", "Medium", "Fairly Strong", "Very Strong"];
        
        strength = strengthTexts[score - 1] || "Very Weak";
        strengthBar.style.width = `${(score / 5) * 100}%`;
        strengthBar.style.backgroundColor = strengthColors[score - 1] || "red";
        strengthLabel.innerText = strength;
    };

    const generatePassword = () => {
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const specials = "!@#$%^&*()_+?><:{}[]";
        
        let password = "";
        password += lower[Math.floor(Math.random() * lower.length)];
        password += upper[Math.floor(Math.random() * upper.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specials[Math.floor(Math.random() * specials.length)];
        
        const allChars = lower + upper + numbers + specials;
        while (password.length < 12) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Ensure at least one special character is included
        if (!/[!@#$%^&*()_+?><:{}\[\]]/.test(password)) {
            const randomIndex = Math.floor(Math.random() * password.length);
            password = password.substring(0, randomIndex) + specials[Math.floor(Math.random() * specials.length)] + password.substring(randomIndex + 1);
        }

        password = password.split('').sort(() => Math.random() - 0.5).join(''); // Shuffle password
        
        passwordInput.value = password;
        checkStrength(password);
    };

    passwordInput.addEventListener("input", (e) => {
        checkStrength(e.target.value);
    });

    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    generatePasswordBtn.addEventListener("click", generatePassword);
});