/* Global Variables - Keep your original */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b6f9b3d62cfdac2ed6e65229dbff0530&units=metric';
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const userInfo = document.getElementById('userInfo');
const generateBtn = document.getElementById('generate');

// Event listener - Keep your original
generateBtn.addEventListener('click', performAction);

/* Modified performAction */
async function performAction(e) {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  // Add ZIP validation
  if (!zipCode || zipCode.length !== 5) {
    alert("Please enter a 5-digit US ZIP code");
    return;
  }

  try {
    const data = await getWeatherData(zipCode);
    await postData('/add', {
      temp: convertKelvinToCelsius(data.main.temp),
      date: newDate,
      content: content
    });
    updateUI();
    userInfo.reset();
  } catch (error) {
    console.error('Error:', error);
    alert("Invalid ZIP code or API error");
  }
}

/* Modified getWeatherData */
const getWeatherData = async (zipCode) => {
  const res = await fetch(`${baseUrl}?zip=${zipCode},us&appid=${apiKey}`); // Added ,us
  if (!res.ok) throw new Error('Failed to fetch weather');
  return res.json();
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to save data');
  return response.json();
};

/* UI Update */
const updateUI = async () => {
  try {
    const response = await fetch('/all');
    const data = await response.json();

    document.getElementById('date').textContent = data.date || '';
    document.getElementById('temp').textContent = data.temp ? `${data.temp}°C` : '';
    document.getElementById('content').textContent = data.content || '';
  } catch (error) {
    console.error('UI update failed:', error);
  }
};

/* Helper */
function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}