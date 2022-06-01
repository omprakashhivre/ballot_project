// import ReactDOM from 'react-dom'
// import ReactPaginate from 'react-paginate';
// import { useState , useEffect } from 'react';
// import Ahomepage from './Ahomepage';


// function PaginatedItems({ itemsPerPage }) {
//     // We start with an empty list of items.
//     const [currentItems, setCurrentItems] = useState(null);
//     const [pageCount, setPageCount] = useState(0);
//     // Here we use item offsets; we could also use page offsets
//     // following the API or data you're working with.
//     const [itemOffset, setItemOffset] = useState(0);
  
//     useEffect(() => {
//       // Fetch items from another resources.
//       const endOffset = itemOffset + itemsPerPage;
//       console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//       setCurrentItems(frame.slice(itemOffset, endOffset));
//       setPageCount(Math.ceil(frame.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);
  
//     // Invoke when user click to request another page.
//     const handlePageClick = (event) => {
//       const newOffset = (event.selected * itemsPerPage) % frame.length;
//       console.log(
//         `User requested page number ${event.selected}, which is offset ${newOffset}`
//       );
//       setItemOffset(newOffset);
//     };
  
//     return (
//       <>
//         <Ahomepage currentItems={currentItems} />
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="next >"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={5}
//           pageCount={pageCount}
//           previousLabel="< previous"
//           renderOnZeroPageCount={null}
//         />
//       </>
//     );
//   }
  
//   // Add a <div id="container"> to your HTML to see the componend rendered.
//   ReactDOM.render(
//     <PaginatedItems itemsPerPage={4} />,
//     document.getElementById('container')
//   );

import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  
    
  

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
//   const [itemOffset, setItemOffset] = useState(0);
//   const handlePageClick = (event) => {
//           const newOffset = (event.selected * postsPerPage) % totalPosts;
//           console.log(
//             `User requested page number ${event.selected}, which is offset ${newOffset}`
//           );
//           paginate(newOffset);
//         };
const selected = (e) =>{
}
  return (
    // <ReactPaginate
    //           breakLabel="..."
    //           nextLabel="next >"
    //           onPageChange={handlePageClick}
    //           pageRangeDisplayed={postsPerPage}
    //           pageCount={totalPosts/postsPerPage}
    //           previousLabel="< previous"
    //           renderOnZeroPageCount={null}
    //         />
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} 
            style={{cursor:"pointer",fontSize:"25px",paddingTop:"3px",paddingRight:"10px",paddingLeft:"10px"}} 
            className='page-link'
            onSelect={selected}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;