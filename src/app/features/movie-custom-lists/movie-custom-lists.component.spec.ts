import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCustomListsComponent } from './movie-custom-lists.component';

describe('MovieCustomListsComponent', () => {
  let component: MovieCustomListsComponent;
  let fixture: ComponentFixture<MovieCustomListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCustomListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieCustomListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
