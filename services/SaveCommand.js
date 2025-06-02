import ProjectList from "./ProjectList.js";
import SaveItemList from "./SaveItemsList.js";

export class Commnad {
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }

}

export const COMMANDS = {
    SAVE: "save",
    UNSAVE: "unsave",
    SEARCH: "search",
    FOCUS_SEARCH: "focus_search"
}


export const CommandExecutor = {

    execute(command) {
        const saveList = SaveItemList.getInstance();
    
        switch(command.name){
            case COMMANDS.SAVE:
                saveList.addProject(command.args);
                break;
            case COMMANDS.UNSAVE:
                saveList.remove(command.args);
                break;

            case COMMANDS.SEARCH:
                const searched = saveList.findByTitle(command.args);
                saveList.setSearchItem(searched);
                break;
            case COMMANDS.FOCUS_SEARCH:
                command.args.focus();
                break;
            default:
                throw new Error("Comando no reconocido");
        }

    }

}