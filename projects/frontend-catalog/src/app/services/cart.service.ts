import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Cart } from "projects/frontend-lib/src/lib/types";
import { map, Observable } from "rxjs";
import { environment } from "projects/environments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);

  addItemToCart(productId: string): Observable<Boolean> {
    const cartId = localStorage.getItem('cart_id');

    return this.http.post<ApiResponse<Boolean>>(`${environment.api.cart}/cart/${cartId}/${productId}`, null).pipe(
      map((result: ApiResponse<Boolean>) => result.data)
    );
  }
}

