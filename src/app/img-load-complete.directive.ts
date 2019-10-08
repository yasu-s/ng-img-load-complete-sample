import { Directive, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 *
 */
@Directive({
  selector: '[appImgLoadComplete]',
})
export class ImgLoadCompleteDirective implements AfterViewInit {
  /** appImgLoadComplete - EventEmitter */
  @Output('appImgLoadComplete') loadComplete = new EventEmitter();

  /**
   * ImgLoadCompleteDirective 生成処理
   * @param elementRef ElementRef<HTMLElement>
   */
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  /**
   * AfterViewChecked
   */
  ngAfterViewInit(): void {
    // src取得
    const images = this.elementRef.nativeElement.getElementsByTagName('img');
    const paths = Array.from(images).map((i) => i.src);

    // 画像読み込み
    from(paths)
      .pipe(mergeMap((path) => this.loadImage(path)))
      .subscribe(
        () => {},
        () => {
          this.loadComplete.emit();
        },
        () => {
          this.loadComplete.emit();
        },
      );
  }

  /**
   * 画像読み込み
   * @param src img.src
   */
  loadImage(src: string): Observable<{ src: string; success: boolean }> {
    return new Observable<{ src: string; success: boolean }>((observer) => {
      const img = new Image();
      img.onload = () => {
        observer.next({ src, success: true });
        observer.complete();
      };
      img.onerror = (e) => observer.error(e);
      img.src = src;
    });
  }
}
