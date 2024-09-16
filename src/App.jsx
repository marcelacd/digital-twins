import * as React from 'react';
import Controls from './components/controls/Controls';
import Modal from './components/modal/Modal';
import './App.css';

import { city } from './components/controls/data.ts';

// import React, { useState } from 'react';

const App = () => {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const iframeRef = React.useRef(null);

  // Funciones para abrir y cerrar el modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  // Recibir mensajes de cesio iframe
  // window.addEventListener('message', (event) => {
  //   const data = event.data;
  // });

  // useEffect para añadir el listener al cargar el componente
  React.useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      if (data.type === 'zonaSelected') {
        console.log(data);
        openModal();
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup function para eliminar el listener al desmontar el componente
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  //Cargar la data por primera vez
  React.useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow.postMessage({
          codeCity: 'BG',
          value: city['BG'],
          // location: {lon: -74.1561, lat: 4.4610, height: 15100, heading: 4.360248260903442, pitch: -42.55796, name: ''}
        }, '*');
      }
    };

    // Asegúrate de que el iframe esté completamente cargado antes de enviar los datos
    const iframeElement = iframeRef.current;
    if (iframeElement) {
      iframeElement.addEventListener('load', handleIframeLoad);
    }

    // Limpia el listener cuando el componente se desmonta
    return () => {
      if (iframeElement) {
        iframeElement.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [city]);

  // Enviar mensajes a cesio iframe
  const sendMessageToIframe = (message) => {
    // iframeElement.contentWindow?.postMessage(message, "*");
    if (iframeRef.current) {
      const iframeElement = iframeRef.current;
      iframeElement.contentWindow?.postMessage(message, "*");
    }
  };

  return (
    <div className="app">
      <div className="controls">
        <Controls sendMessageToIframe={sendMessageToIframe} />
      </div>
      {/* <button onClick={openModal}>Abrir Modal</button> */}

      <iframe className='iframe' src="map/index.html" title="map" width="100%" height="100%" ref={iframeRef}></iframe>

      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
}

export default App;
