import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import { COLOR_CHART } from '../../utils/constants';
import { formatNumber } from '../../utils/functions';


function StackedBarChart({ data, xLabels, tooltip, marginLeft = 40, marginTop = 60, translateX }) {
    const sizing = translateX
        ? {
            // width: 250,
            height: 192,
            legend: { hidden: true },
            yAxis: [
                {
                    label: tooltip,
                    valueFormatter: (value) => tooltip === 'pesos' ? `${(value / 1000000).toLocaleString()}M` : value,
                }
            ],
            sx: {
                [`.${legendClasses.root}`]: {
                    transform: 'translate(20px, 0)',
                },
                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                    transform: `translateX(${translateX}px)`,
                },
            }
        }
        : {
            height: 250,
            legend: { hidden: false },
            yAxis: [
                {
                    valueFormatter: (value) => tooltip === '%' ? `${(value)}%` : value,
                }
            ],
            sx: {
                [`.${legendClasses.root}`]: {
                    transform: 'translate(20px, 0)',
                },
            },
        }

    return (
        <BarChart
            grid={{ horizontal: true }}
            series={data.map((dat, index) => ({
                data: dat.data,
                // highlightScope: { highlight: 'item', fade: 'global' }, //Desbanecer barras
                valueFormatter: (valor, { dataIndex }) => {
                    if (valor) {
                        return (tooltip === 'pesos')
                            ? `$${formatNumber(valor, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                            : (tooltip.trim() === 'unidades' || tooltip.trim() === 'kilogramos')
                                ? `${formatNumber(valor, { minimumFractionDigits: 0, maximumFractionDigits: 0 }, tooltip)}`
                                : `${formatNumber(valor, {}, tooltip)}`
                    } else {
                        return ''
                    }
                },
                label: dat.label,
                id: `id-${index}`,
                color: COLOR_CHART[index % COLOR_CHART.length]
            }))}
            xAxis={[
                {
                    scaleType: 'band',
                    data: xLabels,
                }
            ]}
            margin={{ top: marginTop, right: 15, bottom: 25, left: marginLeft }}
            slotProps={{
                legend: {
                    labelStyle: {
                        fontSize: 14,
                    },
                    direction: 'row',
                    itemMarkWidth: 20,
                    itemMarkHeight: 2,
                    markGap: 5,
                    itemGap: 35,
                }
            }}
            {...sizing}
        />
    )
}

export { StackedBarChart }