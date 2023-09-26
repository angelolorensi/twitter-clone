import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetboxComponent } from './tweetbox.component';

describe('TweetboxComponent', () => {
  let component: TweetboxComponent;
  let fixture: ComponentFixture<TweetboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
