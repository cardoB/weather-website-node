const weatherForm = document.querySelector('form');
const search = document.querySelector('.location-input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    messageOne.textContent = '';
    messageTwo.textContent = '';
    messageOne.textContent = 'Loading...';
    
    const location = search.value;
    const url = window.location.href + `weather?address=${location}`;
    search.value = '';
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})

/* 
view the website at: 
https://belletta-weather-application-32ed10862529.herokuapp.com

to add features/make changes, commands:
git status
git add .
git commit -m "message to the team"
git push origin main 
git push heroku main

*/