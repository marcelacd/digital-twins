Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMWQ0NjcwZi1mYTY2LTRhYzEtOWM1NS0wOTc4YjA3MjM3ZjIiLCJpZCI6MTczMzQ5LCJpYXQiOjE2OTgwNTE5NzJ9.y-PuQVtDcv_MxaYk-k0IL0oiWX0Dwk4KNywLq73UiFQ';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
var viewer;
let globe;
let dataByCiudad = {}


// Oyente del padre
window.addEventListener('message', (event) => {
    let interval
    clearInterval(interval)
    const data = event.data

    // addHeatMap(heatMapData.extent, heatMapData.data, 100, 'heatmap')

    //Acciones al cargar el cesium
    if (data.codeCity && data.value) {
        dataByCiudad = data.value

        removeEntities('zona')
        //Volar a la ubicacion de la ciudad
        flyToLocation(
            data.value.flyLocation.lon,
            data.value.flyLocation.lat,
            data.value.flyLocation.height,
            data.value.flyLocation.heading,
            data.value.flyLocation.pitch,
            data.value.flyLocation.name,
            8
        )
        //Pintar todos los poligonos al cargar el cesium
        addPolygonos()
    }

    //Acciones configuradas
    if (data.type && data.value) {
        dataByCiudad.zone.forEach(zone => {
            if (zone.code === data.type) {
                data.fly
                    //Volar a la ubicacion de una zona
                    ? flyToLocation(
                        zone.flyLocation.lon,
                        zone.flyLocation.lat,
                        zone.flyLocation.height,
                        zone.flyLocation.heading,
                        zone.flyLocation.pitch,
                        zone.flyLocation.name,
                        6
                    )
                    //Pintar un poligono
                    : addPolygon(data.type)
            }
            if (zone.idClient === data.type) {
                addClients(zone.client, data.type)
            }
        })
    }

    if (data.type === 'delete') {
        removeEntities(data.value)
    }
})

// Enviar mensaje a los padres
function sendMessageToParent(message) {
    window.parent.postMessage(message, '*');
}

// Enviar mensaje a cesium
function sendMessageToCesium(message) {
    window.postMessage(message, '*');
}

try {
    //Configuracion vista cesium
    viewer = new Cesium.Viewer("cesiumContainer", {
        // terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
        requestVertexNormals: true,
        animation: true,
        vrButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        navigationHelpButton: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        timeline: false,
        animation: false,
    })

    var element = document.getElementById('cesiumContainer');
    viewer.cesiumWidget.creditContainer.style.display = 'none'; //Ocultar letrero cesium

    //Restringir la distancia del zoom en metros
    // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 300;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 60000
    viewer.forceResize();

    // const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
    // const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    // viewer.scene.primitives.add(tileset);

    globe = viewer.scene.globe
    globe.depthTestAgainstTerrain = true


    // Crear el div del tooltip
    const tooltip = document.createElement('div')
    tooltip.id = 'tooltip'
    document.body.appendChild(tooltip)

    // Estilos para el tooltip
    tooltip.style.display = 'none'
    tooltip.style.position = 'absolute'
    tooltip.style.backgroundColor = '#0b2c1fd4'
    tooltip.style.padding = '10px'
    tooltip.style.borderRadius = '20%'
    tooltip.style.fontWeight = '600'


    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // Controlador de la acción de clic izquierdo
    handler.setInputAction(function (click) {
        var pickedObject = viewer.scene.pick(click.position)

        if (pickedObject && pickedObject.id && pickedObject?.id?.idname) {
            sendMessageToParent({ type: 'selectedZona', value: pickedObject.id.idname });
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // Controlador de la acción de hacer clic con el botón derecho
    // const points = [];
    // handler.setInputAction(function (click) {
    //     var cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
    //     if (cartesian) {
    //         var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    //         var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    //         var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    //         points.push([latitude, longitude])
    //     }
    // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // Controlador de la acción de mover el ratón
    handler.setInputAction(function (movement) {
        var pickedObject = viewer.scene.pick(movement.endPosition)
        if (Cesium.defined(pickedObject) && (pickedObject.id)) {
            viewer.scene.canvas.style.cursor = 'pointer'
        } else {
            viewer.scene.canvas.style.cursor = 'default'
        }
        if (Cesium.defined(pickedObject) && (pickedObject.id) && (pickedObject.id.clientName)) {
            // Estilos del tooltip
            element.style.cursor = 'pointer'
            tooltip.style.display = 'flex'
            tooltip.style.flexDirection = 'row'
            tooltip.style.alignItems = 'center'
            tooltip.style.gap = '10px'
            tooltip.style.color = 'rgba(255, 255, 255, 0.817)'
            tooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.92)'
            // tooltip.style.border = `1px solid #ccc`
            tooltip.style.borderRadius = '1rem'
            tooltip.style.fontSize = '12px'
            // if (pickedObject.id._name === 'circle') {
            tooltip.style.color = 'black';
            tooltip.style.border = `1px solid black`;
            tooltip.innerHTML = pickedObject.id.clientName;
            // }

            // Obtiene las coordenadas para colocar el tooltip
            var x = movement.endPosition.x
            var y = movement.endPosition.y
            // Configuración de la posición del tooltip
            tooltip.style.left = (x + 10) + 'px'
            tooltip.style.top = (y - 30) + 'px'
        } else {
            element.style.cursor = 'default'
            tooltip.style.display = 'none'
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

} catch (error) {
    console.log(error);
}

const flyCamera = () => {
    // Volar camera donde estan las zonas en Bogotá
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-74.10434711548491, 4.621977236808532, 7814.439181102958),
        duration: 10,
        orientation: {
            heading: Cesium.Math.toRadians(352.06083567832485), // Dirección hacia donde vuela
            pitch: Cesium.Math.toRadians(-71.05209883685313), // Durante el vuelo, mira directamente hacia abajo
        },
        complete: () => {
            viewer.camera.flyTo({
                destination: viewer.camera.position, // Mantenemos la posición actual
                // duration: 3,
                orientation: {
                    heading: Cesium.Math.toRadians(352.06083567832485),
                    pitch: Cesium.Math.toRadians(-43.55796), // Inclinación final a -30 grados
                }
            })
        }
    })
}

// Volar a un lugar determinado
const flyToLocation = (lon, lat, height, heading, pitch, name, duration = 0) => {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        duration: duration,
        orientation: {
            heading: Cesium.Math.toRadians(heading),
            pitch: Cesium.Math.toRadians(pitch),
        },
        complete: () => {
            sendMessageToCesium({ type: 'flyToCompleted', value: name });
        },
    })
}

