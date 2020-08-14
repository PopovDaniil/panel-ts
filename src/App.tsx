import React, { useState } from 'react';
import './App.sass';
import Group from './Group/Group';
import Switcher from './Switcher/Switcher';
import Indicator from './Indicator/Indicator';

enum ComponentState {
  stopped, starting, started
}
enum SwitchState {
  off,on
}

interface IComponent {
  //constructor(val: ComponentState): IComponent
  get(): ComponentState
  set(newVal: SwitchState): void
  toSwitch(): SwitchState
}

abstract class Component implements IComponent {
  protected val: [ComponentState, any]
  constructor(val = 0 as ComponentState) {
    this.val = useState(val) as [ComponentState, any];
  }
  get(): ComponentState {
    return this.val[0]
  }
  set(newVal: SwitchState): void {
    this.val[1](ComponentState.starting);
    setTimeout(() => {
      this.val[1](newVal === 1 ? ComponentState.started : ComponentState.stopped)
    }, 2000);
  }
  toSwitch(): SwitchState {
    return this.get() === 0 ? 0 : 1;
  }
}

class Pantograph extends Component{
    toString(): string {
    return ComponentState[this.get()]
  }
  
}

function App() {
  const PantographFront = new Pantograph(0);
  const PantographBack = new Pantograph(2);
  return (
    <>
      <Group className="left" label="Токоприёмники">
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={PantographFront.toSwitch()} label="Передний" onSwitch={PantographFront.set.bind(PantographFront)} />
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={PantographBack.toSwitch()} label="Задний" onSwitch={PantographBack.set.bind(PantographBack)} />
      </Group>
      <Group label="Токоприёмники" className="right" id="indicators">
        <Indicator val={PantographFront.toString()} label="Передний" />
        <Indicator val={PantographBack.toString()} label="Задний" />
      </Group>
    </>
  );
}

export default App;
