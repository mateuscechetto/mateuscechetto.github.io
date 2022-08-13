export class ImageData {
    src: string;
    alt: string;
    description: string;

    constructor(url: string, description: string, altText: string = description) {
        this.src = url;
        this.description = description;
        this.alt = altText;
    }

}