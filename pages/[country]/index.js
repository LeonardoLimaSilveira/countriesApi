import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsMoon, BsMoonFill, BsArrowLeft } from 'react-icons/bs'
import Head from 'next/head'
import Link from 'next/link'
const index = () => {
  const [darkMode, setDarkMode] = React.useState(false)
  const [country, setCountry] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [infos, setInfos] = React.useState([])
  const [currencie, setCurrencie] = React.useState([])
  const router = useRouter()

  function handleTheme() {
    window.localStorage.setItem('dark', !darkMode)
    setDarkMode(JSON.parse(localStorage.getItem('dark')))
  }

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

  React.useEffect(() => {
    if (country.languages !== undefined) {
      const languages = country.languages
      const currencies = country.currencies

      setInfos([country.languages])
      setCurrencie([country.currencies])
    }
    return
  }, [country])

  return (
    <div
      className={
        darkMode ? 'dark bg-DarkBlueD h-screen' : 'bg-VeryLightGrayL h-screen'
      }
    >
      <div>
        <Head>
          <title>Countries API</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <header className="shadow-md border-DarkGrayL dark:bg-DarkBlueD">
          <div className="m-auto flex justify-between items-center h-16 max-w-[80%]">
            <h1 className="font-extrabold text-xl text-VeryDarkBlueD dark:text-white">
              Where in the world?
            </h1>
            <div
              className="flex items-center justify-center text-sm text-DarkBlueD font-bold cursor-pointer dark:text-white "
              onClick={handleTheme}
            >
              {darkMode ? <BsMoonFill /> : <BsMoon />}
              <span className="ml-2">Dark Mode</span>
            </div>
          </div>
        </header>
        <Link
          href="/"
          className="flex justify-center items-center mt-24 ml-24 bg-white px-8 py-3 font-bold shadow-3xl rounded-md w-[160px] dark:bg-DarkBlueD dark:text-white"
        >
          <BsArrowLeft className="mr-3 " /> Back
        </Link>
      </div>
      {loading && (
        <div className="flex items-center justify-center w-40 h-10 mx-auto my-9 rounded-md shadow-xl font-bold bg-DarkBlueD text-white">
          <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          <h1>Loading</h1>
        </div>
      )}
      {country.name ? (
        <div
          className="grid grid-cols-2 mx-auto my-24 w-[90%] h-96
        "
        >
          <div className="flex justify-center">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className=""
            />
          </div>
          <div>
            <h1 className="font-extrabold mb-4 text-2xl dark:text-white">
              {country.name.common}
            </h1>
            <div className="flex w-[60%] justify-between">
              <div>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Native Name:
                  <span className="font-light dark:text-VeryLightGrayL ml-2 ">
                    {country.altSpellings[1]}
                  </span>
                </h3>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Population:
                  <span className="font-light dark:text-VeryLightGrayL ml-2">
                    {country.population}
                  </span>
                </h3>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Region:
                  <span className="font-light dark:text-VeryLightGrayL ml-2">
                    {country.region}
                  </span>
                </h3>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Sub Region:
                  <span className="font-light dark:text-VeryLightGrayL ml-2">
                    {country.subregion}
                  </span>
                </h3>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Capital:
                  <span className="font-light dark:text-VeryLightGrayL ml-2">
                    {country.capital}
                  </span>
                </h3>
              </div>
              <div className="">
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Top Level Domain:
                  <span className="font-light dark:text-VeryLightGrayL ml-2">
                    {country.tld}
                  </span>
                </h3>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Currencies:
                  {currencie.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className="font-light dark:text-VeryLightGrayL ml-2"
                      >
                        {Object.values(item)[0].name}
                      </span>
                    )
                  })}
                </h3>
                <h3 className="font-bold dark:text-white text-DarkBlueD mb-3">
                  Languages:
                  {infos.map(item => {
                    return Object.values(item).map(item => {
                      return (
                        <span
                          key={item}
                          className="font-light dark:text-VeryLightGrayL ml-2"
                        >
                          {item}
                        </span>
                      )
                    })
                  })}
                </h3>
              </div>
            </div>
            <div className="mt-14 w-full flex flex-wrap">
              <h2 className="font-bold text-DarkBlueD inline dark:text-white">
                {country.borders ? ' Border Countries:' : null}
              </h2>
              {country.borders?.map(item => {
                return (
                  <span className="ml-3 py-1 px-10 bg-white shadow-3xl rounded-md mb-4 dark:bg-DarkBlueD dark:text-white">
                    {item}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default index
