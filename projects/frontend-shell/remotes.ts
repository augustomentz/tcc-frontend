interface Remote {
	name: string
	url: string
	exposedArtefact: string
}

export const REMOTE_CART: Remote = {
	name: 'frontend-cart',
	url: 'http://localhost:4201/remoteEntry.json',
	exposedArtefact: './Component'
}

export const REMOTE_CATALOG: Remote = {
	name: 'frontend-catalog',
	url: 'http://localhost:4202/remoteEntry.json',
	exposedArtefact: './Component'
}

export const REMOTE_CHECKOUT: Remote = {
	name: 'frontend-checkout',
	url: 'http://localhost:4203/remoteEntry.json',
	exposedArtefact: './Component'
}

export const REMOTES: Record<string, string> = {
	[REMOTE_CART.name]: REMOTE_CART.url,
	[REMOTE_CATALOG.name]: REMOTE_CATALOG.url,
	// [REMOTE_CHECKOUT.name]: REMOTE_CHECKOUT.url,
}


