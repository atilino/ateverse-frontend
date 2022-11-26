import React from 'react';
import { date } from '../../../../utilities'

function DeliveryDateIndicator({ deliveryDate }) {
  if(deliveryDate == null) return 'No disponible'
  if(date.isToday(deliveryDate)) return `Hoy a las ${date.formatHHMM(deliveryDate)}`
  if(date.isTomorrow(deliveryDate)) return `Mañana a las ${date.formatHHMM(deliveryDate)}`

  return `${date.formatDDMMYYYY(deliveryDate)} ${date.formatHHMM(deliveryDate)}`
}

export default DeliveryDateIndicator;