import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UiModule } from './shared/ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SearchComponent } from './pages/home/search/search.component';

import { AppConfig } from './core/init/app-config';
import { MovieComponent } from './pages/movie/movie.component';
import { TokenInterceptorService } from './core/services/token-interceptor.service';

import {LOCATION_INITIALIZED } from '@angular/common';
import{ TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslationService } from './core/services/translation.service';

import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ElapsedTimePipe } from './shared/pipes/elapsed-time.pipe';



// define a fn that invoke translationService
export function translationInitializerFactory( 
  translateService: TranslateService,  //from @ngx-translate
  translationService: TranslationService, // from our own, will be instanciated
  injector: Injector // injection service
  ) {
 return (): Promise<void> => {
   return translationService.init(translateService, injector); // return a fn that return a promise
 };
}


export function HttpLoaderFactory (http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
     './assets/i18n/',
     '.json'
  );
}

export function initializeApp(appConfig: AppConfig) {
  return (): Promise<any> => { 
    return appConfig.init();
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    MovieComponent,
    ElapsedTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    UiModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppConfig,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    { provide: APP_INITIALIZER,useFactory: initializeApp, deps: [AppConfig], multi: true},
    {
      provide:APP_INITIALIZER, // angular token given on app init
      useFactory: translationInitializerFactory, 
      deps: [
        TranslateService,
        TranslationService,
        Injector
      ],
      multi: true  // or others couldn't be loaded
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
