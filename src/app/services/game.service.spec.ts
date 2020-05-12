import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "./../app.module";
import {HttpClient} from "@angular/common/http";

describe('GameService', () => {
  let service: GameService;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        TranslateService
      ]
    });

    service = TestBed.inject(GameService);
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  });

});
