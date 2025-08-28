import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Product } from "projects/frontend-lib/src/lib/types";
import { map, Observable } from "rxjs";
import { environment } from "projects/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${environment.api.catalog}/catalog`).pipe(
      map((result: ApiResponse<Product[]>) => result.data)
    );
  }

  updateRating(productId: string, rating: number): Observable<Product> {
    return this.http.put<ApiResponse<Product>>(`${environment.api.catalog}/catalog/${productId}/${rating}`, null).pipe(
      map((result: ApiResponse<Product>) => result.data)
    );
  }
}

