import React, { useState } from 'react';
import './Form.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import enviarDatos from '../../services/amazonAws'
import Swal from 'sweetalert2'

function Form() {
    const [isOpen, setIsOpen] = useState(false)
    const [vendedores, setVendedores] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event) => {
        setVendedores(event.target.value)
    }

    const handleButtonClick = async () => {
        setIsLoading(true)

        const data = { "vendedores": vendedores }
        const response = await enviarDatos(data);

        if (response) {
            setIsLoading(false)

            Swal.fire({
                icon: "error",
                text: "Error enviando el parametro!",
            })
            // console.log('Ocurrió un error:', response.error)
        } else {
            setIsLoading(false)
            setIsOpen(!isOpen)

            Swal.fire({
                icon: "success",
                text: "Parametro enviado correctamente!!",
            })
            // console.log('Datos enviados exitosamente:', response)
        }
    }

    const toggleOpen = () => {
        setVendedores()
        setIsOpen(!isOpen)
    }

    return (
        <div className={`container-bo ${isOpen ? 'open' : ''}`} >

            <Box>
                <div className="controls-heade">
                    <IconButton onClick={toggleOpen}>
                        {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                {isOpen && (
                    <div className="conten">
                        <h3>Parametros</h3>

                        <Grid container sx={{ margin: '20px 0' }}>
                            <Grid size={12}>
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
                            <Grid size={12} sx={{ textAlign: 'center' }}>
                                <Button
                                    sx={{
                                        // width: '70%',
                                        width: '100px',
                                        height: '40px',
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
                                > {isLoading ? <span className="loader-btn"></span> : 'Actualizar'}</Button>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Box>
        </div>
    );
}

export default Form;