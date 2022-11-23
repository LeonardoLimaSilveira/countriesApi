import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Head from 'next/head'
const index = () => {
  const [country, setCountry] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const router = useRouter()
  console.log(router.isReady)

  React.useEffect(() => {
    if (!router.query.country) {
      return
    }
    const fetchIt = async () => {
      const res = await axios
        .get(`https://restcountries.com/v3.1/name/${router.query.country}`)
        .catch(e => {
          if (e.response.status === 404) {
            router.push('/404')
          }
          setError(true)
          setLoading(false)
        })
      if (res && res.status === 200) {
        setCountry(res.data[0])
        setLoading(false)
        setError(false)
      }
    }
    fetchIt()
  }, [router.isReady])

  return (
    <div>
      {country && (
        <div>
          <Head>
            <title>Countries API</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
              rel="stylesheet"
            />
          </Head>
        </div>
      )}
      {loading && (
        <div className="flex items-center justify-center w-40 h-10 mx-auto my-9 rounded-md shadow-xl font-bold bg-DarkBlueD text-white">
          <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          <h1>Loading</h1>
        </div>
      )}
    </div>
  )
}

export default index
