import Head from 'next/head'
import { H1 } from '../../components'
import Card from '../../containers/productCard'
import React, { useState, useEffect } from 'react'
import LayoutPage from '../../containers/LayoutPage'
import products from '../../public/Products/products.json'

export default function Store() {
   const [data, setData] = useState([]);

   useEffect(() => {
      setData(products);
   }, []);

   return (
      <>
         <Head>
            <title>فروشگاه اینترنتی لوازم التحریر</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>    
         <LayoutPage>
            <H1 align='center'>محصولات ما</H1>
            <div>
               {data.length > 0 && (
                  <>
                     {data.map((products) => (
                        <Card key={products.id} data={products} />
                     ))}
                  </>
               )}
            </div>
         </LayoutPage>
         <style jsx>{`
            div{
               display: flex;
               flex-wrap: wrap;
               flex-direction:row;
               justify-content:center;
            }
         `}</style>
      </>
   );
}
