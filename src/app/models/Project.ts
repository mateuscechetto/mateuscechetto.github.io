import { ImageData } from "./ImageData";
import { Link } from "./Link";

export class Project {
    title!:string;
    headline!: string;
    paragraphs!:string[];
    techs!: string[];
    images!: ImageData[];
    links!: Link[]; 
}