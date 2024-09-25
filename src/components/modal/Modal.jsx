import React, { useState, useEffect } from 'react';
import { MixedBarChart, ColorScale } from '../chart/MixedBarChart'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import './Modal.css';
import { executeAthenaQuery } from '../../services/athenaService.js';

//Para ordenar los meses 
const monthOrder = {
    'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4, 'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8, 'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
}

const months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

function Modal({ isOpen, onClose, selectedZona, selectMesesSQL, selectedRangeMeses }) {
    const [isLoading, setIsLoading] = useState(true)
    const [value, setValue] = React.useState(0)

    const [ventaVolumenes, setVentaVolumenes] = useState({})
    const [volumenesChart, setVolumenesChart] = useState({})
    const [ejecucionPresupuestal, setEjecucionPresupuestal] = useState({})
    const [ejecucionPresupuestalChart, setEjecucionPresupuestalChart] = useState({})
    const [referencias, setReferencias] = useState({})
    const [totalClientes, setTotalClientes] = useState({})
    const [referenciasChart, setReferenciasChart] = useState({})
    const [efectividadVentas, setEfectividadVentas] = useState({})
    const [efectividadVentasChart, setEfectividadVentasChart] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function transformarDataVolumenes(data) {
        const headers = data[0]

        // Convertir los datos en objetos
        const resultado = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
                return obj
            }, {})
        })
        setVentaVolumenes(resultado[0])
    }
    function transformarDataVolumenesChart(data) {
        const headers = data[0]

        // Convertir los datos en objetos
        const resultado = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'mes' ? row[index] : parseFloat(row[index]);
                return obj
            }, {})
        })

        // Ordenar los objetos basados en el orden de los meses
        const sortedResultado = resultado.sort((a, b) => {
            return (monthOrder[a.mes] || 0) - (monthOrder[b.mes] || 0);
        })
        const organizedData = {
            labels: sortedResultado.map(item => item.mes),
            ventas_eco: sortedResultado.map(item => item.ventas_eco),
            ventas_kg: sortedResultado.map(item => item.ventas_kg),
            ventas_un: sortedResultado.map(item => item.ventas_un),
        }
        setVolumenesChart(organizedData)
    }

    function transformarDataEjePresupuestal(data) {
        const headers = data[0]

        // Convertir los datos en objetos
        const resultado = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
                return obj
            }, {})
        })
        setEjecucionPresupuestal(resultado[0])
    }
    function transformarDataEjePresupuestalChart(data) {
        const headers = data[0]

        // Convertir los datos en objetos
        const resultado = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'mes' ? row[index] : parseFloat(row[index]);
                return obj;
            }, {});
        });

        // Ordenar los objetos basados en el orden de los meses
        const sortedResultado = resultado.sort((a, b) => {
            return (monthOrder[a.mes] || 0) - (monthOrder[b.mes] || 0);
        })
        const organizedData = {
            labels: sortedResultado.map(item => item.mes),
            data: sortedResultado.map(item => item.ejecucion_presupuestal.toFixed(2)),
        }
        setEjecucionPresupuestalChart(organizedData)
    }

    function transformarDataReferencias(data) {
        const headers = data[0]

        // Convertir los datos en objetos
        const resultado = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
                return obj
            }, {})
        })
        setReferencias(resultado[0])
    }
    function transformarDataTotalClientes(data) {
        const headers = data[0]

        // Convertir los datos en objetos
        const resultado = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
                return obj
            }, {})
        })
        setTotalClientes(resultado[0])
    }
    function transformarDataReferenciasChart(data) {

        // Referencias
        const headers = data[0]
        // Convertir los datos en objetos
        const referenciasChart = data.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = header === 'mes' ? row[index] : parseFloat(row[index]);
                return obj
            }, {})
        });
        // Ordenar los objetos basados en el orden de los meses
        const sortedResultado = referenciasChart.sort((a, b) => {
            return (monthOrder[a.mes] || 0) - (monthOrder[b.mes] || 0);
        })

        const organizedDataReferencias = {
            labels: sortedResultado.map(item => item.mes),
            data: sortedResultado.map(item => item.referencias_total),
        }
        setReferenciasChart(organizedDataReferencias)
    }

    function transformarDataEfectividad(vPlaneadas, vEfectivas) {
        const ventasPlaneadas = parseFloat(vPlaneadas[1][1])
        const ventasEfectivas = parseFloat(vEfectivas[1][1])

        const organizedData = {
            ventas_planeadas: ventasPlaneadas,
            ventas_efectivas: ventasEfectivas,
            ventas_no_efectivas: ventasPlaneadas - ventasEfectivas
        }

        setEfectividadVentas(organizedData)
    }
    function transformarDataEfectividadChart(vPlaneadas, vEfectivas) {
        const headersPlan = vPlaneadas[0]
        const resultadoPlan = vPlaneadas.slice(1).map(row => {
            return headersPlan.reduce((obj, header, index) => {
                obj[header] = header === 'mes' ? row[index] : parseFloat(row[index])
                return obj
            }, {})
        })

        const headersEfe = vEfectivas[0]
        // Convertir los datos en objetos
        const resultadoEfe = vEfectivas.slice(1).map(row => {
            return headersEfe.reduce((obj, header, index) => {
                obj[header] = header === 'mes' ? row[index] : parseFloat(row[index])
                return obj
            }, {})
        })

        //Sacar el promedio de efectividad
        const efectividadVentas = resultadoPlan.map(resPlan => {
            const resEfe = resultadoEfe.find(r => r.mes === resPlan.mes);
            if (resEfe) {
                return {
                    mes: resPlan.mes,
                    efectividad: (resEfe.ventas_efectivas_mensual / resPlan.ventas_planeadas_mensual) * 100
                }
            }
            return null;
        }).filter(item => item !== null)

        // Ordenar los objetos basados en el orden de los meses
        const sortedResultado = efectividadVentas.sort((a, b) => {
            return (monthOrder[a.mes] || 0) - (monthOrder[b.mes] || 0)
        })

        const organizedData = {
            labels: sortedResultado.map(item => item.mes),
            data: sortedResultado.map(item => item.efectividad),
        }
        setEfectividadVentasChart(organizedData)
    }

    function valuetext(value) {
        const month = months.find(month => month.value === value);
        return month ? month.label : '';
    }

    // Ejecuta la query cuando se abre el modal
    useEffect(() => {
        const fetchQueryResults = async () => {
            try {

                //Volumenes
                const queryVolumenes = `SELECT zona, 
                                            SUM(venta_neta_acum_ano_actual_kg) AS ventas_kg,
                                            SUM(venta_neta_acum_ano_actual_un) AS ventas_un, 
                                            SUM(venta_neta_acum_ano_actual_eco) AS ventas_eco
                                        FROM "digital-twins-nutresa-glue-db"."ventas" 
                                        WHERE mes IN (${selectMesesSQL}) AND zona = '${selectedZona}' 
                                        GROUP BY zona`
                // const queryVolumenesChart1 = `SELECT mes,  
                //                         SUM(venta_neta_acum_ano_actual_eco) AS ventas_eco,
                //                         SUM(venta_neta_acum_ano_actual_kg) AS ventas_kg,
                //                         SUM(venta_neta_acum_ano_actual_un) AS ventas_un
                //                         FROM "digital-twins-nutresa-glue-db"."ventas" WHERE zona = '${selectedZona}' GROUP BY mes`;

                const queryVolumenesChart = `SELECT mes,  
                                                SUM(venta_neta_acum_ano_actual_eco) AS ventas_eco,
                                                SUM(venta_neta_acum_ano_actual_kg) AS ventas_kg,
                                                SUM(venta_neta_acum_ano_actual_un) AS ventas_un
                                            FROM (
                                                SELECT mes, 
                                                    venta_neta_acum_ano_actual_eco,
                                                    venta_neta_acum_ano_actual_kg,
                                                    venta_neta_acum_ano_actual_un
                                                FROM "digital-twins-nutresa-glue-db"."ventas" WHERE zona = '${selectedZona}'
                                                UNION ALL
                                                SELECT mes, 
                                                    venta_neta_acum_ano_actual_eco,
                                                    venta_neta_acum_ano_actual_kg,
                                                    venta_neta_acum_ano_actual_un
                                                FROM "digital-twins-nutresa-glue-db"."prediccion" WHERE zona = '${selectedZona}'
                                            ) AS consolidated_data GROUP BY mes`

                //Ejecucion presupuestal
                const queryEjePresupuestal = `SELECT zona, SUM(ppto_neta_acum_ano_actual_eco) AS ppto, SUM(venta_neta_acum_ano_actual_eco) AS ventas
                                              FROM "digital-twins-nutresa-glue-db"."ventas" WHERE mes IN (${selectMesesSQL}) AND zona = '${selectedZona}' GROUP BY zona;`
                // const queryEjePresupuestalChart = `SELECT mes, (SUM(venta_neta_acum_ano_actual_eco) / SUM(ppto_neta_acum_ano_actual_eco)) * 100 AS ejecucion_presupuestal
                //                                    FROM "digital-twins-nutresa-glue-db"."ventas" WHERE zona = '${selectedZona}' GROUP BY mes`;
                const queryEjePresupuestalChart = `SELECT mes, 
                                                        (SUM(venta_neta_acum_ano_actual_eco) / SUM(ppto_neta_acum_ano_actual_eco)) * 100 AS ejecucion_presupuestal
                                                    FROM "digital-twins-nutresa-glue-db"."ventas"  
                                                    WHERE zona = '${selectedZona}' GROUP BY mes
                                                    UNION ALL
                                                    SELECT mes, 
                                                        (SUM(venta_neta_acum_ano_actual_eco) / SUM(ppto_neta_acum_ano_actual_eco)) * 100 AS ejecucion_presupuestal
                                                    FROM "digital-twins-nutresa-glue-db"."prediccion"
                                                    WHERE zona = '${selectedZona}' GROUP BY mes`

                //Referencias
                const queryReferencias = `SELECT zona, SUM(conteo_referencias) AS referencias_total
                                            FROM (SELECT mes, zona, vendedor_ecom, nombre_comercial, COUNT(descripcion_material) AS conteo_referencias
                                            FROM (SELECT DISTINCT mes, zona, descripcion_material, nombre_comercial, vendedor_ecom
                                            FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas" WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                                            GROUP BY mes, zona, vendedor_ecom, nombre_comercial) AS referencias_por_cliente_vendedor
                                            WHERE mes IN (${selectMesesSQL}) AND zona = '${selectedZona}' GROUP BY zona;`
                const queryTotalClientes = `SELECT zona, SUM(conteo_clientes) AS total_clientes
                                            FROM (SELECT mes, zona, vendedor_ecom, COUNT(DISTINCT nombre_comercial) AS conteo_clientes
                                            FROM (SELECT DISTINCT mes, zona, descripcion_material, nombre_comercial, vendedor_ecom
                                            FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas" 
                                            WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                                            GROUP BY mes, zona, vendedor_ecom) AS clientes_por_vendedor
                                            WHERE mes IN (${selectMesesSQL}) AND zona = '${selectedZona}' GROUP BY zona;`
                // const queryReferenciasChart = `SELECT mes, AVG(conteo_referencias) AS referencias_total
                //                            FROM(SELECT mes, zona, vendedor_ecom, nombre_comercial, COUNT(descripcion_material) AS conteo_referencias
                //                            FROM(SELECT DISTINCT mes, zona, descripcion_material, nombre_comercial, vendedor_ecom
                //                            FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                //                            WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                //                            GROUP BY mes, zona, vendedor_ecom, nombre_comercial) AS referencias_por_cliente_vendedor
                //                                WHERE zona = '${selectedZona}' GROUP BY mes`
                const queryReferenciasChart = `SELECT mes, AVG(conteo_referencias) AS referencias_total
                                                FROM (
                                                    SELECT mes, zona, vendedor_ecom, nombre_comercial, COUNT(descripcion_material) AS conteo_referencias
                                                    FROM (
                                                        SELECT DISTINCT mes, zona, descripcion_material, nombre_comercial, vendedor_ecom
                                                        FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                                                        WHERE venta_neta_acum_ano_actual_eco > 0
                                                    ) AS ventas_distintivas
                                                    GROUP BY mes, zona, vendedor_ecom, nombre_comercial
                                                ) AS referencias_por_cliente_vendedor
                                                WHERE zona = '${selectedZona}'GROUP BY mes
                                                UNION ALL
                                                SELECT mes, AVG(conteo_referencias) AS referencias_total
                                                FROM (
                                                    SELECT mes, zona, vendedor_ecom, nombre_comercial, COUNT(descripcion_material) AS conteo_referencias
                                                    FROM (
                                                        SELECT DISTINCT mes, zona, descripcion_material, nombre_comercial, vendedor_ecom
                                                        FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."prediccion"
                                                        WHERE venta_neta_acum_ano_actual_eco > 0
                                                    ) AS ventas_distintivas
                                                    GROUP BY mes, zona, vendedor_ecom, nombre_comercial
                                                ) AS referencias_por_cliente_vendedor
                                                WHERE zona = '${selectedZona}' GROUP BY mes`

                //Efectividad
                const queryVentasPlaneadas = `SELECT zona, COUNT(cv_nombre_completo_cliente) * 4 AS ventas_planeadas_mensual
                                              FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."maestra"
                                              WHERE zona = '${selectedZona}' AND mes IN (${selectMesesSQL}) GROUP BY zona`
                const queryVentasEfectivas = `SELECT zona, SUM(ventas_efectivas_semanal) AS ventas_efectivas_mensual FROM (
                                                SELECT mes, zona, vendedor_ecom, COUNT(nombre_comercial) AS ventas_efectivas_semanal
                                                FROM (SELECT DISTINCT mes, zona, semana, nombre_comercial, vendedor_ecom
                                                FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                                                WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                                                WHERE zona = '${selectedZona}' AND mes IN (${selectMesesSQL}) GROUP BY mes, zona, vendedor_ecom) AS ventas_semanal GROUP BY zona`
                //Falta la data planeada para los meses de prediccion
                const queryVentasPlaneadasChart = `SELECT mes, COUNT(cv_nombre_completo_cliente) * 4 AS ventas_planeadas_mensual
                                              FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."maestra"
                                              WHERE zona = '${selectedZona}' GROUP BY mes`
                // const queryVentasEfectivasChart = `SELECT mes, SUM(ventas_efectivas_semanal) AS ventas_efectivas_mensual FROM (
                //                                 SELECT mes, zona, vendedor_ecom, COUNT(nombre_comercial) AS ventas_efectivas_semanal
                //                                 FROM (SELECT DISTINCT mes, zona, semana, nombre_comercial, vendedor_ecom
                //                                 FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                //                                 WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                //                                 WHERE zona = '${selectedZona}' GROUP BY mes, zona, vendedor_ecom) AS ventas_semanal GROUP BY mes`
                const queryVentasEfectivasChart = `SELECT mes, SUM(ventas_efectivas_semanal) AS ventas_efectivas_mensual 
                                                    FROM (
                                                        SELECT mes, zona, vendedor_ecom, COUNT(nombre_comercial) AS ventas_efectivas_semanal
                                                        FROM (
                                                            SELECT DISTINCT mes, zona, semana, nombre_comercial, vendedor_ecom
                                                            FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                                                            WHERE venta_neta_acum_ano_actual_eco > 0
                                                        ) AS ventas_distintivas
                                                        WHERE zona = '${selectedZona}' 
                                                        GROUP BY mes, zona, vendedor_ecom
                                                    ) AS ventas_semanal  GROUP BY mes
                                                    UNION ALL
                                                    SELECT mes, SUM(ventas_efectivas_semanal) AS ventas_efectivas_mensual 
                                                    FROM (
                                                        SELECT mes, zona, vendedor_ecom, COUNT(nombre_comercial) AS ventas_efectivas_semanal
                                                        FROM (
                                                            SELECT DISTINCT mes, zona, semana, nombre_comercial, vendedor_ecom
                                                            FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."prediccion"
                                                            WHERE venta_neta_acum_ano_actual_eco > 0
                                                        ) AS ventas_distintivas
                                                        WHERE zona = '${selectedZona}' 
                                                        GROUP BY mes, zona, vendedor_ecom
                                                    ) AS ventas_semanal GROUP BY mes`

                const [
                    respuestaVolumenes,
                    respuestaVolumenChart,
                    respuestaEjePresupuestal,
                    respuestaEjePresupuestalChart,
                    respuestaReferencias,
                    respuestaTotalClientes,
                    respuestaReferenciasChart,
                    respuestaVentasPlaneadas,
                    respuestaVentasEfectivas,
                    respuestaVentasPlaneadasChart,
                    respuestaVentasEfectivasChart,
                ] = await Promise.all([
                    executeAthenaQuery(queryVolumenes),
                    executeAthenaQuery(queryVolumenesChart),
                    executeAthenaQuery(queryEjePresupuestal),
                    executeAthenaQuery(queryEjePresupuestalChart),
                    executeAthenaQuery(queryReferencias),
                    executeAthenaQuery(queryTotalClientes),
                    executeAthenaQuery(queryReferenciasChart),
                    executeAthenaQuery(queryVentasPlaneadas),
                    executeAthenaQuery(queryVentasEfectivas),
                    executeAthenaQuery(queryVentasPlaneadasChart),
                    executeAthenaQuery(queryVentasEfectivasChart),
                ])

                transformarDataVolumenes(respuestaVolumenes)
                transformarDataVolumenesChart(respuestaVolumenChart)
                transformarDataEjePresupuestal(respuestaEjePresupuestal)
                transformarDataEjePresupuestalChart(respuestaEjePresupuestalChart)
                transformarDataReferencias(respuestaReferencias)
                transformarDataTotalClientes(respuestaTotalClientes)
                transformarDataReferenciasChart(respuestaReferenciasChart)
                transformarDataEfectividad(respuestaVentasPlaneadas, respuestaVentasEfectivas)
                transformarDataEfectividadChart(respuestaVentasPlaneadasChart, respuestaVentasEfectivasChart)
                setIsLoading(false)
            } catch (error) {
                onClose()
                console.error('Error fetching data:', error);
            }
        }

        // Solo ejecuta la query si el modal está abierto
        if (isOpen) {
            fetchQueryResults();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ position: 'absolute' }}>
            {isLoading ? (
                <span className="loader"></span>
            ) : (
                <div className="modal-content">

                    <div style={{ position: 'relative' }}>
                        <CloseIcon fontSize='small'
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                right: '0px',
                                top: '-3px',
                                cursor: 'pointer'
                            }}
                        >
                            {/* &times; */}
                        </CloseIcon>
                    </div>

                    <Box sx={{ textAlign: 'center' }}>
                        <h2>Indicadores zona {selectedZona}</h2>
                    </Box>

                    <div className="container">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                variant="fullWidth"
                                TabIndicatorProps={{ style: { backgroundColor: '#3bb6a7' } }}
                            >
                                <Tab label="Volumen y valor de ventas" sx={{ '&.Mui-selected': { color: '#3bb6a7' } }} />
                                <Tab label="Efectividad" sx={{ '&.Mui-selected': { color: '#3bb6a7' } }} />
                                <Tab label="Referencias" sx={{ '&.Mui-selected': { color: '#3bb6a7' } }} />
                                <Tab label="Ejecución presupuestal" sx={{ '&.Mui-selected': { color: '#3bb6a7' } }} />
                                {/* sx={{ textTransform: 'none' }} */}
                            </Tabs>
                        </Box>

                        {value === 0 && (
                            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 1.5, md: 1.5 }} sx={{ width: '100%' }}>
                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0 0 7px' }}>
                                            {valuetext(selectedRangeMeses[0]) === valuetext(selectedRangeMeses[1])
                                                ? `Datos al mes de ${valuetext(selectedRangeMeses[0])}`
                                                : `Datos en el rango ${valuetext(selectedRangeMeses[0])} - ${valuetext(selectedRangeMeses[1])}`}
                                        </h4>
                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                            <Grid size={4}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Unidades</h4>
                                                    <div style={{ fontSize: 20 }}>{ventaVolumenes.ventas_un.toLocaleString('es-CO') + ' U'}</div>
                                                </div>
                                            </Grid>
                                            <Grid size={4}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Kilogramos</h4>
                                                    <div style={{ fontSize: 20 }}>{ventaVolumenes.ventas_kg.toLocaleString('es-CO') + ' Kg'}</div>
                                                </div>
                                            </Grid>
                                            <Grid size={4}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Pesos</h4>
                                                    <div style={{ fontSize: 20 }}>{'$' + ventaVolumenes.ventas_eco.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0' }}>Volumenes de ventas mes a mes</h4>

                                        <div style={{ margin: '10px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                            {/* {dataPieVolumen.map((item, index) => ( */}
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#CDDE00',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data real</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#F9B242',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data predictiva</span>
                                            </div>
                                            {/* ))} */}
                                        </div>

                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid size={4}>
                                                {/* <MixedBarChart data={volumenesChart.ventas_un} xLabels={volumenesChart.labels} color={'#CDDE00'} /> */}
                                                <ColorScale
                                                    data={volumenesChart.ventas_un}
                                                    xLabels={volumenesChart.labels}
                                                    colors={{ ventas: '#CDDE00', prediccion: '#F9B242' }}
                                                    tooltip={' unidades'}
                                                    marginLeft={70}
                                                    translateX={-30}
                                                ></ColorScale>
                                            </Grid>

                                            <Grid size={4}>
                                                {/* <MixedBarChart data={volumenesChart.ventas_kg} xLabels={volumenesChart.labels} color={'#3BB6A7'} /> */}
                                                <ColorScale
                                                    data={volumenesChart.ventas_kg}
                                                    xLabels={volumenesChart.labels}
                                                    colors={{ ventas: '#CDDE00', prediccion: '#F9B242' }}
                                                    tooltip={' kilogramos'}
                                                    marginLeft={60}
                                                    translateX={-20}
                                                ></ColorScale>
                                            </Grid>

                                            <Grid size={4}>
                                                {/* <MixedBarChart data={volumenesChart.ventas_eco} xLabels={volumenesChart.labels} color={'#F9B242'} /> */}
                                                <ColorScale
                                                    data={volumenesChart.ventas_eco}
                                                    xLabels={volumenesChart.labels}
                                                    colors={{ ventas: '#CDDE00', prediccion: '#F9B242' }}
                                                    tooltip={'pesos'}
                                                    marginLeft={100}
                                                    translateX={-60}
                                                ></ColorScale>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        )}

                        {value === 1 && (
                            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 1.5, md: 1.5 }} sx={{ width: '100%' }}>
                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0 0 7px' }}>
                                            {valuetext(selectedRangeMeses[0]) === valuetext(selectedRangeMeses[1])
                                                ? `Datos al mes de ${valuetext(selectedRangeMeses[0])}`
                                                : `Datos en el rango ${valuetext(selectedRangeMeses[0])} - ${valuetext(selectedRangeMeses[1])}`}
                                        </h4>
                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                            <Grid size={4}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Visitas programadas</h4>
                                                    <div style={{ fontSize: 20 }}>{efectividadVentas.ventas_planeadas.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                            <Grid size={4}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Visitas efectivas</h4>
                                                    <div style={{ fontSize: 20 }}>{efectividadVentas.ventas_efectivas.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                            <Grid size={4}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Visitas no efectivas</h4>
                                                    <div style={{ fontSize: 20 }}>{efectividadVentas.ventas_no_efectivas.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0' }}>Efectividad de ventas mes a mes</h4>

                                        <div style={{ margin: '10px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                            {/* {dataPieVolumen.map((item, index) => ( */}
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#CDDE00',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data real</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#F9B242',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data predictiva</span>
                                            </div>
                                            {/* ))} */}
                                        </div>

                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            {/* <MixedBarChart data={efectividadVentasChart.data} xLabels={efectividadVentasChart.labels} color={'#CDDE00'} /> */}
                                            <ColorScale
                                                data={efectividadVentasChart.data}
                                                xLabels={efectividadVentasChart.labels}
                                                colors={{ ventas: '#CDDE00', prediccion: '#F9B242' }}
                                                tooltip={'%'}
                                            ></ColorScale>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        )}

                        {value === 2 && (
                            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 1.5, md: 1.5 }} sx={{ width: '100%' }}>
                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0 0 7px' }}>
                                            {valuetext(selectedRangeMeses[0]) === valuetext(selectedRangeMeses[1])
                                                ? `Datos al mes de ${valuetext(selectedRangeMeses[0])}`
                                                : `Datos en el rango ${valuetext(selectedRangeMeses[0])} - ${valuetext(selectedRangeMeses[1])}`}
                                        </h4>
                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                            <Grid size={6}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Total referencias</h4>
                                                    <div style={{ fontSize: 20 }}>{referencias.referencias_total.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                            <Grid size={6}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Total de clientes</h4>
                                                    <div style={{ fontSize: 20 }}>{totalClientes.total_clientes.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0' }}>Promedio de referencias vendidas por cliente mes a mes</h4>

                                        <div style={{ margin: '10px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                            {/* {dataPieVolumen.map((item, index) => ( */}
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#CDDE00',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data real</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#F9B242',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data predictiva</span>
                                            </div>
                                            {/* ))} */}
                                        </div>

                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            {/* <MixedBarChart data={referenciasChart.data} xLabels={referenciasChart.labels} color={'#F9B242'} /> */}
                                            <ColorScale
                                                data={referenciasChart.data}
                                                xLabels={referenciasChart.labels}
                                                colors={{ ventas: '#CDDE00', prediccion: '#F9B242' }}
                                                tooltip={' por cliente'}
                                            ></ColorScale>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        )}

                        {value === 3 && (
                            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 1.5, md: 1.5 }} sx={{ width: '100%' }}>
                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0 0 7px' }}>
                                            {valuetext(selectedRangeMeses[0]) === valuetext(selectedRangeMeses[1])
                                                ? `Datos al mes de ${valuetext(selectedRangeMeses[0])}`
                                                : `Datos en el rango ${valuetext(selectedRangeMeses[0])} - ${valuetext(selectedRangeMeses[1])}`}
                                        </h4>
                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                            <Grid size={6}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Presupuesto total</h4>
                                                    <div style={{ fontSize: 20 }}>{'$' + ejecucionPresupuestal.ppto.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                            <Grid size={6}>
                                                <div className='cart'>
                                                    <h4 style={{ margin: '0' }}>Ventas totales</h4>
                                                    <div style={{ fontSize: 20 }}>{'$' + ejecucionPresupuestal.ventas.toLocaleString('es-CO')}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid size={12}>
                                    <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0' }}>Promedio ejecución presupuestal mes a mes</h4>

                                        <div style={{ margin: '10px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                            {/* {dataPieVolumen.map((item, index) => ( */}
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#CDDE00',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data real</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '18px',
                                                    height: '3px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#F9B242',
                                                    marginRight: '10px'
                                                }}></div>
                                                <span style={{
                                                    fontSize: '14px'
                                                }}>Data predictiva</span>
                                            </div>
                                            {/* ))} */}
                                        </div>

                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            {/* <MixedBarChart data={ejecucionPresupuestalChart.data} xLabels={ejecucionPresupuestalChart.labels} color={'#CDDE00'} /> */}
                                            <ColorScale
                                                data={ejecucionPresupuestalChart.data}
                                                xLabels={ejecucionPresupuestalChart.labels}
                                                colors={{ ventas: '#CDDE00', prediccion: '#F9B242' }}
                                                tooltip={'%'}
                                            ></ColorScale>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        )}
                    </div>

                    {/* <div style={{ marginTop: '20px', textAlign: 'end' }}>
                    <Button onClick={onClose} variant="outlined">Cerrar</Button>
                </div> */}

                </div>
            )}
        </div>
    )
}

export default Modal;
