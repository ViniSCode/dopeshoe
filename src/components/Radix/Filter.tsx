import { Select } from "@radix-ui/themes";
import { ProductOrderByInput } from "../../generated/graphql";

export function Filter({ setOrderBy, setPage }: any) {
  return (
    <Select.Root
      defaultValue="Sort By"
      onValueChange={(value) => {
        if (value === "Newest") {
          setOrderBy(ProductOrderByInput.CreatedAtDesc);
          setPage(1);
        }
        if (value === "Price: Low-High") {
          setOrderBy(ProductOrderByInput.PriceAsc);
          setPage(1);
        }
        if (value === "Price: High-Low") {
          setOrderBy(ProductOrderByInput.PriceDesc);
          setPage(1);
        }
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group className="text-[#707072] font-medium">
          {/* <Select.Label>Sort By</Select.Label> */}
          <Select.Item value="Sort By" disabled>
            Sort By
          </Select.Item>
          <Select.Item value="Newest">Newest</Select.Item>
          <Select.Item value="Price: Low-High">Price: Low-High</Select.Item>
          <Select.Item value="Price: High-Low">Price: High-Low</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

// <motion.div
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: 0.2 }}
//   className="select-none flex items-center justify-center gap-6 mt-5 md:text-[16px] font-medium text-sm md:justify-center xs:gap-8"
// >
//   <span
//     className={`cursor-pointer flex gap-2 items-center ${
//       filterSelected === "all" && "text-red-600"
//     }`}
//     onClick={() => {
//       setPriceStage("first");
//       setDiscountStage("first");
//       setFilterSelected("all");
//       setOrderBy(ProductOrderByInput.NameAsc);
//     }}
//   >
//     All
//   </span>

//   <span
//     className={`cursor-pointer flex gap-2 items-center ${
//       filterSelected === "new" && "text-red-600"
//     }`}
//     onClick={() => {
//       setPriceStage("first");
//       setDiscountStage("first");
//       setFilterSelected("new");
//       setOrderBy(ProductOrderByInput.CreatedAtDesc);
//     }}
//   >
//     New
//   </span>

//   <span
//     className={`cursor-pointer flex gap-2 items-center ${
//       filterSelected === "price" && "text-red-600"
//     }`}
//     onClick={() => {
//       setDiscountStage("first");
//       setFilterSelected("price");

//       if (priceStage === "first") {
//         setOrderBy(ProductOrderByInput.PriceDesc);
//         setPrice("higher");
//         setPriceStage("second");
//       } else if (priceStage === "second") {
//         setOrderBy(ProductOrderByInput.PriceAsc);
//         setPrice("lower");
//         setPriceStage("third");
//       } else {
//         setOrderBy(ProductOrderByInput.NameAsc);
//         setPrice("");
//         setFilterSelected("all");
//         setPriceStage("first");
//       }
//     }}
//   >
//     Price{" "}
//     {filterSelected === "price" &&
//       (price === "lower" ? (
//         <FiArrowUpCircle className="text-red-600" size={16} />
//       ) : (
//         price === "higher" && (
//           <FiArrowDownCircle className="text-red-600" size={16} />
//         )
//       ))}
//   </span>
//   <span
//     className={`cursor-pointer flex gap-2 items-center ${
//       filterSelected === "discount" && "text-red-600"
//     }`}
//     onClick={() => {
//       setPriceStage("first");
//       setFilterSelected("discount");

//       if (discountStage === "first") {
//         setOrderBy(ProductOrderByInput.DiscountDesc);
//         setDiscount("higher");
//         setDiscountStage("second");
//       } else if (discountStage === "second") {
//         setOrderBy(ProductOrderByInput.DiscountAsc);
//         setDiscount("lower");
//         setDiscountStage("third");
//       } else {
//         setOrderBy(ProductOrderByInput.NameAsc);
//         setDiscount("");
//         setFilterSelected("all");
//         setDiscountStage("first");
//       }
//     }}
//   >
//     Discount{" "}
//     {filterSelected === "discount" &&
//       (discount === "lower" ? (
//         <FiArrowUpCircle className="text-red-600" size={16} />
//       ) : (
//         discount === "higher" && (
//           <FiArrowDownCircle className="text-red-600" size={16} />
//         )
//       ))}
//   </span>
// </motion.div>
