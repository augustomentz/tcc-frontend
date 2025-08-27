export const environment = {
  production: true,
  api: {
    catalog: 'http://34.95.241.39:8000',
    cart: 'http://34.95.206.140:8001',
    checkout: 'http://35.198.3.27:8002'
  },
  mfe: {
    catalog: 'http://frontend-catalog-service.default.svc.cluster.local',
    cart: 'http://localhost:4201',
    checkout: 'http://localhost:4203'
  }
}
