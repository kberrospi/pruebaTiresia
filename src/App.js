import React, { Fragment, Component } from 'react';
import './App.css';
import swal from 'sweetalert';



class App extends Component {
  state = {
    paises: [],
    regiones: [],
    ciudades: [],
    identificacion: '',
    nombre: '',
    telefono: '',
    direccion: '',
    select_pais: '',
    select_departamento: '',
    select_ciudad: '',
    clientes: ['']
  }

  async componentDidMount() {
    const paises = await fetch('http://localhost:3001/paises');
    const resP = await paises.json();
    

    this.setState({
      paises: resP
    })

  }

  async getclientes(){
    const cli = await fetch('http://localhost:3001/clientes');
    const res = await cli.json();
    console.log(res)
    this.setState({
      clientes: []
    })

    this.setState({
      clientes: res
    })
  }

  async selectPais(e) {
    e.persist()
    const dep = await fetch(`http://localhost:3001/departamentos/${e.target.value}`);
    const resjson = await dep.json();
    console.log(e.target.value)

    this.setState({
      regiones: [],
      ciudades: []
    });

    this.setState({
      regiones: resjson
    })

  }

  async selectDepart(e) {
    e.persist()
    const ciudad = await fetch(`http://localhost:3001/ciudad/${this.state.regiones[0].country}/${e.target.value}`);
    const resjson = await ciudad.json();

    this.setState({
      ciudades: []
    });

    this.setState({
      ciudades: resjson
    })


  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  formSubmit = async (event) => {
    event.preventDefault();
    let json = Object.assign(
      {
        identificacion: this.state.identificacion,
        nombre: this.state.nombre,
        telefono: this.state.telefono,
        direccion_res: this.state.direccion,
        pais: this.state.select_pais,
        departamento: this.state.select_departamento,
        ciudad: this.state.select_ciudad,
      });

    await fetch('http://localhost:3001/cliente', {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if (data === 'Cliente creado') {
          swal("Excelente!", data, "success")
        } else {
          swal({
            title: "Error!",
            text: "Error al guardar el cliente",
            icon: "error",
          });
        }
      });

    this.setState({
      identificacion: '',
      nombre: '',
      telefono: '',
      direccion: '',
      select_pais: '',
      select_departamento: '',
      select_ciudad: '',
    })

    await this.getclientes();
  }


  render() {

    return (

      <Fragment>
        <div className="row justify-content-center align-items-center vh-100 w-100">
          <div className="d-flex flex-column w-25 bg-white rounded shadow p-3 m-2">
            <div className="col text-center p-2">
              <h1> Registro de Clientes </h1>
            </div>
            <form onSubmit={this.formSubmit}>
              <div className="form-group">
                <label >Identificación</label>
                <input onChange={this.onChange} required  value={this.state.identificacion} type="number" className="form-control" name="identificacion" placeholder="Identificación" />
              </div>
              <div className="form-group">
                <label >Nombre</label>
                <input onChange={this.onChange} required value={this.state.nombre} type="text" className="form-control" name="nombre" placeholder="Nombre" />
              </div>
              <div className="form-group">
                <label >Telefono</label>
                <input onChange={this.onChange} value={this.state.telefono} type="number" className="form-control" name="telefono" placeholder="Telefono" />
              </div>
              <div className="form-group">
                <label >Dirección de Residencia</label>
                <input onChange={this.onChange} value={this.state.direccion} type="text" className="form-control" name="direccion" placeholder="Dirección de Residencia" />
              </div>
              <div className="form-group">
                <label>Pais</label>
                <select className="form-control" name="select_pais" onChange={(event) => { this.selectPais(event); this.onChange(event) }}>
                  {this.state.paises.map((e, ind) =>
                    <option key={ind} value={e.code}>{e.name}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>Departamento </label>
                <select className="form-control" name="select_departamento" onChange={(event) => { this.selectDepart(event); this.onChange(event) }}>
                  {
                    this.state.regiones.map((item, index) => <option value={item.region} key={index}>{item.region}</option>)
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Ciudad </label>
                <select className="form-control" name="select_ciudad" onChange={(event) => this.onChange(event)}>
                  {
                    this.state.ciudades.map((item, index) => <option value={item.city} key={index}>{item.city}</option>)
                  }
                </select>
              </div>
              <button type="submit" className="btn btn-outline-primary">Registrar</button>
            </form>
          </div>
          <div className="d-flex flex-column w-50 bg-white rounded shadow p-3 m-1">
            <div className="col text-center p-2">
              <h1> Tabla Clientes </h1>
            </div>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Identificación</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Pais</th>
                  <th scope="col">Dpto.</th>
                  <th scope="col">Ciudad</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.clientes.map((e, ind)=>
                    <tr key={ind}>
                      <td>{e.identificacion}</td>
                      <td>{e.nombre}</td>
                      <td>{e.telefono}</td>
                      <td>{e.direccion_res}</td>
                      <td>{e.pais}</td>
                      <td>{e.departamento}</td>
                      <td>{e.ciudad}</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );

  }


}

export default App;

