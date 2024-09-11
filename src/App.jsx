import * as React from 'react';
import Controls from './components/controls/Controls';
import Modal from './components/modal/Modal';
import './App.css';

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

  // Enviar mensajes a cesio iframe
  const sendMessageToIframe = (message) => {
    if (iframeRef.current) {
      const iframeElement = iframeRef.current;
      // console.log(iframeElement)
      // console.log(message)
      iframeElement.contentWindow?.postMessage(message, "*");
    }
  };

  return (
    <div className="app">
      <div className="controls">
        <Controls sendMessageToIframe={sendMessageToIframe} />
      </div>
      {/* <button onClick={openModal}>Abrir Modal</button> */}


      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Comparación de las ventas mensual por zona"
        content="Este es el contenido del modal"
      />

      <iframe className='iframe' src="map/index.html" title="map" width="100%" height="100%" ref={iframeRef}></iframe>
    </div>
  );
}

export default App;
