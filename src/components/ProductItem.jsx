import { EditOutlined, EllipsisOutlined, HeartOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

function ProductItem({item}) {
  return (
    <Card
  style={{
    width: 300,
    borderRadius: '10px', 
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
  }}
  cover={
    <img
      alt="example"
      src={item.images[0]}
      style={{
        height: '200px',
        objectFit: 'cover', 
         cursor:"pointer"
      }}
    />
  }
  actions={[
    <EllipsisOutlined className='scale-[1.5] hover:text-gray-700 transition-colors duration-200' key="ellipsis" />,
    <HeartOutlined className='scale-[1.5] hover:text-red-500 transition-colors duration-200' key="heart" />,
    <ShoppingCartOutlined className='scale-[1.5] hover:text-green-500 transition-colors duration-200' key="cart" />
  ]}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)'; 
    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'; 
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)'; 
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  }}
>
  <Meta
    avatar={<Avatar src={item.category.image} size={40} />} 
    title={<h3 className='font-semibold text-lg text-gray-800'>{item.title}</h3>}
    description={
      <p className='line-clamp-3 text-gray-600 mt-2'>
        <b className='text-gray-800'>Description: </b>
        {item.description}
      </p>
    }
  />
</Card>
  )
}

export default ProductItem