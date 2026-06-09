// import https from "https";
// import readline from "readline";
// import chalk from "chalk";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const apiKey = "77c79f091fe45ef62dcfa274a6327b05";

// rl.question("Enter city name: ", (city) => {

//     const apiUrl = `http://weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

//     https.get(apiUrl, (response) => {

//         let data = "";

//         response.on("data", (chunk) => {
//             data += chunk;
//         });

//         response.on("end", () => {

//             const weatherData = JSON.parse(data);

//             if (weatherData.error) {
//                 console.log(chalk.red("Invalid City Name!"));
//             } else {
//                 const temperature = weatherData.current.temp_c;
//                 const description = weatherData.current.condition.text;
//                 const humidity = weatherData.current.humidity;
//                 const windSpeed = weatherData.current.wind_kph;

//                 console.log(chalk.green("\nWeather Information"));
//                 console.log(`City: ${weatherData.location.name}`);
//                 console.log(`Temperature: ${temperature} °C`);
//                 console.log(`Description: ${description}`);
//                 console.log(`Humidity: ${humidity}%`);
//                 console.log(`Wind Speed: ${windSpeed} km/h`);
//             }

//             rl.close();
//         });

//     }).on("error", (err) => {
//         console.log(chalk.red(err.message));
//         rl.close();
//     });

// 
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const API_KEY = "77c79f091fe45ef62dcfa274a6327b05";
const BASE_URL =
    "https://api.openweathermap.org/data/2.5/weather";


const getWeather = async (city) => {
    const url =
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
   
   
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const weatherData = await response.json();
        //   console.log(weatherData);
          
        console.log(chalk.green("\nWeather Information"));
        console.log(`City: ${weatherData.name}`);
        console.log(`Temperature: ${weatherData.main.temp} °C`);
        console.log(
            `Description: ${weatherData.weather[0].description}`
        );
        console.log(`Humidity: ${weatherData.main.humidity}%`);
        console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
    } catch (error) {
        console.log(chalk.red(error.message));
    }
};

rl.question("Enter city name: ", async (city) => {
    await getWeather(city);
    rl.close();
});