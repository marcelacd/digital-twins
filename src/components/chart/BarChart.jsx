import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';



function BasicBars() {
  const [fixMargin, setFixMargin] = React.useState(true);
  const [fixLabel, setFixLabel] = React.useState(true);

  const getColorBasedOnValue = (value) => {
    if (value > 100000000) {
      return '#FF5733'; // Rojo para valores altos
    } else if (value > 5000) {
      return '#33FF57'; // Verde para valores medianos
    } else {
      return '#3357FF'; // Azul para valores bajos
    }
  };
  
  const allValues = usAirportPassengers.flatMap(item => [item['2020'], item['2021'], item['2022']]);
  
  const colors = allValues.map(value => getColorBasedOnValue(value));

  return (

    <Box sx={{ width: '100%' }}>
      {/* <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <FormControlLabel
        checked={fixMargin}
        control={
          <Checkbox onChange={(event) => setFixMargin(event.target.checked)} />
        }
        label="fix chart margin"
        labelPlacement="end"
      />
      <FormControlLabel
        checked={fixLabel}
        control={
          <Checkbox onChange={(event) => setFixLabel(event.target.checked)} />
        }
        label="fix axis label position"
        labelPlacement="end"
      />
    </Stack> */}

      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'code',
            valueFormatter: (value, context) =>
              context.location === 'tickk'
                ? value.split('').join('\n')
                : usAirportPassengers.find((item) => item.code === value).fullName,
            label: 'airports',
            labelStyle: fixLabel
              ? {
                // Move the x-axis label with style
                transform: 'translateY(30px)',
              }
              : {},
          },
        ]}
        // Modify the margin
        margin={{top: 20, right: 5, bottom: 25, left: 55 }}
        // margin={{ top: 10, right: 5, bottom: 30, left: 10 }}
        sx={
          fixLabel
            ? {
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                // Move the y-axis label with CSS
                transform: 'translateX(-35px)',
              },
            }
            : {}
        }
        // Other props
        height={230}
        dataset={usAirportPassengers}
        // color={'#fff'}
        series={[
          // {
          //   dataKey: '2020',
          //   label: 'Zona 1',
          //   color: '#FF5733', // Color personalizado para 2020
          // },
          // {
          //   dataKey: '2021',
          //   label: 'Zona 2',
          //   color: '#33FF57', // Color personalizado para 2021
          // },
          {
            dataKey: '2022',
            label: 'Zona 3',
            color: '#FF5733', // Color personalizado para 2022
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        yAxis={[
          {
            valueFormatter: (value) => `$${(value / 1000).toLocaleString()}`,
            // label: 'passengers',
          },
        ]}
      />
    </Box>

  );
}

const usAirportPassengers = [
  {
    fullName: '3',
    code: 'Enero',
    2022: 45396001,
    // 2021: 36676010,
    // 2020: 70559866,
  },
  {
    fullName: '4',
    code: 'Febrero',
    2022: 35345138,
    // 2021: 30005266,
    // 2020: 18593421,
  },
  // {
  //   fullName: 'Marzo',
  //   code: 'Marzo',
  //   2022: 33773832,
  //   2021: 28645527,
  //   2020: 16243216,
  // },
];

export default BasicBars;