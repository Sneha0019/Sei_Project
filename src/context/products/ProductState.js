import React, { useState } from 'react'
import ProductContext from './productContext'



const ProductState = (props) => {
  const host = 'http://localhost:5000';
  const [products, setProducts] = useState([]);

  //-----GET ALL PRODUCTS
  const getProducts = async()=>{
    try{
        const response = await fetch(`${host}/api/products/fetchallproducts`, {
            method: "GET",
            headers:{
                "content-Type" : "application/json",
            },
        });

  const data = await response.json();
   setProducts(data.product);
    
    }catch(error){
      return console.log("error in fetching", error);

    }

    
  }


  //--GET ALL FESTIVE----
  const getProductFestive = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/festive`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }


   //--GET ALL EARRINGS----
   const getProductSaree = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/saree`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }

   //--GET ALL NOSERING----
   const getProductDupatta = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/dupatta`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }

   //--GET ALL BRACELET----
  //  const getProductBag = async ()=>{

  //   try{
  //     const response = await fetch(`${host}/api/products/bag`, {
  //         method: "GET",
  //         headers:{
  //             "content-Type" : "application/json",
  //         },
  //     });

  //  const data = await response.json();
  //  console.log("in frontend", data);
  //   setProducts(data.product);
  

  // }catch(error){
  //     console.log("error in fetching", error);

  // }

  // }

  const getProductBag = async()=>{
    console.log("going in backend");
    try{
        const response = await fetch(`${host}/api/products/bag`, {
            method: "GET",
            headers:{
                "content-Type" : "application/json",
            },
        });

  const data = await response.json();
   setProducts(data.product);
    
    }catch(error){
      return console.log("error in fetching", error);

    }
  }


   //--GET ALL Bangles----
   const getProductJewellery = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/jewellery`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });


   const data = await response.json();
   console.log("in frontend")
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }


//    //--GET ALL NECKLACE---
//    const getProductNecklace = async ()=>{

//     try{
//       const response = await fetch(`${host}/api/products/necklace`, {
//           method: "GET",
//           headers:{
//               "content-Type" : "application/json",
//           },
//       });

//    const data = await response.json();
//     setProducts(data.product);
  

//   }catch(error){
//       console.log("error in fetching", error);

//   }

//   }

//    //--GET ALL ANKLETS---
//    const getProductAnklet = async ()=>{

//     try{
//       const response = await fetch(`${host}/api/products/anklets`, {
//           method: "GET",
//           headers:{
//               "content-Type" : "application/json",
//           },
//       });

//    const data = await response.json();
//     setProducts(data.product);
  

//   }catch(error){
//       console.log("error in fetching", error);

//   }

//   }



  return (
    <ProductContext.Provider value={{products, getProducts, getProductFestive, getProductSaree, getProductDupatta, getProductBag, getProductJewellery}}>
        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState;
