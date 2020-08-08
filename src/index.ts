import * as weather from 'openweather-apis';

const userCity = 'New York'

weather.setLang('en');
// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
// Turkish - tr, Croatian - hr, Catalan - ca

// set city by name
weather.setCity(userCity);

weather.setAPPID('81e37ce4badff27cd32572988247eed9')

const addToDom = (val) => {
    const element = document.createElement('div')
    element.innerHTML = val
    document.body.appendChild(element)
}

addToDom('<h2>City</h2>');
addToDom(userCity);

// get the Temperature
weather.getTemperature(function (err, temp) {
    addToDom('<h2>Temperature</h2>');
    addToDom(temp);
});

// get the Atm Pressure
weather.getPressure(function (err, pres) {
    addToDom('<h2>Pressure</h2>');
    addToDom(pres);
});

// get the Humidity
weather.getHumidity(function (err, hum) {
    addToDom('<h2>Humidity</h2>');
    addToDom(hum);
});

// get the Description of the weather condition
weather.getDescription(function (err, desc) {
    addToDom('<h2>Description</h2>');
    addToDom(desc);
});

// get all the JSON file returned from server (rich of info)
weather.getAllWeather(function (err, JSONObj) {
    addToDom(''j);
    addToDom('AllWeather'j);
    addToDom(JSONObj);
});
