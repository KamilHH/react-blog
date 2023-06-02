import { useState, useEffect } from 'react'
import { db } from '../api/firestore'
import { collection, getDocs } from 'firebase/firestore'

const useFirestore = (collectionPath) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)

      try {
        const querySnapshot = await getDocs(collection(db, collectionPath))
        const fetchedData = []
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() })
        })
        if (isMounted) {
          setData(fetchedData)
          setFetchError(null)
        }
      } catch (err) {
        if (isMounted) {
          console.log(err)
          setFetchError(err.message)
          setData([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [collectionPath])

  return { data, isLoading, fetchError }
}

export default useFirestore
