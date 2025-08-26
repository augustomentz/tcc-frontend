import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "projects/environments/environment";
import { ApiResponse, Cart } from "projects/frontend-lib/src/public-api";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);

  getCart(): Observable<Cart> {
    const cartId = localStorage.getItem('cart_id');

    return this.http.get<ApiResponse<Cart>>(`${environment.api.cart}/cart/${cartId}`).pipe(
      map((result: ApiResponse<Cart>) => result.data)
    );
  }
}
