import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const apiLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = performance.now();

  return next(req).pipe(
    tap({
      next: () => {
        console.debug(`${req.method} ${req.urlWithParams} ${Math.round(performance.now() - startedAt)}ms`);
      },
    }),
  );
};
