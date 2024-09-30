import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

function valuetext(value) {
    const month = months.find(month => month.value === value);
    return month ? month.label : '';
}

export default function RangeSlider({ handleChangeMeses }) {
    const [selectedRange, setSelectedRange] = React.useState([6, 6])

    const handleChange = (event, newValue) => {
        const convertir = {
            1: 'Enero',
            2: 'Febrero',
            3: 'Marzo',
            4: 'Abril',
            5: 'Mayo',
            6: 'Junio',
            7: 'Julio',
            8: 'Agosto',
            9: 'Septiembre',
            10: 'Octubre',
            11: 'Noviembre',
            12: 'Ddiciembre',
        }

        const fullRange = []
        for (let i = newValue[0]; i <= newValue[1]; i++) {
            fullRange.push(convertir[i])
        }

        handleChangeMeses({fullRange, newValue})
        setSelectedRange(newValue)
    };

    const getAriaLabel = (index) => {
        return `Month ${valuetext(selectedRange[index])}`;
    };

    return (
        <>
            <Box sx={{ width: '90%' }}>
                <Slider
                    value={selectedRange}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={4}
                    max={6}
                    step={1} // Step size of 1 for each month
                    marks={months}
                    // marks// Show all months
                    getAriaLabel={getAriaLabel} // Aria label based on month names
                    sx={{
                        '& .MuiSlider-thumb': {
                            color: '#3BB6A7',
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#3BB6A7',
                            border: 'none'
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#3BB6A7',
                        },
                    }}
                />
                <hr />
                <div style={{ marginTop: 20 }}><strong>
                    {valuetext(selectedRange[0]) === valuetext(selectedRange[1])
                        ? `Datos al mes de ${valuetext(selectedRange[0])}`
                        : `Datos en el rango ${valuetext(selectedRange[0])} - ${valuetext(selectedRange[1])}`}
                </strong>
                </div>
            </Box>
        </>
    )
}




