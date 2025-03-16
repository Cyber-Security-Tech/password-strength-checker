document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const strengthLabel = document.getElementById("strength-label").querySelector("span");
    const strengthBar = document.getElementById("strength-bar");
    const togglePassword = document.getElementById("toggle-password");
    
    const requirements = {
        length: document.getElementById("length"),
        lowercase: document.getElementById("lowercase"),
        uppercase: document.getElementById("uppercase"),
        number: document.getElementById("number"),
        special: document.getElementById("special")
    };
    
    const checkStrength = (password) => {
        let score = 0;
        if (password.length >= 8) {
            score++;
            requirements.length.innerHTML = "✅ At least 8 characters";
            requirements.length.style.color = "green";
        } else {
            requirements.length.innerHTML = "❌ At least 8 characters";
            requirements.length.style.color = "red";
        }

        if (/[a-z]/.test(password)) {
            score++;
            requirements.lowercase.innerHTML = "✅ At least one lowercase letter";
            requirements.lowercase.style.color = "green";
        } else {
            requirements.lowercase.innerHTML = "❌ At least one lowercase letter";
            requirements.lowercase.style.color = "red";
        }

        if (/[A-Z]/.test(password)) {
            score++;
            requirements.uppercase.innerHTML = "✅ At least one uppercase letter";
            requirements.uppercase.style.color = "green";
        } else {
            requirements.uppercase.innerHTML = "❌ At least one uppercase letter";
            requirements.uppercase.style.color = "red";
        }

        if (/\d/.test(password)) {
            score++;
            requirements.number.innerHTML = "✅ At least one number";
            requirements.number.style.color = "green";
        } else {
            requirements.number.innerHTML = "❌ At least one number";
            requirements.number.style.color = "red";
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            score++;
            requirements.special.innerHTML = "✅ At least one special character";
            requirements.special.style.color = "green";
        } else {
            requirements.special.innerHTML = "❌ At least one special character";
            requirements.special.style.color = "red";
        }

        updateStrength(score, password);
    };

    const updateStrength = (score, password) => {
        let strength;
        
        if (score === 1) {
            strength = "Very Weak";
            strengthBar.style.width = "20%";
            strengthBar.style.backgroundColor = "red";
        } else if (score === 2) {
            strength = "Weak";
            strengthBar.style.width = "40%";
            strengthBar.style.backgroundColor = "orange";
        } else if (score === 3) {
            strength = "Medium";
            strengthBar.style.width = "60%";
            strengthBar.style.backgroundColor = "yellow";
        } else if (score === 4) {
            // Adjusted logic: If missing either a number or special character, it remains Medium
            if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                strength = "Medium";
                strengthBar.style.width = "60%";
                strengthBar.style.backgroundColor = "yellow";
            } else {
                strength = "Fairly Strong";
                strengthBar.style.width = "80%";
                strengthBar.style.backgroundColor = "lightblue";
            }
        } else {
            strength = "Very Strong";
            strengthBar.style.width = "100%";
            strengthBar.style.backgroundColor = "green";
        }

        strengthLabel.innerText = strength;
    };

    passwordInput.addEventListener("input", (e) => {
        checkStrength(e.target.value);
    });

    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });
});