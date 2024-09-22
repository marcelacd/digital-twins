import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Tooltip from '@mui/material/Tooltip';


function AreaChart() {
    const uData = [14000, 23000, 12000, 22780, 21890];
    const xLabels = [
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
    ];
    return (
        <LineChart
            width={350}
            height={250}
            series={[{ data: uData, label: 'Total', area: true, showMark: true, color: '#3BB6A7' }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            legend={{ hidden: true }}
            sx={{
                [`& .${lineElementClasses.root}`]: {
                    display: 'none',
                },
            }}
            margin={{ top: 20, right: 20, bottom: 25, left: 60 }}
        />
    );
}


function StackedAreaChart() {
    const amtData = [10000, 13000, 12000, 17780, 11890, 12390];
    const uData = [12400, 22210, 15000, 20000, 2181, 12500];
    const pData = [12800, 11398, 19800, 11908, 4800, 13800];
    const xData = [11400, 21398, 11800, 14908, 12800, 13600];
    const xLabels = [
        'Abril',
        'Mayo',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
    ];
    return (
        // <LineChart
        //     //   width={500}
        //       height={300}
        //     series={[
        //         // {
        //         //     data: amtData,
        //         //     label: 'Total',
        //         //     area: true,
        //         //     stack: 'total',
        //         //     showMark: false,
        //         //     color: '#EA5D5D'
        //         // },
        //         { data: uData, label: 'Vendedor 1', area: true, stack: 'total', showMark: false, color: '#F9B242' },
        //         { data: pData, label: 'Vendedor 2', area: true, stack: 'total', showMark: false, color: '#3BB6A7' },
        //         { data: xData, label: 'Vendedor 3', area: true, stack: 'total', showMark: false, color: '#CDDE00' },
        //     ]}
        //     xAxis={[{ scaleType: 'point', data: xLabels }]}
        //     sx={{
        //         [`& .${lineElementClasses.root}`]: {
        //             display: 'none',
        //         },
        //     }}
        // />
        <LineChart
            width={500}
            height={300}
            series={[
                { curve: "linear", label: 'Vendedor 1', color: '#F9B242', data: uData },
                { curve: "linear", label: 'Vendedor 2', color: '#3BB6A7', data: pData },
                { curve: "linear", label: 'Vendedor 3', color: '#CDDE00', data: xData },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: {
                        vertical: 'top',
                        // horizontal: 'right',
                    },
                    itemMarkWidth: 20,
                    itemMarkHeight: 2,
                    markGap: 5,
                    itemGap: 10,
                }
            }}
            tooltip={{}}
        />
    );
}

export { AreaChart, StackedAreaChart }