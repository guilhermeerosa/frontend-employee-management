import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/views/company/shared/company.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  SERVER_URL = 'http://localhost:8000/api/company';

  constructor(private http: HttpClient) { }

  public getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.SERVER_URL}`).pipe(
      map(this.jsonDataToCompanies)
    )
  }

  public getCompany(id: any): Observable<Company>{
    return this.http.get(`${this.SERVER_URL}/${id}`).pipe(
      map(this.jsonDataToCompany)
    )
  }

  public createCompany(company: Company): Observable<Company>{
    return this.http.post(`${this.SERVER_URL}`, company).pipe(
      map(this.jsonDataToCompany)
    )
  }

  public updateCompany(company: Company): Observable<Company>{
    return this.http.put(`${this.SERVER_URL}/${company.id}`, company).pipe(
      map(this.jsonDataToCompany)
    )
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.SERVER_URL}/${id}`).pipe(
      map(() => null)
    )
  }

  private jsonDataToCompanies(jsonData: any[]): Company[] {
    const companies: Company[] = [];
    jsonData.forEach(element => companies.push(element as Company));
    return companies;
  }

  private jsonDataToCompany(jsonData: any): Company {
    return jsonData as Company;
  }
}
