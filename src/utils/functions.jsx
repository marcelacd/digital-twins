import { ORDEN_MESES } from "./constants"

const convertirDataObjetos = (data, field) => {
    const resultado = data.slice(1).map(row => {
        return data[0].reduce((obj, header, index) => {
            const specialHeaders = [field, 'vendedor_ecom', 'r_id_vendedor']

            if (specialHeaders.includes(header)) {
                obj[header] = row[index]
            } else {
                obj[header] = parseFloat(row[index])
            }

            return obj
        }, {})
    })

    return resultado
}

// Ordenar los objetos basados en el orden de los meses
const ordenarData = (data) => {
    return data.sort((a, b) => {
        return (ORDEN_MESES[a.mes] || 0) - (ORDEN_MESES[b.mes] || 0)
    })

    // return sortedResultado
}

const calculateCentroid = (coordinates) => {
    let xSum = 0, ySum = 0

    coordinates.forEach(([y, x]) => {
        xSum += x
        ySum += y
    })

    const centerX = xSum / coordinates.length
    const centerY = ySum / coordinates.length

    return [centerY, centerX]
}

const sortCoordinatesByAngle = (coordinates) => {
    const centroid = calculateCentroid(coordinates);

    return coordinates.sort((a, b) => {
        const angleA = Math.atan2(a[0] - centroid[0], a[1] - centroid[1])
        const angleB = Math.atan2(b[0] - centroid[0], b[1] - centroid[1])
        return angleA - angleB;
    })
}

const transformarDataClientes = (clientes) => {
    const zoneMap = {}

    // Iteramos por las filas (omitimos la primera que contiene los encabezados)
    for (let i = 1; i < clientes.length; i++) {
        const [zone, cv_barrio, coord_y, coord_x] = clientes[i];

        // Si la zona no existe en el mapa, la creamos con un array vacío de coordenadas
        if (!zoneMap[zone]) {
            zoneMap[zone] = [];
        }

        // Añadimos las coordenadas a la zona correspondiente
        zoneMap[zone].push([parseFloat(coord_y), parseFloat(coord_x), cv_barrio])
    }
    return zoneMap
}

const formatNumber = (value, options = {}, suffix = '') => {
    return value.toLocaleString('es-CO', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2, 
        ...options,
    }) + (suffix ? suffix : '')
}

export { convertirDataObjetos, ordenarData, calculateCentroid, sortCoordinatesByAngle, transformarDataClientes, formatNumber }