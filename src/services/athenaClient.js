import { AthenaClient } from '@aws-sdk/client-athena';

// Crea y exporta una instancia del cliente de Athena con la configuración necesaria
const client = new AthenaClient({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN
    }
});


export default client;


