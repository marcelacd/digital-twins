import * as React from 'react';
import Box from '@mui/material/Box';
import "./Controls.css"
import RecyclingIcon from '@mui/icons-material/Recycling';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import logoNutresa from "../../assets/logo-nutresa.png"
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


function Controls(props) {

    function handleCheckbox(event) {
        console.log(event)
        if (event.target.checked) {
            props.sendMessageToIframe({
                type: event.target.id || event.target.checked,
                value: {}
            })
        } else {
            console.log('dele')
            props.sendMessageToIframe({
                type: 'delete',
                value: event.target.id
            })
        }
    }

    return (
        <Box sx={{ flexGrow: 1, height: "100%", overflow: 'auto' }} >
            <div className="controls-header">
                <h2 style={{ margin: '0' }}>Nutresa - Digital Twin</h2>
            </div>

            {/* <div className='content-logo'>
                <img className='img-logo' src={logoNutresa} alt="nutresa" />
                <h4 style={{ margin: 0 }}>Navegar en las zonas</h4>
            </div>
            <hr /> */}

            <div style={{ margin: '20px' }}>
                <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='navZona1' />} label="Zona 1" />
                <FormControlLabel control={<Switch onChange={handleCheckbox} id='clientes1' />} label="Clientes" />
                {/* <VisibilityOffIcon
                fontSize='large'
                color='success'
                onClick={() => handleCheckbox({ target: { checked: 'clientes1' } })}
                style={{ cursor: 'pointer' }}
            />
            <VisibilityIcon
                fontSize='large'
                color='success'
                onClick={() => handleCheckbox({ target: { checkedd: 'clientes1' } })}
                style={{ cursor: 'pointer' }}
            /> */}
                <hr />

                <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='navZona2' />} label="Zona 2" />
                <FormControlLabel control={<Switch onChange={handleCheckbox} id='clientes2' />} label="Clientes" />
                {/* <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='clientes2' />} label="Clientes Zona 2" /> */}
                {/* <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='clientes1' />} label="Clientes Zona 1" /> */}
                <hr />
            </div>

            <Accordion className='accordion-box points'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='accordion-title'>
                        <AcUnitIcon fontSize='large' color='success' />
                        <h4 style={{ margin: 0 }}>Volumen de ventas</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <div className='puntos-content'>
                            <div className='checkbox-column'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='billboard' />} label="Billboard" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='heatmap' />} label="Heatmap" />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion className='accordion-box points'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='accordion-title'>
                        <AcUnitIcon fontSize='large' color='success' />
                        <h4 style={{ margin: 0 }}>Valor total de ventas</h4>
                    </div>
                </AccordionSummary>
                {/* <AccordionDetails>
                    <FormGroup>
                        <div className='puntos-content'>
                            <div className='checkbox-column'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='navZona1' />} label="Navegar Zona 1" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='clientes1' />} label="Ver clientes" />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </AccordionDetails> */}
            </Accordion>

            <Accordion className='accordion-box points'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='accordion-title'>
                        <AcUnitIcon fontSize='large' color='success' />
                        <h4 style={{ margin: 0 }}>Efectividad</h4>
                    </div>
                </AccordionSummary>
                {/* <AccordionDetails>
                    <FormGroup>
                        <div className='puntos-content'>
                            <div className='checkbox-column'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='navZona1' />} label="Navegar Zona 1" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='clientes1' />} label="Ver clientes" />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </AccordionDetails> */}
            </Accordion>
            <Accordion className='accordion-box points'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='accordion-title'>
                        <AcUnitIcon fontSize='large' color='success' />
                        <h4 style={{ margin: 0 }}>Referencias</h4>
                    </div>
                </AccordionSummary>
                {/* <AccordionDetails>
                    <FormGroup>
                        <div className='puntos-content'>
                            <div className='checkbox-column'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='navZona1' />} label="Navegar Zona 1" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='clientes1' />} label="Ver clientes" />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </AccordionDetails> */}
            </Accordion>

            {/* <div style={{ margin: '20px' }}>
                <TextField id="outlined-basic" label="Número vendedores" onChange={handleCheckbox} variant="outlined" />
            </div> */}

            {/* <Accordion className='accordion-box points'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='accordion-title'>
                        <LeaderboardIcon fontSize='large' color='success' />
                        <h4 style={{ margin: 0 }}>Metricas</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <div className='puntos-content'>
                            <div className='checkbox-column'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='billboard' />} label="Billboard" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='circle' />} label="Circle" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='route' />} label="Route" />
                                    <FormControlLabel control={<Checkbox color="success" onChange={handleCheckbox} id='heatmap' />} label="Heatmap" />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </AccordionDetails>
            </Accordion> */}
        </Box>
    );
}

export default Controls;