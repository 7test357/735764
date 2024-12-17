(function() {
    function _0x1d1f(_0x53f1) {
        _0x53f1.preventDefault();

        const _0x56a1 = document.getElementById("username").value;
        const _0x2f72 = document.getElementById("password").value;

        if (_0x56a1 === "admin" && _0x2f72 === "admin") {
            document.getElementById("message").style.display = "block";
            document.getElementById("flag").style.display = "none";
        } else if (_0x56a1.includes("admin' OR '1'='1")) {
            document.getElementById("flag").style.display = "block";
            document.getElementById("message").style.display = "none";
        } else {
            alert("Invalid\x20credentials!Try\x20again.");
            document.getElementById("message").style.display = "none";
            document.getElementById("flag").style.display = "none";
        }
    }

    document.querySelector("form").addEventListener("submit", _0x1d1f);
})();
