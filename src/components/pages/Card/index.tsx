import PageWrapper from './../../wrappers/PageWrapper/index';
import { useEffect, useState } from 'react';
import { IOrder } from '../Order';
import { IOrderItemsList } from './../Order/index';
import { deleteRequest, getRequest, postRequest } from '../../../utils';
import { CART_ENDPOINT } from '../../../constants/endpoints';
import { Button, message, Table, Input } from 'antd';
import { updateRequest } from './../../../utils/index';


interface ICart extends IOrder {};
interface ICartItemsList extends IOrderItemsList {
  _id?: string;
};


const CardPage = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [selectedItemsList, setSelectedItemsList] = useState<ICartItemsList[]>([])
  const [nameValue, setNameValue] = useState<string>('');
  const [imageValue, setImageValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');
  const [quantityValue, setQuantityValue] = useState<string>('1');

  const getCart = () => {
    getRequest(CART_ENDPOINT)
    .then(res => setCart(res.data))
    .catch(err => message.error(err.response.data.message)); // err.response.data.message - выводит текст ошибки получаемый от сервера по этому вложенному пути
  };

  const onAddClick = () => {
    const id = cart && cart?.itemsList[cart?.itemsList.length - 1].id + 1;
    postRequest(`${CART_ENDPOINT}/item`, {
      id,
      name: nameValue,
      image: imageValue,
      quantity: Number(quantityValue),
      price: Number(priceValue),
    })
    .then(() =>{
      message.success('Success');
      getCart();
    })
    .catch(err => message.error(err.response.data.message)); // err.response.data.message - выводит текст ошибки получаемый от сервера по этому вложенному пути
  };

  const onRemoveClick = () => {
    deleteRequest(`${CART_ENDPOINT}/item/${selectedItemsList[0].id}`)
    .then(() => {
      message.success('Success Delete');
      getCart();
    })
    .catch(err => message.error(err.response.data.message)); // err.response.data.message - выводит текст ошибки получаемый от сервера по этому вложенному пути
  }

  const onUpdateClick = () => {
    updateRequest(`${CART_ENDPOINT}/item`, {
      id: selectedItemsList[0].id,
      quantity: Number(quantityValue),
    })
    .then(() =>{
      message.success('Success');
      getCart();
    })
    .catch(err => message.error(err.response.data.message)); // err.response.data.message - выводит текст ошибки получаемый от сервера по этому вложенному пути
  }
  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PageWrapper>
      <div className="cart-page">
        
        <h1>Cart</h1>
        <div className="cart-page__commands">
          <Button type='primary' onClick={onAddClick}>Add</Button>
          <Button type='default' onClick={onUpdateClick} disabled={selectedItemsList.length !== 1}>Update</Button>
          <Button type='primary' danger onClick={onRemoveClick} disabled={selectedItemsList.length !== 1}>Remove</Button>
        </div>
        <div style={{margin: '20px 0'}}> {cart?.customerId} - {cart?.totalPrice} </div>
        <div style={{display: 'flex'}}>
          <Input value={nameValue} onChange={e => setNameValue(e.target.value)} placeholder="Name" />
          <Input value={imageValue} onChange={e => setImageValue(e.target.value)} placeholder="Image" />
          <Input type='number' value={priceValue} onChange={e => setPriceValue(e.target.value)} placeholder="Quantity" />
          <Input  type='number' value={quantityValue} onChange={e => setQuantityValue(e.target.value)} placeholder="Price" />
        </div>
        <div className="cart-page__table">
          <Table
          rowSelection={{ 
            type: 'checkbox', 
            onChange: (_, selectedRows: ICartItemsList[]) => {
              setSelectedItemsList(selectedRows)
            }}}
            columns={[
              {title: 'Name', dataIndex: 'name', key: 'name'},
              {title: 'Price', dataIndex: 'price', key: 'price'},
              {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
            ]}
            dataSource={cart?.itemsList.map((item: ICartItemsList) => ({ ...item, key: item._id}))}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

export default CardPage;