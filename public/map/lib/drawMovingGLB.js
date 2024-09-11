export function drawMovingRectangle(viewer, geojson, name, scale) {

  // Get all coordinates from the circuit
  const coordinateList = geojson.features[0].geometry.coordinates;
  const positions = [];
  var totalDistance = 0;
  for (let i = 0; i < coordinateList.length - 1; i++) {
    const start = Cesium.Cartesian3.fromDegrees(coordinateList[i][0], coordinateList[i][1]);
    const end = Cesium.Cartesian3.fromDegrees(coordinateList[i + 1][0], coordinateList[i + 1][1]);

    const distance = Cesium.Cartesian3.distance(start, end);
    totalDistance += distance;
    const duration = distance / 55;
    positions.push({ start: start, end: end, duration: duration });
  }

  //Make sure viewer is at the desired time.
  // start = now
  const start = Cesium.JulianDate.fromDate(new Date());
  const totalSeconds = 1500;
  const stop = Cesium.JulianDate.addSeconds(
    start,
    totalSeconds,
    new Cesium.JulianDate()
  );
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
  viewer.timeline.zoomTo(start, stop);
  // Create a path for our vehicle by lerping between two positions.
  const position = new Cesium.SampledPositionProperty();


  // A velocity vector property will give us the entity's speed and direction at any given time.
  const velocityVectorProperty = new Cesium.VelocityVectorProperty(
    position,
    false
  );
  const velocityVector = new Cesium.Cartesian3();

  const numberOfSamples = 100;
  const stepDuration = totalSeconds / positions.length;

  for (let j = 0; j < positions.length; j++) {
    let stepStart = Cesium.JulianDate.addSeconds(
      start,
      j * stepDuration,
      new Cesium.JulianDate()
    );
    for (let i = 0; i <= numberOfSamples; ++i) {
      const factor = (i / numberOfSamples);

      const time = Cesium.JulianDate.addSeconds(
        stepStart,
        factor * stepDuration,
        new Cesium.JulianDate()
      );



      // Lerp using a non-linear factor so that the vehicle accelerates.
      const locationFactor = Math.pow(factor, 1);
      const location = Cesium.Cartesian3.lerp(
        positions[j].start,
        positions[j].end,
        locationFactor,
        new Cesium.Cartesian3()
      );
      position.addSample(time, location);
      // Rotate the wheels based on how fast the vehicle is moving at each timestep.
      velocityVectorProperty.getValue(time, velocityVector);


    }
  }

  // Add our vehicle model.
  const starEntity = viewer.entities.add({
    id: name,
    name: name,
    position: position,
    orientation: new Cesium.VelocityOrientationProperty(position), // Automatically set the vehicle's orientation to the direction it's facing.
    model: {
      uri: `./assets/glbs/kayak.glb`,
      scale: scale,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      clampToGround: true
    },
    viewFrom: new Cesium.Cartesian3(0, 45, 1200),
  });

  // if the viewer clock is not running, start it so that the animation is running
  viewer.clock.shouldAnimate = true;

}
