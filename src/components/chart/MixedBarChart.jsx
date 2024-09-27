import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const colores = ['#CDDE00', '#83D3C9', '#F9B242', '#66A59C', '#E3E935']

function StackedBarChart({ data, xLabels, colors, tooltip, marginLeft = 40, marginTop = 60, translateX }) {
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

    const monthMap = {
        Enero: 0,
        Febrero: 1,
        Marzo: 2,
        Abril: 3,
        Mayo: 4,
        Junio: 5,
        Julio: 6,
        Agosto: 7,
        Septiembre: 8,
        Octubre: 9,
        Noviembre: 10,
        Diciembre: 11,
    }

    const convertMonthsToDates = (months, year) => {
        return months.map(month => new Date(year, monthMap[month], 1))
    }
    const monthDates = convertMonthsToDates(xLabels, 2023)

    return (
        <BarChart
            grid={{ horizontal: true }}
            series={data.map((dat, index) => ({
                data: dat.data,
                // highlightScope: { highlight: 'item', fade: 'global' }, //Desbanecer barras
                valueFormatter: (valor, { dataIndex }) => {
                    if (valor) {
                        return (tooltip === 'pesos')
                            ? `$${valor.toLocaleString('es-CO')}`
                            : (tooltip || tooltip.trim() === 'unidades' || tooltip === 'kilogramos')
                                ? `${valor.toLocaleString('es-CO')}${tooltip}`
                                : `${valor.toFixed(2).toLocaleString('es-CO')}${tooltip}`
                    } else {
                        return ''
                    }
                },
                label: dat.label,
                id: `id-${index}`,
                color: colores[index % colores.length]
            }))}
            xAxis={[
                {
                    scaleType: 'band',
                    data: monthDates,
                    valueFormatter: (value, context) => {
                        const month = value.toLocaleString('default', { month: 'long' })
                        return month.charAt(0).toUpperCase() + month.slice(1)
                    },
                    // colorMap: {
                    //     type: 'piecewise',
                    //     thresholds: [new Date(2023, 6, 1)],
                    //     colors: [colors.ventas, colors.prediccion],
                    // }
                }
            ]}
            // axisHighlight={{
            //     x: 'line', // Or 'none', or 'band'
            //     y: 'line', // Or 'none'
            // }}
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