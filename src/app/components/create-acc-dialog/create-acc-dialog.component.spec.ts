import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccDialogComponent } from './create-acc-dialog.component';

describe('CreateAccDialogComponent', () => {
  let component: CreateAccDialogComponent;
  let fixture: ComponentFixture<CreateAccDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
