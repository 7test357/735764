(function() {
    function checkLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const outputElement = document.getElementById("output");

        if (username === "admin" && password === "admin") {
            outputElement.textContent = "Login Successful!";
            outputElement.style.color = "green";
        } else if (username.includes("admin' OR '1'='1")) {
            outputElement.textContent = "Congratulations! Here is your flag: K4{H3llo_sql1}";
            outputElement.style.color = "green";
        } else {
            outputElement.textContent = "Invalid credentials! Try again.";
            outputElement.style.color = "red";
        }
    }

    document.querySelector("form").addEventListener("submit", checkLogin);
})();
