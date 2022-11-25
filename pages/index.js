import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsMoon, BsMoonFill, BsSearch } from 'react-icons/bs'
import axios from 'axios'

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [region, setRegion] = React.useState()
  const [countries, setCountries] = React.useState([])
  const [input, setInput] = React.useState()
  const [error, setError] = React.useState(false)

  const router = useRouter()

  function handleTheme() {
    window.localStorage.setItem('dark', !darkMode)
    setDarkMode(JSON.parse(localStorage.getItem('dark')))
  }

  function handleSelect(e) {
    setRegion(e.target.value)
  }
  function handleCountry(e) {
    setInput(e.target.value)
  }
  React.useEffect(() => {
    if (region && !input) {
      axios.get(`https://restcountries.com/v3.1/region/${region}`).then(r => {
        setCountries(r.data)
      })
    } else {
      setRegion('americas')
    }
    if (input) {
      axios
        .get(`https://restcountries.com/v3.1/name/${input}`)
        .then(r => {
          setError(false)
          setCountries(r.data)
        })
        .catch(e => {
          setError(true)
        })
    }
    return
  }, [, region, input])

  React.useEffect(() => {}, [input])

  return (
    <div className={darkMode ? 'dark bg-VeryDarkBlueD' : 'bg-VeryLightGrayL'}>
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
      <main className="">
        <div className="my-12 mx-auto max-w-[80%] flex justify-between items-center">
          <div className="w-[430px] flex justify-start items-center h-12 bg-white rounded-md shadow-3xl dark:bg-DarkBlueD dark:text-white">
            <BsSearch className="mx-6" />
            <input
              type="text"
              placeholder="Search for a country..."
              className="form-input w-10/12 outline-none dark:bg-DarkBlueD "
              onChange={handleCountry}
            />
          </div>
          <select
            name=""
            className="border-none outline-none rounded-md  bg-white w-36 p-1 h-12 border shadow-3xl text-left text-base  dark:bg-DarkBlueD dark:text-white"
            onChange={handleSelect}
          >
            <option value="" disabled hidden>
              Filter by region
            </option>
            <option value="africa">Africa</option>

            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
        <div className="grid grid-cols-4 max-w-[80%] justify-center items-center mx-auto mt-12">
          {error && (
            <div className="w-full h-screen ">
              <h1 className="text-[red] font-extrabold">
                Verify if you type correctly the country name
              </h1>
            </div>
          )}
          {!error &&
            countries.map(item => {
              return (
                <Link
                  key={item.name.common}
                  href={{
                    pathname: `/${item.name.common}`,
                    query: { name: `${item.name.common}` }
                  }}
                >
                  <div className="mt-12 bg-white w-[250px] shadow-xl rounded-md cursor-pointer dark:bg-DarkBlueD dark:text-white">
                    <img
                      src={item.flags.png}
                      alt={`${item.name.common} flag`}
                      className="w-[250px] h-[150px] rounded-t-md"
                    />
                    <div className="w-[250px] h-[150px] flex flex-col justify-center ml-4 ">
                      <h2 className="font-extrabold my-2 text-lg">
                        {item.name.common}
                      </h2>
                      <p className="font-bold text-sm my-1">
                        Population:{' '}
                        <span className="font-light">{item.population}</span>
                      </p>
                      <p className="font-bold text-sm my-1">
                        Region:{' '}
                        <span className="font-light">{item.region}</span>
                      </p>
                      <p className="font-bold text-sm my-1">
                        Capital:{' '}
                        <span className="font-light">{item.capital}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </main>
    </div>
  )
}
