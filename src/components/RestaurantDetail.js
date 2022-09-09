import React from 'react'
import Header from './Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useParams,Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import Modal from 'react-modal';



// export default function RestaurantDetail() {
  
//   const {rName}=useParams()
//   const [restaurant,setRestaurant]=useState({})
//   const [isMenuModalOpen,setIsMenuModalOpen]=useState(false)
//   const [menu,setMenu]=useState([])
//   const [totalPrice,setTotalPrice]=useState(0)
  

//   useEffect(() => {
//     fetch(`http://localhost:6767/restaurant/details/${rName}`,{method:'GET'})
//     .then(response=>response.json())
//     .then(data=>setRestaurant(data.data))
//   }, []) //behaves like componentDidMount if the second parameter is blank 

//   const fetchMenu=()=>{
//      fetch(`http://localhost:6767/menu/${rName}`,{method:'GET'})
//      .then(response=>response.json())
//      .then(data=>setMenu(data.data))
//   }
  
//   const callTotalPrice=(item)=>{
//     let price=totalPrice+item.itemPrice;
//     setTotalPrice(price)
//   }
//   const{name,thumb,cost,address,Cuisine}=restaurant
//   let cuisineList=!(Cuisine==undefined)&&Cuisine.length && Cuisine.map(function (item) {
//     return item.name;
//   })

//   return (
//     <div>
//       <Header></Header>
//       <div>
//         <img src={thumb} height="400px" width="100%"/>
//       </div>
//       <div className='heading'>
//         <h3>{name}</h3>
       
//       </div>
//       <button 
//         className='btn btn-danger' 
//         style={{float:'right'}} 
//         onClick={()=>{
//           setIsMenuModalOpen(true) 
//           fetchMenu();
          
//         }}>
//         Place Order Online
//       </button>
//       <div>
//       <Tabs>
//         <TabList>
//           <Tab>Overview</Tab>
//           <Tab>Contact</Tab>
//         </TabList>

//         <TabPanel>
//           <div className='about'>About the Place</div>
//           <div className='head'>Cuisine</div>
//           {cuisineList}
//           <div className='head'>Average cost</div>
//           <div className='value'>&#8377; {cost}</div>
//         </TabPanel>
//         <TabPanel>
//         <div className='head'>Phone Number</div>
//           <div className='value'>+91-123456789</div>
//           <div className='head'>{name}</div>
//           <div className='value'>{address}</div>
//         </TabPanel>
//   </Tabs>
//       </div>
//       <div>
//         <Modal 
//           isOpen={isMenuModalOpen}
//         >
//       <div>
//         <div className='row'>
//           <div className='col-sm-8'>
//           <h3>Menu</h3>
//           </div>
//            <div className='col-sm-4'>
//            <button className='btn btn-danger float-end' onClick={()=>setIsMenuModalOpen(true)}>X</button>
//            </div>
//         </div>
//         <ul>
//           {
//             menu.length &&
//               menu.map((item,index)=><li key={index}>
//                 <div>
//                   {
//                     item.isVeg ? <span className='text-success'>Veg</span> : <span className='text-danger'>Non-veg</span>
//                   }
//                 </div>
//                 <div className='cuisines'>
//                   {item.itemName}
//                 </div>
//                 <div className='cuisines'>&#8377;
//                   {item.itemPrice}
//                 </div>
//                 <div className='cuisines'>
//                   {item.itemDescription}
//                 </div>
//                 <div>
//                   <button className='btn btn-secondary' onClick={()=>callTotalPrice(item)}>Add</button>
//                 </div>
//               </li>)
//           }
//         </ul>
//         <hr/>
//         <div>
//         <h3>
//           Total Price:{totalPrice}
//         </h3>
//         <hr/>
//         <button onClick={()=>{setIsMenuModalOpen(false);}}>Pay Now</button>
//         </div>
//       </div>
//         </Modal>
//       </div>
//     </div>
//   )
// }
Modal.setAppElement('#root') 


