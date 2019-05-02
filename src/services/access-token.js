export async function refreshAccessToken(refreshToken){
  if (!refreshToken) {
    return {status: 401, data:null};
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
export async function invalidateRefreshToken(refreshtoken){
  const res = await fetch('/logout/refresh', {
    headers: {
      'Authorization': 'Bearer '.concat(refreshtoken)
    }
  });
  return {status: res.status, data:null}
}
export async function invalidateAccessToken(token){
  const res = await fetch('/logout/access', {
    headers: {
      'Authorization': 'Bearer '.concat(token)
    }
  });
  return {status: res.status, data:null}
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
