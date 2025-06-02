import { animate, state, style, transition, trigger } from '@angular/animations';

const CART_WIDTH = 400; // largura do carrinho em px
const ANIMATION_DURATION = 300; // duração em ms
const ANIMATION_EASING = 'cubic-bezier(0.4,0,0.2,1)';

export const mainAnimation = trigger('mainAnimation', [
  state('normal', style({ marginRight: '0' })),
  state('moved', style({ marginRight: `${CART_WIDTH}px` })),
  transition('normal <=> moved', [
    animate(`${ANIMATION_DURATION}ms ${ANIMATION_EASING}`)
  ]),
]);

export const cartAnimation = trigger('cartAnimation', [
  state('normal', style({ right: `-${CART_WIDTH}px` })),
  state('moved', style({ right: '0' })),
  transition('normal <=> moved', [
    animate(`${ANIMATION_DURATION}ms ${ANIMATION_EASING}`)
  ]),
]);
