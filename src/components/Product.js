import React, { useContext, useEffect, useState } from 'react'
import productContext from '../context/products/productContext';
import Productitem from './Productitem'
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './spinner';


const Product = (props) => {
  const {category} = props;
  const [loading, setLoading] = useState(true);
  const location = useLocation()
  const context = useContext(productContext);
  console.log(context);
  const {products, getProducts, getProductFestive, getProductSaree, getProductDupatta, getProductBag, getProductJewellery} = context;
 

  // const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');


  useEffect(()=>{
    setLoading(true);
    if(location.pathname==="/festive" || category==="Festive"|| query==="Festive"){
    getProductFestive();
    }else if(location.pathname==="/saree" || category==="Saree" || query==="Saree"){
      getProductSaree();
    }else if(location.pathname==="/dupatta" || category==="Dupatta"|| query==="Dupatta"){
      getProductDupatta();
    }else if(location.pathname==="/bag" || category==='Bag' || query==="Bag" ){
      getProductBag();
    }else if(location.pathname==="/jewellery" || category==="Jewellery" || query==="Jewellery"){
      getProductJewellery();
    }
    // else if(location.pathname==="/necklace" || category==="Necklace" || query==="Necklace"){
    //   getProductNecklace();
    // }else if(location.pathname==="/anklets" || category==="Anklet" || query==="Anklet"){
    //   getProductAnklet();
    // }
    else{
      getProducts()
    }
    setLoading(false);
    //eslint-disable-next-line
  },[location.pathname]);
  

  return (
    <>
      <div className="container">
      {loading? (
          <Spinner/>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {products && products.map(product => {
            if (!query || product.productName.includes(query)) {
              return (
                <div className="col" key={product._id}>
                  <Productitem key={product._id} product={product}/>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  </>
  )
}

export default Product