import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "./app.module";
import {HttpClient} from "@angular/common/http";
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [TranslateService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should change the language to english', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.switch = false;
    spyOn(app as any, 'useLanguage');

    app.changeLanguage();
    expect((app as any).useLanguage).toHaveBeenCalledWith('en');
  });

  it('should change the language to french', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.switch = true;
    spyOn(app as any, 'useLanguage');

    app.changeLanguage();
    expect((app as any).useLanguage).toHaveBeenCalledWith('fr');
  });

  it('should set the language', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(translate as any, 'use');

    app.useLanguage('fr');
    expect((translate as any).use).toHaveBeenCalledWith('fr');
  });
});
