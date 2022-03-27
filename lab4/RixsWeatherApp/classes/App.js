export default class App {
    constructor(API_KEY1, API_KEY2) {
        this.API_KEY1 = API_KEY1;
        this.API_KEY2 = API_KEY2;
        this.lat = 0;
        this.lng = 0;
        this.getLocation();
        // this.getSong();

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

    locationError(err){
        console.log(err);
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
        console.log(this.weather);
        summary = "storm";

        if(summary.includes("cloud")) {
            this.getCloudSong();
        } else if(summary.includes("sun")) {
            this.getSunSong();
        } else if(summary.includes("wind")) {
            this.getWindSong();
        } else if(summary.includes("rain")) {
            this.getRainSong();
        } else if(summary.includes("storm")) {
            this.getStormSong();
        }

        document.querySelector("h1").innerHTML = summary;
        document.querySelector(".temp").innerHTML = temp + "°C";
    }

    getCloudSong() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'genius.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY2
            }
        };
        
        fetch("https://genius.p.rapidapi.com/search?q=cloudy_day_tones", options)
            .then( (response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                this.printSong(json);
            })
            .catch(err => console.error(err))
            .finally( () => console.log("songs are done"));
    }

    getSunSong() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'genius.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY2
            }
        };
        
        fetch("https://genius.p.rapidapi.com/search?q=here_comes_the_sun", options)
            .then( (response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                this.printSong(json);
            })
            .catch(err => console.error(err))
            .finally( () => console.log("songs are done"));
    }

    getRainSong() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'genius.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY2
            }
        };
        
        fetch("https://genius.p.rapidapi.com/search?q=umbrella_rihanna", options)
            .then( (response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                this.printSong(json);
            })
            .catch(err => console.error(err))
            .finally( () => console.log("songs are done"));
    }

    getWindSong() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'genius.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY2
            }
        };
        
        fetch("https://genius.p.rapidapi.com/search?q=wind_of_change", options)
            .then( (response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                this.printSong(json);
            })
            .catch(err => console.error(err))
            .finally( () => console.log("songs are done"));
    }

    getStormSong() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'genius.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY2
            }
        };
        
        fetch("https://genius.p.rapidapi.com/search?q=AC/DC_thunderstruck", options)
            .then( (response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                this.printSong(json);
            })
            .catch(err => console.error(err))
            .finally( () => console.log("songs are done"));
    }

    printSong(json){
        let title = json.response.hits[0].result.full_title;
        let cover = json.response.hits[0].result.header_image_url;
        let lyrics = json.response.hits[0].result.url;

        document.querySelector(".title").innerHTML = title + " 🔊";
        document.querySelector(".title").href = lyrics;
        document.querySelector(".albumCover").src = cover;
    }

}