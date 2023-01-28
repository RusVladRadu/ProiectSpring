import './App.css';
import TableComponent from './components/Table/Table';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import BasicModal from './components/Modal/Modal';
import { getAllBooks, paginationNumber } from './config';
import PaginationController from './components/Pagination/PaginationController';


function App() {
  const [openModal, setOpenModal] = useState({open: false, type: null, book: {}});
  const [books, setBooks] = useState(null);
  const [pageManagement, setPageManagement] = useState({
    total: 0,
    current: 1
  })

  async function getBooks() {
      const result = await fetch(getAllBooks);
      const allBooks = await result.json();
      setBooks(allBooks);
      setPageManagement({...pageManagement, total: Math.ceil(allBooks.length/paginationNumber)});
  }

  useEffect(() => {
      getBooks();
  }, [])

  function handleAdd(){
    setOpenModal({open: true, type: 'add', book: {}})
  }

  function closeModal(){
    setOpenModal({open: false, type: null,  book: {}})
  }

  function handleEdit(book){
    setOpenModal({open: true, type: 'edit', book})
  }

  async function triggerRefresh(){
    await getBooks();
    closeModal();
  }

  function goNextPage(){
    setPageManagement({
      ...pageManagement, current: pageManagement.current + 1
    })
  }

  function goPreviousPage(){
    setPageManagement({
      ...pageManagement, current: pageManagement.current - 1
    })
  }

  return (<>
    {openModal.open && <BasicModal type={openModal.type} closeModal={closeModal} editBook={openModal.book} triggerRefresh={triggerRefresh}/>}
    <TableComponent triggerRefresh={triggerRefresh} handleEdit={handleEdit} books={books && books.slice((pageManagement.current - 1) * paginationNumber, (pageManagement.current - 1) * paginationNumber + paginationNumber)}/>
    <div className='pagination'>
      <PaginationController goNextPage={goNextPage} goPreviousPage={goPreviousPage} pages={pageManagement}/>
    </div>
    <div className='addButton'>
      <Button onClick={handleAdd} variant="contained" component="label">
        <AddIcon /> Book
      </Button>
    </div>
    </>
  );
}

export default App;
