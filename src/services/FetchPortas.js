export async function pacthPorta(id, estado_id, destino_id, bypass_id, cabo_id, switch_porta, observacao){
  const token = localStorage.getItem('access_token');
  const res = await fetch('porta-dio',{
    method: 'PATCH',
    headers: {
      Authorization : 'Bearer '+ token
    },
    body: JSON.stringify({ 
      id: id, 
      estado_link_id: estado_id,
      fibra_cabo_id: cabo_id,
      porta_destino_id: destino_id,
      porta_bypass_id: bypass_id,
      switch_porta: switch_porta,
      observacao: observacao })
  });
  if (res.status !== 200){
    console.log(await res.json())
  }
  return res.status
}
export async function addCaboPortas(portas, cabo_id){
  let i = portas.length;
  while(i--){
    portas[i]
  }
}
export async function addEstadoPortas(portas, estado_id){

}