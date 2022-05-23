import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import SingleHotel from './pages/SIngleHotel/SingleHotel';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<SingleHotel />} />
      </Routes>
    </>
  );
};

export default App;
