export async function apiGetLocais(token){
  const url = '/locais';
  const res = await fetch(url,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  const data = await res.json();
  return {status:res.status, data:data};
}

export async function apiGetLocal(token, id){
  const url = `/local?id=${id}`;
  const res = await fetch(url,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  const data = await res.json();
  return {status:res.status, data:data};
}

export async function apiPatchLocal(token, id, nome, observacao){
  const res = await fetch('/local',{
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, nome: nome, observacao: observacao })
  });
  const data = await res.json();
  return {status:res.status, data:data};
}

export async function apiDeleteLocal(token, id, password){
  const res = await fetch('/local',{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password, id: id})
  });
  const data = await res.json();
  return {status:res.status, data:data};
}

export async function apiPostLocal(token, nome, observacao){
  const res = await fetch('/local',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nome, observacao: observacao})
  });
  const data = await res.json();
  return {status:res.status, data:data};
}
