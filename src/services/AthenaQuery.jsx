import React, { useEffect, useState } from 'react';
import { StartQueryExecutionCommand, GetQueryExecutionCommand, GetQueryResultsCommand } from '@aws-sdk/client-athena';
import client from './athenaClient'; 

const AthenaQuery = () => {
    const [queryResults, setQueryResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const executeAthenaQuery = async () => {
            setLoading(true);

            try {
                const startQueryCommand = new StartQueryExecutionCommand({
                    QueryString: 'SELECT sum("ventanetaacumanoactualeco") AS "total_ventas" FROM "igital-twins-nutresa-glue-db"."data_transformated" LIMIT 10;',
                    QueryExecutionContext: { Database: 'digital-twins-nutresa-glue-db' },
                    ResultConfiguration: {
                        OutputLocation: 's3://digital-twins-nutresa-s3/metadata/',
                    },
                });

                const queryExecution = await client.send(startQueryCommand);
                const queryExecutionId = queryExecution.QueryExecutionId;

                // Esperar a que la consulta se complete
                let queryStatus = 'RUNNING';
                while (queryStatus === 'RUNNING') {
                    const getQueryExecutionCommand = new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId });
                    const queryExecutionStatus = await client.send(getQueryExecutionCommand);
                    queryStatus = queryExecutionStatus.QueryExecution.Status.State;

                    if (queryStatus === 'FAILED' || queryStatus === 'CANCELLED') {
                        throw new Error('Query failed or was cancelled');
                    }

                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

                if (queryStatus === 'SUCCEEDED') {
                    const getQueryResultsCommand = new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId });
                    const queryResultsResponse = await client.send(getQueryResultsCommand);
                    const results = queryResultsResponse.ResultSet.Rows.map(row => row.Data.map(col => col.VarCharValue || ''));
                    setQueryResults(results);
                    console.log(results)
                }

            } catch (error) {
                console.error('Error executing Athena query:', error);
            } finally {
                setLoading(false);
            }
        };

        executeAthenaQuery();
    }, [])
};

export default AthenaQuery;



