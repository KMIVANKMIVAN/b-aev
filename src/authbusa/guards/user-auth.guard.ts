import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthBusaGuard } from '../authbusa.guard';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly authBusaGuard: AuthBusaGuard) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Aquí debes implementar la lógica para verificar si el usuario está autenticado
    // Puedes llamar a un método en tu servicio de autenticación para hacer la verificación
    const isAuthenticated = this.authBusaGuard.canActivate(request);
    return isAuthenticated;
  }
}
