import { initFederation } from '@angular-architects/native-federation';
import { REMOTES } from '@tcc/shell/remotes';

initFederation(REMOTES)
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
