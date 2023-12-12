import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../window/window.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-recycle-bin',
    templateUrl: './recycle-bin.component.html',
    styleUrls: ['./recycle-bin.component.scss'],
    standalone: true,
    imports: [WindowComponent, TranslateModule]
})
export class RecycleBinComponent extends WindowComponent implements OnInit {

  constructor() { super() }

  makeProgramActive(programKey: string) {
    this.activateProgram.emit(programKey)
  }


}
