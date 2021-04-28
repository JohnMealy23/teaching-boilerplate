import * as weather from 'openweather-apis';
let sandBox
export const init = () => {
    // element to store the items to be cleared
    sandBox = document.createElement('div')
    document.body.appendChild(sandBox)
}

export const printWeather = (userCity,languageAbr,tempUnits) => {
    // clear out the previous weather output
    sandBox.innerHTML = ''

    weather.setLang(languageAbr);
    // English - en, Russian - ru, Italian - it, Spanish - es (or sp),
    // Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
    // Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
    // Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
    // Turkish - tr, Croatian - hr, Catalan - ca

    // set city by name

    weather.setCity(userCity);

    weather.setAPPID('81e37ce4badff27cd32572988247eed9')

    // 'metric'  'internal'  'imperial'
 	weather.setUnits(tempUnits); //.setUnits is a method.

    const addToDom = (val) => {
        const element = document.createElement('div')
        element.innerHTML = val
        sandBox.appendChild(element)
    }

    addToDom('<h2>City</h2>');
    addToDom(userCity);

    const errs = [];

    try {
        // get the Temperature
        weather.getTemperature(function (err, temp) {
            if (err) {
                errs.push(err)
            } else {
                addToDom('<h2>Temperature</h2>');
                addToDom(temp);
            }
        });

        // get the Atm Pressure
        weather.getPressure(function (err, pres) {
            if (err) {
                errs.push(err)
            } else {
                addToDom('<h2>Pressure</h2>');
                addToDom(pres);
            }
        });

        // get the Humidity
        weather.getHumidity(function (err, hum) {
            if (err) {
                errs.push(err)
            } else {
                addToDom('<h2>Humidity</h2>');
                addToDom(hum);
            }
        });

        // get the Description of the weather condition
        weather.getDescription(function (err, desc) {
            if (err) {
                errs.push(err)
            } else {
                addToDom('<h2>Description</h2>');
                addToDom(desc);
            }
        });

        // get all the JSON file returned from server (rich of info)
        weather.getAllWeather(function (err, data) {
            if (err) {
                errs.push(err)
            } else {
                addToDom('<h2>All Weather Data</h2>');
                addToDom(`<pre>${JSON.stringify(data, null, 4)}</pre>`);
            }
        });

    } catch (e) {
        errs.push(e.message)
    }

    // Display errors
    if (errs.length) {
        errs.forEach((err) => {
            addToDom('<h2>Error</h2>');
            addToDom(`<pre>${err}</pre>`);
        })
    }
}
