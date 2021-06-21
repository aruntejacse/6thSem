import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterPayload } from './register-payload';
import {LoginPayload} from './login-payload';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { JwtAutResponse } from './jwt-aut-response';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) {}

  register(registerPayload: RegisterPayload): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/' + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post('http://localhost:8080/api/auth/' + 'login', loginPayload,{responseType : 'text'})
    .pipe(map(data => {
      this.localStoraqeService.store('authenticationToken', data);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('authenticationToken') != null;
  }

  logout() {
    this.localStoraqeService.clear('authenticationToken');
  }

  
}