export default function RestaurantDetail() { 


let { rName }=useParams() 
const[restaurant,setRestaurant]=useState({}) 
const [isMenuModalOpen, setIsMenuModalOpen] = useState(false) 
const [menu, setMenu] = useState([]) 
const [totalPrice, setTotalPrice] = useState(0) 


useEffect(() => { 
fetch(`https://final-backend-a.herokuapp.com/restaurant/details/${rName}`,{method:'GET'}) 
.then(response=>response.json()) 
.then(data=>setRestaurant(data.data)) 
}, [rName]) //behave like componentdidMount if second parameter is a blank array 


const fetchMenu=()=>{ 
fetch(`https://final-backend-a.herokuapp.com/menu/${rName}`,{method:'GET'}) 
.then(response=>response.json()) 
.then(data=>setMenu(data.data)) 
} 


const callTotalPrice=(item)=>{ 
let price=totalPrice+ item.itemPrice; 
setTotalPrice(price) 
} 


const loadScript=(src)=>{ 
  return new Promise((resolve)=>{ 
  const script=document.createElement("script"); 
  script.src=src; 
  script.onload=()=>{ 
  resolve(true) 
  } 
  script.onerror=()=>{ 
  resolve(false) 
  } 
  document.body.appendChild(script) 
  }) 
  } 


const openRazorpay=async()=>{
  // create order in razorpay by calling backend api
  try{
  let orderData;

  orderData = await fetch('https://final-backend-a.herokuapp.com/pay',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({amount:totalPrice})
  }).then(response=>response.json())
    
    





// open razorpay window
  const options={ 
  key:"rzp_test_933NtIX674Z4Nz"  ,  /*change this key to your key */
  name:"Zomato Food Delivery App Clone ",
  amount:orderData.amount,
  currency:orderData.currency,
  order_id:orderData.id,


  prefill:{
    email:'hahiri5791@shibso.com',
    contact:'202-555-0183',
   
  },
  handler:function(response){
    //call api that would save transaction in db
    fetch('https://final-backend-a.herokuapp.com/pay/save',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        razorpay_order_id:response.razorpay_order_id,
        razorpay_payment_id:response.razorpay_payment_id,
        razorpay_signature:response.razorpay_signature,
        razorpay_amount:orderData.amount
      })
    }).then(response=>console.log(response
      
      ))
  }
} 
  const paymentWindow=new window.Razorpay(options); 
  paymentWindow.open() 
  }catch(error){
    console.log(error)
  }
}


const{name,thumb,cost,address,Cuisine}=restaurant 

let cuisineList=!(Cuisine===undefined) && Cuisine.length && Cuisine.map((item)=>item.name)


return ( 
<div> 
<Header></Header> 
<div> 
<img src={thumb} height="400px" width="100%"/> 
</div> 
<div> 
<h2>{name}</h2> 
<button 
className='btn btn-danger' 
style={{float:'right'}} 
onClick={()=>{ 
setIsMenuModalOpen(true); 
fetchMenu(); 
}}> 
Place Online Order 
</button> 
</div> 
<div> 
<Tabs> 
<TabList> 
<Tab>Overview</Tab> 
<Tab>Contact</Tab> 
</TabList> 
<TabPanel> 
<div className='about'>About the place</div> 
<div className='head'>Cuisine</div> 
{cuisineList} 
<div className='head'>Average Cost</div>  
<div className='value'>&#8377; {cost}</div> 
</TabPanel> 
<TabPanel> 
<div className='head'>Phone Number</div> 
<div className='value'>+91-123456789</div> 
<div className='head'>{name}</div> 
<div className='value'>{address}</div> 
</TabPanel> 
</Tabs> 
<Link to='/filter'>
           <button className='btn btn-light border border-dark'>
            <span>
            <img src={"https://w7.pngwing.com/pngs/403/20/png-transparent-computer-icons-filter-miscellaneous-angle-rectangle.png"}
            alt="" height="15px" width="auto"/></span>Filter</button>
</Link>
</div> 
<div> 
<Modal 
isOpen={isMenuModalOpen} 
> 
<div> 
<div className='row'> 
<div className='col-sm-8'> 
<h2>Menu</h2> 
</div> 
<div className='col-sm-4'> 
<button className='btn btn-danger float-end' onClick={()=>setIsMenuModalOpen(false)}>X</button> 
</div> 
</div> 
<ul> 
{ 
menu.length && 
menu.map((item, index)=><li key={index}> 
<div> 
{ 
item.isVeg ? <span className='text-success'>Veg</span>:<span className='text-danger'>Non-veg</span> 
} 
</div> 
<div className='cuisines'>{item.itemName}</div> 
<div className='cuisines'>&#8377; {item.itemPrice}</div> 
<div className='cuisines'>{item.itemDescription}</div> 
<div> 
<button className='btn btn-secondary' onClick={()=>callTotalPrice(item)}>Add</button> 
</div> 
</li>) 
} 
</ul> 
<hr/> 
<div>
  <h3>Total Price:{totalPrice}</h3> 
  <button onClick={()=>{setIsMenuModalOpen(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay();}}>Pay Now</button>
</div>
</div> 
</Modal> 
</div> 
</div> 
) 
}
