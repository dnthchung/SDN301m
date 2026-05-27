import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;
  let locationMock: {
    back: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    locationMock = {
      back: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [provideRouter([]), { provide: Location, useValue: locationMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 message and actions', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Page not found');
    expect(compiled.textContent).toContain('Back');
    expect(compiled.querySelector<HTMLAnchorElement>('a')?.getAttribute('href')).toBe('/');
  });

  it('should go back to the previous page', () => {
    component.goBack();

    expect(locationMock.back).toHaveBeenCalled();
  });
});
