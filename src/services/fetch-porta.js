export async function apiPatchPorta(id, estadoId, destinoId, bypassId, caboId, switchPorta, observacao){
  const token = localStorage.getItem('access_token');
  const res = await fetch('porta-dio',{
    method: 'PATCH',
    headers: {
      Authorization : 'Bearer '+ token
    },
    body: JSON.stringify({ 
      id: id, 
      estado_link_id: estadoId,
      fibra_cabo_id: caboId,
      porta_destino_id: destinoId,
      porta_bypass_id: bypassId,
      switch_porta: switchPorta,
      observacao: observacao})
  });
  const data = res.json();
  return {status: res.status, data: data};
}
export async function apiGetPortas(dioId){
  const res = await fetch(`/portas?dio_id=${dioId}`,{
    method: 'GET',
    headers: {
      Authorization : 'Bearer '+ token
    },
  });
  const data = await res.json();
  return {status: res.status, data: data};
}