import styles from '../../spscss/weather.module.css';
import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    const [error, setError] = useState(false);
    const [data, setdata] = useState({});
    const [ready, setReady] = useState(false);
    const [location, setlocation] = useState();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16220d9e1846d98a6586896a3937fc57`;

    async function searchlocation(event) {
        if (event.key === 'Enter') {
            await axios.get(url)
                .then((response) => {
                    setdata(response.data);
                    setReady(true);
                    setError(false);
                }).catch((e) => {
                    console.log(e);
                    setError(true);
                    setReady(true);
                });
            setlocation('');
        }
    }

    return (
        <>
            <div className={styles.hero}>
                <div className={styles.searching}>
                    <input
                        className={styles.weatinput}
                        type="text"
                        value={location}
                        placeholder='type a place and press enter'
                        onChange={event => setlocation(event.target.value)}
                        onKeyDown={searchlocation}
                    />
                </div>

                {ready && !error ? (
                    <div className={styles.container}>
                        <div className={styles.top}>
                            <div className={styles.location}>
                                <p>{data.name}</p>
                            </div>
                            <div className={styles.temp}>
                                {data.main ? <h1>{Math.floor(data.main.temp - 273)}° C</h1> : null}
                            </div>
                            <div className={styles.description}>
                                {data.weather ? <p>{data.weather[0].description}</p> : null}
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.feels}>
                                {data.main ? <p>{Math.floor(data.main.feels_like - 273)}° C</p> : null}
                                <p className={styles.bold}>feels like</p>
                            </div>
                            <div className={styles.humidity}>
                                {data.main ? <p>{data.main.humidity}%</p> : null}
                                <p className={styles.bold}>humidity</p>
                            </div>
                            <div className={styles.wind}>
                                {data.wind ? <p>{data.wind.speed} mph</p> : null}
                                <p className={styles.bold}>wind speed</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    ready && error &&
                    <p style={{ color: 'red' }}>this place does not exist in the database :(</p>
                )}
            </div>
        </>
    );
}

export default Weather;
