
import PageWrapper from './../../wrappers/PageWrapper/index';
import { Spin, Space, Image, Progress, Rate } from 'antd';
import { PRODUCTS_ENDPOINT } from '../../../constants/endpoints';
import { useEffect, useState } from 'react';
import { getRequest, openNotification } from '../../../utils';
import { IProduct } from './../Products/index';
import './style.scss'


interface IAbilities {
  title: string;
  description: string;
}

interface IStat {
  title: string;
  value: number;
}

interface IFullProduct extends IProduct{
  abilities: IAbilities[];
  stats: IStat[];
}

const ProductPage = () => {
  const productId = window.location.pathname.split('/')[2];
  const [product, setProduct] = useState<IFullProduct | null>(null);
  const getProduct = () => {
    getRequest(`${PRODUCTS_ENDPOINT}/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => openNotification(err.response.data.error, err.response.data.message));
  }
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageWrapper>
      {product === null ? 
      <Space size="middle"> <Spin size="large" /></Space>
      : (<div className="product-page">Product Page
      <div className="product-page__main-block">
        <div className="">
          <Image src={product?.image} />
          <div className="product-page__main-block-title">
            <b>{product?.id}</b> {product?.name}
          </div>
        </div>
        <div className="circle-stats">
          {product?.stats.map(stat => {
            const status = stat.value > 80 ? 'success' : (stat.value < 50 ? 'exception' : "active")
            if (product?.id % 2 ) {
              return (
                <div key={stat.title} className="product-page__stat">
                  <div>{stat.title}</div>
                  <Progress percent={stat.value} status={status} format={() => stat.value}/>
                </div>
              )
            } else {
              return (
                <div key={stat.title} className="product-page__stat">
                  <div className="">{stat.title}</div>
                  <Progress type="circle" percent={stat.value} status={status} format={() => stat.value}/>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className="product-page__other-block">
        {product.abilities.map(item => (
          <div key={item.title} className="ability">
            <div className="ability-title">{item.title}</div>
            <div className="ability-descr">{item.description}</div>
          </div>
        ))}
      </div>
      <div className="product-page__result">
          <Rate value={product.stats.reduce((current: number, next: IStat) => current + next.value, 0)/(product.stats.length * 20)} />
      </div>
      </div>)}
    </PageWrapper>
  )
}





export default ProductPage;