import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './PaginationController.css'

export default function PaginationController({goNextPage, goPreviousPage, pages}) {
   return <div className='pagination_container'>
        <Button disabled={pages.current <= 1} variant="outlined" onClick={goPreviousPage}> <ArrowCircleLeftIcon />  </Button>
        {pages && pages.total && <label>{`${pages.current}/${pages.total}`}</label>}
        <Button disabled={pages.current >= pages.total} variant="outlined" onClick={goNextPage}> <ArrowCircleRightIcon /> </Button>
    </div>
}