import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteEditComponent } from './waste-edit.component';

describe('WasteEditComponent', () => {
  let component: WasteEditComponent;
  let fixture: ComponentFixture<WasteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
