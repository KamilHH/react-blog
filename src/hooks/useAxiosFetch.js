import axios from 'axios'
import { useEffect, useState } from 'react'

const useAxiosFetch = (apiUrl) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const source = axios.CancelToken.source()

    const fetchData = async (url) => {
      setIsLoading(true)
      try {
        const response = await axios.get(url, { cancelToken: source.token })
        if (isMounted) {
          setData(response.data)
          setFetchError(null)
        }
      } catch (err) {
        if (isMounted) {
          console.log(err)
          setFetchError(err.message)
          setData([])
        }
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    fetchData(apiUrl)

    const cleanUp = () => {
      console.log('clean up function')
      isMounted = false
      source.cancel()
    }

    return cleanUp
  }, [apiUrl])

  return { data, isLoading, fetchError }
}

export default useAxiosFetch
