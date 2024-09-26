import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function StackedBarChart({ data, xLabels, colors, tooltip, marginLeft = 40, translateX }) {
    const sizing = translateX
        ? {
            // margin: { right: 5 },
            // width: 250,
            height: 200,
            legend: { hidden: true },
            yAxis: [{ label: tooltip }],
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
            height: 200,
            legend: { hidden: true },
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
    const colores = ['#CDDE00', '#83D3C9', '#F9B242', '#66A59C', '#E3E935']

    return (
        <BarChart
            grid={{ horizontal: true }}
            series={data.map((dat, index) => ({
                data: dat.data,
                // highlightScope: { highlight: 'item', fade: 'global' }, //Desbanecer barras
                valueFormatter: (valor, { dataIndex }) => {
                    if (valor) {
                        return tooltip === 'pesos'
                            ? `$${valor.toLocaleString('es-CO')}`
                            : `${valor.toLocaleString('es-CO')}${tooltip}`
                    } else {
                        return ''
                    }
                },
                label: dat.label,
                id: `id-${index}`,
                // color: colores[index],
                color: colores[index % colores.length]
            }))}
            // xAxis={[{ data: xLabels, scaleType: 'band' }]}
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
            // tooltip={{ trigger: 'item' }}
            margin={{ top: 10, right: 5, bottom: 25, left: marginLeft }}
            {...sizing}
        />
    )
}

export { StackedBarChart }