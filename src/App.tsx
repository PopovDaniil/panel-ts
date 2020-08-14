import React, { useState } from 'react';
import './App.sass';
import Group from './Group/Group';
import Switcher from './Switcher/Switcher';
import Indicator from './Indicator/Indicator';

enum State {
  stopped, starting, started
}

function App() {
  const PantographFront = {
    val: useState(0) as [0 | 1 |2, any],
    get() { return this.val[0] },
    toString() { return State[this.val[0]] },
    set(newVal: 0 | 1) {
      PantographFront.val[1](State.starting);
      setTimeout(() => {
        PantographFront.val[1](newVal === 1 ? State.started : State.stopped)
      }, 2000);
    }
  }
  const PantographBack = {
    val: useState(0) as [0 | 1 |2, any],
    get() { return this.val[0] },
    toString() { return State[this.val[0]] },
    set(newVal: 0 | 1) {
      PantographBack.val[1](State.starting);
      setTimeout(() => {
        PantographBack.val[1](newVal === 1 ? State.started : State.stopped)
      }, 2000);
    }
  }
  return (
    <>
      <Group className="left" label="Токоприёмники">
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={0} label="Передний" onSwitch={PantographFront.set} />
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={0} label="Задний" onSwitch={PantographBack.set} />
      </Group>
      <Group label="Токоприёмники" className="right" id="indicators">
        <Indicator val={PantographFront.toString()} label="Передний"/>
        <Indicator val={PantographBack.toString()} label="Задний"/>
      </Group>
    </>
  );
}

export default App;
