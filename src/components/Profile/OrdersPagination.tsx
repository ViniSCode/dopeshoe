import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface OrdersPaginationProps {
  data: any
  setOffset: any
  setPage: any
  offset: any
  page: any
  productsPerPage: any
}

export function OrdersPagination ({data, setOffset, setPage, offset, page, productsPerPage}: OrdersPaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2">
    <div
      onClick={() => {
        if (data?.ordersConnection.pageInfo.hasPreviousPage) {
          setOffset(offset - productsPerPage);
          setPage(page - 1);
        }
      }}
      className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
        !data?.ordersConnection.pageInfo.hasPreviousPage &&
        "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
      }`}
    >
      <BsArrowLeftShort fontSize={30} />
    </div>
    <span>{String(page)}</span>
    <div
      onClick={() => {
        if (data?.ordersConnection.pageInfo.hasNextPage) {
          setOffset(offset + productsPerPage);
          setPage(page + 1);
        }
      }}
      className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
        !data?.ordersConnection.pageInfo.hasNextPage &&
        "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
      }`}
    >
      <BsArrowRightShort fontSize={30} />
    </div>
  </div>
  )
}