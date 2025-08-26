import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Cart, Origin } from "projects/frontend-lib/src/lib/types";
import { map, Observable } from "rxjs";
import { environment } from "projects/environments/environment";

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

  deleteItem(cartId: string, itemId: string): Observable<Boolean> {
    return this.http.delete<ApiResponse<Boolean>>(`${environment.api.cart}/cart/${cartId}/${itemId}`).pipe(
      map((result: ApiResponse<Boolean>) => result.data)
    );
  }

  addItemToCart(cartId: string, productId: string, quantity: number): Observable<Boolean> {
    return this.http.post<ApiResponse<Boolean>>(`${environment.api.cart}/cart/update-item`, { cartId, itemId: productId, quantity, origin: Origin.CART }).pipe(
      map((result: ApiResponse<Boolean>) => result.data)
    );
  }
}

