import * as React from 'react';
import "./Controls.css"

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NavigationIcon from '@mui/icons-material/Navigation';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Grid from '@mui/material/Grid2';
import Checkbox from '@mui/material/Checkbox';
import InputSelect from '../input/InputSelect.jsx'
import DiscreteSlider from '../input/Slider.jsx'
import { alpha, styled } from '@mui/material/styles';

const colors = ['#F9B242', '#3BB6A7', '#CDDE00']

const currencies = [
    {
        id: 'BG',
        label: 'Bogota',
    },
]

const ColorSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#3BB6A7',
        '&:hover': {
            backgroundColor: alpha('#3BB6A7', theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#3BB6A7',
    },
    '& .MuiSwitch-thumb': {
        width: 12,
        height: 12, // Ajusta el tamaño del círculo
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        height: 8, // Ajusta la altura del track
        width: 20, // Ajusta el ancho del track
    },
}))

function Controls({ sendMessageToIframe, dataCiudad, ventaVolumenes, ejecucionPresupuestal, referencias, efectividadVentas, changeMeses, changeUncheckedZones }) {
    const [expanded, setExpanded] = React.useState(false);
    const [ciudad, setCiudad] = React.useState('BG');
    const [uncheckedZones, setUncheckedZones] = React.useState([]);

    const handleChangeExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    //Select de la ciudad
    const handleChangeSelect = (event) => {
        setCiudad(event.target.value);

        sendMessageToIframe({
            codeCity: ciudad,
            // value: city[ciudad]
        })
    }

    const handleChangeMeses = (data) => {
        changeMeses(data)
    }

    const handleCheckbox = (event) => {
        const { id, checked } = event.target

        if (!checked) {
            setUncheckedZones((prevZones) => {
                const updatedZones = [...prevZones, id]
                changeUncheckedZones(updatedZones)
                return updatedZones
            })
        } else {
            setUncheckedZones((prevZones) => {
                const updatedZones = prevZones.filter(zone => zone !== id)
                changeUncheckedZones(updatedZones)
                return updatedZones
            })
        }

        if (checked) {
            sendMessageToIframe({
                type: id,
                fly: false,
                value: {}
            })
        } else {
            sendMessageToIframe({
                type: 'delete',
                value: id
            })
        }
    }

    const handleSwitch = (event) => {
        const { id, fly, checked } = event.target

        if (checked) {
            sendMessageToIframe({
                type: id || checked,
                fly: false,
                value: {}
            })
        } else if (fly) {
            sendMessageToIframe({
                type: fly,
                fly: true,
                value: {}
            })
        } else {
            sendMessageToIframe({
                type: 'delete',
                value: id
            })
        }
    }

    return (
        (Object.entries(ventaVolumenes).length > 0 && Object.entries(dataCiudad).length > 0) && (
            <Box className="container-box">
                <div className="controls-header">
                    <h2>Nutresa - Digital Twins</h2>
                </div>

                <InputSelect currencies={currencies} handleChangeSelect={handleChangeSelect} defaultValue={'BG'} label={'Ciudad'}></InputSelect>

                <div style={{ margin: 20, display: 'flex', justifyContent: 'center' }}>
                    <DiscreteSlider handleChangeMeses={handleChangeMeses}></DiscreteSlider>
                </div>

                <Accordion className='accordion-box points' >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <div className='accordion-title'>
                            <MapIcon fontSize="large" sx={{ color: '#F9B242' }} />
                            <h4 style={{ margin: 0 }}>Visualización zonas</h4>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={0} sx={{ alignItems: 'center' }}>
                            {
                                dataCiudad[ciudad].zone.map((zone, index) => (
                                    <React.Fragment key={index}>
                                        <Grid size={7}>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#3BB6A7',
                                                        '&.Mui-checked': {
                                                            color: '#3BB6A7',
                                                        },
                                                    }}
                                                    onChange={handleCheckbox}
                                                    id={zone.code} size="small"
                                                />} label={zone.code} />
                                        </Grid>
                                        <Grid size={2}>
                                            <NavigationIcon
                                                fontSize='small'
                                                sx={{ cursor: 'pointer', color: colors[index] }}
                                                onClick={() => handleSwitch({ target: { fly: `${zone.code}` } })}
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <FormControlLabel

                                                control={<ColorSwitch
                                                    onChange={handleSwitch}
                                                    id={`client${index + 1}`}
                                                    size="small" />}
                                                label="Clientes"
                                            />
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='accordion-box points' expanded={expanded === 'panel2'} onChange={handleChangeExpanded('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <div className='accordion-title'>
                            <EqualizerIcon fontSize='large' sx={{ color: '#3BB6A7' }} />
                            <h4 style={{ margin: 0 }}>Volumen y valor de ventas</h4>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }} >
                            <React.Fragment>
                                <Grid size={12}>
                                    <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                                    <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                        <Grid size={4}>
                                            <div>{ventaVolumenes.consolidado.ventas_un.toLocaleString('es-CO', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }) + ' Un'}</div>
                                        </Grid>
                                        <Grid size={4}>
                                            <div>{ventaVolumenes.consolidado.ventas_kg.toLocaleString('es-CO', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }) + ' Kg'}</div>
                                        </Grid>
                                        <Grid size={4}>
                                            <div>{'$' + ventaVolumenes.consolidado.ventas_eco.toLocaleString('es-CO', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Grid>
                        <hr />
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }}>
                            {
                                ventaVolumenes.data.map((zona, index) => (
                                    <React.Fragment key={index}>
                                        <Grid size={12}>
                                            <span><strong>{zona.zona}</strong></span>
                                            <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                                <Grid size={4}>
                                                    <div>{zona.ventas_un.toLocaleString('es-CO', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    }) + ' Un'}</div>
                                                </Grid>
                                                <Grid size={4}>
                                                    <div>{zona.ventas_kg.toLocaleString('es-CO', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    }) + ' Kg'}</div>
                                                </Grid>
                                                <Grid size={4}>
                                                    <div>{'$' + zona.ventas_eco.toLocaleString('es-CO', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    })}</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='accordion-box points' expanded={expanded === 'panel3'} onChange={handleChangeExpanded('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <div className='accordion-title'>
                            <TrendingUpIcon fontSize='large' sx={{ color: '#F9B242' }} />
                            <h4 style={{ margin: 0 }}>Efectividad de ventas</h4>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }}>
                            <Grid size={7}>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                            </Grid>
                            <Grid size={5}>
                                <div>{`${efectividadVentas.consolidado.toFixed(2)}%`}</div>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }}>
                            {
                                efectividadVentas.data.map((zona, index) => (
                                    <React.Fragment key={index}>
                                        <Grid size={7}>
                                            <span><strong>{zona.zona}</strong></span>
                                        </Grid>
                                        <Grid size={5}>
                                            <div>{`${zona.efectividad.toFixed(2)}%`}</div>
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='accordion-box points' expanded={expanded === 'panel4'} onChange={handleChangeExpanded('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <div className='accordion-title'>
                            <ProductionQuantityLimitsIcon fontSize='large' sx={{ color: '#3BB6A7' }} />
                            <h4 style={{ margin: 0 }}>Referencias</h4>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={7}>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                            </Grid>
                            <Grid size={5}>
                                {referencias.consolidado.toFixed(2).toLocaleString('es-CO') + ' por cliente'}
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }}>
                            {
                                referencias.data.map((zona, index) => (
                                    <React.Fragment key={index}>
                                        <Grid size={7}>
                                            <span><strong>{zona.zona}</strong></span>
                                        </Grid>
                                        <Grid size={5}>
                                            {zona.referencias_total.toFixed(2).toLocaleString('es-CO') + ' por cliente'}
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='accordion-box points' expanded={expanded === 'panel5'} onChange={handleChangeExpanded('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <div className='accordion-title'>
                            <AccountBalanceIcon fontSize="large" sx={{ color: '#F9B242' }} />
                            <h4 style={{ margin: 0 }}>Ejecución presupuestal</h4>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }}>
                            <Grid size={7}>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                            </Grid>
                            <Grid size={5}>
                                <div>{`${ejecucionPresupuestal.consolidado.toFixed(2)}%`}</div>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: '10px' }}>
                            {
                                ejecucionPresupuestal.data.map((zona, index) => (
                                    <React.Fragment key={index}>
                                        <Grid size={7}>
                                            <span><strong>{zona.zona}</strong></span>
                                        </Grid>
                                        <Grid size={5}>
                                            <div>{`${zona.ejecucion_presupuestal.toFixed(2)}%`}</div>
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        )
    )
}

export default Controls;