import React, { useState } from 'react';
import './Form.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';

function Form() {
    // Estado para controlar si el contenido está desplegado o no
    const [isOpen, setIsOpen] = useState(false);
    const [vendedores, setVendedores] = useState();

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

    // Función para manejar el clic en el ícono
    const toggleOpen = () => {
        setVendedores();
        setIsOpen(!isOpen);
    };

    return (
        <div className={`container-bo ${isOpen ? 'open' : ''}`} >

            <Box>
                <div className="controls-heade">
                    <IconButton onClick={toggleOpen}>
                        {isOpen ? <ChevronRightIcon  /> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                {isOpen && (
                    <div className="conten">
                        <h3>Parametros</h3>

                        <Grid container sx={{ margin: '20px 0' }}>
                            <Grid xs={12}>
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
                                        label="Número vendedores"
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        type="number"
                                        value={vendedores}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <br />

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
                                        label="Número clientes"
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        type="number"
                                        disabled={true}
                                    />
                                </Box>

                                <br />

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
                                        label="Número zonas"
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        type="number"
                                        disabled={true}
                                    />
                                </Box>
                                <br />
                            </Grid>
                            <Grid xs={12} sx={{ textAlign: 'center' }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        backgroundColor: '#009877',
                                        '&:hover': {
                                            backgroundColor: '#009877',
                                        },
                                        '&.Mui-disabled': {
                                            backgroundColor: '#71A99D',
                                            color: '#ffffff',
                                            cursor: 'not-allowed',
                                        },
                                    }}
                                    variant="contained"
                                    onClick={handleButtonClick}
                                    disabled={!vendedores}
                                >Actualizar</Button>
                            </Grid>
                        </Grid>

                    </div>
                )}
            </Box>
        </div>
    );
}

export default Form;