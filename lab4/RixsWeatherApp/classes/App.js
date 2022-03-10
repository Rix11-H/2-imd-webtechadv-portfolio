export default class App {
    constructor(API_KEY1, API_KEY2) {
        this.API_KEY1 = API_KEY1;
        this.API_KEY2 = API_KEY2;
        this.lat = 0;
        this.lng = 0;
        this.getLocation();
        this.getLotr();
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(
            this.locationSucces.bind(this), 
            this.locationError.bind(this)
        );
    }

    locationSucces(location){
        console.log(location);
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.getWeather();
    }

    getWeather(){
        console.log("getting weather");
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lng}&appid=${this.API_KEY1}`
        console.log(url);
        fetch(url)
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                console.log(json)
                this.printWeather(json);
            })
            .catch(err => console.log(err))
            .finally( () => console.log("finally done"));
    }

    printWeather(json){
        let summary = json.weather[0].description;
        let temp = Math.round(json.main.temp);
        //if(temp < 8) {}
        document.querySelector("h1").innerHTML = summary;
        document.querySelector("h2").innerHTML = temp + "°C";
    }

    locationError(err){
        console.log(err);
    }

    getLotr(){
        console.log("getting lotr data");
        let url = `https://the-one-api.dev/v2/quote`
        console.log(url);
        fetch(url)
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                console.log(json)
                this.printWeather(json);
            })
            .catch(err => console.log(err))
            .finally( () => console.log("finally done"));
    }
}