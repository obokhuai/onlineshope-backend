// import React from 'react';
// import { Link } from 'react-router-dom';

// interface PaginateProps {
//   pages: number;
//   page: number;
//   isAdmin?: boolean;
//   keyword?: string;
// }

// const Paginate: React.FC<PaginateProps> = ({
//   pages,
//   page,
//   isAdmin = false,
//   keyword = '',
// }) => {
//   if (pages <= 1) return null;

//   return (
//     <nav className="pagination">
//       {Array.from({ length: pages }, (_v, i) => {
//         const pageNumber = i + 1;
//         const to = !isAdmin
//           ? keyword
//             ? `/search/${keyword}/page/${pageNumber}`
//             : `/page/${pageNumber}`
//           : `/admin/productlist/${pageNumber}`;
//         const isActive = pageNumber === page;
  

//         return (
//           <Link
//             key={pageNumber}
//             to={to}
//             className={`page-item${isActive ? ' active' : ''}`}
//           >
//             {pageNumber}
//           </Link>
//         );
//       })}
//     </nav>
//   );
// };

// export default Paginate;





import React from 'react';
import { Link } from 'react-router-dom';
import "./paginate.css"

interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginate: React.FC<PaginateProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
}) => {
  if (pages <= 1) return null;

  return (
    <nav className="pagination">
      {Array.from({ length: pages }, (_v, i) => {
        const pageNumber = i + 1;
        const to = !isAdmin
          ? keyword
            ? `/search/${keyword}/page/${pageNumber}`
            : `/page/${pageNumber}`
          : `/admin/productlist/${pageNumber}`;
        const isActive = pageNumber === page;

        return (
          <Link
            key={pageNumber}
            to={to}
            className={`page-item${isActive ? ' active' : ''}`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </nav>
  );
};

export default Paginate;

