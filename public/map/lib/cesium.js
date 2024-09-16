import route from './route.js'
import heatMapData from './heatmapData.js'

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMWQ0NjcwZi1mYTY2LTRhYzEtOWM1NS0wOTc4YjA3MjM3ZjIiLCJpZCI6MTczMzQ5LCJpYXQiOjE2OTgwNTE5NzJ9.y-PuQVtDcv_MxaYk-k0IL0oiWX0Dwk4KNywLq73UiFQ';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
var viewer;
let globe;

let data1 = {}


// Oyente del padre
window.addEventListener('message', (event) => {
    let interval;
    clearInterval(interval)
    const data = event.data

    // addHeatMap(heatMapData.extent, heatMapData.data, 100, 'heatmap')

    if (data.codeCity && data.value) {
        data1 = data.value

        removeEntities('zona')
        flyToLocation(
            data.value.flyLocation.lon,
            data.value.flyLocation.lat,
            data.value.flyLocation.height,
            data.value.flyLocation.heading,
            data.value.flyLocation.pitch,
            data.value.flyLocation.name,
            8
        );
        addPolygon()

        //Mapa de calor
        // addHeatMap(heatMapData.extent, heatMapData.data, 100, 'heatmap')
    }

    if (data.type && data.value) {
        data1.zone.forEach(zone => {
            if (zone.code === data.type) {
                flyToLocation(
                    zone.flyLocation.lon,
                    zone.flyLocation.lat,
                    zone.flyLocation.height,
                    zone.flyLocation.heading,
                    zone.flyLocation.pitch,
                    zone.flyLocation.name,
                    6
                )
            }
            if (zone.idClient === data.type) {
                // addClients(clientes1,)
                addClients(zone.client, data.type)
            }
        })
    }

    if (data.type === 'delete') {
        removeEntities(data.value);
    }

    // switch (data.type) {
    //     // case 'billboard':
    //     //     addBillboardWithGuideline(-74.10649740060114, 4.604822960572272, 2650, "assets/icons/warning.png", "Alert", "billboard")
    //     //     flyToLocation(-74.10753627935567, 4.6021693827515575, 2904.178188038059, 4.360248260903442, -42.55796094369222, "", 8)
    //     //     break;
    //     // case 'heatmap':
    //     //     flyToLocation(-74.09604840545734, 4.67266889349088, 3039.1739047750702, 16.973625630440463, -69.91310993745206, "", 8)
    //     //     addHeatMap(heatMapData.extent, heatMapData.data, 100, 'heatmap')
    //     //     break;
    //     case 'delete':
    //         // removeEntities(data.value);
    //         break;
    //     default:
    //         break;
    // }
});

// Enviar mensaje a los padres
function sendMessageToParent(message) {
    console.log(message)
    window.parent.postMessage(message, '*');
}

