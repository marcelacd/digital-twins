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
import Grid from '@mui/material/Unstable_Grid2';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ScaleIcon from '@mui/icons-material/Scale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { city } from './data.ts';
import InputSelect from '../input/InputSelect.jsx'
import DiscreteSlider from '../input/Slider.jsx'

const currencies = [
    {
        id: 'BG',
        label: 'Bogota',
    },
]

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
            value: city[ciudad]
        })
    }

    const handleChangeMeses = (meses) => {
        const mesesSQL = meses.map(mes => `'${mes}'`).join(', ');
        changeMeses(mesesSQL)
    }

    const handleCheckbox = (event) => {
        const { id, checked } = event.target

        // if (!checked) {
        //     setUncheckedZones((prevZones) => [...prevZones, id])
        //     changeUncheckedZones(uncheckedZones)
        // } else {
        //     setUncheckedZones((prevZones) => prevZones.filter(zone => zone !== id))
        //     changeUncheckedZones(uncheckedZones)
        // }

        if (!checked) {
            setUncheckedZones((prevZones) => {
                const updatedZones = [...prevZones, id];
                changeUncheckedZones(updatedZones)
                return updatedZones
            })
        } else {
            setUncheckedZones((prevZones) => {
                const updatedZones = prevZones.filter(zone => zone !== id);
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
                    <h2>Nutresa - Digital Twin</h2>
                </div>

                <InputSelect currencies={currencies} handleChangeSelect={handleChangeSelect} defaultValue={'BG'} label={'ciudad'}></InputSelect>

                <div style={{ margin: 20, display: 'flex', justifyContent: 'center' }}>
                    <DiscreteSlider handleChangeMeses={handleChangeMeses}></DiscreteSlider>
                </div>

                {/* <Box sx={{ padding: '0 20px 20px' }}><strong>Datos a mes de junio</strong></Box> */}

                <Accordion className='accordion-box points' expanded={expanded === 'panel1'} onChange={handleChangeExpanded('panel1')}>
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
                        <Grid container rowSpacing={0} >
                            {
                                dataCiudad[ciudad].zone.map((zone, index) => (
                                    <React.Fragment key={index}>
                                        <Grid xs={7}>
                                            <FormControlLabel control={<Checkbox defaultChecked onChange={handleCheckbox} id={zone.code} size="small" />} label={zone.code} />
                                        </Grid>
                                        <Grid xs={2}>
                                            <NavigationIcon fontSize='small' color="primary" sx={{ cursor: 'pointer' }} onClick={() => handleSwitch({ target: { fly: `${zone.code}` } })} />
                                        </Grid>
                                        <Grid xs={3}>
                                            <FormControlLabel sx={{ fontSize: 14 }} control={<Switch onChange={handleSwitch} id={`client${index + 1}`} size="small" />} label="Clientes" />
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
                        <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                                <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                                    <Grid xs={4}>
                                        <div>{ventaVolumenes.consolidado.ventas_un.toLocaleString('es-ES') + ' U'}</div>
                                    </Grid>
                                    <Grid xs={4}>
                                        <div>{ventaVolumenes.consolidado.ventas_kg.toLocaleString('es-ES') + ' Kg'}</div>
                                    </Grid>
                                    <Grid xs={4}>
                                        <div>{'$' + ventaVolumenes.consolidado.ventas_eco.toLocaleString('es-ES')}</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr />
                        {
                            ventaVolumenes.data.map((zona, index) => (
                                <React.Fragment key={index}>
                                    <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid>
                                            <span><strong>{zona.zona}</strong></span>
                                            <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                                                <Grid xs={4}>
                                                    <div>{zona.ventas_un.toLocaleString('es-ES') + ' U'}</div>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <div>{zona.ventas_kg.toLocaleString('es-ES') + ' Kg'}</div>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <div>{'$' + zona.ventas_eco.toLocaleString('es-ES')}</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))
                        }
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
                        <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={7}>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                            </Grid>
                            <Grid xs={5}>
                                <div>{`${efectividadVentas.consolidado.toFixed(2)}%`}</div>
                            </Grid>
                        </Grid>
                        <hr />
                        {
                            efectividadVentas.data.map((zona, index) => (
                                <React.Fragment key={index}>
                                    <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid xs={7}>
                                            <span><strong>{zona.zona}</strong></span>
                                        </Grid>
                                        <Grid xs={5}>
                                            <div>{`${zona.efectividad.toFixed(2)}%`}</div>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))
                        }
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
                            <Grid xs={7}>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                            </Grid>
                            <Grid xs={5}>
                                {referencias.consolidado.toLocaleString('es-ES')}
                            </Grid>
                        </Grid>
                        <hr />
                        {
                            referencias.data.map((zona, index) => (
                                <React.Fragment key={index}>
                                    <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid xs={7}>
                                            <span><strong>{zona.zona}</strong></span>
                                        </Grid>
                                        <Grid xs={5}>
                                            {zona.referencias_total.toLocaleString('es-ES') + ' por cliente'}
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))
                        }
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
                        <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={7}>
                                <span style={{ color: '#009877' }}><strong>Consolidado</strong></span>
                            </Grid>
                            <Grid xs={5}>
                                <div>{`${ejecucionPresupuestal.consolidado.toFixed(2)}%`}</div>
                            </Grid>
                        </Grid>
                        <hr />
                        {
                            ejecucionPresupuestal.data.map((zona, index) => (
                                <React.Fragment key={index}>
                                    <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid xs={7}>
                                            <span><strong>{zona.zona}</strong></span>
                                        </Grid>
                                        <Grid xs={5}>
                                            <div>{`${zona.ejecucion_presupuestal.toFixed(2)}%`}</div>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
            </Box>
        )
    )
}

export default Controls;