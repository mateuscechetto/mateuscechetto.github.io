import { SocialLink } from "./SocialLink";

export class Link {
    socialLink: SocialLink;
    url: string;

    constructor(socialLink: SocialLink, url: string) {
        this.socialLink = socialLink;
        this.url = url;
    }
}