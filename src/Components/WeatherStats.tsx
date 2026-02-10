import Stat from "./Stat";

type Props = {
    feelsLike: number;
    humidity: number;
    wind: number;
    precipitation: number;
}; 
       
export const WeatherStats = ({
    feelsLike,
    humidity,
    wind,
    precipitation,
    
}: Props) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:max-w-xl lg:gap-10 mt-10">
        <Stat label="Feels Like" value= {`${feelsLike}°`} />
        <Stat label="Humidity" value= {`${humidity}%`} />
        <Stat label="Wind" value= {`${wind} km/h`} />
        <Stat label="Precipitation" value= {`${precipitation} mm`} />
    </div>
);