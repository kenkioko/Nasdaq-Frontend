import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTrendComponent } from './graph-trend.component';

describe('GraphTrendComponent', () => {
  let component: GraphTrendComponent;
  let fixture: ComponentFixture<GraphTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
