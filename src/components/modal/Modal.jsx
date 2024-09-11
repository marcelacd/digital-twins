// Modal.js
import React from 'react';
import './Modal.css';

import BasicBars from '../chart/BarChart'
// import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

function Modal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <BasicBars />

                {/* <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            area: true,
                        },
                    ]}
                    width={500}
                    height={300}
                /> */}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default Modal;
