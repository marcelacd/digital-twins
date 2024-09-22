import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


function MixedBarChart1({ dataSeries, xLabels, color, width = 170 }) {

    const sizing = {
        // margin: { right: 5 },
        width: width,
        height: 230,
        legend: { hidden: true },
    };

    return (
        <BarChart
            series={dataSeries.map((item) => ({
                data: item.value, label: item.label, color: item.color, stack: item.stack,
            }))}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            margin={{ top: 20, right: 5, bottom: 25, left: 75 }}
            {...sizing}
        />
    )
}

function MixedBarChart2({ dataSeries, xLabels }) {

    const sizing = {
        // margin: { right: 5 },
        width: 300,
        height: 230,
        legend: { hidden: true },
    };
    return (
        <BarChart
            series={dataSeries.map((item) => ({
                data: item.value, label: item.label, color: item.color, stack: item.stack,
            }))}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            margin={{ top: 20, right: 5, bottom: 25, left: 60 }}
            {...sizing}
        />

        // <BarChart
        //     series={[
        //         { data: [14], label: 'Series B1' },
        //         { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
        //         { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
        //         { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
        //     ]}
        //     barLabel={(item, context) => {
        //         if ((item.value ?? 0) > 10) {
        //             return 'High';
        //         }
        //         return context.bar.height < 60 ? null : item.value?.toString();
        //     }}
        //     width={600}
        //     height={350}
        // />
    )
}

function BarChartStackedBySign() {
    const sizing = {
        // margin: { right: 5 },
        width: 350,
        height: 230,
        legend: { hidden: true },
    };

    const pData = [250, -50];
    const pData1 = [300, -100];
    const uData = [280, -20];

    const xLabels = [
        'Visitas efectivas',
        'Visitas no efectivas'
    ];

    return (
        <BarChart
            series={[
                { data: pData, label: 'Vendedor 1', id: 'pvId', stack: 'stack1', color: '#CDDE00' },
                { data: pData1, label: 'Vendedor 2', id: 'pvId1', stack: 'stack1', color: '#3BB6A7' },
                { data: uData, label: 'Vendedor 3', id: 'uvId', stack: 'stack1', color: '#F9B242' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            // slotProps={{
            //     legend: {
            //         direction: 'row',
            //         position: {
            //             vertical: 'top',
            //             horizontal: 'right',
            //         },
            //         itemMarkWidth: 20,
            //         itemMarkHeight: 2,
            //         markGap: 5,
            //         itemGap: 10,
            //     }
            // }}
            margin={{ top: 20, right: 5, bottom: 25, left: 60 }}
            {...sizing}
        // yAxis={[
        //     {
        //         grid: { visible: true }, // Activa las líneas de cuadrícula en el eje y
        //     },
        // ]}
        // barLabel="value"
        />
    )
}

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

export { MixedBarChart, MixedBarChart1, BarChartStackedBySign }