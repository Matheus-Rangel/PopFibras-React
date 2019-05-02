export async function apiGetEstados(token){
  const res = await fetch('/estados-link',{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  const data = await res.json();
  return {status: res.status, data: data};
}
export async function apiPatchEstado(token, id, nome, observacao, cor){
  const res = await fetch('/estado-link',{
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, nome: nome, observacao: observacao, cor:cor})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}

export async function apiDeleteEstado(token, id){
  const res = await fetch('/estado-link',{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}

export async function apiPostEstado(token, nome, observacao, cor){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/estado-link',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nome, observacao: observacao, cor:cor})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}
