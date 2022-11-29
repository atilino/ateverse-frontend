import { useEffect, useState } from "react"
import useWindowSize from "./useWindowSize"

const useResponsiveBreakpoints = () => {
  const [xs, setXs] = useState(false)
  const [sm, setSm] = useState(false)
  const [md, setMd] = useState(false)
  const [lg, setLg] = useState(false)

  const { width } = useWindowSize()

  useEffect(() => {
    setXs(width < 576)
    setSm(width < 768)
    setMd(width < 992)
    setLg(width < 1200)
  },[width])

  return { xs, sm, md, lg }
}

export default useResponsiveBreakpoints