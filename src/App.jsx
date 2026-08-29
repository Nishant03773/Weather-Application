import React, {useEffect, useState} from 'react'
import { Search,Wind, Droplets, MoveUp, MoveDown, Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudRainWind, CloudSnow, Snowflake, CloudLightning, CloudHail, Cloudy, Umbrella} from "lucide-react";
import axios from 'axios'

const App = () => {

    const [searched, setSearched] = useState(false);
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');
    const [temperature,setTemperature] = useState('');
    const [apparent_temperature,setApparent_temperature] = useState('');
    const [windSpeed,setWindSpeed] = useState('');
    const [humidity,setHumidity] = useState('');
    const [maxTemperature,setMaxTemperature] = useState('');
    const [minTemperature,setMinTemperature] = useState('');
    const [dayTemperature,setDayTemperature] = useState([]);
    const [location, setLocation] = useState('');
    const [currentWeatherCode,setCurrentWeatherCode] = useState();
    const [hourlyWeatherCondition,setHourlyWeatherCondition] = useState();


    async function getCurrentLocation() {
        const currentLocation = await axios.get("https://ipapi.co/json/")
        setLatitude(currentLocation.data.latitude)
        setLongitude(currentLocation.data.longitude)
        setCity(currentLocation.data.city)
        setRegion(currentLocation.data.region)
        setCountry(currentLocation.data.country_name)

    }
    useEffect(() => {
        getCurrentLocation()
    },[]); {/*Current Location*/}


    async function getCoordinates(search){
        if (!search.trim()) return;

        const coordinates = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`)

        if (!coordinates.data.results) {
            alert("Location not found");
            return;
        }

        setLatitude(coordinates.data.results[0].latitude)
        setLongitude(coordinates.data.results[0].longitude)
        setCity(coordinates.data.results[0].name)
        setRegion(coordinates.data.results[0].admin1 || '')
        setCountry(coordinates.data.results[0].country || '')


    } {/*Coordinates finder of the location*/}

    async function getWeather(latitude,longitude){

        const currentTemperature = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code`)

        setApparent_temperature(currentTemperature.data.current.apparent_temperature)
        setTemperature(currentTemperature.data.current.temperature_2m)
        setMaxTemperature(currentTemperature.data.daily.temperature_2m_max[0])
        setMinTemperature(currentTemperature.data.daily.temperature_2m_min[0])
        setWindSpeed(currentTemperature.data.current.wind_speed_10m)
        setHumidity(currentTemperature.data.current.relative_humidity_2m)
        setDayTemperature(currentTemperature.data.hourly.temperature_2m.slice(0,24))
        setCurrentWeatherCode(currentTemperature.data.current.weather_code);
        setHourlyWeatherCondition(currentTemperature.data.hourly.weather_code)
    }

    useEffect(() => {
        if(latitude && longitude){
            getWeather(latitude,longitude);
        }
    },[latitude,longitude])

    function getCurrentWeatherIcon(weatherCode,property) {

        if (weatherCode === 0) {
            return <Sun className={property} />;
        }

        else if (weatherCode === 1) {
            return <CloudSun className={property} />;
        }

        else if (weatherCode === 2) {
            return <CloudSun className={property} />;
        }

        else if (weatherCode === 3) {
            return <Cloudy className={property} />;
        }

        else if (weatherCode === 45) {
            return <CloudFog className={property} />;
        }

        else if (weatherCode === 48) {
            return <CloudFog className={property} />;
        }

        else if (weatherCode === 51) {
            return <CloudDrizzle className={property} />;
        }

        else if (weatherCode === 53) {
            return <CloudRain className={property} />;
        }

        else if (weatherCode === 55) {
            return <CloudRainWind className={property} />;
        }

        else if (weatherCode === 56) {
            return <CloudDrizzle className={property} />;
        }

        else if (weatherCode === 57) {
            return <CloudRainWind className={property} />;
        }

        else if (weatherCode === 61) {
            return <CloudDrizzle className={property} />;
        }

        else if (weatherCode === 63) {
            return <CloudRain className={property} />;
        }

        else if (weatherCode === 65) {
            return <CloudRainWind className={property} />;
        }

        else if (weatherCode === 66) {
            return <CloudRain className={property} />;
        }

        else if (weatherCode === 67) {
            return <Umbrella className={property} />;
        }

        else if (weatherCode === 71) {
            return <Snowflake className={property} />;
        }

        else if (weatherCode === 73) {
            return <CloudSnow className={property} />;
        }

        else if (weatherCode === 75) {
            return <CloudSnow className={property} />;
        }

        else if (weatherCode === 77) {
            return <Snowflake className={property} />;
        }

        else if (weatherCode === 80) {
            return <CloudDrizzle className={property} />;
        }

        else if (weatherCode === 81) {
            return <CloudRain className={property} />;
        }

        else if (weatherCode === 82) {
            return <CloudRainWind className={property} />;
        }

        else if (weatherCode === 85) {
            return <CloudSnow className={property} />;
        }

        else if (weatherCode === 86) {
            return <Snowflake className={property} />;
        }

        else if (weatherCode === 95) {
            return <CloudLightning className={property} />;
        }

        else if (weatherCode === 96) {
            return <CloudHail className={property} />;
        }

        else if (weatherCode === 99) {
            return <CloudHail className={property} />;
        }

        else {
            return <Cloud className={property} />;
        }
    }




    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col items-center p-12" style={{
                background: `
            radial-gradient(circle at 5% 20%, rgba(100, 80, 180, 0.35), transparent 35%),
            radial-gradient(circle at 45% 75%, rgba(20, 150, 180, 0.25), transparent 35%),
            radial-gradient(circle at 95% 35%, rgba(170, 70, 160, 0.25), transparent 35%),
            #11121c
        `
            }}>

            <h1 className="text-[3rem]  lg:text-[2.7rem] font-inter font-medium text-center">Liquid Weather</h1>
            <p className="m text-center">Real-time atmospheric conditions in liquid glass</p>

            <div className="flex justify-center m-3 ">
                <div className="relative w-full lg:w-92">
                    <form onSubmit={(event)=>{
                            event.preventDefault();
                                getCoordinates(location);
                            setSearched(true);
                    }}>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search city..." className="w-full rounded-full py-3 pl-11 pr-4 border-2" onChange={(e)=>{setLocation(e.target.value)}}/>
                    </form>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] w-full max-w-6xl gap-5 mt-9" >
                <div className="p-5 rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center justify-between ">
                        <h2 className="font-inter text-3xl font-bold">{city}</h2>
                        {!searched && <p className="border-2 py-2 px-3 rounded-full">Now</p> }
                    </div>
                    <p className="text-[1.2rem]">{region}, {country}</p>
                    <div className="flex items-center h-2/3 gap-5">
                        <p className="text-7xl lg:text-9xl font-inter font-bold">{temperature}&deg;</p>
                        <div>
                            {getCurrentWeatherIcon(currentWeatherCode,"size-12 lg:size-19")}
                            <p className="text-[0.8rem] lg:text-[1.2rem]" >Feels like {apparent_temperature}&deg;</p>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-43.75 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-center items-center gap-1.5">
                        <Wind className="bg-[#273850] size-10 p-2 rounded-full" />
                        <h2>Wind</h2>
                        <p>
                            <span className="font-bold text-2xl">{windSpeed}</span>
                            <span> km/h</span>
                        </p>
                    </div>
                    <div className="h-43.75 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-center items-center gap-1.5">
                        <Droplets className="bg-[#254657] size-10 p-2 rounded-full" />
                        <h2>Humidity</h2>
                        <p>
                            <span className="font-bold text-2xl">{humidity}</span>
                            <span>%</span>
                        </p>
                    </div>
                    <div className="h-43.75 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-center items-center gap-1.5">
                        <MoveUp className="bg-[#502c38] size-10 p-2 rounded-full" />
                        <h2>High</h2>
                        <p className="font-bold text-2xl">{maxTemperature}&deg;</p>
                    </div>
                    <div className="h-43.75 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-center items-center gap-1.5">
                        <MoveDown className="bg-[#3a3960] size-10 p-2 rounded-full" />
                        <h2>Low</h2>
                        <p className="font-bold text-2xl">{minTemperature}&deg;</p>
                    </div>
                </div>
            </div>


            <div className="w-full max-w-6xl m-9">
                <h2 className="font-inter text-xl mb-2">Hourly Forecast</h2>
                <div className="hourly-scroll flex items-center px-5 overflow-x-auto gap-1 h-[24vh] w-full rounded-3xl border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
                    {dayTemperature.map((e,idx)=>{
                        return(
                                <div key={idx} className="shrink-0 h-[90%] w-25 lg:w-[10%] flex flex-col justify-center items-center gap-1.5">
                                    <p className="text-[1.2rem]">{String(idx).padStart(2, "0")}:00</p>
                                    {getCurrentWeatherIcon(hourlyWeatherCondition[idx],"size-12 lg:size-9" )}
                                    <p className="text-[1.1rem]" >{e}&deg;</p>

                                </div>
                            )
                    })}
                </div>

            </div>

        </div>
    )
}

export default App