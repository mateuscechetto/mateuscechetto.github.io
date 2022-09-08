import { Position } from "angular2-draggable";

export class ProgramData {
    key: string;
    title: string;
    zIndex: string;
    isFocused: boolean;
    isDisplayed: boolean;
    iconPath: string;
    position: Position;
    
    constructor(key: string, title: string, zIndex: string, isFocused: boolean = false, isDisplayed: boolean = false, iconPath: string = "../../assets/images/buttons-icons/folder_icon.png", position: Position = new Position(0, 0)) {
        this.key = key;
        this.title = title;
        this.zIndex = zIndex;
        this.isFocused = isFocused; 
        this.isDisplayed = isDisplayed;
        this.iconPath = iconPath;
        this.position = position;
    }
}