export async function refreshAccessToken(){
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    return 401;
  }
  const res = await fetch('/token/refresh',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '.concat(refreshToken)
      }
    })
  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem('access_token', data.access_token);
  }
  return res.status;
}

export async function getAccessToken(username, password){
  const res = await fetch('/login',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username: username, password: password })
    });
    if (res.status === 200) {
      const data = await res.json()
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    return res.status;
}
