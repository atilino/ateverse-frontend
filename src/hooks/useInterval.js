import { useEffect, useRef } from "react"

/**
 * 
 * @param {function} callback
 * @param {number} delay Seconds
 */
export default function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay * 1000)
      return () => clearInterval(id)
    }
  }, [callback, delay])
}