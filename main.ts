//% color="#006400" weight=100 icon="\uf1b9" block="小车类"
namespace Car {
    
    //% block="右轮|转速 %speed|P1 %pin1|P2 %pin2" weight=20
    //% speed.min=-10 x.max=10 speed.defl=0 
    //% group='转轮'
    export function turnleft(speed: number,pin1:AnalogPin,pin2:AnalogPin) {
        if (speed >= 0) {
            pins.analogWritePin(pin1, speed * 10)
            pins.analogWritePin(pin2, 0)
        } else {
            pins.analogWritePin(pin1, 0)
            pins.analogWritePin(pin2, speed * -10)
        }
    }

    //% block="左轮|转速 %speed|P3 %pin3|P4 %pin4" weight=19
    //% speed.min=-100 x.max=100 speed.defl=0
    //% group='转轮'
    export function turnright(speed: number,pin3:AnalogPin,pin4:AnalogPin) {
        if (speed >= 0) {
            pins.analogWritePin(pin3, speed * 10)
            pins.analogWritePin(pin4,0)
        } else {
            pins.analogWritePin(pin3, 0)
            pins.analogWritePin(pin4, speed * -10)
        }
    }
    
    //% blockId=cbit_ultrasonic_car block="超声波返回(cm)|Trig %pin1|Echo %pin2"
    //% color="#006400"
    //% weight=18
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group='超声波模块'
    export function Ultrasonic_Car(pin5: DigitalPin, pin6: DigitalPin): number {
        pins.setPull(pin5, PinPullMode.PullNone);
        pins.digitalWritePin(pin5, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin5, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin5,0);

        // 读取脉冲
        let d = pins.pulseIn(pin6, PulseValue.High, 43200);
        return d / 58;
    }
}
