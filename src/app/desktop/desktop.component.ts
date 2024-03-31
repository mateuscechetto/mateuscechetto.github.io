import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs';

import { Position } from 'angular2-draggable';

import { ProgramData } from '../models/ProgramData';
import { Project, PROJECTS } from '../models/Project';
import { StartBarComponent } from '../start-bar/start-bar.component';
import { MinesweeperComponent } from '../minesweeper/minesweeper.component';
import { MspaintComponent } from '../mspaint/mspaint.component';
import { RecycleBinComponent } from '../recycle-bin/recycle-bin.component';
import { AboutComponent } from '../about/about.component';
import { ProjectComponent } from '../project/project.component';

@Component({
    selector: 'app-desktop',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    standalone: true,
    imports: [ProjectComponent, AboutComponent, RecycleBinComponent, MspaintComponent, MinesweeperComponent, StartBarComponent, TranslateModule]
})
export class DesktopComponent implements OnInit {

  lastZIndex = 100;

  programWindowSize: { width: number, height: number } = { width: 820, height: 520 };

  windowSize: Position = new Position(0, 0);

  maquiAR: Project = PROJECTS.maquiAR;
  portfolio: Project = PROJECTS.portfolio;
  hsSetReviewBot: Project = PROJECTS.hsSetReviewBot;
  hsSetReviewSite: Project = PROJECTS.hsSetReviewSite;
  moreAboutMe: Project = PROJECTS.moreAboutMe;

  maquiARProgram: ProgramData = new ProgramData("maquiAR", 'MAQUIAR.TITLE', String(this.lastZIndex));
  portfolioProgram: ProgramData = new ProgramData("portfolio", 'PORTFOLIO.TITLE', String(this.lastZIndex));
  hsSetReviewBotProgram: ProgramData = new ProgramData("hsSetReviewBot", 'HSSETREVIEWBOT.TITLE', String(this.lastZIndex));
  hsSetReviewSiteProgram: ProgramData = new ProgramData("hsSetReviewSite", 'HSSETREVIEWSITE.TITLE', String(this.lastZIndex));
  aboutProgram: ProgramData = new ProgramData("about", "ABOUT.TITLE", String(this.lastZIndex), true, true, "../../assets/images/buttons-icons/Info_icon.png");
  recycleBinProgram: ProgramData = new ProgramData("recycleBin", "RECYCLEBIN.TITLE", String(this.lastZIndex), false, false, "../../assets/images/buttons-icons/recycle-bin_icon.png");
  moreAboutMeProgram: ProgramData = new ProgramData("moreAboutMe", "RECYCLEBIN.MOREABOUTME", String(this.lastZIndex));
  msPaintProgram: ProgramData = new ProgramData("msPaint", "MSPAINT.TITLE", String(this.lastZIndex), false, false, "../../assets/images/buttons-icons/mspaint_icon.png");
  minesweeperProgram: ProgramData = new ProgramData("minesweeper", "MINESWEEPER.TITLE", String(this.lastZIndex), false, false, "../../assets/images/minesweeper/Minesweeper_icon.png");

  programs = {
    "about": this.aboutProgram,
    "maquiAR": this.maquiARProgram,
    "portfolio": this.portfolioProgram,
    "hsSetReviewBot": this.hsSetReviewBotProgram,
    "hsSetReviewSite": this.hsSetReviewSiteProgram,
    "recycleBin": this.recycleBinProgram,
    "moreAboutMe": this.moreAboutMeProgram,
    "msPaint": this.msPaintProgram,
    "minesweeper": this.minesweeperProgram
  }

  activePrograms: Set<ProgramData> = new Set<ProgramData>([
    this.aboutProgram,
  ]);


  readonly breakpoints = this.breakpointObserver
    .observe(['(min-width: 600px)', '(max-width: 599px)'])
    .pipe(
      distinctUntilChanged()
    );

  constructor(
    public translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
  ) {
    let langs = ['en-US', 'pt-BR'];
    let userLang = navigator.language;
    let lang = langs.find(lang => lang.startsWith(userLang.substring(0, 2)));
    let defaultLang = lang ? lang : 'en-US';
    translate.addLangs(langs);
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);

  }

  translateLanguageTo(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.breakpoints.subscribe(() =>
      this.breakpointChanged()
    );
  }

  breakpointChanged(): void {
    this.setWindowSize();
    this.setProgramsPositions();
  }

  private setWindowSize() {
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
  }

  private setProgramsPositions() {
    if (this.windowSize.x > 599) {
      //starts a bit to the left and up to not cover linkedin button
      let index = -2;
      let maxHeight = this.windowSize.y * 0.9 - this.programWindowSize.height;
      for (let program in this.programs) {
        this.programs[program as keyof typeof this.programs].position.x = ((this.windowSize.x - this.programWindowSize.width) / 2) + ((index + 1) * 30);
        this.programs[program as keyof typeof this.programs].position.y = Math.min(maxHeight, ((this.windowSize.y - this.programWindowSize.height) / 2) + (index * 30));
        index++;
      }
    } else {
      for (let program in this.programs) {
        this.programs[program as keyof typeof this.programs].position = new Position(10, 10);
      }
    }

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
