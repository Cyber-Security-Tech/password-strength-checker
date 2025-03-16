from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

def check_password_strength(password):
    issues = []

    # Check length (at least 8 characters)
    if len(password) < 8:
        issues.append("Password must be at least 8 characters long.")  

    # Check for at least one lowercase letter
    if not re.search(r'[a-z]', password):
        issues.append("Password must contain at least one lowercase letter.")

    # Check for at least one uppercase letter
    if not re.search(r'[A-Z]', password):
        issues.append("Password must contain at least one uppercase letter.")

    # Check for at least one digit
    if not re.search(r'\d', password):
        issues.append("Password must contain at least one digit.")

    # Check for at least one special character
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        issues.append("Password must contain at least one special character.")

    # Improved Common Password Check (detecting substrings)
    common_passwords = [
        "password", "123456", "qwerty", "abc123", "letmein", 
        "welcome", "pass", "admin", "test", "root", "user", "guest"
    ]
    
    for weak_word in common_passwords:
        if weak_word in password.lower():  # Check if any weak word is part of the password
            issues.append("Password is too common and easily guessable.")
            break  # No need to check further, it's already weak

    # Determine the strength based on the issues
    if "Password is too common and easily guessable." in issues:
        return "Very Weak", issues  # Ensure common passwords are always weak
    elif len(issues) == 0:
        return "Strong", issues
    elif len(issues) == 1:
        return "Medium", issues
    else:
        return "Very Weak", issues

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    data = request.get_json()
    password = data.get("password", "")
    password_strength, issues = check_password_strength(password)
    return jsonify({"password_strength": password_strength, "issues": issues})

if __name__ == '__main__':
    app.run(debug=True)