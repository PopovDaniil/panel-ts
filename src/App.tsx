import React, { useState } from 'react';
import './App.css';
import Group from './Group/Group';
import Switcher from './Switcher/Switcher';
import Indicator from './Indicator/Indicator';

enum State {
  stopped, starting, started
}

function App() {
  const Pantograph = {
    val: useState(0) as [0 | 1 |2, any],
    get() { return this.val[0] },
    toString() { return State[this.val[0]] },
    set(newVal: 0 | 1) {
      Pantograph.val[1](State.starting);
      setTimeout(() => {
        Pantograph.val[1](newVal === 1 ? State.started : State.stopped)
      }, 2000);
    }
  }
  return (
    <>
      <Group className="left" label="Токоприёмники">
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={0} label="Передний" onSwitch={Pantograph.set} />
      </Group>
      <Group label="Токоприёмники" className="right" id="indicators">
        <Indicator val={Pantograph.toString()} />
      </Group>
    </>
  );
}

export default App;
