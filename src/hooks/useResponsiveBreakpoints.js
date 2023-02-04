import { useEffect, useState } from "react"
import useWindowSize from "./useWindowSize"

const useResponsiveBreakpoints = () => {
  const { width } = useWindowSize()

  const [xs, setXs] = useState(width < 576)
  const [sm, setSm] = useState(width < 768)
  const [md, setMd] = useState(width < 992)
  const [lg, setLg] = useState(width < 1200)


  useEffect(() => {
    setXs(width < 576 )
    setSm(width < 768)
    setMd(width < 992)
    setLg(width < 1200)
  },[width])

  return { xs, sm, md, lg }
}

export default useResponsiveBreakpoints