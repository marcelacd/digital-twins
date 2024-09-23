import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

function valuetext(value) {
    const month = months.find(month => month.value === value);
    return month ? month.label : '';
}

export default function RangeSlider({ handleChangeMeses }) {
    const [selectedRange, setSelectedRange] = React.useState([6, 6])

    const handleChange = (event, newValue) => {
        const convertir = {
            1: 'ENE',
            2: 'FEB',
            3: 'MAR',
            4: 'ABR',
            5: 'MAY',
            6: 'JUN',
            7: 'JUL',
            8: 'AGO',
            9: 'SEP',
            10: 'OCT',
            11: 'NOV',
            12: 'DIC',
        }

        const fullRange = [];
        for (let i = newValue[0]; i <= newValue[1]; i++) {
            fullRange.push(convertir[i]);
        }

        handleChangeMeses(fullRange);
        setSelectedRange(newValue);
    };

    const getAriaLabel = (index) => {
        return `Month ${valuetext(selectedRange[index])}`;
    };

    return (
        <>
            <Box sx={{ width: 300 }}>
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




