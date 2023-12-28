import React, {useState, useEffect} from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({onAddItem, onClose}) => {
  const [name, setName] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [weather, setWeather] = useState('Hot');

  useEffect(() => {
    setName('');
    setImageLink('');
    setWeather('hot');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({name: name, link: imageLink, weather: weather});
  }

  function onChangeName(e){
    setName(e.target.value);
  }

  function onChangeLink(e){
    setImageLink(e.target.value);
  }

  function onChangeWeather(e){
    setWeather(e.target.id);
  }

  return(
    <ModalWithForm title="New garment" buttonText="Add garment" name="garment-form" onClose={onClose} onAddItem={handleSubmit}>
      <label for="name">Name*</label>
      <input type="text" required placeholder="Name" id="name" value={name} onChange={onChangeName}/>
      <label for="url">Image*</label>
      <input type="url" required placeholder="Image URL" id="url" value={imageLink} onChange={onChangeLink}/>
      <p>Select the weather type:</p>
      <label>
        <input type="radio" id="hot" name="weather" value="Hot" required checked={"hot" === weather ? true : false} onChange={onChangeWeather}/>
        Hot
      </label>
      <label>
        <input type="radio" id="warm" name="weather" value="Warm" checked={"warm" === weather ? true : false} onChange={onChangeWeather}/>
        Warm
      </label>
      <label>
        <input type="radio" id="cold" name="weather" value="Cold" checked={"cold" === weather ? true : false} onChange={onChangeWeather}/>
        Cold
      </label>
    </ModalWithForm>
  )
}

export default AddItemModal;