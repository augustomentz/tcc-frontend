import { environment } from "projects/environments/enviroment"

interface Remote {
	name: string
	url: string
	exposedArtefact: string
}

export const REMOTE_CART: Remote = {
	name: 'frontend-cart',
	url: `${environment.mfe.cart}/remoteEntry.json`,
	exposedArtefact: './Component'
}

export const REMOTE_CATALOG: Remote = {
	name: 'frontend-catalog',
	url: `${environment.mfe.catalog}/remoteEntry.json`,
	exposedArtefact: './Component'
}

export const REMOTE_CHECKOUT: Remote = {
	name: 'frontend-checkout',
	url: `${environment.mfe.checkout}/remoteEntry.json`,
	exposedArtefact: './Component'
}

export const REMOTES: Record<string, string> = {
	[REMOTE_CART.name]: REMOTE_CART.url,
	[REMOTE_CATALOG.name]: REMOTE_CATALOG.url,
	[REMOTE_CHECKOUT.name]: REMOTE_CHECKOUT.url,
}


