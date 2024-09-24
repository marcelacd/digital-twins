import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

function MixedBarChart({ data, color, xLabels }) {
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
                { data: data, label: 'Total', id: 'pvId', color: color },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            margin={{ top: 30, right: 15, bottom: 25, left: 90 }}
            {...sizing}
        />
    )
}

export { MixedBarChart }