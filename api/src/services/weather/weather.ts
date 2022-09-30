import { UserInputError } from '@redwoodjs/graphql-server'
import { fetch } from 'cross-undici-fetch'

export const getWeather = async ({ zip }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=a7d67725b5180e1168f8c42ab48da2e5`
  )
  const json = await response.json()

  if (json.cod === '404') {
    throw new UserInputError(`${zip} isn't a valid US zip code, please try again`)
  }

  return {
    zip,
    city: json.name,
    conditions: json.weather[0].main,
    temp: Math.round(((json.main.temp - 273.15) * 9) / 5 + 32),
    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
  }
}