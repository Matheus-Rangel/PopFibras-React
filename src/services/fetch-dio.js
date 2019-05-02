export async function apiGetDios(token, localId=null){
  let url = localId ? `/dios?local_id=${localId}` : '/dios';
  const res = await fetch(url,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  const data = await res.json();
  return {status: res.status, data: data};
}
export async function apiGetDio(token, id){
  const res = await fetch(`/dio?id=${id}`,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  const data = await res.json();
  return {status: res.status, data: data};
}

export async function apiPatchDio(token, id, nome, observacao){
  const res = await fetch('/dio',{
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, nome: nome, observacao: observacao})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}

export async function apiDeleteDio(token, id, password){
  const res = await fetch('/dio',{
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, password:password})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}

export async function apiPostDio(token, localId, nome, observacao, quantidadePortas){
  const res = await fetch('/dio',{
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ local_id: localId, nome: nome, observacao: observacao, quantidade_portas: quantidadePortas})
  });
  const data = await res.json();
  return {status: res.status, data: data};
}