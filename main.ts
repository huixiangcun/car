//% color="#006400" weight=100 icon="\uf1b9" block="小车类"
namespace Car {
    export enum enRocker {
        //% blockId="Nostate" block="无"
        Nostate = 0,
        //% blockId="Up" block="上"
        Up,
        //% blockId="Down" block="下"
        Down,
        //% blockId="Left" block="左"
        Left,
        //% blockId="Right" block="右"
        Right,
        //% blockId="Press" block="按下"
        Press
    }
    //% blockId=getText block="字符串| %string01" weight=22
    //% group='自定义'
    //% blockGap=10
    export function returnString(string01: string):string{
        return string01;
    }
    //% blockId=getNumber block="数字| %number01" weight=21
    //% group='自定义'
    //% blockGap=10
    export function returnNumber(number01: number):number{
        return number01;
    }
    //% block="右轮|转速 %speed|P12 %pin1|P13 %pin2" weight=20
    //% speed.min=-1023 x.max=1023 speed.defl=0 
    //% group='转轮'
    export function turnleft(speed: number,pin1:AnalogPin,pin2:AnalogPin) {
        if (speed >= 0) {
            pins.analogWritePin(pin1, 0)
            pins.analogWritePin(pin2, speed * 1)
        } else {
            pins.analogWritePin(pin1, speed * -1)
            pins.analogWritePin(pin2, 0)
        }
    }

    //% block="左轮|转速 %speed|P14 %pin3|P16 %pin4" weight=19
    //% speed.min=-1023 x.max=1023 speed.defl=0
    //% group='转轮'
    export function turnright(speed: number,pin3:AnalogPin,pin4:AnalogPin) {
        if (speed >= 0) {
            pins.analogWritePin(pin3, speed * 1)
            pins.analogWritePin(pin4,0)
        } else {
            pins.analogWritePin(pin3, 0)
            pins.analogWritePin(pin4, speed * -1)
        }
    }
    export enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="μs"
    MicroSeconds,
    //% block="inches"
    Inches
    }
    //% blockId=cbit_ultrasonic_car block="超声波返回(cm)|Trig %trig|Echo %echo|单位 %unit"
    //% color="#006400"
    //% weight=18
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group='超声波模块'
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }
    
    //% blockId=cbit_Rocker block="遥杆|VRX %pin1|VRY %pin2|SW %pin3|返回 %value"
    //% color="#006400"
    //% weight=21
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    //% group='操作杆模块'
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value: enRocker): boolean {

        //pins.setPull(pin3, PinPullMode.PullUp);
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let z = pins.analogReadPin(pin3);
        let now_state = enRocker.Nostate;

        if (x <= 20) // 上
        {

            now_state = enRocker.Up;

        }
        if (x >= 800) //下
        {

            now_state = enRocker.Down;
        }
        if (y <= 20) //右
        {
            now_state = enRocker.Right;
        }
        if (y >= 800) //左
        {
            now_state = enRocker.Left;
        }
        if (z <= 20)
            now_state = enRocker.Press;
        
        if (now_state == value)
            return true;
        else
            return false;

    }
}
