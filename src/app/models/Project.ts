import { GalleryItem, ImageItem } from "ng-gallery";
import { Link } from "./Link";
import { SocialLink, SocialLinks } from "./SocialLink";

export class Project {
    title!: string;
    headline!: string;
    text!: string;
    techs!: string[];
    images!: GalleryItem[];
    links!: Link[];
    readMore!: string;
}

export const PROJECTS = {
    maquiAR: {
        headline: 'MAQUIAR.HEADLINE',
        title: 'MAQUIAR.TITLE',
        text: 'MAQUIAR.TEXT',
        images: [
            new ImageItem({ src: "../../assets/images/maquiAR/maquiAR-1.png" }),
            new ImageItem({ src: "../../assets/images/maquiAR/maquiAR-2.png" }),
        ],
        techs: ["Android", "Kotlin", "Java", "ARCore", "OpenGL"],
        links: [
            new Link(SocialLinks.GITHUB, "https://github.com/mateuscechetto/MaquiAR"),
            new Link(SocialLinks.YOUTUBE, "https://youtu.be/Ch7qy21mvBo"),
            new Link(new SocialLink("Thesis", "website", "../../assets/images/buttons-icons/link_icon.png"), "https://repositorio.ufsc.br/handle/123456789/237957")
        ],
        readMore: 'MAQUIAR.READMORE'
    },
    urlShortener: {
        headline: 'URLSHORTENER.HEADLINE',
        title: 'URLSHORTENER.TITLE',
        text: 'URLSHORTENER.TEXT',
        images: [
            new ImageItem({ src: "../../assets/images/url-shortener/urlShortenerGif.gif" }),
            new ImageItem({ src: "../../assets/images/url-shortener/urlShortenerImage.png" }),
            new ImageItem({ src: "../../assets/images/url-shortener/urlShortenerErrorPage.png" }),
        ],
        techs: ["Java", "Spring boot", "Postgres", "Angular", "Angular Material"],
        links: [
            new Link(SocialLinks.GITHUB, "https://github.com/mateuscechetto/url-shortener"),
            new Link(SocialLinks.YOUTUBE, "https://www.youtube.com/watch?v=64tuf-rMcSQ")
        ],
        readMore: "URLSHORTENER.READMORE"
    },
    portfolio: {
        headline: 'PORTFOLIO.HEADLINE',
        title: 'PORTFOLIO.TITLE',
        text: 'PORTFOLIO.TEXT',
        images: [
            new ImageItem({ src: "../../assets/images/portfolio/portfolio.png" }),
            new ImageItem({ src: "../../assets/images/portfolio/portfolioMobile.png" }),
        ],
        techs: ["Angular", "TypeScript", "HTML5", "SCSS",],
        links: [
            new Link(SocialLinks.GITHUB, "https://github.com/mateuscechetto/mateuscechetto.github.io"),
            new Link(SocialLinks.WEBSITE, "https://mateuscechetto.github.io")
        ],
        readMore: "PORTFOLIO.READMORE"
    },
    moreAboutMe: {
        headline: "MOREABOUTME.HEADLINE",
        title: "MOREABOUTME.TITLE",
        text: "MOREABOUTME.TEXT",
        images: [],
        techs: ["MOREABOUTME.ENGLISH", "MOREABOUTME.CREATIVITY", "MOREABOUTME.TEAMWORK", "MOREABOUTME.DISCIPLINE", "MOREABOUTME.TIMEMANAGEMENT",],
        links: [],
        readMore: ""
    }
}