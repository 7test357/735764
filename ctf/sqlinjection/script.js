(function() {
    function checkLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const outputElement = document.getElementById("output");

        const fakeDatabase = {
            tables: ['Users', 'Logs'],
            Users: [
                { id: 1, username: 'admin', password: 'admin_password' },
                { id: 2, username: 'user1', password: 'user1_password' }
            ],
            Logs: [
                { log_id: 1, user_id: 1, action: 'login', timestamp: '2024-12-01 10:00:00' },
                { log_id: 2, user_id: 2, action: 'logout', timestamp: '2024-12-02 11:00:00' }
            ],
            getTables() {
                return this.tables;
            },
            getColumns(table) {
                if (table === 'Users') return ['id', 'username', 'password'];
                if (table === 'Logs') return ['log_id', 'user_id', 'action', 'timestamp'];
                return [];
            },
            getRows(table) {
                if (table === 'Users') return this.Users;
                if (table === 'Logs') return this.Logs;
                return [];
            },
            getDatabase() {
                return 'fake_db';
            }
        };

        if (username === "admin" && password === "admin") {
            outputElement.textContent = "Login Successful!";
            outputElement.style.color = "green";
        } 
        else if (username.includes("UNION SELECT null, table_name, null FROM information_schema.tables")) {
            const tables = fakeDatabase.getTables().join(', ');
            outputElement.textContent = `Tables in the database: ${tables}`;
            outputElement.style.color = "blue";
        } 
        else if (username.includes("UNION SELECT null, column_name, null FROM information_schema.columns WHERE table_name='Users'")) {
            const columns = fakeDatabase.getColumns('Users').join(', ');
            outputElement.textContent = `Columns in Users table: ${columns}`;
            outputElement.style.color = "blue";
        } 
        else if (username.includes("UNION SELECT username, password, null FROM Users")) {
            const users = fakeDatabase.getRows('Users').map(row => `${row.username}: ${row.password}`).join(', ');
            outputElement.textContent = `Account info: ${users}`;
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
            const tables = fakeDatabase.getTables().join(', ');
            outputElement.textContent = `Tables in the database: ${tables}`;
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT column_name, null, null FROM information_schema.columns WHERE table_name='Logs' --")) {
            const columns = fakeDatabase.getColumns('Logs').join(', ');
            outputElement.textContent = `Columns in Logs table: ${columns}`;
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT log_id, user_id, action FROM Logs LIMIT 3 --")) {
            const logs = fakeDatabase.getRows('Logs').map(log => `${log.log_id}: ${log.action}`).join(', ');
            outputElement.textContent = `Sample logs: ${logs}`;
            outputElement.style.color = "blue";
        }
        else if (username.includes("admin' UNION SELECT 1, database(), 3 --")) {
            const currentDatabase = fakeDatabase.getDatabase();
            outputElement.textContent = `Current database: ${currentDatabase}`;
            outputElement.style.color = "blue";
        }
        else {
            outputElement.textContent = "Invalid credentials! Try again.";
            outputElement.style.color = "red";
        }
    }

    document.querySelector("form").addEventListener("submit", checkLogin);
})();
