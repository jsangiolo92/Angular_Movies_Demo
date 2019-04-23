import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a select tag', () => {
    const element = fixture.debugElement.nativeElement.querySelector('select');
    expect(element).toBeTruthy();
  });

  it('should have a button element', () => {
    const element = fixture.debugElement.nativeElement.querySelector('button');
    expect(element).toBeTruthy();
  });

  it('should have a method called fetchMovies', () => {
    expect(component.fetchGenres).toBeDefined();
  });

});
