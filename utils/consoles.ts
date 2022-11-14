import { consolesMenu } from "../constants/info";
import { Game } from "../constants/types";

export const getConsoleName = (game: Game) => consolesMenu.find((console) => console.id === game.console)
    ?.name