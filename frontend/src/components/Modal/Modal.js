import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import './Modal.css'
import { addNewBook, updateById } from "../../config";

const categories = ['LITERATURE', 'NONFICTION', 'ACTION', 'THRILLER', 'TECHNOLOGY', 'DRAMA', 'POETRY', 'MEDIA', 'OTHERS'];

export default function BasicModal({ type, closeModal, editBook, triggerRefresh }) {
  const [book, setBook] = useState({
    id: '',
    author: '',
    title: '',
    price: '',
    totalCount: '',
    category: ''
  })

  async function handleSubmit(e) {
    e.preventDefault();
    if (type === 'add') {
      await handleAddBook();
    } else {
      await handleEditBook();
    }
    await triggerRefresh();
  }

  async function handleAddBook() {
    await fetch(addNewBook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
  }

  async function handleEditBook() {
    await fetch(`${updateById}${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
  }

  function handleChange(e) {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (type === 'edit') {
      setBook(editBook)
    }
  }, [])

  return (
    <div className="modal">
      <div className="modal-content">
        <form className="form-modal" onSubmit={handleSubmit}>
          <TextField style={{ width: '98%', margin: '5px' }} InputProps={{
            readOnly: type === 'edit',
          }} name="id" label="ID" variant="outlined" value={book.id} onChange={handleChange} />
          <TextField style={{ width: '98%', margin: '5px' }} name="author" label="Author" variant="outlined" value={book.author} onChange={handleChange} />
          <TextField style={{ width: '98%', margin: '5px' }} name="title" label="Title" variant="outlined" value={book.title} onChange={handleChange} />
          <TextField style={{ width: '98%', margin: '5px' }} name="price" label="Price" variant="outlined" value={book.price} onChange={handleChange} />
          <TextField type={'number'} style={{ width: '98%', margin: '5px' }} name="totalCount" label="Total Count" variant="outlined" value={book.totalCount} onChange={handleChange} />
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={book.category}
            style={{ width: '98%', margin: '5px' }}
            label="Category"
            onChange={handleChange}
            name={'category'}
          >
            {categories.map(cat => {
              return <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            })}
          </Select>
          <Button type="submit" style={{ float: 'right', marginTop: '5px' }} variant="contained" color="success">
            {type === 'add' ? 'Add' : 'Edit'}
          </Button>
        </form>
        <Button style={{marginTop: '5px'}} onClick={closeModal} variant="outlined" color="error">
          Close
        </Button>
      </div>
    </div>
  );
}