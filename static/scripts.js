document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const strengthLabel = document.getElementById("strength-label").querySelector("span");
    const strengthBar = document.getElementById("strength-bar");
    const togglePassword = document.getElementById("toggle-password");
    const generatePasswordBtn = document.getElementById("generate-password");
    const copyPasswordBtn = document.getElementById("copy-password");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    const requirements = {
        length: document.getElementById("length"),
        lowercase: document.getElementById("lowercase"),
        uppercase: document.getElementById("uppercase"),
        number: document.getElementById("number"),
        special: document.getElementById("special")
    };

    // Check Password Strength
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
        updateRequirement(requirements.special, /[!@#$%^&*\-_+=?]/.test(password), "At least one special character");

        score = Object.values(requirements).filter(el => el.classList.contains("valid")).length;
        updateStrength(score);
    };

    // Update Strength Bar
    const updateStrength = (score) => {
        strengthBar.classList.remove("weak", "medium", "strong");

        if (score <= 2) {
            strengthLabel.innerText = "Weak";
            strengthBar.style.width = "33%";
            strengthBar.classList.add("weak");
        } else if (score === 3 || score === 4) {
            strengthLabel.innerText = "Medium";
            strengthBar.style.width = "66%";
            strengthBar.classList.add("medium");
        } else {
            strengthLabel.innerText = "Strong";
            strengthBar.style.width = "100%";
            strengthBar.classList.add("strong");
        }
    };

    // Generate Secure Password
    const generatePassword = () => {
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const specials = "!@#$%^&*\-_+=?";

        let passwordArray = [];
        passwordArray.push(lower[Math.floor(Math.random() * lower.length)]);
        passwordArray.push(upper[Math.floor(Math.random() * upper.length)]);
        passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)]);
        passwordArray.push(specials[Math.floor(Math.random() * specials.length)]);

        const allChars = lower + upper + numbers + specials;
        while (passwordArray.length < 12) {
            passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }

        // Shuffle password to randomize order
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }

        const password = passwordArray.join('');
        passwordInput.value = password;
        checkStrength(password);
    };

    // Event Listeners
    passwordInput.addEventListener("input", (e) => checkStrength(e.target.value));

    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    generatePasswordBtn.addEventListener("click", generatePassword);

    copyPasswordBtn.addEventListener("click", () => {
        passwordInput.select();
        document.execCommand("copy");
        copyPasswordBtn.innerText = "✅";
        setTimeout(() => copyPasswordBtn.innerText = "📋", 1500);
    });
});
