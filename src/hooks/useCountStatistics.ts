import { useEffect, useState } from 'react'

const useCountUp = (
  endValue: number,
  duration: number,
  decimals: number = 0
) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = endValue / (duration / 100)

    const handle = setInterval(() => {
      start += increment
      if (start >= endValue) {
        clearInterval(handle)
        start = endValue
      }
      setValue(parseFloat(start.toFixed(decimals)))
    }, 100)

    return () => clearInterval(handle)
  }, [endValue, duration, decimals])

  return value
}

export default useCountUp
