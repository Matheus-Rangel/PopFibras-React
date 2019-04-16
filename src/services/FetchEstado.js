export async function getEstados(){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/estados-link',{
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
  data.estados.sort((a,b) => {
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
export async function patchEstado(id, nome, observacao, cor){
  const token = localStorage.getItem('access_token');
  const res = await fetch('/estado-link',{
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, nome: nome, observacao: observacao, cor:cor})
  });
  if(res.status === 500){
    console.log(res);
  }
  return res.status;
}