import React, {Fragment} from 'react';

const Pagination = ({searchFunc, pagination, searchParams}) => {
  const {page, count, limit} = pagination
  const onClick = (e) => {
    let pageToGo = 0;
    if(e.target.id === 'previous'){
      pageToGo = page - 1
    }
    else if(e.target.id === 'next') {
      pageToGo = page + 1
    }
    else {
      pageToGo = parseInt(e.target.id, 10)
    }
    searchFunc(searchParams, pageToGo)
  }
  const numberPages = Math.ceil(count / limit)
  let output = []
  // If there is more than one page
  if(count >= limit) {
    output.push(<li key={0} className={`page-item ${page===1 && "disabled"}`}>
      <div className="page-link" tabIndex="-1" onClick={onClick} id="previous">Previous</div>
    </li>)
    for (let i=1; i<=numberPages; i++) {
      output.push(<li key={i} className={`page-item ${page===i && "active"}`}>
        <div className="page-link" onClick={onClick} id={i}>{i}</div>
      </li>)
    }
    output.push(<li key={numberPages+1} className={`page-item ${page===numberPages && "disabled"}`}>
      <div className="page-link" tabIndex="-1" onClick={onClick} id="next">Next</div>
    </li>)
  }


  return (
    <Fragment>
      <nav aria-label="...">
        <ul className="pagination">
          {output}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Pagination;
