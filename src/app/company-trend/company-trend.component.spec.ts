import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTrendComponent } from './company-trend.component';

describe('CompanyTrendComponent', () => {
  let component: CompanyTrendComponent;
  let fixture: ComponentFixture<CompanyTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
