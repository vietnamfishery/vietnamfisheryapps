import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPondComponent } from './detail-pond.component';

describe('DetailPondComponent', () => {
  let component: DetailPondComponent;
  let fixture: ComponentFixture<DetailPondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
