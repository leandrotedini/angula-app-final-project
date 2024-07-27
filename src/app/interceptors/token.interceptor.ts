import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { environment } from '../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (!req.url.includes(environment.notionURLBase)) {
    return next(req)
  }
  
  const authService = inject(AuthService);

  const token = authService.getToken()
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(cloned);
  }

  return next(req);
};