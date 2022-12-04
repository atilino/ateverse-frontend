'use strict'

import { useState } from "react"
import { storage as storageService } from '../services'

export const useRemoteStorage = () => {
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)


  const getEvidence = (orderId, accountId) => {
    return storageService.getEvidence(orderId, accountId)
      .then(data => {
        setFile(data.body)
      })
  }

  return {
    file,
    loading,
    getEvidence
  }
}