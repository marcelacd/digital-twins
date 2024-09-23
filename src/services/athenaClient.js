import { AthenaClient } from '@aws-sdk/client-athena';

// Crea y exporta una instancia del cliente de Athena con la configuración necesaria
const client = new AthenaClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'ASIAQYEI4S5KZUQV2NXG',
        secretAccessKey: 'e3I33hMVai9jsFiPeLAj5GWwtmcnCcqGSgTwpSaD',
        sessionToken: "IQoJb3JpZ2luX2VjEIv//'//'//'///'/wEaCXVzLWVhc3QtMSJHMEUCIQDEHw8+NKrZ3bnDc0SPjsq/sCylvemVzjXhzlVOh1l5twIgTZQWF76tBr5C7TyYjzcCoC7Q4UT3lzL7HKlxOae+2OwqqQIIxP//////////ARAAGgwwNTE4MjY2OTM5NzMiDAnn3zLI/J2hofIqBSr9AcUxTnci0CASkDM5eNrwc5bZbV3egS/0WfLejhMK2Mk1fcEgIXQkHBZfItgNJnDP/Lx20JEYZvCVZg2DIb3fGisXoMgwAkoPcyvfkMUf20lFF0+YEzGTo+ida4yjD7Xl909bE8mukfnwK2xXKvG+NtXrh41BiQoIBY4+XWEvwLSA0gZYqu75Ma/eHU1OfPoo7G7kwlg1lJ+QVoO21Pt2+62RtWd8n1dYqkoMnLGBq0sAPaVJXr3osGiohBb1t1HN29LLJ+6vm5Cm2pDThO2vyrimNuM5gUCha/d/SaKknv47Ms7VACGrl0RoAjmRDkv8rtexXuenD5YIKnQELakwkvfGtwY6nQGpgYyMX2ixbsePFlNlB6UgrBINRmdjiMWWqS3Xz2jIpqIQUNKntWYZVtnKkXZr8xxp+Kx5UoJ1sYVPpLZbdsat8dVhtY9mTJaHyPltxNG4LHxuQMwYXWvY9frREfQ+e5GN8RJdo7URXMWlvLLYxiuR1/HpQ0x/vT4hqjUzQadLGhpPQp2uhF0QupBIMrMuDKBqExHAKyk5v9lNB1SH"
    }
});

export default client;
