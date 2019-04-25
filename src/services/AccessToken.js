export async function refreshAccessToken(refreshToken){
  if (!refreshToken) {
    return 401;
  }
  const res = await fetch('/token/refresh',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '.concat(refreshToken)
      }
    });
  let data = null;
  if (res.status === 200) {
    data = await res.json();
  }
  return {status: res.status, data:data};
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
    let data = null
    if (res.status === 200) {
      data = await res.json()
    }
    return {status: res.status, data:data};
}
