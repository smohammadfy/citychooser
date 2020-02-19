import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitychooserComponent } from './citychooser.component';

describe('CitychooserComponent', () => {
  let component: CitychooserComponent;
  let fixture: ComponentFixture<CitychooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitychooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitychooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
