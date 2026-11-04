import { use, useEffect, useState } from "react";
import Prayer from "./components/Prayer";
import "./index.css"
function App() {



  const cities = [
    { name: "حمص", value: "Homs" },
    { name: "دمشق", value: "Damascus" },
    { name: "حلب", value: "Aleppo" },
    { name: "حماه", value: "Hama" },
    { name: "ادلب", value: "Idlib" },
    { name: "الرقه", value: "Alrakkah" },
    { name: "الحسكة", value: "Alhasakah" },
  ];

  const [prayerTimes, setPrayerTimes] = useState();
  const [dateTime,setDateTime] = useState("");
  const [city, setCity] = useState("Damascus");
console.log(city);
  useEffect(()=> {

    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`);
        const data_prayer = await response.json();
        setPrayerTimes(data_prayer.data.timings);
        setDateTime(data_prayer.data.date.gregorian.date);
        console.log(data_prayer);
        console.log(data_prayer.data.date.gregorian.date);
        
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
}
fetchPrayerTimes();

},[city])



  const formatTime = (time) => {
    if(!time){
      return "00:00";
      }
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`; 
    
    
    }

  
  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>

            <select name="" id="" onChange={(e) => { setCity(e.target.value)}}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
          </div>

          <Prayer name="الفجر" time={formatTime (prayerTimes?.Fajr)} />
          <Prayer name="الشروق" time={formatTime (prayerTimes?.Sunrise)} />
          <Prayer name="الظهر" time={formatTime (prayerTimes?.Dhuhr)} />
          <Prayer name="العصر" time={formatTime (prayerTimes?.Asr)} />
          <Prayer name="المغرب" time={formatTime (prayerTimes?.Maghrib)} />
          <Prayer name="العشاء" time={formatTime (prayerTimes?.Isha)} />
      </div>
    </section>
  );
}

export default App;
