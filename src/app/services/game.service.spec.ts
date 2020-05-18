import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from './../app.module';
import {HttpClient} from '@angular/common/http';
import { PlayerInterface } from '../modeles/player.interface';

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
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should set player number correctly if > 4', () => {
    service.setPlayerNumber(6);
    expect(service.playersNumber).toEqual(4);
  });

  it('should set player number correctly if < 2', () => {
    service.setPlayerNumber(1);
    expect(service.playersNumber).toEqual(2);
  });

  it('should set extension activated', () => {
    service.setExtension(true);
    expect(service.categoriesList.craftman.isActivated).toBe(true);
    expect(service.categoriesList.object.isActivated).toBe(true);
  });

  it('should set extension desactivated', () => {
    service.setExtension(false);
    expect(service.categoriesList.craftman.isActivated).toBe(false);
    expect(service.categoriesList.object.isActivated).toBe(false);
  });

  it('should init Players', () => {
    service.setPlayerNumber(2);
    service.initPlayers();
    expect(service.playersListItem.length).toEqual(2);
  });

  it('should format gameObject', () => {
    service.setPlayerNumber(2);
    service.initPlayers();
    service.formatGameObject();
    expect(service.gameFormatted).toBeDefined();
  });

  it('should set the score', () => {
    service.setPlayerNumber(2);
    service.initPlayers();
    service.getScore(service.playersListItem);
    expect(service.alreadyCalculateCraftman).toBe(false);
    expect(service.alreadyCalculateVizier).toBe(false);
  });

  it('should sort award list', () => {
    service.setPlayerNumber();
    service.initPlayers();
    service.getScore(service.playersListItem);
    service.getAwardsList();
    expect(service.awards).not.toEqual([]);
  });

  it('should calculate correctly vizier', () => {
    const playersmock: PlayerInterface[] = [
      {
        name: 'Joueur 1',
        coin: 0,
        vizier: 1,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 2',
        coin: 0,
        vizier: 2,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 3',
        coin: 0,
        vizier: 0,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      }
    ];
    service.setPlayerNumber(3);
    service.initPlayers();
    service.playersListItem = playersmock;
    service.getScore(service.playersListItem);
    expect(service.playersListItem[0].score).toEqual(11);
    expect(service.playersListItem[1].score).toEqual(22);
    expect(service.playersListItem[2].score).toEqual(0);
  });

  it('should calculate correctly vizier', () => {
    const playersmock: PlayerInterface[] = [
      {
        name: 'Joueur 1',
        coin: 0,
        vizier: 0,
        craftman: 2,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 2',
        coin: 0,
        vizier: 0,
        craftman: 3,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 3',
        coin: 0,
        vizier: 0,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      }
    ];
    service.setPlayerNumber(3);
    service.initPlayers();
    service.playersListItem = playersmock;
    service.getScore(service.playersListItem);
    expect(service.playersListItem[0].score).toEqual(4);
    expect(service.playersListItem[1].score).toEqual(9);
    expect(service.playersListItem[2].score).toEqual(0);
  });

  it('should calculate correctly vizier', () => {
    const playersmock: PlayerInterface[] = [
      {
        name: 'Joueur 1',
        coin: 0,
        vizier: 0,
        craftman: 2,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 2',
        coin: 0,
        vizier: 0,
        craftman: 3,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 3',
        coin: 0,
        vizier: 0,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      }
    ];
    service.setPlayerNumber(3);
    service.initPlayers();
    service.playersListItem = playersmock;
    service.getScore(service.playersListItem);
    expect(service.playersListItem[0].score).toEqual(4);
    expect(service.playersListItem[1].score).toEqual(9);
    expect(service.playersListItem[2].score).toEqual(0);
  });


  it('should calculate correctly all others items', () => {
    const playersmock: PlayerInterface[] = [
      {
        name: 'Joueur 1',
        coin: 1,
        vizier: 0,
        craftman: 0,
        sage: 0,
        djinn: 1,
        palmTree: 0,
        palace: 0,
        camel: 1,
        object: 1,
        merchandise: 1,
        score: 0
      },
      {
        name: 'Joueur 2',
        coin: 0,
        vizier: 0,
        craftman: 0,
        sage: 2,
        djinn: 0,
        palmTree: 0,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 3',
        coin: 0,
        vizier: 0,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 2,
        palace: 0,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      },
      {
        name: 'Joueur 4',
        coin: 0,
        vizier: 0,
        craftman: 0,
        sage: 0,
        djinn: 0,
        palmTree: 0,
        palace: 2,
        camel: 0,
        object: 0,
        merchandise: 0,
        score: 0
      }
    ];
    service.setPlayerNumber(4);
    service.initPlayers();
    service.playersListItem = playersmock;
    service.getScore(service.playersListItem);
    expect(service.playersListItem[0].score).toEqual(5);
    expect(service.playersListItem[1].score).toEqual(4);
    expect(service.playersListItem[2].score).toEqual(6);
    expect(service.playersListItem[3].score).toEqual(10);
  });

});
