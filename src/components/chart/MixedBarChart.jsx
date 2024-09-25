import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function ColorScale({ data, xLabels, colors, tooltip, marginLeft = 40, translateX }) {

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

    return (
        <BarChart
            grid={{ horizontal: true }}
            series={[
                {
                    data: data,
                    // label: 'Total',
                    // highlightScope: { highlight: 'item', fade: 'global' }, //Desbanecer barras
                    valueFormatter: (valor, { dataIndex }) => {
                        // const dat = data[dataIndex]
                        if (valor) {
                            return tooltip === 'pesos'
                                ? `$${valor.toLocaleString('es-CO')}`
                                : `${valor.toLocaleString('es-CO')}${tooltip}`
                        } else {
                            return ''
                        }
                    }
                }
            ]}
            xAxis={[
                {
                    scaleType: 'band',
                    data: monthDates,
                    valueFormatter: (value, context) => {
                        //long
                        const month = value.toLocaleString('default', { month: 'long' })
                        // const month = value.toLocaleString('default', { month: context.location === 'tick' ? 'short' : 'long' })
                        return month.charAt(0).toUpperCase() + month.slice(1);
                    },
                    colorMap: {
                        type: 'piecewise',
                        thresholds: [new Date(2023, 6, 1)],
                        colors: [colors.ventas, colors.prediccion],
                    }
                }
            ]}
            // tooltip={{ trigger: 'item' }}
            margin={{ top: 10, right: 15, bottom: 25, left: marginLeft }}
            {...sizing}
        />
    )
}


function MixedBarChart({ data, xLabels, color }) {
    const sizing = {
        // margin: { right: 5 },
        // width: 250,
        height: 200,
        legend: { hidden: true },
    };

    const colors = ['#F9B242', '#3BB6A7', '#CDDE00', '#F9B242', '#3BB6A7', '#CDDE00', '#F9B242', '#3BB6A7', '#CDDE00']
    return (
        <BarChart
            grid={{ horizontal: true }}
            series={[
                {
                    data: data,
                    label: 'Total',
                    color: color,
                    // valueFormatter: (valor) => {
                    //     return `${valor}`;
                    // },
                },
            ]}
            xAxis={[
                {
                    data: xLabels,
                    scaleType: 'band'
                }
            ]}
            margin={{ top: 30, right: 15, bottom: 25, left: 30 }}
            {...sizing}
        />
    )
}

export { MixedBarChart, ColorScale }