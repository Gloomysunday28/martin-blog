interface WeatherConfig {
  [propNames: number]: any
}

let weather: WeatherConfig = {}

for (let i = 0; i < 28; i++) {
  weather[i] = require(`../assets/imgs/${i}@2x.png`)
}

export default weather