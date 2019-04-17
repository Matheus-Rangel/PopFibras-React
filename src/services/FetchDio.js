export async function getDios(localId=null, shrink=false){
  const token = localStorage.getItem('access_token');
  const url = localId ? `/dios?local_id=${localId}` : '/dios';
  if (shrink){
    url = url + (localId ? '&shrink=1' : '?shrink=1');
  }
  const res = await fetch(url,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  if (res.status === 401) {
    return null;
  }else if(res.status === 500){
    console.log(res);
    return null;
  }
  const data = await res.json();
  data.dios.sort((a,b) => {
    if (a.nome > b.nome) {
      return 1;
    }
    if (a.nome < b.nome) {
      return -1;
    }
      return 0;
    });
  return data;
}
export async function getDio(id){
  const token = localStorage.getItem('access_token');
  const res = await fetch(`/dio?id=${id}`,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  if (res.status === 401) {
    return null;
  }else if(res.status === 500){
    console.log(res);
    return null;
  }
  return await res.json();
}

export async function patchDio(id, nome, observacao){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/dio',{
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, nome: nome, observacao: observacao})
  });
  if(res.status !== 200){
    console.log(await res.json());
  }
  return res.status;
}

export async function deleteDio(id, password){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/dio',{
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, password:password})
  });
  if(res.status !== 200){
    console.log(res);
  }
  return res.status;
}

export async function postDio(localId, nome, observacao, quantidadePortas){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/dio',{
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ local_id: localId, nome: nome, observacao: observacao, quantidade_portas: quantidadePortas})
  });
  if(res.status !== 200){
    console.log(await res.json());
  }
  return res.status;
}