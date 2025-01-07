import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment-dev';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedRequest = req.clone({
    setHeaders: {
      'X-API-Key': environment.API_KEY,
    },
  });
  return next(modifiedRequest);
};
