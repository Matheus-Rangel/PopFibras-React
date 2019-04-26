const state = {
  selectedLocal: null,
  selectedDio: null,
  user: {
    isLoggedIn: false,
    isFetching: false,
    didInvalidate: false,
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  locais : {
    isFetching: false,
    didInvalidate: false,
    itens: [
      {
        id: 1,
        nome : 'Pop',
      },
    ],
  },
  diosByLocal: Map([
    [1, {
      isFetching: false,
      didInvalidate: false,
      itens: [
        {
          id: 1,
          nome: 'dio1',
          localId: 1,
        },
      ]
    }]
  ]),
  portasByDio: Map([
    [1, {
      isFetching: false,
      didInvalidate: false,
      itens:{
        id: 1,
        numero: 1,
        dioId: 1,
      }
    }]
  ]),
  estados: {
    isFetching: false,
    didInvalidate: false,
    itens: [
      {
        id: 1,
        nome: 'ativo',
      },
      {
        id: 1,
        nome: 'ativo',
      },
    ]
  },
  cabos: {
    isFetching: false,
    didInvalidate: false,
    itens: [
      {
        id: 1,
        nome: '',
      }
    ]
  }
}