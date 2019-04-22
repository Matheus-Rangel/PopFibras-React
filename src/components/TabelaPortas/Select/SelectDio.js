import React, { Component } from 'react'
import { Select, MenuItem, LinearProgress } from '@material-ui/core';
import { getDios } from '../../../services/FetchDio';

export default class SelectDio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    }
  }
  fetchData = async () => {
    this.setState({ loading: true })
    let data = await getDios(this.props.localId, true);
    if (!data) {
      await this.props.refreshToken();
      data = await getDios(this.props.localId, true);
    }
    console.log(data);
    this.setState({ loading: false, data: data.dios });
  }
  componentDidMount() {
    if (this.props.localId) {
      this.fetchData();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.localId != this.props.localId && this.props.localId) {
      this.fetchData();
    }
  }
  render() {
    console.log(this.state)
    return (
      <Select
        localId={this.state.localDestinoId}
        value={this.state.portaDestinoId}
        onChange={this.handleChange}
        inputProps={{
          name: this.props.inputName,
        }}
      >
        {this.state.data ?
          this.state.data.map((dio) => (
            <MenuItem key={dio.id} value={dio.id}>
              <em>{dio.nome}</em>
            </MenuItem>))
          :
          <MenuItem>
            <LinearProgress
              variant='query'
            />
          </MenuItem>
        }
      </Select>
    )
  }
}
