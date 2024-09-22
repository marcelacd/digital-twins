import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const InputSelect = ({ currencies, handleChangeSelect, defaultValue, label }) => {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { width: '100%' }, margin: '16px' }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-select-currency"
                select
                label={label}
                defaultValue={defaultValue}
                size="small"
                onChange={handleChangeSelect}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}

export default InputSelect;
