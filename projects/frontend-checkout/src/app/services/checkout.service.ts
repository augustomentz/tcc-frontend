import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Address, ApiResponse, Cart, Payment, Sale } from "@frontend-lib";
import { environment } from "projects/environments/environment";
import { map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  http = inject(HttpClient);

  finishOrder(cart: Cart, address: Address, payment: Payment): Observable<Sale> {
    const cartId = localStorage.getItem('cart_id');

    const sale: Sale = {
      cartId: cartId!,
      address: address,
      payment: payment,
      total: cart.total,
      productsAmount: cart.products.length
    }

    return this.http.post<ApiResponse<Sale>>(`${environment.api.checkout}/checkout`, sale).pipe(
      map((result: ApiResponse<Sale>) => result.data)
    )
  }
}
