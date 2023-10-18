import React, { useState } from 'react';
import Item from '../Item/Item';
import Form from '../Form/Form';
import data from '../../data/data';

function Table() {
  const initialUsers = Object.entries(data).map(([id, values]) => ({ id, ...values }));
  const [users, setUsers] = useState(initialUsers);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  
  const addNewRow = () => {
    const newId = Math.max(...users.map(user => +user.id)) + 1;
    setUsers(prevUsers => [...prevUsers, { id: newId, name: '', email: '', active: false }]);
  };
  
  const handleSearch = searchText => setSearchText(searchText);
  
  const requestSort = key => {
    setSortConfig(prevSortConfig => ({
      ...prevSortConfig,
      key,
      direction: (prevSortConfig.key === key && prevSortConfig.direction === 'ascending') ? 'descending' : 'ascending',
    }));
  };
  
  const filteredAndSortedUsers = users
    .filter(user => ['name', 'email'].some(field => new RegExp(searchText, 'i').test(user[field])))
    .sort((a, b) => {
      if (sortConfig.key === 'id') {
        return (sortConfig.direction === 'ascending' ? a.id - b.id : b.id - a.id);
      } else if (sortConfig.key === 'active') {
        if (a.active === b.active) {
          return 0;
      } else if (a.active && !b.active) {
          return (sortConfig.direction === 'ascending') ? 1 : -1;
      } else {
          return (sortConfig.direction === 'ascending') ? -1 : 1;
      }
      } else {
        const comparisonResult = a[sortConfig.key].localeCompare(b[sortConfig.key]);
          if (sortConfig.direction === 'ascending') {
            return comparisonResult;
          } else {
          return -comparisonResult;
        }
      }
    });
  

  return (
    <>
      <h1 className='font-bold text-4xl mb-5'>Таблица</h1>
      <button className='bg-blue-500 transition-all duration-700 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5' onClick={addNewRow}>→ Добавить строку ←</button>
      <Form onSearch={handleSearch} />
      {filteredAndSortedUsers.length > 0 ?
        <table className="table m-auto w-800 bg-white rounded ">
          <thead>
            <tr className='flex justify-between '>
              <th className='border w-1/4 cursor-pointer transition-all duration-700  hover:bg-gray-400' onClick={() => requestSort('id')}>ID</th>
              <th className='border w-1/4 cursor-pointer transition-all duration-700  hover:bg-gray-400' onClick={() => requestSort('name')}>Name</th>
              <th className='border w-1/4 cursor-pointer transition-all duration-700  hover:bg-gray-400' onClick={() => requestSort('email')}>Email</th>
              <th className='border w-1/4  cursor-pointer transition-all duration-700  hover:bg-gray-400' onClick={() => requestSort('active')}>Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map(user => <Item key={user.id} user={user} />)}
          </tbody>
        </table>
        : 
        <p className='font-bold text-xl mb-5'>Нет искомых данных ツ</p>
      }
    </>
  );
}

export default Table;
