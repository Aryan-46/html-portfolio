document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle");

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            document.body.classList.add("light_theme");
        } else {
            document.body.classList.remove("light_theme");
        }
    });
});

window.onload = function () {
    const path = window.location.pathname.split("/");
    const container = document.getElementById("container");

    // Initially hide the container
    container.style.display = "none";

    switch (path[1]) {
        case "":
            loadPage("home");
            break;
        case "space":
            loadPage("space");
            break;
        case "aarogyam":
            loadPage("aarogyam");
            break;
        default:
            loadPage("404");
            break;
    }

    document.querySelectorAll(".menu__item").forEach((item) => {
        item.addEventListener("click", function () {
            const path = item.getAttribute("value");

            // Show the container when a menu item is clicked
            container.style.display = "block";

            loadPage(path);
            if (path == "home") {
                window.history.pushState("", "", "/");
                return;
            }

            window.history.pushState("", "", path);
        });
    });

    function loadPage($path) {
        if ($path == "") return;

        const request = new XMLHttpRequest();
        request.open("GET", "pages/" + $path + ".html");
        request.send();
        request.onload = function () {
            if (request.status == 200) {
                container.innerHTML = request.responseText;
                document.title = $path;
            }
        };
    }
};