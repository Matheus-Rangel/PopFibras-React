import React from 'react'
import CaboProvider from './CaboProvider';
import DioProvider from './DioProvider';
import EstadoProvider from './EstadoProvider';
import LocalProvider from './LocalProvider';
import PortaProvider from './PortaProvider';

export default function DataProvider(props) {
  return (
    <React.Fragment>
      <LocalProvider>
        <CaboProvider>
          <EstadoProvider>
            <LocalContext.Consumer>
              {localContext} => {
                <DioProvider>

                </DioProvider>
              }
            </LocalContext.Consumer>
          </EstadoProvider>
        </CaboProvider>
      </LocalProvider>
    </React.Fragment>
  )
}
