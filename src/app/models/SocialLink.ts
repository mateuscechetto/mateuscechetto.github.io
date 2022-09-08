export class SocialLink {
    name: string;
    cssClass: string;
    icon: string;

    constructor(name: string, cssClass: string, icon: string) {
        this.name = name;
        this.cssClass = cssClass;
        this.icon = icon;
    }
}

export const SocialLinks = {
    GITHUB:  {name: 'GitHub', cssClass: 'github', icon: "../../assets/images/buttons-icons/github_icon.png"},
    YOUTUBE: {name: 'YouTube', cssClass: 'youtube', icon: "../../assets/images/buttons-icons/youtube_icon.png"},
    WEBSITE: {name: 'Website', cssClass: 'website', icon: "../../assets/images/buttons-icons/link_icon.png"}
}