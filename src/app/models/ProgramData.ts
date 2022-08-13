import { Position } from "angular2-draggable";

export class ProgramData {
    key: string;
    title: string;
    zIndex: string;
    position: Position;
    isFocused: boolean;
    isDisplayed: boolean;
    iconPath: string;
    
    constructor(key: string, title: string, zIndex: string, position: Position, isFocused: boolean = false, isDisplayed: boolean = false,  iconPath: string = "../../assets/images/buttons-icons/folder_icon.png") {
        this.key = key;
        this.title = title;
        this.zIndex = zIndex;
        this.position = position;
        this.isFocused = isFocused; 
        this.isDisplayed = isDisplayed;
        this.iconPath = iconPath;
    }
}