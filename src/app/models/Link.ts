export class Link {
    text: string;
    url: string;
    icon?: string;

    constructor(text: string, url: string, icon?: string) {
        this.text = text;
        this.url = url;
        this.icon = icon;
    }
}