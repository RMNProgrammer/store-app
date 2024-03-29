import LayoutPage from './LayoutPage'
import Cookies from 'universal-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { H2, Paragraph, Delete, Button, Small } from '../components'
import { ADD_TO_CART_ACTION, GET_CART_PRODUCTS_INFO_ACTION ,REMOVE_FROM_CART_ACTION } from '../actions'

export default function Detail({ product }){
   const cookies = new Cookies()
   const [id,setId] = useState(0)
   const dispatch = useDispatch()
   const [added,setAdded] = useState(false)
   const { logged } = useSelector((state) => state.auth)
   const { waiting, userCart } = useSelector((state) => state.cart)
   const percent_payable = product.is_discount ? 1 - ( product.discount / 100 ) : 1

   const changeStatus = async () => {
      if( cookies.get('user_id') && cookies.get('user_id') != '' ){
         const user_id = cookies.get('user_id')
         if( added === false ){
            const product_info = { product_id: product.id, color_id: id, number: 1 }
            dispatch(ADD_TO_CART_ACTION(user_id,product_info))
         }
         else if( added === true ){
            let product_id
            userCart.map((item) => {
               if( item.color_id === id ){
                  product_id = item.id
               }
            })
            if( product_id ){
               dispatch(REMOVE_FROM_CART_ACTION(user_id,product_id))
            }
         }
         setAdded(!added)
         setTimeout(() => {
            dispatch(GET_CART_PRODUCTS_INFO_ACTION(user_id))
         }, 800);
      }
   }

   useEffect(() => {
      setAdded(false)
      if( cookies.get('user_id') && cookies.get('user_id') != '' ){
         const user_id = cookies.get('user_id') 
         dispatch(GET_CART_PRODUCTS_INFO_ACTION(user_id))
      }
   },[id])

   useEffect(() => {
      if ( typeof(userCart) == 'object' && userCart.length >= 0 ){
         userCart.map((item) => { 
            if( item.color_id == id && item.product_id == product.id ){
               setAdded(true)
            }
         })
      }
   },[userCart])

   return(
      <>
         <LayoutPage>
            <section>
               <H2 align='center' gap='2rem'>{product.name}</H2>
               <img src={product.image} alt={product.name} />
               { product.model && <Paragraph align='center' bottomGap='2rem'>مدل: {product.model}</Paragraph> }
               { product.package && <Paragraph align='center' bottomGap='2rem'>نوع بسته بندی: {product.package}</Paragraph> }
               { product.binding_type && <Paragraph align='center' bottomGap='2rem'>نوع صحافی: {product.binding_type}</Paragraph> }
               { product.binding_form && <Paragraph align='center' bottomGap='2rem'>فرم صحافی: {product.binding_form}</Paragraph> }
               { product.body_material && <Paragraph align='center' bottomGap='2rem'>جنس بدنه: {product.body_material}</Paragraph> }
               { product.cover_material && <Paragraph align='center' bottomGap='2rem'>جنس جلد: {product.cover_material}</Paragraph> }
               { product.tip_thickness && <Paragraph align='center' bottomGap='2rem'>ضخامت نوک: {product.tip_thickness}</Paragraph> }
               { product.tip_hardness && <Paragraph align='center' bottomGap='2rem'>سختی نوک: {product.tip_hardness}</Paragraph> }
               { product.tip_type && <Paragraph align='center' bottomGap='2rem'>نوع نوک: {product.tip_type}</Paragraph> }
               { product.available_colors_en && 
                  <>
                     <Paragraph align='center' bottomGap='2rem'>رنگ انتخابی: {product.available_colors_fa[id]}</Paragraph>
                     <Paragraph align='center' bottomGap='2rem'>رنگ بندی:</Paragraph>
                     <Paragraph align='center' bottomGap='2rem'>
                        {
                           product.available_colors_en.map((color, index) => (
                              <span 
                                 className={ index == id && "active"} 
                                 style={{ backgroundColor: color }} 
                                 onClick={() => setId(index)} 
                                 key={index}
                              />
                           ))
                        }
                     </Paragraph>
                  </>
               }
               { product.is_discount && <Delete align='center' gap='2rem'>قیمت قبلی: {product.price[id]} تومان </Delete> }
               { product.price && <Paragraph align='center' bottomGap='2rem'>قیمت: {Math.round(product.price[id]*percent_payable)} تومان</Paragraph> }
               { waiting ? 
                  <Button buttonModel='secondary' justBorder>
                     <img className='logo' src='/Icons/loading.gif' />
                     کمی صبر کنید...
                  </Button>
                  : !logged ? 
                     <div className='entryCondition'>
                        <Small color='red'>برای خرید لازم است در سایت لاگین کنید.</Small>
                     </div>
                  : added ?
                     <Button onClick={changeStatus} buttonModel='secondary' justBorder>
                        <div className='group'>
                           <img className='logo' src='/Icons/remove_from_cart.png' />
                           حذف از سبد خرید
                        </div>
                     </Button> 
                  :
                     <Button onClick={changeStatus} buttonModel='secondary' justBorder>
                        <div className='group'>
                           <img className='logo' src='/Icons/add_to_cart.png' />
                           افزودن به سبد خرید
                        </div>
                     </Button> 
               }
            </section>
         </LayoutPage>
         <style jsx>{`
            section{
               width:100%;
               max-height:auto;
               min-height:730px;
            }

            img{
               float:left;
               margin:20px;
               width:500px;
               height:580px;
            }

            span{
               width:40px;
               margin:5px;
               height:40px;
               border-radius:20px;
               display:inline-block;
               border:1px solid gray;
            } 

            span.active{
               border:3px solid #c23616;
            }

            div.entryCondition{
               font-size:20px;
               text-align:center;
               margin-bottom:10px;
            }

            div.group{
               display:flex;
               align-items:center;
               flex-direction:row-reverse;
               justify-content:space-between;
            }

            img.logo{
               margin:0px;
               width:50px;
               height:35px;
               padding:0px;
               padding-right:15px;
            }

            @media (min-width: 750px) and (max-width: 768px){
               img{
                  margin:20px;
                  width:360px;
                  height:600px;
               }
            }

            @media (max-width: 750px){
               section{
                  display:flex;
                  flex-direction:column;
               }

               img{
                  width:280px;
                  height:380px;
                  margin:20px auto;
               }
            }
         `}</style>
      </>
    )
}
