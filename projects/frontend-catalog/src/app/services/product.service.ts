import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Product } from "projects/frontend-lib/src/lib/types";
import { map, Observable } from "rxjs";
import { environment } from "projects/environments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${environment.api.catalog}/products`).pipe(
      map((result: ApiResponse<Product[]>) => result.data)
    );
  }

  updateRating(productId: string, rating: number): Observable<Product> {
    return this.http.put<ApiResponse<Product>>(`${environment.api.catalog}/products/${productId}/${rating}`, null).pipe(
      map((result: ApiResponse<Product>) => result.data)
    );
  }
}

