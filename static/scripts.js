document.getElementById("password-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    let password = document.getElementById("password").value;

    try {
        let response = await fetch("/check_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch password strength.");
        }

        let result = await response.json();

        // Display password strength and issues
        let passwordResultDiv = document.getElementById("password-result");
        passwordResultDiv.innerHTML = ''; // Clear previous result

        // Display strength message
        let strengthMessageElem = document.createElement("p");
        strengthMessageElem.innerHTML = `Strength: <strong>${result.password_strength}</strong>`;
        passwordResultDiv.appendChild(strengthMessageElem);

        // Display issues (if any)
        if (result.issues.length > 0) {
            let issuesList = document.createElement("ul");
            result.issues.forEach((issue) => {
                let li = document.createElement("li");
                li.innerHTML = issue;
                issuesList.appendChild(li);
            });
            passwordResultDiv.appendChild(issuesList);
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("password-result").innerHTML = "<p style='color:red;'>Error checking password strength.</p>";
    }
});