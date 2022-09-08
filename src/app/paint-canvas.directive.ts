import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, SimpleChanges } from '@angular/core';

declare interface Position {
  offsetX: number;
  offsetY: number;
}

@Directive({
  selector: '[paintCanvas]'
})
export class PaintCanvasDirective {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  @Input() strokeColor: string = "#FC1305";
  @Input() lineWidth: number = 20;

  @Input() shouldClear: boolean = false;
  @Output() shouldClearChange = new EventEmitter<boolean>();

  @Input() shouldOpenInNewTab: boolean = false;
  @Output() shouldOpenInNewTabChange = new EventEmitter<boolean>();

  counter: number = 0;

  @Input() shouldDownload: boolean = false;
  @Output() shouldDownloadChange = new EventEmitter<boolean>();

  handleHeight: number = 26;
  toolbarWidth: number = 120;
  @Input() height: number = 520;
  @Input() width: number = 820;

  position: {
    start: {};
    stop: {};
  } = {
      start: 0,
      stop: 0
    };

  line: any[] = [];

  prevPos: Position = {
    offsetX: 0,
    offsetY: 0
  }

  isPainting: boolean = false;

  constructor(
    private element: ElementRef
  ) {
    this.canvas = this.element.nativeElement;
    this.canvas.width = 700;
    this.canvas.height = 494;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  resize() {
    let image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this.width - this.toolbarWidth;
    this.canvas.height = this.height - this.handleHeight;
    this.ctx.putImageData(image, 0, 0);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
    this.isPainting = true;
    this.prevPos = {
      offsetX,
      offsetY
    };
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
    if (this.isPainting) {
      const offsetData = { offsetX, offsetY };

      this.position = {
        start: { ...this.prevPos },
        stop: { ...offsetData }
      };

      this.line = this.line.concat(this.position);
      this.draw(this.prevPos, offsetData, this.strokeColor, this.lineWidth);

    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isPainting = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isPainting = false;
  }

  @HostBinding('style.background') background = 'white';

  draw({ offsetX: x, offsetY: y }: Position, { offsetX, offsetY }: Position, strokeColor: string, lineWidth: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);

    this.ctx.stroke();

    this.prevPos = {
      offsetX,
      offsetY
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shouldClear = false;
  }

  openImageNewTab() {
    var newTab = window.open('about:blank', 'image from canvas ' + this.counter,);
    newTab?.document.write("<img src='" + this.canvas.toDataURL("image/png") + "' alt='from canvas'/>");
    this.shouldOpenInNewTab = false;
    this.counter++;
  }

  downloadImage() {
    let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;

    this.shouldDownload = false;
  }

  ngDoCheck() {
    this.shouldClearChange.next(this.shouldClear);
    this.shouldOpenInNewTabChange.next(this.shouldOpenInNewTab);
    this.shouldDownloadChange.next(this.shouldDownload);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shouldClear']?.currentValue == true) {
      this.clear()
    } else if (changes['shouldOpenInNewTab']?.currentValue == true) {
      this.openImageNewTab();
    } else if (changes['shouldDownload']?.currentValue == true) {
      this.downloadImage();
    } else if (!changes['height']?.isFirstChange() || !changes['width']?.isFirstChange()) {
      this.resize();
    }


  }

  //mobile
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {

    let offsetX = event.touches[0].clientX - 120;
    let offsetY = event.touches[0].clientY - 50;

    this.isPainting = true;
    this.prevPos = {
      offsetX,
      offsetY
    };
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    let offsetX = event.touches[0].clientX - 120;
    let offsetY = event.touches[0].clientY - 50;

    if (this.isPainting) {
      const offsetData = { offsetX, offsetY };

      this.position = {
        start: { ...this.prevPos },
        stop: { ...offsetData }
      };

      this.line = this.line.concat(this.position);
      this.draw(this.prevPos, offsetData, this.strokeColor, this.lineWidth);

    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.isPainting = false;
  }

}


