import React from 'react';

const AvailableMessage = ({ quantity }) => {
    if (quantity === 0) {
        return <span style={{ color: "crimson" }}>¡No hay agentes disponibles!</span>
    }
    if (quantity === 1) {
        return <span style={{ color: "dodgerblue" }}>Puedes ejecutar hasta {quantity} acción</span>
    }
    else {
        return <span style={{ color: "dodgerblue" }}>Puedes ejecutar hasta {quantity} acciones</span>
    }
}

export default AvailableMessage;