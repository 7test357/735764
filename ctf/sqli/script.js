(function () {
    function _0x12345(_0x1a2b3, _0x4c5d6) {
        _0x1a2b3.preventDefault();
        const _0x9e8f0 = document.getElementById("username")["value"];
        const _0x7c1b2 = document.getElementById("password")["value"];
        if (_0x9e8f0 === "admin" && _0x7c1b2 === "admin") {
            document.getElementById("message").style.display = "block";
            document.getElementById("flag").style.display = "none";
        } else if (
            _0x9e8f0 === "admin" &&
            _0x7c1b2.includes("${{secrets.sqli}}")
        ) {
            document.getElementById("flag").style.display = "block";
            document.getElementById("message").style.display = "none";
        } else {
            alert("Invalid\x20credentials!\x20Try\x20again.");
            document.getElementById("message").style.display = "none";
            document.getElementById("flag").style.display = "none";
        }
    }
    document.querySelector("form").addEventListener("submit", _0x12345);
})();
