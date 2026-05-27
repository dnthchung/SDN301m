import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPage } from './todo-page';

describe('TodoPage', () => {
  let component: TodoPage;
  let fixture: ComponentFixture<TodoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title and initial todos', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Todo Angular App');
    expect(compiled.querySelectorAll('.todo-item')).toHaveLength(3);
  });

  it('should add a todo from the composer form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector<HTMLInputElement>('#todo-title');
    const form = compiled.querySelector<HTMLFormElement>('.composer__form');

    expect(input).toBeTruthy();
    expect(form).toBeTruthy();

    input!.value = 'Viết unit test cho todo page';
    input!.dispatchEvent(new Event('input'));
    form!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(compiled.querySelector('.todo-list')?.textContent).toContain(
      'Viết unit test cho todo page',
    );
    expect(compiled.querySelectorAll('.todo-item')).toHaveLength(4);
  });

  it('should filter active todos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const openFilter = Array.from(
      compiled.querySelectorAll<HTMLButtonElement>('.filters button'),
    ).find((button) => button.textContent?.includes('Open'));

    expect(openFilter).toBeTruthy();

    openFilter!.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.todo-item')).toHaveLength(2);
    expect(compiled.querySelector('.todo-list')?.textContent).not.toContain(
      'Tách UI thành feature standalone component',
    );
  });
});
