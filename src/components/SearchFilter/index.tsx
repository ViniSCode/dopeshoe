import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { ProductOrderByInput } from "../../generated/graphql";

export function SearchFilter({setOrderBy, setFilterSelected, filterSelected, setPage}: any) {
  const [price, setPrice] = useState("")
  const [priceStage, setPriceStage] = useState("first")
  const [discount, setDiscount] = useState("")
  const [discountStage, setDiscountStage] = useState("first")
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="select-none flex items-center justify-center gap-8 mt-20 text-[14px] md:text-base"
    >
      <span 
        className={`cursor-pointer flex gap-2 items-center ${filterSelected === 'all' && 'text-red-600'}`} 
        onClick={() => {
            setPriceStage("first")
            setDiscountStage("first")
            setFilterSelected("all")
            setOrderBy(ProductOrderByInput.NameAsc)
        }}
      >
        All
      </span>

      <span 
        className={`cursor-pointer flex gap-2 items-center ${filterSelected === 'new' && 'text-red-600'}`} 
        onClick={() => {
            setPriceStage("first")
            setDiscountStage("first")
            setFilterSelected("new")
            setOrderBy(ProductOrderByInput.CreatedAtDesc)
        }}
      >
        New
      </span>

      <span 
        className={`cursor-pointer flex gap-2 items-center ${filterSelected === 'price' && 'text-red-600'}`} 
        onClick={
          () => {
            setDiscountStage("first")
            setFilterSelected("price")
            
            if (priceStage === "first") {
              setOrderBy(ProductOrderByInput.PriceDesc)
              setPrice("higher")
              setPriceStage("second")
            } else if (priceStage === 'second'){
              setOrderBy(ProductOrderByInput.PriceAsc)
              setPrice("lower")
              setPriceStage("third")
            } else {
              setOrderBy(ProductOrderByInput.NameAsc)
              setPrice("")
              setFilterSelected("all")
              setPriceStage("first")
            }
          }
        }
        >  
        Price {filterSelected === 'price' && (
          price === 'lower' ? <FiArrowUpCircle className="text-red-600" size={16} /> : price === 'higher' && <FiArrowDownCircle className="text-red-600" size={16} />
        )}
      </span>

      <span className="text-gray-300 font-bold">|</span>
      <span className={`cursor-pointer flex gap-2 items-center ${filterSelected === 'discount' && 'text-red-600'}`} 
        onClick={
          () => {
            setPriceStage("first")
            setFilterSelected("discount")
            
            if (discountStage === "first") {
              setOrderBy(ProductOrderByInput.DiscountDesc)
              setDiscount("higher")
              setDiscountStage("second")
            } else if (discountStage === 'second'){
              setOrderBy(ProductOrderByInput.DiscountAsc)
              setDiscount("lower")
              setDiscountStage("third")
            } else {
              setOrderBy(ProductOrderByInput.NameAsc)
              setDiscount("")
              setFilterSelected("all")
              setDiscountStage("first")
            }
          }
        }
        >
          Discount {filterSelected === 'discount' && (
          discount === 'lower' ? <FiArrowUpCircle className="text-red-600" size={16} /> : discount === 'higher' && <FiArrowDownCircle className="text-red-600" size={16} />
        )}
        </span>
    </motion.div>
  );
}
