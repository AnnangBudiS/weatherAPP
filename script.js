// https://api.openweathermap.org/data/2.5/weather?q=jakarta&units=metric&appid=80ce78e21711dedf3516ec5049572909#

let weather = {
    apiKey: "80ce78e21711dedf3516ec5049572909",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=metric&appid="
        + this.apiKey
        )
        .then((res) => res.json())
        .then((data) => this.showWeather(data))
    },
    showWeather: function (data) {
        const {name} = data;
        const {temp, humidity } = data.main;
        const {icon,description} = data.weather[0];
        const {speed} = data.wind;

        document.querySelector('h2').innerText = name;
        document.querySelector('.temp').innerText = temp + " °C";
        document.querySelector('.icon').src = 'http://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText ="Humidity : " + humidity;
        document.querySelector('.wind').innerText ="Wind Speed : " + speed + " km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x1000/?"+ name +"')";
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }

};

document.querySelector('.search button').addEventListener('click', () => {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Jakarta");