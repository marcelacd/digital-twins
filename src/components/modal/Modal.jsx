import * as React from 'react';
import './Modal.css';

import BasicBars from '../chart/BarChart'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

function Modal({ isOpen, onClose }) {
    const [selectedTab, setSelectedTab] = React.useState('tab1');
    const [selectedSubTab, setSelectedSubTab] = React.useState('subTab1');
    const [vendedores, setVendedores] = React.useState();

    if (!isOpen) return null;

    // Función para manejar el clic en un título
    const handleTitleClickTab = (title) => {
        setSelectedTab(title);
    };

    const handleTitleClickSubTab = (title) => {
        setSelectedSubTab(title);
    };

    // Función para manejar el cambio del input
    const handleInputChange = (event) => {
        console.log(event)
        setVendedores(event.target.value);
    };

    // Función para manejar el clic del botón
    const handleButtonClick = () => {
        console.log(vendedores)
        // Aquí puedes enviar el valor capturado (vendedores) a una API o manejarlo como necesites
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <Grid container className="title">
                    <Grid xs={6}>
                        <h2
                            onClick={() => handleTitleClickTab('tab1')}
                            className={selectedTab === 'tab1' ? 'color-tab' : ''}
                        >
                            <span className='pointer'>Información descriptiva</span>
                        </h2>
                    </Grid>
                    <Grid xs={6}>
                        <h2
                            onClick={() => handleTitleClickTab('tab2')}
                            className={selectedTab === 'tab2' ? 'color-tab' : ''}>
                            <span className='pointer' >Simulación</span>
                        </h2>
                    </Grid>
                </Grid>

                <div className="container">
                    {/* Simulación */}
                    {selectedTab === 'tab2' && (
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{ margin: '20px 0' }}>
                            <Grid xs={10} sm={10} md={5}>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { width: '100%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Ingrese el numero de vendedores"
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        type="number"
                                        value={vendedores}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={2} sx={{ display: 'flex' }}>
                                <Button sx={{ textTransform: 'none' }} variant="contained" onClick={handleButtonClick}>Simular</Button>
                            </Grid>
                        </Grid>
                    )}

                    {/* Ambos */}
                    <Grid container className="subtitle">
                        <Grid xs={4}>
                            <div
                                onClick={() => handleTitleClickSubTab('subTab1')}
                                className={selectedSubTab === 'subTab1' ? 'color-tab' : ''}>
                                <span className='pointer'>Volumen y valor de ventas</span>
                            </div>
                        </Grid>
                        <Grid xs={4}>
                            <div
                                onClick={() => handleTitleClickSubTab('subTab2')}
                                className={selectedSubTab === 'subTab2' ? 'color-tab' : ''}>
                                <span className='pointer'>Efectividad</span>
                            </div>
                        </Grid>
                        <Grid xs={4}>
                            <div
                                onClick={() => handleTitleClickSubTab('subTab3')}
                                className={selectedSubTab === 'subTab3' ? 'color-tab' : ''}>
                                <span className='pointer'>Referencias</span>
                            </div>
                        </Grid>
                    </Grid>

                    {/* Información */}
                    {selectedTab === 'tab1' && (
                        <>
                            {selectedSubTab === 'subTab1' && (
                                <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 1.5, md: 1.5 }} sx={{ width: '100%' }}>
                                    <Grid xs={4}>
                                        <div className='cart'>
                                            <h4 style={{ margin: '0' }}>Unidades</h4>
                                            <div>
                                                9.650
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid xs={4}>
                                        <div className='cart'>
                                            <h4 style={{ margin: '0' }}>Kilogramos</h4>
                                            <div>
                                                9.650
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid xs={4}>
                                        <div className='cart'>
                                            <h4 style={{ margin: '0' }}>Pesos</h4>
                                            <div>
                                                $28.245.230
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid xs={6}>
                                        <div style={{ backgroundColor: '#CBF0EA', color: 'white', padding: '10px', borderRadius: '6px' }}>
                                            <h4 style={{ margin: '0' }}>Ventas por mes</h4>
                                            <div>
                                                Mayo
                                            </div>
                                            <div>
                                                Junio
                                            </div>
                                            <div>
                                                Julio
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid xs={6}>
                                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px' }}>
                                            <div>
                                                9.650
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                            }

                            {selectedSubTab === 'subTab2' && (
                                <div>
                                    Nada
                                </div>
                            )
                            }
                            {selectedSubTab === 'subTab3' && (
                                <div>
                                    Nada
                                </div>
                            )
                            }
                        </>
                    )}

                    {/* Simulación */}
                    {selectedTab === 'tab2' && (
                        <>
                            {selectedSubTab === 'subTab1' && (
                                <Box sx={{ width: '100%' }}>
                                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                        <Grid xs={4}>
                                            <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                <h4 style={{ margin: '0' }}>Unidades</h4>
                                                <BasicBars />
                                                <div style={{ textAlign: 'center' }}>
                                                    <span>Numero de vendedores</span>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid xs={4}>
                                            <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                <h4 style={{ margin: '0' }}>Kilogramos</h4>
                                                <BasicBars />
                                                <div style={{ textAlign: 'center' }}>
                                                    <span>Numero de vendedores</span>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid xs={4}>
                                            <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                <h4 style={{ margin: '0' }}>Pesos</h4>
                                                <BasicBars />
                                                <div style={{ textAlign: 'center' }}>
                                                    <span>Numero de vendedores</span>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                            }

                            {selectedSubTab === 'subTab2' && (
                                <div>
                                    <Box sx={{ width: '100%' }}>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid xs={8}>
                                                <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                    <h4 style={{ margin: '0' }}>Unidades</h4>
                                                    <BasicBars />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span>Numero de vendedores</span>
                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid xs={4}>
                                                <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                    <h4 style={{ margin: '0' }}>Kilogramos</h4>
                                                    <BasicBars />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span>Numero de vendedores</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            )
                            }
                            {selectedSubTab === 'subTab3' && (
                                <div>
                                    <Box sx={{ width: '100%' }}>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid xs={6}>
                                                <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                    <h4 style={{ margin: '0' }}>Unidades</h4>
                                                    <BasicBars />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span>Numero de vendedores</span>
                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid xs={6}>
                                                <div style={{ backgroundColor: '#F6F6F6', padding: '10px', borderRadius: '6px' }}>
                                                    <h4 style={{ margin: '0' }}>Kilogramos</h4>
                                                    <BasicBars />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span>Numero de vendedores</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            )
                            }
                        </>
                    )
                    }
                </div>

                <div style={{ marginTop: '20px', textAlign: 'end' }}>
                    <Button onClick={onClose} variant="outlined">Cerrar</Button>
                </div>

            </div>
        </div>
    );
}

export default Modal;
