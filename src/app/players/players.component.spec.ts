import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponent } from './players.component';
import { NgForm, FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from './../app.module';
import {HttpClient} from '@angular/common/http';

describe('Component: PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let router: Router;
  let http: HttpTestingController;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
    .compileComponents();

    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate the form and navigate', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const form = new NgForm(null, null);

    component.validatePlayers(form);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should not validate the form and navigate', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const form = new NgForm(null, null);
    spyOnProperty(form, 'valid').and.returnValue(false);

    component.validatePlayers(form);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

});
