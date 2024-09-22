import { AthenaClient } from '@aws-sdk/client-athena';

// Crea y exporta una instancia del cliente de Athena con la configuración necesaria
const client = new AthenaClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'ASIAQYEI4S5KU2JGR7RX',
        secretAccessKey: 'eA1gwJwyRKMR+YsYCC7uWdDn1mJijhc0VmDERyP2',
        sessionToken: "IQoJb3JpZ2luX2VjEGEaCXVzLWVhc3QtMSJIMEYCIQDuwcQ+aK0BrcIEy44/h+XnVRjynbKvnUo4DEYY8Pr01AIhALLcSHN5EJyyavIwSogZWWozpNQsAitQ7DlYyBGP/k8wKqkCCJr//'///'//'///wEQABoMMDUxODI2NjkzOTczIgweMVnpk6hRXmW+Id0q/QFfs4lH3fqEM4Kxnvr+1bKaK38d/IwKCpm/DleBE4iDN6RbRQIEiHY+fWqMLHjcPckMypPWtPl2akURbKaOevPFVBxLDkZdDbn45RkciWe1iu9AftMuCkQmG/NMG4TvQzeYLZjxdWpzluArAl0k5/Vue4eEpieGhzI+HrQpWA3Mxy4C2ej2lVS/AYuxBYCHud2sjkQM3O7EzQowCekIOyfyjMR0dH7etxOe2mEmkbyzEQgTEWFmFiYy8A+filIrZ8JsBVUKrMNp/AIT9/DKIA5neO/GIGuFRgdqZB3np+hy+dbbCtqab71ot6P+nBSVlZERRWlJrRVZNfWjsjVDMPvHvbcGOpwBLJEIF/OKTvsh5YSX0uBM37CTUUeoIjXPtEK6ZsuhEER6gVw1C38NwGFqbNHNZcILkL0IjBeke/oHGtHqU5bp7iZymulnClXMD5ybPrASjgAGoQmy8ugmvCwSE6ZCpmrekp9YWpT7rSW2H/jphVHpM8ZP+pZbFDZtmjYsvRbgdxrOXNG4HzlqgkT4kjW91kPWixRhQll8Rwz0M6bz"
    }
});

export default client;
