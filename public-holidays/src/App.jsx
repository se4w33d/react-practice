import { useState, useEffect } from 'react'
// import viteLogo from '/vite.svg'
import './App.css'

function Countries( {selectedCountry, setSelectedCountry, countries} ) {
  return (
    <>
      <div className='country'>
        <select 
          name="countries" 
          id="countries-select" 
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
        >
          {
            countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>{country.name[0].text}</option>
            ))
          }
        </select>
      </div>
    </>
  )
}


function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("NL");
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const countriesURL = 'https://openholidaysapi.org/Countries';
    const languageIsoCode = 'EN';
    const headers = {
      'accept': 'application/json'
    };
    const url = `${countriesURL}?languageIsoCode=${languageIsoCode}`;

    async function fetchCountries() {
      try {
        let response = await fetch(url, {headers});
        if (!response.ok) {
          throw new Error(`HTTP error for fetchCountries! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCountries();
  }, [])

  useEffect(() => {
    const baseUrl = 'https://openholidaysapi.org/PublicHolidays';
    const countryIsoCode = selectedCountry;
    const validFrom = '2023-01-01';
    const validTo = '2023-12-31';
    const languageIsoCode = 'EN';
    const headers = {
      'accept': 'application/json'
    };

    const fetchHolidays = async() => {
      const url = `${baseUrl}?countryIsoCode=${countryIsoCode}&validFrom=${validFrom}&validTo=${validTo}&languageIsoCode=${languageIsoCode}`

      const response = await fetch(url, {headers});

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setHolidays(data);
    }
    fetchHolidays();
  }, [selectedCountry]);

  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div className='title'>
        <h1>Public Holidays 2023</h1>
      </div>
      <Countries selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} countries={countries} />
      <div className='holidays'>
        <ul>
        {
          holidays.map((holiday) => (
            <li key={holiday.id}>
              {formatted.format(new Date(holiday.startDate))} - <span>{holiday.name[0].text}</span>
            </li>
          ))
        }
        </ul>
      </div>
    </>
  )
}

export default App
