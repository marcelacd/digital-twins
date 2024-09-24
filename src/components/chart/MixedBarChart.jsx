import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

function ColorScale({ data, xLabels, color }) {
    const sizing = {
        // margin: { right: 5 },
        // width: 250,
        height: 250,
        legend: { hidden: true },
    }

    const monthMap = {
        ENE: 0,
        FEB: 1,
        MAR: 2,
        ABR: 3,
        MAY: 4,
        JUN: 5,
        JUL: 6,
        AGO: 7,
        SEP: 8,
        OCT: 9,
        NOV: 10,
        DIC: 11,
    }

    const convertMonthsToDates = (months, year) => {
        return months.map(month => new Date(year, monthMap[month], 1));
    }
    const monthDates = convertMonthsToDates(xLabels, 2023);

    return (
        <BarChart
            grid={{ horizontal: true }}
            series={[
                {
                    data: data,
                    label: 'Total',
                }
            ]}
            xAxis={[
                {
                    scaleType: 'band',
                    data: monthDates,
                    valueFormatter: (value) => {
                        //long
                        const month = value.toLocaleString('default', { month: 'short' });
                        return month.charAt(0).toUpperCase() + month.slice(1);
                    },
                    colorMap: {
                        type: 'piecewise',
                        thresholds: [new Date(2023, 5, 1)],
                        colors: ['#F9B242', '#CDDE00'],
                    }
                }
            ]}
            margin={{ top: 30, right: 15, bottom: 25, left: 90 }}
            {...sizing}
        />
    )
}


function MixedBarChart({ data, xLabels, color }) {
    const sizing = {
        // margin: { right: 5 },
        // width: 250,
        height: 250,
        legend: { hidden: true },
    };

    const colors = ['#F9B242', '#3BB6A7', '#CDDE00', '#F9B242', '#3BB6A7', '#CDDE00', '#F9B242', '#3BB6A7', '#CDDE00']
    return (
        <BarChart
            series={[
                {
                    data: data,
                    label: 'Total',
                    id: 'pvId',
                    color: color
                },
            ]}
            xAxis={[
                {
                    data: xLabels,
                    scaleType: 'band'
                }
            ]}
            margin={{ top: 30, right: 15, bottom: 25, left: 90 }}
            {...sizing}
        />
    )
}

export { MixedBarChart, ColorScale }