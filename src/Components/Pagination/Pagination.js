export default function Pagination({ page, setPage, pageSize, handlePage, totalItems }) {
    const totalPages = Math.ceil(totalItems / pageSize);
    return (
      <div className="d-flex align-items-center justify-content-between mb-5">
        {/* <div className="">
          <div
            onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
            className=""
          >
            Previous
          </div>
          <div
            onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
            className=""
          >
            Next
          </div>
        </div> */}
        
          <div>
             
              Showing{' '}
              <span className="font-medium">
                {(page - 1) * pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {page * pageSize > totalItems
                  ? totalItems
                  : page * pageSize}
              </span>{' '}
              of <span className="font-medium">{totalItems}</span> results
            
          </div>

          <div>
            <nav
              className="d-flex align-items-center justify-content-between"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                
              >
                <span className="sr-only">Previous</span>
                
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
  
              {Array.from({ length: totalPages }).map((el, index) => (
                <div
                  key={index}
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer z-10 inline-flex items-center ${
                    index + 1 === page
                      ? 'pageNo active'
                      : 'pageNo'
                  } px-1`}
                >
                  {index + 1}
                </div>
              ))}
  
              <div
                onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                className=""
              >
                <span className="sr-only">Next</span>
                
              </div>
            </nav>
          </div>

         
      </div>
    );
  }