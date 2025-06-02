import APIProject from "./services/apiProject.js";
import ProjectList from "./services/ProjectList.js";
import SaveItemList from "./services/SaveItemsList.js";
import Router from "./services/Router.js";
import HeroPage from "./blocks/hero/HeroPage.js";
import BlogPage from "./blocks/blog/BlogPage.js";
import AboutMePage from "./blocks/about-me/AboutMePage.js";
import ProjectPage from "./blocks/projects/ProjectPage.js";
import SavePage from "./blocks/savePage/SavePage.js";
import LocalStorage from "./services/LocalStorage.js";
import SearchBar from "./blocks/searchBar/SearchBar.js";
import ProjectDetailPage from "./blocks/ProjectDetails/ProjectDetailsPage.js";

globalThis.DOM = {};
globalThis.app = {};

app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
    await LocalStorage.loadProjects();
    await LocalStorage.loadSavedItemList();
    Router.init();
});






