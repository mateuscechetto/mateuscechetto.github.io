import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Position } from 'angular2-draggable';
import { ImageData } from '../models/ImageData';
import { Link } from '../models/Link';
import { ProgramData } from '../models/ProgramData';
import { Project } from '../models/Project';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  lastZIndex = 100;

  maquiAR: Project = {
    headline: 'MAQUIAR.HEADLINE',
    title: 'MAQUIAR.TITLE',
    paragraphs: ['MAQUIAR.PARAGRAPH1'],
    images: [
      new ImageData("../../assets/images/maquiAR/maquiAR-1.png", "MAQUIAR.IMAGE1"),
      new ImageData("../../assets/images/maquiAR/maquiAR-2.png", "MAQUIAR.IMAGE2"),
    ],
    techs:  ["Android", "Kotlin", "Java", "ARCore", "OpenGL"],
    links: [
      new Link("github", "https://github.com/mateuscechetto/MaquiAR"),
      new Link("youtube", "https://youtu.be/Ch7qy21mvBo")
    ]
  };

  maquiARProgram: ProgramData = new ProgramData("maquiAR", 'MAQUIAR.TITLE', String(this.lastZIndex - 1), new Position(565, -415), true, true);

  urlShortener: Project = {
    headline: 'URLSHORTENER.HEADLINE',
    title: 'URLSHORTENER.TITLE',
    paragraphs: ['URLSHORTENER.PARAGRAPH1', 'URLSHORTENER.PARAGRAPH2', 'URLSHORTENER.PARAGRAPH3', 'URLSHORTENER.PARAGRAPH4', 'URLSHORTENER.PARAGRAPH5'],
    images: [
      new ImageData("../../assets/images/url-shortener/urlShortener-1.png", "URLSHORTENER.IMAGE1"),
      new ImageData("../../assets/images/url-shortener/urlShortener-2.png", "URLSHORTENER.IMAGE2"),
    ],
    techs:  ["Java", "Spring boot", "Postgres", "Angular", "Angular Material"],
    links: [
      new Link("github", "https://github.com/mateuscechetto/url-shortener")
    ]
  };

  urlShortenerProgram: ProgramData = new ProgramData("urlShortener", 'URLSHORTENER.TITLE', String(this.lastZIndex), new Position(240, -350));


  portfolio: Project = {
    headline: 'PORTFOLIO.HEADLINE',
    title: 'PORTFOLIO.TITLE',
    paragraphs: ['PORTFOLIO.PARAGRAPH1', 'PORTFOLIO.PARAGRAPH2'],
    images: [
      new ImageData("../../assets/images/url-shortener/urlShortener-1.png", "URLSHORTENER.IMAGE1"),
    ],
    techs:  ["Angular", "Typescript", "HTML5", "SCSS", "ferramenta de deploy"],
    links: [
      new Link("github", "https://github.com/mateuscechetto/portfolio-xp")
    ]
  }

  portfolioProgram: ProgramData = new ProgramData("portfolio", 'PORTFOLIO.TITLE', String(this.lastZIndex), new Position(210, -320));

  activePrograms: Set<ProgramData> = new Set<ProgramData> ([
    this.maquiARProgram
  ]);

  programs = {
    "maquiAR": this.maquiARProgram,
    "urlShortener": this.urlShortenerProgram,
    "portfolio": this.portfolioProgram
  }


  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en-us', 'pt-br']);
    translate.setDefaultLang('en-us');
  }

  translateLanguageTo(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
  }

  makeProgramActive(programName: string) {    
    this.lastZIndex++;
    let program = this.programs[programName as keyof typeof this.programs];
    program.zIndex = String(this.lastZIndex);
    this.activePrograms.forEach(p => p.isFocused = false);   
    program.isFocused = true;
    program.isDisplayed = true;
    this.activePrograms.add(program);
  }

  closeProgram(programName: string) {    
    let program = this.programs[programName as keyof typeof this.programs];
    this.activePrograms.delete(program);
    program.isDisplayed = false;
  }

}
