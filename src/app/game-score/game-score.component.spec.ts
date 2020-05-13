import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "./../app.module";
import {HttpClient} from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import { NgForm, FormsModule} from '@angular/forms';
import { GameService } from '../services/game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';


describe('Component: GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;
  let router: Router;
  let http: HttpTestingController;
  let translate: TranslateService;
  let gameService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreComponent ],
      imports: [
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        GameService
      ]
    })
    .compileComponents();

    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    gameService = TestBed.get(GameService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear default value in the text field', () => {
    spyOn(component as any, '_getGameObjectFormatted').and.returnValue('test');
    spyOn(gameService, 'getPlayersListItem').and.returnValue('test');
    spyOn(gameService, 'resetPlayerListitem');
    component.clearIfDefault(0, 'test');

    expect(gameService.resetPlayerListitem).toHaveBeenCalledWith(0, 'test');
  });

  it('should NOT clear default value in the text field', () => {
    spyOn(component as any, '_getGameObjectFormatted').and.returnValue('test');
    spyOn(gameService, 'getPlayersListItem').and.returnValue('Other test');
    spyOn(gameService, 'resetPlayerListitem');
    component.clearIfDefault(0, 'test');

    expect(gameService.resetPlayerListitem).not.toHaveBeenCalledWith(0, 'test');
  });

  it('should validate the form, get the score', () => {
    const form = new NgForm(null,null);
    spyOn(gameService, 'getScore');
    spyOnProperty(form, 'valid').and.returnValue(true);

    component.onSubmit(form);
    expect(gameService.getScore).toHaveBeenCalled();
  });

  it('should NOT validate the form, get the score', () => {
    const form = new NgForm(null,null);
    spyOn(gameService, 'getScore');
    spyOnProperty(form, 'valid').and.returnValue(false);

    component.onSubmit(form);
    expect(gameService.getScore).not.toHaveBeenCalled();
  });

});
