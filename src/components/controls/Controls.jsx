import * as React from 'react';
import "./Controls.css"

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Grid from '@mui/material/Unstable_Grid2';
import InventoryIcon from '@mui/icons-material/Inventory';
import ScaleIcon from '@mui/icons-material/Scale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { city } from './data.ts';
import InputSelect from '../input/InputSelect.jsx'

const currencies = [
    {
        id: 'MD',
        label: 'Medellin',
    },
    {
        id: 'BG',
        label: 'Bogota',
    },
]

const zones = [
    {
        name: 'Zona 1',
        totalUnidades: 11347,
        totalKg: 5400,
        totalPesos: 39745543,
        efectividad: 98,
        proRef: '12,6'
    },
    {
        name: 'Zona 2',
        totalUnidades: 11347,
        totalKg: 5400,
        totalPesos: 39745543,
        efectividad: 98,
        proRef: '12,6'
    },
    {
        name: 'Zona 3',
        totalUnidades: 11347,
        totalKg: 5400,
        totalPesos: 39745543,
        efectividad: 98,
        proRef: '12,6'
    }
]

function Controls(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [ciudad, setCiudad] = React.useState('BG');

    const handleChangeExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const handleChangeSelect = (event) => {
        setCiudad(event.target.value);

        props.sendMessageToIframe({
            codeCity: event.target.value,
            value: city[event.target.value]
        })
    }

    const handleCheckbox = (event) => {
        if (event.target.checked) {
            props.sendMessageToIframe({
                type: event.target.id || event.target.checked,
                value: {}
            })
        } else {
            props.sendMessageToIframe({
                type: 'delete',
                value: event.target.id
            })
        }
    }

    return (
        <Box className="container-box">
            <div className="controls-header">
                <h2>Nutresa - Digital Twin</h2>
            </div>

            <InputSelect currencies={currencies} handleChangeSelect={handleChangeSelect}></InputSelect>

            <Box sx={{ margin: '16px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        zones.map((zone, index) => (
                            <React.Fragment key={index}>
                                <Grid xs={6}>
                                    <div className='btn-zone' onClick={() => handleCheckbox({ target: { checked: `zona${index + 1}` } })}>{zone.name}</div>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControlLabel control={<Switch onChange={handleCheckbox} id={`client${index + 1}`} size="small" />} label="Clientes" />
                                </Grid>
                            </React.Fragment>
                        ))
                    }
                </Grid>
            </Box>

            <Accordion className='accordion-box points' expanded={expanded === 'panel1'} onChange={handleChangeExpanded('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <div className='accordion-title'>
                        <EqualizerIcon fontSize='large' color='error' />
                        <h4 style={{ margin: 0 }}>Volumen y valor de ventas</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        zones.map((zone, index) => (
                            <React.Fragment key={index}>
                                <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid>
                                        <span><strong>{zone.name}</strong></span>
                                        <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                                            <Grid xs={4}>
                                                {/* <InventoryIcon sx={{fontSize: 15, color: 'blue' }} /> */}
                                                {zone.totalUnidades + ' U'}
                                            </Grid>
                                            <Grid xs={4}>
                                                {/* <ScaleIcon sx={{ fontSize: 15, color: 'blue' }} /> */}
                                                {zone.totalKg + ' K'}
                                            </Grid>
                                            <Grid xs={4}>
                                                {/* <AttachMoneyIcon sx={{ fontSize: 15, color: 'blue' }} /> */}
                                                {'$' + zone.totalPesos}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))
                    }
                </AccordionDetails>
            </Accordion>

            <Accordion className='accordion-box points' expanded={expanded === 'panel2'} onChange={handleChangeExpanded('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <div className='accordion-title'>
                        <TrendingUpIcon fontSize='large' color='primary' />
                        <h4 style={{ margin: 0 }}>Efectividad de ventas</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        zones.map((zone, index) => (
                            <React.Fragment key={index}>
                                <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid xs={6}>
                                        <span><strong>{zone.name}</strong></span>
                                    </Grid>
                                    <Grid xs={6}>
                                        {zone.efectividad + '%'}
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
                        <ProductionQuantityLimitsIcon fontSize='large' color='success' />
                        <h4 style={{ margin: 0 }}>Referencias</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        zones.map((zone, index) => (
                            <React.Fragment key={index}>
                                <Grid sx={{ paddingLeft: '10px' }} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid xs={6}>
                                        <span><strong>{zone.name}</strong></span>
                                    </Grid>
                                    <Grid xs={6}>
                                        {zone.proRef + ' por cliente'}
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default Controls;