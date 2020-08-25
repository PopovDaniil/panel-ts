import React, { useState, useEffect } from 'react';
import './App.sass';
import Group from './Group/Group';
import Switcher from './Switcher/Switcher';
import Indicator from './Indicator/Indicator';
import Meter from './Meter/Meter'
import MultiSwitcher from './Switcher/MultiSwitcher';

enum ComponentState {
    stopped, starting, started
}
enum SwitchState {
    off, on
}
enum ReverserState {
    backward, off, neutral, forward
}

type PowerHandleState = number;

interface IComponent {
    constructor: Function
    get(): ComponentState
    set(newVal: SwitchState): void
    toSwitch(): SwitchState
}

abstract class Component implements IComponent {
    avDelay = 0;
    protected val: [ComponentState, any]
    constructor(val = 0 as ComponentState) {
        this.val = useState(val) as [ComponentState, any];
    }
    get(): ComponentState {
        return this.val[0]
    }
    set(newVal: SwitchState): void {
        if (!this.isLocked()) {
            this.val[1](ComponentState.starting);
            setTimeout(() => {
                this.val[1](newVal === 1 ? ComponentState.started : ComponentState.stopped);
            }, this.avDelay);
        }
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
    abstract isLocked(): boolean
}

function App() {
    abstract class LockedByReverser extends Component {
        isLocked() {
            return reverser.val === ReverserState.off;
        }
    }
    let [current, setCurrent] = useState(0);

    class Pantograph extends LockedByReverser {
        readonly avDelay = 4000;
    }

    class MainSwitch extends LockedByReverser {
        readonly avDelay = 1500;
    }

    abstract class Handle<T extends number>{
        val: T;
        setVal: (state: T) => void;
        isLocked() { return false };
        set(state: T) {
            console.log(reverser.val);
            if (!this.isLocked()) { this.setVal(state) }
        }
        constructor(initVal: T) {
            [this.val, this.setVal] = useState(initVal);
        }
    }

    class Reverser extends Handle<ReverserState> {
        isLocked() { return powerHandle.val !== 0 }
        toString() {
            switch (this.val) {
                case ReverserState.backward:
                    return "↓"
                case ReverserState.neutral:
                    return "−"
                case ReverserState.off:
                    return "X"
                default:
                    return "↑"
            }
        }
    }
    class PowerHandle extends Handle<PowerHandleState> {
        isLocked() {return reverser.val === ReverserState.off}
    }

    type Input = { front: Pantograph, back: Pantograph, switcher: MainSwitch };
    class PowerController {
        readonly curr = 25000;
        input: Input;
        constructor(front: Pantograph, back: Pantograph, switcher: MainSwitch) {
            this.input = { front, back, switcher }
        }
        isPowered(): boolean {
            return (this.input.front.toBoolean() || this.input.back.toBoolean()) && this.input.switcher.toBoolean()
        }
        update() {
            this.isPowered() ? setCurrent(this.curr) : setCurrent(0);
        }

    }
    const pantographFront = new Pantograph(ComponentState.stopped);
    const pantographBack = new Pantograph(ComponentState.started);
    const mainSwitch = new MainSwitch(ComponentState.stopped);
    const powerController = new PowerController(pantographFront, pantographBack, mainSwitch);
    const reverser = new Reverser(ReverserState.off);
    const powerHandle = new PowerHandle(0);

    useEffect(powerController.update.bind(powerController))
    return (
        <>
            <Group className="left" label="Токоприёмники">
                <Switcher descrOn="Поднять" descrOff="Опустить" initVal={pantographFront.toSwitch()} label="Передний" onSwitch={pantographFront.set.bind(pantographFront)} />
                <Switcher descrOn="Поднять" descrOff="Опустить" initVal={pantographBack.toSwitch()} label="Задний" onSwitch={pantographBack.set.bind(pantographBack)} />
            </Group>
            <Group label="Главный выключатель" className="left">
                <Switcher descrOn="Замкнут" descrOff="Разомкнут" initVal={mainSwitch.toSwitch()} label="ГВ" onSwitch={mainSwitch.set.bind(mainSwitch)} />
            </Group>
            <div className="right">
                <Group label="Питание" id="indicators">
                    <Indicator val={pantographFront.toString()} label="Передний" />
                    <Indicator val={pantographBack.toString()} label="Задний" />
                    <Indicator val={mainSwitch.toString()} label="ГВ" />
                    <Meter label="Напряжение" val={current} unit="В" />
                </Group>
                <Group label="Ход">
                    <Meter val={reverser.toString()} fontSize={20}/>
                    <Meter val={powerHandle.val} fontSize={20}/>
                </Group>
            </div>
            <Group label="Реверсор" className="left">
                <MultiSwitcher states={["Назад", "Откл.", "Нейтр.", "Вперёд"]} initVal={reverser.val} onSwitch={reverser.set.bind(reverser)} />
            </Group>
            <Group label="Контроллер тяги" className="left">
                <MultiSwitcher states={Array.from("012345678")} initVal={powerHandle.val} onSwitch={powerHandle.set.bind(powerHandle)} />
            </Group>
        </>
    );
}

export default App;
