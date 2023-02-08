//% color="#006400" weight=20 icon="\uf1b9"
namespace 小车类 {
    //% blockId=cbit_ultrasonic_car block="超声波返回(cm)|Trig %pin1|Echo %pin2"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(pin1: DigitalPin, pin2: DigitalPin): number {

        // send pulse
        pins.setPull(pin1, PinPullMode.PullNone);
        pins.digitalWritePin(pin1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin1, 0);

        // read pulse
        let d = pins.pulseIn(pin2, PulseValue.High, 43200);
        return d / 58;
    }
}
