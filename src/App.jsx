import React from 'react';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from './components';
import { heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI } from './data/data.js';
import Login from './components/user/login.jsx';
import ProductManagement from './components/Store/ProductManagement.jsx';
import InventoryManagement from './components/Inventory/InventoryManagement.jsx'


const App = () => {
  return (
   <>
      {/* <Navbar/>
      <Cart /> */}
      {/* <Login /> */}
      {/* <ProductManagement /> */}
      <InventoryManagement/>
      {/* <main className='flex flex-col gap-16 relative'>
        <Hero heroapi={heroapi} />
        <Sales endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerAPI={footerAPI} /> */}
      
   </>
  )
}

export default App;