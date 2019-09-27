import { Directive, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
   * AfterViewChecked
   */
  ngAfterViewInit(): void {
    // src取得
    const images = document.getElementsByTagName('img');
    const paths: string[] = [];
    for (let i = 0; i < images.length; i++) {
      paths.push(images.item(i).src);
    }

    console.log('ngAfterViewInit', paths);

    // 画像読み込み
    from(paths)
      .pipe(mergeMap((path) => this.loadImage(path)))
      .subscribe(
        (data) => {
          console.log('loadImage Complete.', data);
        },
        (err) => {
          console.error(err);
          this.loadComplete.emit();
        },
        () => {
          console.log('complete');
          this.loadComplete.emit();
        },
      );
  }

  /**
   * 画像読み込み
   * @param src img.src
   */
  loadImage(src: string) {
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