// Función reutilizable para crear el polígono
const createPolygon = (zone) => {
    // Convertir las coordenadas de latitud y longitud a Cesium.Cartesian3
    const positions = zone.coordinate.map(coord => Cesium.Cartesian3.fromDegrees(coord[1], coord[0]));

    return viewer.entities.add({
        name: zone.code,
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            outline: false,
            material: Cesium.Color.fromCssColorString(zone.color).withAlpha(0.7),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            extrudedHeight: zone.height,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
        idname: zone.code
    })
}

// Pintar todas las zonas
const addPolygonos = () => {
    dataByCiudad.zone.forEach((zone) => {
        createPolygon(zone)
    })
}

// Pintar una zona específica
const addPolygon = (typeZona) => {
    dataByCiudad.zone.forEach((zone) => {
        if (zone.code === typeZona) {
            createPolygon(zone)
        }
    })
}

//Añadir puntos de geolocalización para los clientes
const addClients = (clients, type) => {
    clients.forEach(function (coord) {
        const entity = viewer.entities.add({
            // name: coord[2],
            position: Cesium.Cartesian3.fromDegrees(coord[1], coord[0]),
            point: {
                pixelSize: 10,
                color: Cesium.Color.BLUE,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
            },
            clientName: coord[2], // Guardamos el nombre del cliente
            type: type
        })
    })
}

// Eliminar entidades por tipo
const removeEntities = (type) => {
    const entitiesToRemove = []
    viewer.entities.values.forEach(entity => {
        if (entity.name === type) {
            entitiesToRemove.push(entity)
        }
        if (entity.type === type) {
            entitiesToRemove.push(entity)
        }
    })
    entitiesToRemove.forEach(item => {
        viewer.entities.remove(item)
    })
}

// consola registra la posición de la cámara (long lat) y la rotación en movimiento
viewer.camera.moveStart.addEventListener(function () {
    const position = viewer.camera.positionCartographic;
    const longitude = Cesium.Math.toDegrees(position.longitude);
    const latitude = Cesium.Math.toDegrees(position.latitude);
    const height = position.height;
    const heading = Cesium.Math.toDegrees(viewer.camera.heading);
    const pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
    // console.log(longitude, latitude, height, heading, pitch);
})

// //Pintar todas las zonas
// const addPolygonos = () => {
//     dataByCiudad.zone.forEach((zone, index) => {
//         // Convertir las coordenadas de latitud y longitud a Cesium.Cartesian3
//         const positions = zone.coordinate.map(function (coord) {
//             return Cesium.Cartesian3.fromDegrees(coord[1], coord[0]);
//         })

//         const entity = viewer.entities.add({
//             name: zone.code,
//             polygon: {
//                 hierarchy: new Cesium.PolygonHierarchy(positions),
//                 outline: false,
//                 // outlineColor: zone.color, // Cambia el color del contorno aquí
//                 // outlineWidth: 2, // Ancho del contorno
//                 material: colors[index].color.withAlpha(0.7),
//                 heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//                 extrudedHeight: zone.height,
//                 disableDepthTestDistance: Number.POSITIVE_INFINITY
//             },
//             idname: zone.code,
//         })
//     })
// }






