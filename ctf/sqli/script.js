(function() {
    function _0x7a8b(_0x3f4b) {
        _0x3f4b.preventDefault();
        
        const _0x1d2c = document.getElementById("username").value;
        const _0x50bc = document.getElementById("password").value;
        const _0x5f8a = document.getElementById("output");

        if (_0x1d2c === "admin" && _0x50bc === "admin") {
            _0x5f8a.textContent = "Login Successful!";
        } else if (_0x1d2c.includes("admin' OR '1'='1")) {
            _0x5f8a.textContent = "Congratulations! Here is your flag: K4{H3llo_sql1}";
        } else {
            _0x5f8a.textContent = "Invalid credentials! Try again.";
        }
    }

    document.querySelector("form").addEventListener("submit", _0x7a8b);
})();
