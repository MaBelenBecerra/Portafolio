const Router = {
    init() {
        const links = document.querySelectorAll(".nav__item a");
        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const route = event.target.getAttribute("href");
                this.go(route, true);
            });
        });


        window.addEventListener("popstate", (event) => {
            this.go(event.state?.route || "/", false);
        });

        this.go(location.pathname);
    },

    go(route, saveToHistory = false) {
        if (saveToHistory) {
            history.pushState({ route }, "", route);
        }

        const mainElement = document.getElementById("main");
        mainElement.innerHTML = "";

        let pageElement = null;

        switch (true) {
            case route === "/":
                pageElement = document.createElement("home-page");
                break;

            case route === "/about-me":
                pageElement = document.createElement("about-me-page");
                break;

            case route === "/projects":
                pageElement = document.createElement("project-page");
                break;

            case route === "/blogs":
                pageElement = document.createElement("blog-page");
                break;

            case route === "/save":
                pageElement = document.createElement("save-page");
                break;

            case route.startsWith("/projects/"):
                pageElement = document.createElement("project-details-page");
                const projectId = route.split("/")[2];
                pageElement.dataset.projectId = projectId;
                break;

            case route.startsWith("/blogs/"):
                pageElement = document.createElement("blog-details-page");
                const blogId = route.split("/")[2];
                pageElement.dataset.blogId = blogId;
                break;

            default:
                pageElement = document.createElement("not-found-page");
        }

        if (pageElement) {
            mainElement.appendChild(pageElement);
        }

        window.scrollTo(0, 0);
    }
};

export default Router;