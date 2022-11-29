import { Modal } from 'components/primitives';
import useToggle from 'hooks/useToggle';
import React from 'react';

function Summary({ variantName, interactions, executed }) {

  const modalOpen = useToggle(false)

  function SimplifiedSummary() {
    switch (variantName) {
      case 'interaction':
        return (
          <>
            <p>Reacciones: {executed.reactions}/{interactions.reactions}</p>
            <p>Comentarios: {executed.comments.length}/{interactions.comments.length}</p>
            {executed.shares !== undefined && <p>Compartidos: {executed.shares}/{interactions.shares}</p>}
          </>
        )
      case 'publication':
        return <p>Publicaciones: {executed.publications.length}/{interactions.publications.length}</p>
      case 'join-groups':
        return <p>Grupos agregados: {executed.groups.length}/{interactions.groups.length}</p>
      case 'share-groups':
        return <p>Grupos compartidos: {executed.groups.length}/{interactions.groups.length}</p>
      case 'report':
        return <p>Reportes: {executed.reports}/{interactions.reports}</p>
      default:
        return null
    }
  }

  return (
    <>
      <div onClick={modalOpen.toggle} style={{ cursor: 'default', justifyContent: 'center' }}>
        <SimplifiedSummary/>
      </div>

      {/* <Modal title={'Resumen de la order'} visible={modalOpen.state} footer={null} onCancel={modalOpen.toggle}>

      </Modal> */}
    </>
  );

}



export default Summary;
