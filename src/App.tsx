import React, { useState, useEffect } from 'react';
import './App.sass';
import Group from './Group/Group';
import Switcher from './Switcher/Switcher';
import Indicator from './Indicator/Indicator';
import Meter from './Meter/Meter'

enum ComponentState {
  stopped, starting, started
}
enum SwitchState {
  off, on
}

interface IComponent {
  //constructor(val: ComponentState): IComponent
  get(): ComponentState
  set(newVal: SwitchState): void
  toSwitch(): SwitchState
}

abstract class Component implements IComponent {
  avDelay = 0;
  onSet(newVal: number) { }
  protected val: [ComponentState, any]
  constructor(val = 0 as ComponentState) {
    this.val = useState(val) as [ComponentState, any];
  }
  get(): ComponentState {
    return this.val[0]
  }
  set(newVal: SwitchState): void {
    this.val[1](ComponentState.starting);
    this.onSet(1)
    setTimeout(() => {
      this.val[1](newVal === 1 ? ComponentState.started : ComponentState.stopped);
    }, this.avDelay);
  }
    toSwitch(): SwitchState {
    return this.get() === 0 ? 0 : 1;
  }
  toString(): string {
    return ComponentState[this.get()]
  }
  toBoolean(): boolean {
    return this.get() === ComponentState.started;
  }
}

function App() {

  let [current, setCurrent] = useState(0);

  class Pantograph extends Component {
    readonly avDelay = 4000;
  }

  class MainSwitch extends Component {
    readonly avDelay = 1500;
  }

  type Input = {front: Pantograph, back: Pantograph, switcher: MainSwitch};
  class PowerController {
    readonly curr = 25000;
    input: Input;
    constructor(front: Pantograph, back: Pantograph, switcher: MainSwitch) {
      this.input = { front, back, switcher }
    }
    isPowered(): boolean {    
      return (this.input.front.toBoolean() || this.input.back.toBoolean()) && this.input.switcher.toBoolean()
    }
    /* update(key: keyof Input, value: any): void{
      this.input[key].set(value);
      console.log(this.isPowered());
      this.isPowered() ? setCurrent(this.curr) : setCurrent(0);
    } */
    update() {
      this.isPowered() ? setCurrent(this.curr) : setCurrent(0);
    }

  }
  const pantographFront = new Pantograph(0);
  const pantographBack = new Pantograph(2);
  const mainSwitch = new MainSwitch(0);
  const powerController = new PowerController(pantographFront,pantographBack,mainSwitch);
  useEffect(powerController.update.bind(powerController))
  return (
    <>
      <Group className="left" label="Токоприёмники">
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={pantographFront.toSwitch()} label="Передний" onSwitch={pantographFront.set.bind(pantographFront)} />
        <Switcher descrOn="Поднять" descrOff="Опустить" initVal={pantographBack.toSwitch()} label="Задний" onSwitch={pantographBack.set.bind(pantographBack)} />
      </Group>
      <Group label="Главный выключатель" className="left">
        <Switcher descrOn="Замкнут" descrOff="Разомкнут" initVal={0} label="ГВ" onSwitch={mainSwitch.set.bind(mainSwitch)} />
      </Group>
      <Group label="Питание" className="right" id="indicators">
        <Indicator val={pantographFront.toString()} label="Передний" />
        <Indicator val={pantographBack.toString()} label="Задний" />
        <Indicator val={mainSwitch.toString()} label="ГВ" />
        <Meter label="Напряжение" val={current} unit="В" />
      </Group>
    </>
  );
}

export default App;
