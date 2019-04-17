export async function getLocais(shrink=false){
  const token = localStorage.getItem('access_token');
  const url = shrink ? '/locais?shrink=1' : '/locais';
  const res = await fetch(url,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  if (res.status !== 200) {
    console.log(res)
    return null;
  }
  const data = await res.json();
  data.locais.sort((a,b) => {
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
export async function getLocal(id){
  const token = localStorage.getItem('access_token');
  const url = `/local?id=${id}`;
  const res = await fetch(url,{
    headers: {
      Authorization : 'Bearer '+ token
    }
  });
  if (res.status !== 200) {
    console.log(res)
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

export async function patchLocal(id, nome, observacao){
  const token = localStorage.getItem('access_token')
  const res = fetch('/local',{
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, nome: nome, observacao: observacao })
  });
  if (res.status !== 200) {
      console.log(await res);
      return null;
  }
  return await res.json();
}

export async function deleteLocal(id, password){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/local',{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password, id: id})
  });
  return res.status;
}

export async function postLocal(nome, observacao){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/local',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nome, observacao: observacao})
  });
  return res.status;
}
