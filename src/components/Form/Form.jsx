import React from 'react';

function Form({ onSearch }) {

  function handleSearch(e) {
    const searchText = e.target.value;
    onSearch(searchText);
  }

  return (
    <form className="form m-auto w-800">
      <input className='border mb-5 outline-none rounded' type="text" onChange={handleSearch} placeholder="Поиск..." />
    </form>
  );
}

export default Form;
