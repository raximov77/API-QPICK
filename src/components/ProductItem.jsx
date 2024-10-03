import { EditOutlined, EllipsisOutlined, HeartOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

function ProductItem({item}) {
  return (
   /*  <li className='w-[250px] p-5 rounded-xl bg-white shadow-md'>
        <img className='rounded-md' src={item.images[0]} alt="Product img" width={200} height={300}/>
        <h2><b>Title:</b> {item.title}</h2>
        <p><b>Price:</b> {item.price}</p>
        <p className='line-clamp-3'><b>Description:</b> {item.description}</p>
        <p><b>Category:</b> {item.category.name}</p>
    </li> */
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={item.images[0]}
      />
    }
    actions={[
      <EllipsisOutlined className='scale-[1.5]' key="ellipsis" />,
      <HeartOutlined className='scale-[1.5]'/>,
      <ShoppingCartOutlined className='scale-[1.5]'/>
    ]}
  >
    <Meta
      avatar={<Avatar src={item.category.image}/>}
      title={item.title}
      description={<p className='line-clamp-3'><b>Description:</b>{item.description}</p>}
    />
  </Card>
  )
}

export default ProductItem