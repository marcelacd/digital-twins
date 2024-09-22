// import { StartQueryExecutionCommand, GetQueryExecutionCommand, GetQueryResultsCommand } from '@aws-sdk/client-athena';
// import client from './athenaClient';

// export const executeAthenaQuery = async (query) => {
//     console.log(query)
//     try {
//         // Iniciar la consulta en Athena
//         const startQueryCommand = new StartQueryExecutionCommand({
//             QueryString: query,
//             QueryExecutionContext: { Database: 'digital-twins-nutresa-glue-db' },
//             ResultConfiguration: {
//                 OutputLocation: 's3://digital-twins-nutresa-s3/metadata/',
//             },
//         });

//         const queryExecution = await client.send(startQueryCommand);
//         const queryExecutionId = queryExecution.QueryExecutionId;

//         let queryStatus = 'RUNNING';

//         while (queryStatus === 'RUNNING' || queryStatus === 'QUEUED') {
//             console.log('Checking query status:', queryStatus);
//             const getQueryExecutionCommand = new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId });
//             const queryExecutionStatus = await client.send(getQueryExecutionCommand);
//             queryStatus = queryExecutionStatus.QueryExecution.Status.State;

//             if (queryStatus === 'FAILED' || queryStatus === 'CANCELLED') {
//                 throw new Error('La consulta falló o fue cancelada.');
//             }

//             // Espera más tiempo si está en estado QUEUED
//             const waitTime = queryStatus === 'QUEUED' ? 5000 : 2000;
//             await new Promise((resolve) => setTimeout(resolve, waitTime));
//         }

//         if (queryStatus === 'SUCCEEDED') {
//             const getQueryResultsCommand = new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId });
//             const queryResultsResponse = await client.send(getQueryResultsCommand);

//             // Procesar los resultados y devolver los datos
//             const results = queryResultsResponse.ResultSet.Rows.map(row =>
//                 row.Data.map(col => col.VarCharValue || '')
//             );
//             console.log(results)
//             console.log(JSON.stringify(results))
//             return results;
//         }
//     } catch (error) {
//         console.log(error)
//         // zona, venta_neta_acum_ano_actual_eco, venta_neta_acum_ano_actual_kg, venta_neta_acum_ano_actual_un

//         console.error('Error ejecutando la consulta Athena:', error);
//         return undefined
//     }
// };

import { 
    StartQueryExecutionCommand, 
    GetQueryExecutionCommand, 
    GetQueryResultsCommand 
} from '@aws-sdk/client-athena';
import client from './athenaClient';

export const executeAthenaQuery = async (query) => {
    try {
        // Iniciar la consulta en Athena
        const startQueryCommand = new StartQueryExecutionCommand({
            QueryString: query,
            QueryExecutionContext: { Database: 'digital-twins-nutresa-glue-db' },
            ResultConfiguration: {
                OutputLocation: 's3://digital-twins-nutresa-s3/metadata/',
            },
        });

        const queryExecution = await client.send(startQueryCommand);
        const queryExecutionId = queryExecution.QueryExecutionId;

        let queryStatus = 'RUNNING';

        // Revisar el estado de la consulta
        while (queryStatus === 'RUNNING' || queryStatus === 'QUEUED') {
            const getQueryExecutionCommand = new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId });
            const queryExecutionStatus = await client.send(getQueryExecutionCommand);
            queryStatus = queryExecutionStatus.QueryExecution.Status.State;

            if (queryStatus === 'FAILED' || queryStatus === 'CANCELLED') {
                throw new Error('La consulta falló o fue cancelada.');
            }

            const waitTime = queryStatus === 'QUEUED' ? 5000 : 2000;
            await new Promise((resolve) => setTimeout(resolve, waitTime));
        }

        if (queryStatus === 'SUCCEEDED') {
            let nextToken = null;
            let allResults = [];

            do {
                const getQueryResultsCommand = new GetQueryResultsCommand({
                    QueryExecutionId: queryExecutionId,
                    NextToken: nextToken,  // Usa el token para la paginación
                });

                const queryResultsResponse = await client.send(getQueryResultsCommand);

                // Procesar los resultados actuales
                const results = queryResultsResponse.ResultSet.Rows.map(row =>
                    row.Data.map(col => col.VarCharValue || '')
                );
                allResults = allResults.concat(results);  // Agregar resultados a la lista general

                // Actualizar el token para la siguiente página
                nextToken = queryResultsResponse.NextToken;

            } while (nextToken);  // Continuar mientras haya más páginas de resultados
            return allResults;
        }
    } catch (error) {
        console.error('Error ejecutando la consulta Athena:', error);
        return undefined;
    }
};

