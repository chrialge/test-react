import { useState } from 'react'
import './App.css'
import FlatList from 'flatlist-react';
import { useSelector, useDispatch } from 'react-redux';
import { addAttivity, eliminateAttivity } from './redux/attiviesSlice';

function App() {
  const attivities = useSelector((state) => state.attivies.value)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const hadleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "date") {
      const valueTrim = value.trim();
      const error = document.getElementById('date_error_js');

      if (valueTrim.length !== 10) {
        error.style.display = "block"
        e.target.style.borderColor = "red"
      } else {
        error.style.display = ""
        e.target.style.borderColor = ""
      }
    }
    setFormData({
      ...formData,
      [name]: value.trim()
    })
  }

  const checkInput = (e) => {
    const { id, value } = e.target;

    if (id == "name") {
      const valueTrim = value.trim();
      const error = document.getElementById('name_error_js');

      if (valueTrim.length < 3 || valueTrim.length > 150) {
        error.style.display = "block"
        e.target.style.borderColor = "red"
      }
    } else if (id == "date") {

      const valueTrim = value.trim();
      const error = document.getElementById('date_error_js');

      if (valueTrim.length !== 10) {
        error.style.display = "block"
        e.target.style.borderColor = "red"
      }
    }
  }

  const hideError = (e) => {
    const { value } = e.target;
    const valueTrim = value.trim();
    const error = document.getElementById('name_error_js');

    if (valueTrim.length > 3 && valueTrim.length < 150) {
      error.style.display = ""
      e.target.style.borderColor = ""
    }

  }

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
    })
  }

  const hadleSubmit = (e) => {
    e.preventDefault();

    const inputName = document.getElementById('name');
    const inputDate = document.getElementById('date');

    if (inputDate.value.trim().length !== 10) {
      const error = document.getElementById('date_error_js');
      error.style.display = "block"
      inputDate.style.borderColor = "red"

    } else if (inputName.value.trim().length < 3 || inputName.value.trim().length > 150) {
      const error = document.getElementById('name_error_js');
      error.style.display = "block"
      inputName.style.borderColor = "red"
    } else {
      const attivity = {
        id: attivities.length === 0 ? 1 : (attivities[attivities.length - 1].id + 1),
        name: formData.name,
        date: formData.date
      }

      setFormData({
        name: "",
        date: "",
      })

      dispatch(addAttivity(attivity))
    }

  }

  const deleteAttivity = (e) => {
    const id = e.target.dataset.id;
    dispatch(eliminateAttivity(id))
  }

  const renderAttivity = (attivity, idx) => {
    return (
      <tr key={idx}>
        <td>{attivity.name}</td>
        <td>{attivity.date}</td>
        <td>
          <i id="delete_btn" className="fa-solid fa-trash" data-id={attivity.id} onClick={deleteAttivity}></i>
        </td>
      </tr>
    )
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>Crea Attivita</h2>
          <form action="" onSubmit={hadleSubmit}>
            <div className="container_input">
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={hadleInputChange} onBlur={checkInput}
                onKeyUp={hideError} />
              <span id='name_error_js'>
                Nome non valido
              </span>
            </div>
            <div className="container_input">
              <label htmlFor="date">Data</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={hadleInputChange} onBlur={checkInput} />
              <span id='date_error_js'>
                Data non valido
              </span>
            </div>

            <div className="container_button">
              <button className='button_reset' onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className='button_confirm'>
                Conferma
              </button>
            </div>
          </form>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th> Nome </th>
                <th> Data </th>
                <th> Azioni </th>
              </tr>
            </thead>
            <tbody>
              <FlatList list={attivities} renderItem={renderAttivity} sortBy={[{ key: "id", descending: true }]} renderWhenEmpty={() => <tr><td colSpan={3}> List empty!</td> </tr>} />
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default App
