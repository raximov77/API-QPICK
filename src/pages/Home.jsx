import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductItem from "../components/ProductItem"
import { Empty, Input, Pagination, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useDebounce from '../hook/useDebounce';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")

  function handleProductsSearch(e){
    setIsLoading(true)
    setSearchValue(e.target.value)
  }
  const searchWaitingValue = useDebounce(searchValue, 800)


  /* Select Change */
  const [categoryData, setCategoryData] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const onChange = (value) => {
    setIsLoading(true)
    setTimeout(() => setCategoryId(value), 1000)
  };

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories").then(res => {
      setCategoryData(res.data.map(item => {
        const data = {
          value:item.id,
          label:item.name
        }
        return data
      }))
    })
  })
  /*  */

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
  };

  useEffect(() => {
  const limit = 16; 
  const offset = (currentPage - 1) * limit;

  axios.get(`https://api.escuelajs.co/api/v1/products`, {
    params: {
      title: searchWaitingValue,
      categoryId: categoryId,
      offset: offset,
      limit: limit
    }
  }).then(res => {
    setProducts(res.data);
    setIsLoading(false);
    const total = res.headers['x-total-count'] || 100; 
    setTotalProducts(total);
  });
}, [searchWaitingValue, categoryId, currentPage]);



  return (
    <div className='p-10'>
    <div className='mb-5 space-x-4'>
      <Input onChange={handleProductsSearch} size='large' allowClear className='w-[350px]' name='searching' placeholder='Search products'/>
      <Select
      allowClear
      className='w-[300px]'
      size='large'
      showSearch
      placeholder="Choose category"
      optionFilterProp="label"
      onChange={onChange}
      options={categoryData}
    />
    </div>
    <ul className='flex justify-between flex-wrap gap-5'>
      {isLoading ?  <li className='mx-auto mt-10'> <LoadingOutlined className='text-green-700' style={{ fontSize:'60px'}}/></li> 
      : products.length > 0 ? products.map(item => <ProductItem key={item.id} item={item}/>) : <Empty className='block mx-auto mt-10'/>}
    </ul>
    <div className='mt-10 flex justify-center'>
        <Pagination
          current={currentPage}
          total={totalProducts}
          pageSize={16}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Home