import React from 'react';
import './App.css';
import Pantograph from './Machine/Pantograph';
import Group from './Group/Group';

function App() {
  return (
    <>
    <Group className="left" label="Токоприёмники">
      <Pantograph label="Передний" />
    </Group>
    <Group label="Токоприёмники" className="right" id="indicators"></Group>
    </>
  );
}

export default App;
