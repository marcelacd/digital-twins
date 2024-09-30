// ConsolidatedHeader.js
import React from 'react';
import { MONTHS } from '../utils/constants';

const ConsolidatedHeader = ({ selectedRangeMeses }) => {

    const valuetext = (value) => {
        const month = MONTHS.find(month => month.value === value)
        return month ? month.label : ''
    }

    return (
        <h4 style={{ margin: '0 0 7px' }}>
            {valuetext(selectedRangeMeses[0]) === valuetext(selectedRangeMeses[1])
                ? `Consolidado del mes de ${valuetext(selectedRangeMeses[0])}`
                : `Consolidado en el rango ${valuetext(selectedRangeMeses[0])} - ${valuetext(selectedRangeMeses[1])}`}
        </h4>
    );
};

export default ConsolidatedHeader;
