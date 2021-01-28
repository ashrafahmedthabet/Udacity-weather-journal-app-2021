/* Global Variables */
const apiKey="&appid=4e0f5b00c74da305fe180f37e46584f6&units=imperial";
const date = document.getElementById("date");
const temperature = document.getElementById("temp");
const content = document.getElementById("content");
const btn = document.getElementById("generate");
const zipCode = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const postUrl = "http://localhost:3000/postData";
const getUrl = "http://localhost:3000/all";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() == 0 ? d.getMonth() + 1 : d.getMonth}/${d.getDate()}/${d.getFullYear()}`;
//catch error
const catchError=()=>{
  alert("Request failed");
}
// post data to server
const postData = async (data) => {
  const response = await fetch(postUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    if(response.ok){
      getData();
    }
    else{
      alert("Failed request");
    }
  } catch (error) {
    catchError();
  }
};
//get data from server
const getData = async () => {
  const response = await fetch(getUrl);
  try {
    let allData = await response.json();
    if (response.ok) {
      updateUi(allData);
    } else {
      alert("Failed get request");
    }
  } catch (error) {
    catchError();
  }
};
// Update client side with data recevied from server
const updateUi = (data) => {
  date.innerHTML = data.date;
  temperature.innerHTML = data.temp;
  content.innerHTML = data.content;
};
// fetch data from api and data from client side
const generate = async () => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}${apiKey}`;
  let response = await fetch(apiUrl);
  try {
    let allData = await response.json();
    if (allData.cod == "404") {
      alert(allData.message);
    } else {
      let data = {
        date: newDate,
        temp: allData.main.temp,
        content: feelings.value,
      };
      postData(data);
    }
  } catch (error) {
    catchError();
  }
};
btn.addEventListener("click", generate);
