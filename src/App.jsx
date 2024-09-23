import React, { useState, useEffect, useRef } from 'react';
import Controls from './components/controls/Controls';
import Form from './components/form/Form';
import Modal from './components/modal/Modal';
import './App.css';
import { executeAthenaQuery } from './services/athenaService.js';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [dataCiudad, setDataCiudad] = useState({})
  const [selectMesesSQL, setSelectMesesSQL] = useState(`'JUN'`)
  const [uncheckedZones, setUncheckedZones] = React.useState([]);
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedZona, setSelectedZona] = useState('')
  const iframeRef = useRef(null)

  const [ventaVolumenes, setVentaVolumenes] = useState({})
  const [referencias, setReferencias] = useState({})
  const [ejecucionPresupuestal, setEjecucionPresupuestal] = useState({})
  const [efectividadVentas, setEfectividadVentas] = useState({})

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const changeMeses = (meses) => {
    setSelectMesesSQL(meses)
  }

  const changeUncheckedZones = (zonas) => {
    setUncheckedZones(zonas)
  }

  // function calculateCentro(coordinates) {
  //   const latitudes = []
  //   const longitudes = []

  //   coordinates.map(a => {
  //     latitudes.push(a[0])
  //     longitudes.push(a[1])
  //   })

  //   const centro_mapa = [
  //     (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
  //     (Math.min(...longitudes) + Math.max(...longitudes)) / 2
  //   ]
  //   return centro_mapa
  // }

  function calculateCentroid(coordinates) {
    let xSum = 0, ySum = 0

    coordinates.forEach(([y, x]) => {
      xSum += x
      ySum += y
    })

    const centerX = xSum / coordinates.length
    const centerY = ySum / coordinates.length

    return [centerY, centerX]
  }
  function sortCoordinatesByAngle(coordinates) {
    const centroid = calculateCentroid(coordinates);

    return coordinates.sort((a, b) => {
      const angleA = Math.atan2(a[0] - centroid[0], a[1] - centroid[1])
      const angleB = Math.atan2(b[0] - centroid[0], b[1] - centroid[1])
      return angleA - angleB;
    })
  }
  function transformarDataZonas(zonas, clientes) {
    const result = []
    const zoneMap = {}

    // Iteramos por las filas (omitimos la primera que contiene los encabezados)
    for (let i = 1; i < zonas.length; i++) {
      const [zone, coord_y, coord_x] = zonas[i];

      // Si la zona no existe en el mapa, la creamos con un array vacío de coordenadas
      if (!zoneMap[zone]) {
        zoneMap[zone] = [];
      }

      // Añadimos las coordenadas a la zona correspondiente
      zoneMap[zone].push([parseFloat(coord_y), parseFloat(coord_x)]);
    }

    Object.keys(zoneMap).forEach((zone, index) => {
      const centroZona = calculateCentroid(zoneMap[zone])
      const sortedCoordinates = sortCoordinatesByAngle(zoneMap[zone])
      // const calculate = calculateCentro(zoneMap[zone])

      result.push({
        code: zone,
        height: `${index + 1}00`,
        flyLocation: {
          // lon: calculate[1],
          // lat: calculate[0],
          lon: [centroZona[1]],
          lat: [centroZona[0]],
          height: 6000,
          heading: 0, // o cualquier dirección deseada
          pitch: -90, // Para mirar completamente hacia abajo
          name: ''
        },
        coordinate: sortedCoordinates,
        idClient: `client${index + 1}`,
        client: transformarDataClientes(clientes)[zone],
      })
    })

    return result
  }
  function transformarDataClientes(clientes) {
    const zoneMap = {};

    // Iteramos por las filas (omitimos la primera que contiene los encabezados)
    for (let i = 1; i < clientes.length; i++) {
      const [zone, cv_barrio, coord_y, coord_x] = clientes[i];

      // Si la zona no existe en el mapa, la creamos con un array vacío de coordenadas
      if (!zoneMap[zone]) {
        zoneMap[zone] = [];
      }

      // Añadimos las coordenadas a la zona correspondiente
      zoneMap[zone].push([parseFloat(coord_y), parseFloat(coord_x), cv_barrio]);
    }
    return zoneMap
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

    const consolidado = resultado.reduce((acumulador, item) => {
      acumulador.ventas_kg += item.ventas_kg;
      acumulador.ventas_un += item.ventas_un;
      acumulador.ventas_eco += item.ventas_eco;
      return acumulador;
    }, {
      ventas_kg: 0,
      ventas_un: 0,
      ventas_eco: 0,
    })

    setVentaVolumenes({
      data: resultado,
      consolidado
    })
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

    const consolidado = resultado.reduce((acumulador, item) => {
      acumulador.referencias_total += item.referencias_total;
      return acumulador;
    }, {
      referencias_total: 0,
    })

    setReferencias({
      data: resultado,
      consolidado: consolidado.referencias_total
    })
  }

  function transformarDataEjecucionPresupuestal(data) {
    const headers = data[0]

    // Convertir los datos en objetos
    const resultado = data.slice(1).map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
        return obj
      }, {})
    })

    const consolidado = resultado.reduce((acumulador, item) => {
      acumulador.ejecucion_presupuestal_total += item.ejecucion_presupuestal;
      acumulador.ejecucion_presupuestal_count += 1;
      return acumulador;
    }, {
      ejecucion_presupuestal_total: 0,
      ejecucion_presupuestal_count: 0
    })
    const promedioEjecucion = consolidado.ejecucion_presupuestal_total / consolidado.ejecucion_presupuestal_count;

    setEjecucionPresupuestal({
      data: resultado,
      consolidado: promedioEjecucion
    })
  }

  function transformarDataVentasPlanEfec(vPlaneadas, vEfectivas) {
    const headersPlan = vPlaneadas[0]
    // Convertir los datos en objetos
    const resultadoPlan = vPlaneadas.slice(1).map(row => {
      return headersPlan.reduce((obj, header, index) => {
        obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
        return obj
      }, {})
    })

    const headersEfe = vEfectivas[0]
    // Convertir los datos en objetos
    const resultadoEfe = vEfectivas.slice(1).map(row => {
      return headersEfe.reduce((obj, header, index) => {
        obj[header] = header === 'zona' ? row[index] : parseFloat(row[index])
        return obj
      }, {})
    })

    //Sacar el promedio de efectividad
    const efectividadVentas = resultadoPlan.map(resPlan => {
      const resEfe = resultadoEfe.find(r => r.zona === resPlan.zona);

      if (resEfe) {
        return {
          zona: resPlan.zona,
          efectividad: (resEfe.ventas_efectivas_mensual / resPlan.ventas_planeadas_mensual) * 100
        }
      }
      return null;
    }).filter(item => item !== null)

    //Consolidaddo de efectividad
    const consolidado = efectividadVentas.reduce((acumulador, item) => {
      acumulador.efectividad_total += item.efectividad;
      acumulador.efectividad_count += 1;
      return acumulador;
    }, {
      efectividad_total: 0,
      efectividad_count: 0
    })
    const promedioEfectividad = consolidado.efectividad_total / consolidado.efectividad_count;

    setEfectividadVentas({
      data: efectividadVentas,
      consolidado: promedioEfectividad
    })
  }

  function ajustarConsulta(queryBase) {
    if (uncheckedZones.length > 0) {
      queryBase += ` AND zona NOT IN (${uncheckedZones.map(zona => `'${zona}'`).join(', ')})`
    }
    return queryBase += `GROUP BY zona`
  }

  // useEffect para añadir el listener al cargar el componente
  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data
      if (data.type === 'selectedZona') {
        setSelectedZona(data.value)
        openModal()
      }
    }
    window.addEventListener('message', handleMessage);
    // Cleanup function para eliminar el listener al desmontar el componente
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [])

  // useEffect para cargar la data por primera vez
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryClientes = `SELECT DISTINCT zona, cv_barrio, coord_y, coord_x FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."maestra"`
        const queryZonas = `SELECT DISTINCT zona, coord_y, coord_x FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."zonas"`
        // SELECT DISTINCT zona, coord_y, coord_x FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."zonas" WHERE zona NOT IN ('TDBC Libertador')

        const [
          respuestaQueryClientes,
          respuestaQueryZonas,
        ] = await Promise.all([
          executeAthenaQuery(queryClientes),
          executeAthenaQuery(queryZonas),
        ])
        // const response = await executeAthenaQuery(query);)

        // Data para pintar poligonos y clientes
        const dataZonasCiudad = {
          BG: {
            code: 'BG',
            name: 'Bogota',
            flyLocation: {
              lon: -74.1561,
              lat: 4.4610,
              height: 15100,
              heading: 4.360248260903442,
              pitch: -42.55796,
              name: ''
            },
            zone: transformarDataZonas(respuestaQueryZonas, respuestaQueryClientes)
          }
        }
        setDataCiudad(dataZonasCiudad)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []) // Ejecutar solo una vez al cargar el componente

  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryVolumenes = `SELECT zona, 
                              SUM(venta_neta_acum_ano_actual_kg) AS ventas_kg,
                              SUM(venta_neta_acum_ano_actual_un) AS ventas_un, 
                              SUM(venta_neta_acum_ano_actual_eco) AS ventas_eco
                              FROM "digital-twins-nutresa-glue-db"."ventas"
                              WHERE mes IN (${selectMesesSQL})`
        queryVolumenes = ajustarConsulta(queryVolumenes)

        let queryReferencias = `SELECT zona, AVG(conteo_referencias) AS referencias_total FROM (
                                  SELECT zona, mes, vendedor_ecom, nombre_comercial, COUNT(descripcion_material) AS conteo_referencias
                                  FROM (SELECT DISTINCT zona, mes, descripcion_material, nombre_comercial, vendedor_ecom
                                  FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                                  WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                                  GROUP BY zona, mes, vendedor_ecom, nombre_comercial) AS referencias_por_cliente_vendedor 
                                  WHERE mes  IN (${selectMesesSQL})`
        queryReferencias = ajustarConsulta(queryReferencias)

        let queryEjePresupuestal = `SELECT zona, (SUM(venta_neta_acum_ano_actual_eco) / SUM(ppto_neta_acum_ano_actual_eco)) * 100 AS ejecucion_presupuestal
                                            FROM "digital-twins-nutresa-glue-db"."ventas" WHERE mes IN (${selectMesesSQL})`
        queryEjePresupuestal = ajustarConsulta(queryEjePresupuestal)

        //Ajustar filtro de meses
        let queryVentasPlaneadas = `SELECT zona, COUNT(cv_nombre_completo_cliente) * 4 AS ventas_planeadas_mensual
                                      FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."maestra" WHERE mes IN ('Junio')`
        queryVentasPlaneadas = ajustarConsulta(queryVentasPlaneadas)

        let queryVentasEfectivas = `SELECT zona, SUM(ventas_efectivas_semanal) AS ventas_efectivas_mensual FROM (
                                      SELECT mes, zona, vendedor_ecom, COUNT(nombre_comercial) AS ventas_efectivas_semanal
                                      FROM (SELECT DISTINCT mes, zona, semana, nombre_comercial, vendedor_ecom
                                      FROM "AwsDataCatalog"."digital-twins-nutresa-glue-db"."ventas"
                                      WHERE venta_neta_acum_ano_actual_eco > 0) AS ventas_distintivas
                                      GROUP BY mes, zona, vendedor_ecom) AS ventas_semanal
                                      WHERE mes IN ('JUN')`
        queryVentasEfectivas = ajustarConsulta(queryVentasEfectivas)

        const [
          respuestaVolumenes,
          respuestaReferencias,
          respuestaEjePresupuestal,
          respuestaVentasPlaneadas,
          respuestaVentasEfectivas,
        ] = await Promise.all([
          executeAthenaQuery(queryVolumenes),
          executeAthenaQuery(queryReferencias),
          executeAthenaQuery(queryEjePresupuestal),
          executeAthenaQuery(queryVentasPlaneadas),
          executeAthenaQuery(queryVentasEfectivas),
        ])

        transformarDataVolumenes(respuestaVolumenes)
        transformarDataReferencias(respuestaReferencias)
        transformarDataEjecucionPresupuestal(respuestaEjePresupuestal)
        transformarDataVentasPlanEfec(respuestaVentasPlaneadas, respuestaVentasEfectivas)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()

  }, [selectMesesSQL, uncheckedZones])


  // useEffect para enviar la data al iframe una vez que dataCiudad cambie
  useEffect(() => {
    if (iframeRef.current && Object.entries(dataCiudad).length) {
      iframeRef.current.contentWindow.postMessage({
        codeCity: 'BG',
        value: dataCiudad['BG'],
      }, '*');
    }
  }, [dataCiudad]);

  // Enviar mensajes a cesio iframe
  const sendMessageToIframe = (message) => {
    if (iframeRef.current) {
      const iframeElement = iframeRef.current;
      iframeElement.contentWindow?.postMessage(message, "*");
    }
  }

  return (
    <div className="app">
      <div className="abso" style={{ position: 'relative' }}>
        <div className="rel">
          <Form />
        </div>
      </div>

      <div className="controls">
        <Controls
          sendMessageToIframe={sendMessageToIframe}
          dataCiudad={dataCiudad}
          ventaVolumenes={ventaVolumenes}
          ejecucionPresupuestal={ejecucionPresupuestal}
          referencias={referencias}
          efectividadVentas={efectividadVentas}
          changeMeses={changeMeses}
          changeUncheckedZones={changeUncheckedZones}
        />
      </div>

      <iframe className='iframe' src="map/index.html" title="map" width="100%" height="100%" ref={iframeRef}></iframe>

      {isModalOpen && <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedZona={selectedZona}
        ventaVolumenes={ventaVolumenes}
        selectMesesSQL={selectMesesSQL}
      />}
    </div>
    // loading
    //   ? (
    //     <div className="contenedor-loader" >
    //       Cargando contenido...
    //       <div>
    //       <span className="loader"></span>
    //     </div>
    //     </div>
    //   )
    //   : (
    //     <div className="app">
    //       <div className="abso" style={{ position: 'relative' }}>
    //         <div className="rel">
    //           <Form />
    //         </div>
    //       </div>

    //       <div className="controls">
    //         <Controls
    //           sendMessageToIframe={sendMessageToIframe}
    //           dataCiudad={dataCiudad}
    //           ventaVolumenes={ventaVolumenes}
    //           ejecucionPresupuestal={ejecucionPresupuestal}
    //           referencias={referencias}
    //           efectividadVentas={efectividadVentas}
    //           changeMeses={changeMeses}
    //         />
    //       </div>

    //       <iframe className='iframe' src="map/index.html" title="map" width="100%" height="100%" ref={iframeRef}></iframe>

    //       {isModalOpen && <Modal
    //         isOpen={isModalOpen}
    //         onClose={closeModal}
    //         selectedZona={selectedZona}
    //         ventaVolumenes={ventaVolumenes}
    //         selectMesesSQL={selectMesesSQL}
    //       />}
    //     </div>
    //   )
  )
}

export default App;
