import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/views/user/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.SERVER_URL}`).pipe(
      map(this.jsonDataToUsers)
    )
  }
  
  public getUser(id: any): Observable<User>{
    return this.http.get(`${this.SERVER_URL}/${id}`).pipe(
      map(this.jsonDataToUser)
    )
  }

  public createUser(user: User): Observable<User>{
    return this.http.post(`${this.SERVER_URL}`, user).pipe(
      map(this.jsonDataToUser)
    )
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put(`${this.SERVER_URL}/${user.id}`, user).pipe(
      map(this.jsonDataToUser)
    )
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.SERVER_URL}/${id}`).pipe(
      map(() => null)
    )
  }


  private jsonDataToUsers(jsonData: any[]): User[] {
    const users: User[] = [];
    jsonData.forEach(element => users.push(element as User));
    return users;
  }

  private jsonDataToUser(jsonData: any): User {
    return jsonData as User;
  }
}
