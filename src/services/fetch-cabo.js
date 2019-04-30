export async function getCabos(token){
  const res = await fetch('/cabos',{
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
  data.cabos.sort((a,b) => {
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
export async function patchCabo(token, id, nome, observacao, quantidadeFibras){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/cabo',{
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, nome: nome, observacao: observacao, quantidade_fibras:quantidadeFibras})
    });
    if(res.status !== 200){
      console.log(res);
    }
    return res.status;
}
export async function deleteCabo(token, id){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/cabo', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id:id})
  });
  if (res.status !== 200) {
    console.log(res);  
  }
  return res.status;
}

export async function postCabo(token, nome, observacao, quantidadeFibras){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/cabo', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome:nome, observacao: observacao, quantidade_fibras: quantidadeFibras})
  });
  if (res.status === 500) {
    console.log(res);  
  }
  return res.status;
}