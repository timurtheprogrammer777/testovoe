import React, { useState } from 'react';

function Item({ user }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = (key) => {
    setEditedUser((prevUser) => ({ ...prevUser, [key]: user[key] }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <tr className="item font-bold flex  border" >
      {['id', 'name', 'email', 'active'].map((key) => (
        <td className='bg-white border w-1/4 ' key={key} onClick={() => handleEditClick(key)}>
          {key === 'active' ? 
            <input className='text-white p-4 m-1 mt-2 ' type="checkbox" name="active" checked={editedUser.active} onChange={handleInputChange} />
            : 
            <input className="p-2 outline-none " type="text" name={key} value={editedUser[key]} onChange={handleInputChange} />
          }
        </td>
      ))}
    </tr>
  );
}

export default Item;
