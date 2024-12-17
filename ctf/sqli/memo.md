(function () {
    function checkLogin(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "admin") {
            document.getElementById("message").style.display = "block";
            document.getElementById("flag").style.display = "none";
        } else if (
            username.includes("admin' OR '1'='1")
        ) {
            document.getElementById("flag").style.display = "block";
            document.getElementById("message").style.display = "none";
        } else {
            alert("Invalid credentials! Try again.");
            document.getElementById("message").style.display = "none";
            document.getElementById("flag").style.display = "none";
        }
    }

    document.querySelector("form").addEventListener("submit", checkLogin);
})();
