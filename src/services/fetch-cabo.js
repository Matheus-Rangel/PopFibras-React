export async function apiGetCabos(token){
  const res = await fetch('/cabos',{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  const data = await res.json();
  return {status: res.status, data: data};
}
export async function apiPatchCabo(token, id, nome, observacao, quantidadeFibras){
  const res = await fetch('/cabo',{
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, nome: nome, observacao: observacao, quantidade_fibras:quantidadeFibras})
    });
  const data = await res.json();
  return {status: res.status, data: data};
}
export async function apiDeleteCabo(token, id){
  const res = await fetch('/cabo', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id:id})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}

export async function postCabo(token, nome, observacao, quantidadeFibras){
  const res = await fetch('/cabo', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome:nome, observacao: observacao, quantidade_fibras: quantidadeFibras})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}