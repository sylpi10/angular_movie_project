import { Injectable, Injector } from '@angular/core';
import { resolve } from 'url';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { UrlResolver } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _language: string; 
  private _translateService: TranslateService;

  constructor() {}

  public set language(language: string) {
    this._language = language;
    this._switch();
  }
  public get language(): string {
    return this._language;
  }

  public init(
    translateService: TranslateService,
    injector: Injector
  ): Promise<void> {
    return new Promise<void>((resolve: any) => {
      //get LOCATION_INITIALIZED token
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        // promise taken, get the current lgg
        const navigatorLanguage: string = window.navigator.language;
        const userLanguage: string = navigatorLanguage.split('-')[0];
        // check for userLanguage against our known lggs
        this._language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'en';

        // store TranslateService for next US
        this._translateService = translateService;
        
        // load translations
        translateService 
          .use(this._language)  // tell the service to use the current lgg
          .subscribe(() => {
            console.log(`translation loaded from ${this._language}`);
            resolve(null); // promise must be taken 
          })
        });
      });
    }
    
      private _switch(): Observable<any> {
        return this._translateService.use(this._language);
      }
}
