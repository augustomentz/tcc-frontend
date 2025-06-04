import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { REMOTE_CART, REMOTE_CATALOG, REMOTE_CHECKOUT } from '@tcc/shell/remotes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => loadRemoteModule(REMOTE_CATALOG.name, REMOTE_CATALOG.exposedArtefact).then((m) => m.AppComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => loadRemoteModule(REMOTE_CHECKOUT.name, REMOTE_CHECKOUT.exposedArtefact).then((m) => m.AppComponent),
  }
];
