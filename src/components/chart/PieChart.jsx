import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};

export default function PieCharts({ data }) {
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <PieChart
            series={[
                {
                    outerRadius: 80,
                    data,
                    arcLabel: getArcLabel,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                },
            }}
            {...sizing}
        // slotProps={{
        //     legend: {
        //         direction: 'row',
        //         position: {
        //             vertical: 'middle',
        //             horizontal: 'right',
        //         },
        //         itemMarkWidth: 20,
        //         itemMarkHeight: 2,
        //         markGap: 5,
        //         itemGap: 10,
        //     }
        // }}
        />

        // <div style={{ marginTop: '20px' }}>
        //     {data.map((item, index) => (
        //         <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        //             <div style={{
        //                 width: '14px',
        //                 height: '2px',
        //                 borderRadius: '2px',
        //                 backgroundColor: item.color,
        //                 marginRight: '10px'
        //             }}></div>
        //             <span style={{
        //                 fontSize: '12px'
        //             }}>{item.label}</span>
        //         </div>
        //     ))}
        // </div> 
    );
}