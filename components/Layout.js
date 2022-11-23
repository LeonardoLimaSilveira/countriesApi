import React from 'react'
import Head from 'next/head'
import { BsMoon, BsMoonFill } from 'react-icons/bs'

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false)
  function handleTheme() {
    window.localStorage.setItem('dark', !darkMode)
    setDarkMode(JSON.parse(localStorage.getItem('dark')))
  }

  return (
    <>
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
      </div>
      <main>{children}</main>
    </>
  )
}

export default Layout