// Enviar mensaje a cesium
function sendMessageToCesium(message) {
    console.log(message)
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
        timeline: false,  // Ocultar la barra de tiempo
        animation: false,  // Ocultar los controles de animación
    });

    var element = document.getElementById('cesiumContainer');
    viewer.cesiumWidget.creditContainer.style.display = 'none'; //Ocultar letrero cesium

    //Restringir la distancia del zoom en metros
    // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 300;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000
    viewer.forceResize();

    // const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
    // const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    // viewer.scene.primitives.add(tileset);

    globe = viewer.scene.globe;
    globe.depthTestAgainstTerrain = true;


    // Crear el div del tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    document.body.appendChild(tooltip);

    // Estilos para el tooltip
    tooltip.style.display = 'none';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#0b2c1fd4';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '20%';
    tooltip.style.fontWeight = '600'

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // Controlador de la acción de clic izquierdo
    handler.setInputAction(function (click) {
        var pickedObject = viewer.scene.pick(click.position)
        console.log(pickedObject)
        console.log(pickedObject.id)

        if (pickedObject && pickedObject.id && pickedObject?.id?.idname) {
            console.log(pickedObject.id)
            sendMessageToParent({ type: 'zonaSelected', value: pickedObject.id.idname });
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // Controlador de la acción de hacer clic con el botón derecho
    const points = [];
    handler.setInputAction(function (click) {
        var cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            points.push([latitude, longitude])
            console.log(points);
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // Controlador de la acción de mover el ratón
    handler.setInputAction(function (movement) {
        var pickedObject = viewer.scene.pick(movement.endPosition);
        console.log(pickedObject)
        if (Cesium.defined(pickedObject) && (pickedObject.id)) {
            viewer.scene.canvas.style.cursor = 'pointer';
        } else {
            viewer.scene.canvas.style.cursor = 'default';
        }
        if (Cesium.defined(pickedObject) && (pickedObject.id) && (pickedObject.id.clientName)) {
            // Estilos del tooltip
            element.style.cursor = 'pointer';
            tooltip.style.display = 'flex';
            tooltip.style.flexDirection = 'row';
            tooltip.style.alignItems = 'center';
            tooltip.style.gap = '10px';
            tooltip.style.color = 'rgba(255, 255, 255, 0.817)';
            tooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            tooltip.style.border = `1px solid #ccc`;
            tooltip.style.borderRadius = '1rem';
            // if (pickedObject.id._name === 'circle') {
            tooltip.style.color = 'black';
            tooltip.style.border = `1px solid black`;
            tooltip.innerHTML = pickedObject.id.clientName;
            // }

            // Obtiene las coordenadas para colocar el tooltip
            var x = movement.endPosition.x;
            var y = movement.endPosition.y;
            // Configuración de la posición del tooltip
            tooltip.style.left = (x + 10) + 'px';
            tooltip.style.top = (y - 30) + 'px';

        } else {
            element.style.cursor = 'default';
            tooltip.style.display = 'none';
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

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
    console.log(data1)
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        duration: duration,
        complete: () => {
            sendMessageToCesium({ type: 'flyToCompleted', value: name });
        },
        orientation: {
            heading: Cesium.Math.toRadians(heading),
            pitch: Cesium.Math.toRadians(pitch),
        }
    });
}

let colors = [
    {
        color: Cesium.Color.ORANGE
    },
    {
        color: Cesium.Color.PURPLE
    },
    {
        color: Cesium.Color.RED
    }
]

// Añadir polígonos para cada zona
const addPolygon = () => {
    data1.zone.forEach((zone, index) => {
        // Convertir las coordenadas de latitud y longitud a Cesium.Cartesian3
        const positions = zone.coordinate.map(function (coord) {
            return Cesium.Cartesian3.fromDegrees(coord[1], coord[0]);
        });

        // Agregar la nueva entidad y almacenar la referencia
        const entity = viewer.entities.add({
            name: 'zona',
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(positions),
                outline: false,
                // outlineColor: zone.color, // Cambia el color del contorno aquí
                // outlineWidth: 2, // Ancho del contorno
                material: colors[index].color.withAlpha(0.5),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                extrudedHeight: zone.height,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            idname: zone.code,
        })
    })
}

//Añadir puntos de geolocalización para los clientes
const addClients = (clients, type) => {
    clients.forEach(function (coord) {
        viewer.entities.add({
            // name: coord[2],
            position: Cesium.Cartesian3.fromDegrees(coord[1], coord[0]), // Invierte los valores a (longitud, latitud)
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
    console.log(type)
    viewer.entities.values.forEach(entity => {
        console.log(entity)
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

// Añadir heatmap
const addHeatMap = (extent, data, radius, id) => {
    console.log('Mapa')
    // init heatmap
    let heatMap = CesiumHeatmap.create(
        viewer, // your cesium viewer
        extent, // bounds for heatmap layer
        {
            // heatmap.js options go here
            radius: radius,
            maxOpacity: 0.55,
            minOpacity: 0.2,
            blur: 0.65,
            gradient: {
                // enter n keys between 0 and 1 here
                // for gradient color customization
                '.0': 'blue',
                '.65': 'green',
                '.75': 'yellow',
                '.80': 'red'
            }
        },
        id
    );

    let valueMin = 0;
    let valueMax = 100;

    // Asignar un valor de intensidad predeterminado (ejemplo: 50)
    // const heatmapData = coordinates.map(coord => ({
    //     x: coord[1], // Longitud
    //     y: coord[0], // Latitud
    //     value: 50 // Intensidad fija para todos los puntos
    // }));

    // Asignar data al heatMap
    heatMap.setWGS84Data(valueMin, valueMax, data);
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

// Obtener un color diferente en función del valor
const getColorByValue = (value, opacity) => {
    // Asegurémonos de que el valor esté en el rango de 0 a 100
    value = Math.min(Math.max(value, 0), 40);

    let red, green;

    if (value < 50) {
        // En la primera mitad del rango (0-49), vamos de verde a naranja
        red = Math.floor(255 * (50 - value) / 50);
        green = 255;
    } else {
        // En la segunda mitad del rango (50-100), vamos de naranja a rojo
        red = 255;
        green = Math.floor(255 * (100 - value) / 50);
    }

    // Construimos el color en formato RGB
    const color = `rgb(${red}, ${green}, 0, ${opacity})`;

    const cesiumColor = Cesium.Color.fromCssColorString(color);
    return cesiumColor;
}

// Añadir una entidad de imagen con una valla publicitaria y una directriz al suelo
const addBillboardWithGuideline = (lon, lat, height, img, text = null, name = null) => {
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    const bottomPosition = Cesium.Cartesian3.fromDegrees(lon, lat, 0);
    const billboard = viewer.entities.add({
        name: name,
        position: position,
        label: {
            font: '16pt sans-serif',
            text: text,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            fillColor: Cesium.Color.BLACK,
            showBackground: true,
            backgroundColor: Cesium.Color.WHITE.withAlpha(0.8),
            backgroundPadding: new Cesium.Cartesian2(10, 6),
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0.0, -50.0)
        },
        billboard: {
            image: img,
            show: true, // default
            scale: 0.4, // default: 1.0
            color: Cesium.Color.WHITE,
        },
        polyline: {
            positions: [position, bottomPosition],
            width: 2,
            material: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.RED,
                outlineWidth: 3,
                outlineColor: Cesium.Color.WHITE,
            }),
        }
    });
}






