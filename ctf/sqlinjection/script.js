(function() {
    function checkLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const outputElement = document.getElementById("output");

        if (username === "admin" && password === "admin") {
            outputElement.textContent = "Login Successful!";
            outputElement.style.color = "green";
        } 
        else if (username.includes("UNION SELECT null, table_name, null FROM information_schema.tables")) {
            outputElement.textContent = "Tables in the database: Users, Logs";
            outputElement.style.color = "blue";
        } 
        else if (username.includes("UNION SELECT null, column_name, null FROM information_schema.columns WHERE table_name='Users'")) {
            outputElement.textContent = "Columns in Users table: id, username, password";
            outputElement.style.color = "blue";
        } 
        else if (username.includes("UNION SELECT username, password, null FROM Users")) {
            outputElement.textContent = "Account info: admin, admin_password";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT null, null, null --")) {
            outputElement.textContent = "Test SQL Injection: null values return";
            outputElement.style.color = "blue";
        } 
        else if (username.includes("admin' UNION SELECT null, 1, null --")) {
            outputElement.textContent = "Test SQL Injection: checking first column output";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT 1, 2, 3 --")) {
            outputElement.textContent = "Test SQL Injection: checking first three columns";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT null, 'K4{H3llo_sql1}', null --")) {
            outputElement.textContent = "Congratulations! Here is your flag: K4{H3llo_sql1}";
            outputElement.style.color = "green";
        } 
        else if (username.includes("admin' OR '1'='1' --")) {
            outputElement.textContent = "Test SQL Injection: bypass login";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT table_name, null, null FROM information_schema.tables --")) {
            outputElement.textContent = "Test SQL Injection: list table names";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT column_name, null, null FROM information_schema.columns WHERE table_name='Logs' --")) {
            outputElement.textContent = "Columns in Logs table: log_id, user_id, action, timestamp";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT log_id, user_id, action FROM Logs LIMIT 3 --")) {
            outputElement.textContent = "Test SQL Injection: sample log entries";
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT 1, database(), 3 --")) {
            outputElement.textContent = "Test SQL Injection: current database";
            outputElement.style.color = "blue";
        }
        else {
            outputElement.textContent = "Invalid credentials! Try again.";
            outputElement.style.color = "red";
        }
    }

    document.querySelector("form").addEventListener("submit", checkLogin);
})();
