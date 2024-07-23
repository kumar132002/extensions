namespace mbit_Display {

    export enum enColor {

        //% blockId="OFF" block="off"
        OFF = 0,
        //% blockId="Red" block="red"
        Red,
        //% blockId="Green" block="green"
        Green,
        //% blockId="Blue" block="blue"
        Blue,
        //% blockId="White" block="white"
        White,
        //% blockId="Cyan" block="cyan"
        Cyan,
        //% blockId="Pinkish" block="magenta"
        Pinkish,
        //% blockId="Yellow" block="yellow"
        Yellow,

    }
    export enum enLED1 {

        //% blockId="OFF" block="off"
        OFF = 0,
        //% blockId="ON" block="on"
        ON = 1
    }

    //% blockId=mbit_LED1 block="LED1|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=mbit_LED2 block="LED2|pin %pin|value %value"
    //% weight=4
    //% blockGap=8
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }

    //% blockId=mbit_BreathLED block="BreathLED|pin %pin"
    //% weight=3
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function BreathLED(pin: AnalogPin): void {

        for (let i: number = 0; i < 1023; i++) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }
        basic.pause(10);
        for (let j: number = 1023; j > 0; j--) {
            pins.analogWritePin(pin, j);
            //basic.pause(1);
            control.waitMicros(1000);
        }

    }

    //% blockId=mbit_RGB block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value1 %value1|value2 %value2|value3 %value3"
    //% weight=2
    //% blockGap=8
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);

    }
    //% blockId=mbit_RGB2 block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value %value"
    //% weight=1
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }

    }

}
namespace mbit_Sensor {

    export enum enVoice {
        //% blockId="Voice" block="sound"
        Voice = 0,
        //% blockId="NoVoice" block="silence"
        NoVoice = 1
    }

    export enum enIR {
        //% blockId="Get" block="detected"
        Get = 0,
        //% blockId="NoVoice" block="undetected"
        NoGet = 1
    }


    //% blockId=mbit_Voice_Sensor block="Voice_Sensor|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Voice_Sensor(pin: DigitalPin, value: enVoice): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    function IR_send_38k() {
        for (let k: number = 0; k < 8; k++) {
            pins.digitalWritePin(DigitalPin.P9, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P9, 0);
            control.waitMicros(13);
        }
    }
    //% blockId=mbit_IR_Sensor block="IR_Sensor|pin %pin| |%value|obstacle"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Sensor(pin: DigitalPin, value: enIR): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    //% blockId=mbit_IR_Send block="IR_Send|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Send(pin: DigitalPin): void {


        IR_send_38k();

    }

    //% blockId=mbit_ultrasonic block="Ultrasonic|Trig %Trig|Echo %Echo"
    //% color="#87CEEB"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {

        // send pulse
        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(15);
        pins.digitalWritePin(Trig, 0);

        // read pulse
        let d = pins.pulseIn(Echo, PulseValue.High, 23200);
        return Math.floor(d / 58);
    }
}
namespace mbit_Input {

    export enum enRocker {
        //% blockId="Nostate" block="No"
        Nostate = 0,
        //% blockId="Up" block="up"
        Up,
        //% blockId="Down" block="down"
        Down,
        //% blockId="Left" block="left"
        Left,
        //% blockId="Right" block="right"
        Right,
        //% blockId="Press" block="press"
        Press
    }

    export enum enTouch {
        //% blockId="NoTouch" block="untouched"
        NoTouch = 0,
        //% blockId="Touch" block="touched"
        Touch = 1
    }
    export enum enButton {
        //% blockId="Press" block="press"
        Press = 0,
        //% blockId="Realse" block="release"
        Realse = 1
    }

    //% blockId=mbit_TouchPad block="TouchPad|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
    //% blockId=mbit_Rocker block="Rocker|VRX %pin1|VRY %pin2|SW %pin3|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: DigitalPin, value: enRocker): boolean {

        pins.setPull(pin3, PinPullMode.PullUp);
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let z = pins.digitalReadPin(pin3);
        let now_state = enRocker.Nostate;

        if (x < 100) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 700) //
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 100) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 700) //左
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=mbit_Button block="Button|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(pin: DigitalPin, value: enButton): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
}
namespace mbit_Music {
    export enum enBuzzer {

        //% blockId="NoBeep" block="silence"
        NoBeep = 0,
        //% blockId="Beep" block="sound"
        Beep
    }

    //% blockId=mbit_Buzzer block="Buzzer|pin %pin|value %value"
    //% weight=100
    //% blockGap=10 
    //% color="#D2691E"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void {

        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);

    }

}
namespace mbit_Motor {

    //% blockId=mbit_Fan block="Fan|pin %pin|speed %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Fan(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);

    }

    //% blockId=mbit_Servo block="Servo|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void {

        pins.servoWritePin(pin, value);

    }

}
namespace mbit_Robot {

    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="off"
        OFF = 0,
        //% blockId="Red" block="red"
        Red,
        //% blockId="Green" block="green"
        Green,
        //% blockId="Blue" block="blue"
        Blue,
        //% blockId="White" block="white"
        White,
        //% blockId="Cyan" block="cyan"
        Cyan,
        //% blockId="Pinkish" block="magenta"
        Pinkish,
        //% blockId="Yellow" block="yellow"
        Yellow,

    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {

        //% blockId="LeftState" block="left state"
        LeftState = 0,
        //% blockId="RightState" block="right state"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="white"
        White = 0,
        //% blockId="Black" block="black"
        Black = 1

    }

    export enum enAvoidState {
        //% blockId="OBSTACLE" block="with obstacles"
        OBSTACLE = 0,
        //% blockId="NOOBSTACLE" block="without obstacles"
        NOOBSTACLE = 1

    }


    export enum enServo {

        S1 = 1,
        S2,
        S3
    }
    export enum CarState {
        //% blockId="Car_Run" block="forward"
        Car_Run = 1,
        //% blockId="Car_Back" block="back"
        Car_Back = 2,
        //% blockId="Car_Left" block="turn left"
        Car_Left = 3,
        //% blockId="Car_Right" block="turn right"
        Car_Right = 4,
        //% blockId="Car_Stop" block="stop"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="rotate left"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="rotate right"
        Car_SpinRight = 7
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf2 = pins.createBuffer(1)
        buf2[0] = value
        pins.i2cWriteBuffer(addr, buf2)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf3 = pins.createBuffer(5);
        buf3[0] = LED0_ON_L + 4 * channel;
        buf3[1] = on & 0xff;
        buf3[2] = (on >> 8) & 0xff;
        buf3[3] = off & 0xff;
        buf3[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf3);
    }


    function Car_run(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
        // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

        // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
        // pins.digitalWritePin(DigitalPin.P8, 0);
    }

    function Car_back(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {

        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    }

    function Car_spinright(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=mbit_RGB_Car_Big2 block="RGB_Car_Big2|value %value"
    //% weight=101
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Blue: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.White: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Cyan: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Pinkish: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Yellow: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
        }
    }
    //% blockId=mbit_RGB_Car_Big block="RGB_Car_Big|value1 %value1|value2 %value2|value3 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value1: number, value2: number, value3: number): void {

        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(0, 0, R);
        setPwm(1, 0, G);
        setPwm(2, 0, B);

    }

    //% blockId=mbit_RGB_Car_Program block="RGB_Car_Program"
    //% weight=99
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {

        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB);
        }
        return yahStrip;
    }


    //% blockId=mbit_ultrasonic_car block="ultrasonic return distance(cm)"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {

        // send pulse
        let list: Array<number> = [0, 0, 0, 0, 0];
        for (let l = 0; l < 5; l++) {
            pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P14, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P14, 1);
            control.waitMicros(15);
            pins.digitalWritePin(DigitalPin.P14, 0);

            let e = pins.pulseIn(DigitalPin.P15, PulseValue.High, 43200);
            list[l] = Math.floor(e / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3]) / 3;
        return Math.floor(length);
    }

    //% blockId=mbit_Music_Car block="Music_Car|%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    //% blockId=mbit_Servo_Car block="Servo_Car|num %num|value %value"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% num.min=1 num.max=3 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Car(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num + 2, 0, pwm);

    }

    //% blockId=mbit_Avoid_Sensor block="Avoid_Sensor|value %value"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Avoid_Sensor(value: enAvoidState): boolean {

        let temp: boolean = false;
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        pins.digitalWritePin(DigitalPin.P9, 0);
        control.waitMicros(100);
        switch (value) {
            case enAvoidState.OBSTACLE: {
                serial.writeNumber(pins.analogReadPin(AnalogPin.P3))
                if (pins.analogReadPin(AnalogPin.P3) < 800) {

                    temp = true;
                    setPwm(8, 0, 0);
                }
                else {
                    temp = false;
                    setPwm(8, 0, 4095);
                }
                break;
            }

            case enAvoidState.NOOBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P3) > 800) {

                    temp = true;
                    setPwm(8, 0, 4095);
                }
                else {
                    temp = false;
                    setPwm(8, 0, 0);
                }
                break;
            }
        }
        pins.digitalWritePin(DigitalPin.P9, 1);
        return temp;

    }
    //% blockId=mbit_Line_Sensor block="Line_Sensor|direct %direct|value %value"
    //% weight=94
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {

        let temp2: boolean = false;

        switch (direct) {
            case enPos.LeftState: {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    if (value == enLineState.White) {
                        temp2 = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp2 = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }

            case enPos.RightState: {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    if (value == enLineState.White) {
                        temp2 = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp2 = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp2;

    }
    //% blockId=mbit_CarCtrl block="CarCtrl|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255, 255); break;
            case CarState.Car_Back: Car_back(255, 255); break;
            case CarState.Car_Left: Car_left(0, 255); break;
            case CarState.Car_Right: Car_right(255, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255, 255); break;
            case CarState.Car_SpinRight: Car_spinright(255, 255); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed block="CarCtrlSpeed|%index|speed %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed, speed); break;
            case CarState.Car_Back: Car_back(speed, speed); break;
            case CarState.Car_Left: Car_left(0, speed); break;
            case CarState.Car_Right: Car_right(speed, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed, speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed, speed); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed2 block="CarCtrlSpeed2|%index|speed1 %speed1|speed2 %speed2"
    //% weight=91
    //% blockGap=10
    //% speed1.min=0 speed1.max=255 speed2.min=0 speed2.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed2(index: CarState, speed1: number, speed2: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed1, speed2); break;
            case CarState.Car_Back: Car_back(speed1, speed2); break;
            case CarState.Car_Left: Car_left(0, speed2); break;
            case CarState.Car_Right: Car_right(speed1, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed1, speed2); break;
            case CarState.Car_SpinRight: Car_spinright(speed1, speed2); break;
        }
    }
}
namespace SuperBit {

    const PCA9685_ADD = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    const STP_CHA_L = 2047
    const STP_CHA_H = 4095

    const STP_CHB_L = 1
    const STP_CHB_H = 2047

    const STP_CHC_L = 1023
    const STP_CHC_H = 3071

    const STP_CHD_L = 3071
    const STP_CHD_H = 1023

    let initialized = false
    let yahStrip: neopixel.Strip;


    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }



    export enum enSteppers {
        B1 = 0x1,
        B2 = 0x2
    }
    export enum enPos {
        //% blockId="forward" block="forward"
        forward = 1,
        //% blockId="reverse" block="reverse"
        reverse = 2,
        //% blockId="stop" block="stop"
        stop = 3
    }

    export enum enTurns {
        //% blockId="T1B4" block="1/4"
        T1B4 = 90,
        //% blockId="T1B2" block="1/2"
        T1B2 = 180,
        //% blockId="T1B0" block="1"
        T1B0 = 360,
        //% blockId="T2B0" block="2"
        T2B0 = 720,
        //% blockId="T3B0" block="3"
        T3B0 = 1080,
        //% blockId="T4B0" block="4"
        T4B0 = 1440,
        //% blockId="T5B0" block="5"
        T5B0 = 1800
    }

    export enum enServo {

        S1 = 0,
        S2,
        S3,
        S4,
        S5,
        S6,
        S7,
        S8
    }
    export enum enMotors {
        M1 = 8,
        M2 = 10,
        M3 = 12,
        M4 = 14
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }

    function setStepper(index: number, dir: boolean): void {
        if (index == enSteppers.B1) {
            if (dir) {
                setPwm(11, STP_CHA_L, STP_CHA_H);
                setPwm(9, STP_CHB_L, STP_CHB_H);
                setPwm(10, STP_CHC_L, STP_CHC_H);
                setPwm(8, STP_CHD_L, STP_CHD_H);
            } else {
                setPwm(8, STP_CHA_L, STP_CHA_H);
                setPwm(10, STP_CHB_L, STP_CHB_H);
                setPwm(9, STP_CHC_L, STP_CHC_H);
                setPwm(11, STP_CHD_L, STP_CHD_H);
            }
        } else {
            if (dir) {
                setPwm(12, STP_CHA_L, STP_CHA_H);
                setPwm(14, STP_CHB_L, STP_CHB_H);
                setPwm(13, STP_CHC_L, STP_CHC_H);
                setPwm(15, STP_CHD_L, STP_CHD_H);
            } else {
                setPwm(15, STP_CHA_L, STP_CHA_H);
                setPwm(13, STP_CHB_L, STP_CHB_H);
                setPwm(14, STP_CHC_L, STP_CHC_H);
                setPwm(12, STP_CHD_L, STP_CHD_H);
            }
        }
    }

    function stopMotor(index: number) {
        setPwm(index, 0, 0);
        setPwm(index + 1, 0, 0);
    }
    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=SuperBit_RGB_Program block="RGB_Program"
    //% weight=99
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Program(): neopixel.Strip {

        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P12, 4, NeoPixelMode.RGB);
        }
        return yahStrip;
    }

    //% blockId=SuperBit_Music block="Music|%index"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    //% blockId=SuperBit_Servo block="Servo(180°)|num %num|value %value"
    //% weight=97
    //% blockGap=10
    //% num.min=1 num.max=4 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function Servo(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num, 0, pwm);

    }

    //% blockId=SuperBit_Servo2 block="Servo(270°)|num %num|value %value"
    //% weight=96
    //% blockGap=10
    //% num.min=1 num.max=4 value.min=0 value.max=270
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function Servo2(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let newvalue = Math.map(value, 0, 270, 0, 180);
        let us = (newvalue * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num, 0, pwm);

    }

    //% blockId=SuperBit_Servo3 block="Servo(360°)|num %num|pos %pos|value %value"
    //% weight=96
    //% blockGap=10
    //% num.min=1 num.max=4 value.min=0 value.max=90
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function Servo3(num: enServo, pos: enPos, value: number): void {

        // 50hz: 20,000 us

        if (pos == enPos.stop) {
            let us = (86 * 1800 / 180 + 600); // 0.6 ~ 2.4
            let pwm = us * 4096 / 20000;
            setPwm(num, 0, pwm);
        }
        else if (pos == enPos.forward) { //0-90 -> 90 - 0
            let us = ((90 - value) * 1800 / 180 + 600); // 0.6 ~ 2.4
            let pwm = us * 4096 / 20000;
            setPwm(num, 0, pwm);
        }
        else if (pos == enPos.reverse) { //0-90 -> 90 -180
            let us = ((90 + value) * 1800 / 180 + 600); // 0.6 ~ 2.4
            let pwm = us * 4096 / 20000;
            setPwm(num, 0, pwm);
        }



    }
    //% blockId=SuperBit_MotorRun block="Motor|%index|speed(-255~255) %speed"
    //% weight=93
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function MotorRun(index: enMotors, speed: number): void {
        if (!initialized) {
            initPCA9685()
        }
        speed = speed * 16; // map 255 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= -4096) {
            speed = -4095
        }

        let a = index
        let b = index + 1

        if (a > 10) {
            if (speed >= 0) {
                setPwm(a, 0, speed)
                setPwm(b, 0, 0)
            } else {
                setPwm(a, 0, 0)
                setPwm(b, 0, -speed)
            }
        }
        else {
            if (speed >= 0) {
                setPwm(b, 0, speed)
                setPwm(a, 0, 0)
            } else {
                setPwm(b, 0, 0)
                setPwm(a, 0, -speed)
            }
        }

    }



    //% blockId=SuperBit_MotorRunDual block="Motor|%motor1|speed %speed1|%motor2|speed %speed2"
    //% weight=92
    //% blockGap=50
    //% speed1.min=-255 speed1.max=255
    //% speed2.min=-255 speed2.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function MotorRunDual(motor1: enMotors, speed1: number, motor2: enMotors, speed2: number): void {
        MotorRun(motor1, speed1);
        MotorRun(motor2, speed2);
    }

    //% blockId=SuperBit_StepperDegree block="Stepper Motor(28BYJ-48) |%index|degree %degree"
    //% weight=90
    export function StepperDegree(index: enSteppers, degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
        setStepper(index, degree > 0);
        degree = Math.abs(degree);
        basic.pause(10240 * degree / 360);
        MotorStopAll()
    }

    //% blockId=SuperBit_MotorStopAll block="Motor Stop All"
    //% weight=91
    //% blockGap=50
    export function MotorStopAll(): void {
        if (!initialized) {
            initPCA9685()
        }

        stopMotor(enMotors.M1);
        stopMotor(enMotors.M2);
        stopMotor(enMotors.M3);
        stopMotor(enMotors.M4);

    }

    //% blockId=SuperBit_StepperTurn block="Stepper Motor(28BYJ-48) |%index|turn %turn|circle"
    //% weight=89
    export function StepperTurn(index: enSteppers, turn: enTurns): void {
        let degree = turn;
        StepperDegree(index, degree);
    }

    //% blockId=SuperBit_StepperDual block="Dual Stepper Motor(Degree) |M1 %degree1| M2 %degree2"
    //% weight=88
    export function StepperDual(degree1: number, degree2: number): void {
        if (!initialized) {
            initPCA9685()
        }
        setStepper(1, degree1 > 0);
        setStepper(2, degree2 > 0);
        degree1 = Math.abs(degree1);
        degree2 = Math.abs(degree2);
        basic.pause(10240 * Math.min(degree1, degree2) / 360);
        if (degree1 > degree2) {
            stopMotor(enMotors.M3);
            stopMotor(enMotors.M4);
            basic.pause(10240 * (degree1 - degree2) / 360);
        } else {
            stopMotor(enMotors.M1);
            stopMotor(enMotors.M2);
            basic.pause(10240 * (degree2 - degree1) / 360);
        }

        MotorStopAll()
    }

    //% blockId=SuperBit_PWMOFF block="PWM OFF|%index"
    //% weight=87
    export function PWMOFF(index: number): void {
        setPwm(index, 0, 0);
    }

}
namespace TM1650 {

    let COMMAND_I2C_ADDRESS = 0x24
    let DISPLAY_I2C_ADDRESS = 0x34
    let _SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];

    let TM1650_CDigits = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x82, 0x21, 0x00, 0x00, 0x00, 0x00, 0x02, 0x39, 0x0F, 0x00, 0x00, 0x00, 0x40, 0x80, 0x00,
        0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7f, 0x6f, 0x00, 0x00, 0x00, 0x48, 0x00, 0x53,
        0x00, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71, 0x6F, 0x76, 0x06, 0x1E, 0x00, 0x38, 0x00, 0x54, 0x3F,
        0x73, 0x67, 0x50, 0x6D, 0x78, 0x3E, 0x00, 0x00, 0x00, 0x6E, 0x00, 0x39, 0x00, 0x0F, 0x00, 0x08,
        0x63, 0x5F, 0x7C, 0x58, 0x5E, 0x7B, 0x71, 0x6F, 0x74, 0x02, 0x1E, 0x00, 0x06, 0x00, 0x54, 0x5C,
        0x73, 0x67, 0x50, 0x6D, 0x78, 0x1C, 0x00, 0x00, 0x00, 0x6E, 0x00, 0x39, 0x30, 0x0F, 0x00, 0x00
    ];

    let _intensity = 3
    let dbuf = [0, 0, 0, 0]
    let iPosition = ""

    /**
     * send command to display
     * @param is command, eg: 0
     */
    function cmd(c: number) {
        pins.i2cWriteNumber(COMMAND_I2C_ADDRESS, c, NumberFormat.Int8BE)
    }

    /**
     * send data to display
     * @param is data, eg: 0
     */
    function dat(bit: number, d: number) {
        pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + (bit % 4), d, NumberFormat.Int8BE)
    }

    /**
     * turn on display
     */
    //% blockId="TM650_ON" block="turn on display"
    //% weight=50 blockGap=8
    export function on() {
        cmd(_intensity * 16 + 1)
    }

    /**
     * turn off display
     */
    //% blockId="TM650_OFF" block="turn off display"
    //% weight=50 blockGap=8
    export function off() {
        _intensity = 0
        cmd(0)
    }

    /**
     * clear display content
     */
    //% blockId="TM650_CLEAR" block="clear display"
    //% weight=40 blockGap=8
    export function clear() {
        dat(0, 0)
        dat(1, 0)
        dat(2, 0)
        dat(3, 0)
        dbuf = [0, 0, 0, 0]
    }

    /**
     * show a digital in given position
     * @param digit is number (0-15) will be shown, eg: 1
     * @param bit is position, eg: 0
     */
    //% blockId="TM650_DIGIT" block="show digit %num|at %bit"
    //% weight=80 blockGap=8
    //% num.max=15 num.min=0
    export function digit(num: number, bit: number) {
        dbuf[bit % 4] = _SEG[num % 16]
        dat(bit, _SEG[num % 16])
    }

    /**
     * show a number in display
     * @param num is number will be shown, eg: 100
     */
    //% blockId="TM650_SHOW_NUMBER" block="show number %num"
    //% weight=100 blockGap=8
    export function showNumber(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit(Math.idiv(num, 1000) % 10, 0)
        digit(num % 10, 3)
        digit(Math.idiv(num, 10) % 10, 2)
        digit(Math.idiv(num, 100) % 10, 1)
    }


    //% blockId="showSring" block="show string %str"
    //% weight=100 blockGap=8
    export function showSring(str: string) {
        for (let i = 0; i < 4; i++) {
            let a = str.charCodeAt(i) & 0x7F;
            let dot = str.charCodeAt(i) & 0x80;
            dbuf[i] = TM1650_CDigits[a];
            if (a) {
                pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + i, dbuf[i] | dot, NumberFormat.Int8BE)
            }
            else {
                break;
            }

        }
    }


    function displayRuning(str: string, del: number): number {
        iPosition = str;
        showSring(iPosition);
        basic.pause(del);
        let l = iPosition.length;

        if (l < 4) {
            return 0;
        }
        else {
            return (l - 4);
        }

    }

    function displayRunningShift(): number {

        if (iPosition.length <= 4) {
            return 0;

        }
        else {
            iPosition = iPosition.substr(1, iPosition.length - 1);
            showSring(iPosition);
            return (iPosition.length - 4);
        }

    }

    //% blockId="showRunging" block="scroll display %str | rolling time(ms) %del"
    //% weight=90 blockGap=8
    export function showRunging(str: string, del: number) {
        if (displayRuning(str, del)) {
            while (displayRunningShift()) {
                basic.pause(del);
            }

        }


    }



    /**
     * show a number in hex format
     * @param num is number will be shown, eg: 123
     */
    //% blockId="TM650_SHOW_HEX_NUMBER" block="show hex number %num"
    //% weight=90 blockGap=8
    export function showHex(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit((num >> 12) % 16, 0)
        digit(num % 16, 3)
        digit((num >> 4) % 16, 2)
        digit((num >> 8) % 16, 1)
    }

    /**
     * show Dot Point in given position
     * @param bit is positiion, eg: 0
     * @param show is true/false, eg: true
     */
    //% blockId="TM650_SHOW_DP" block="show dot point %bit|show %num"
    //% weight=80 blockGap=8
    export function showDpAt(bit: number, show: boolean) {
        if (show) dat(bit, dbuf[bit % 4] | 0x80)
        else dat(bit, dbuf[bit % 4] & 0x7F)
    }

    /**
     * set display intensity
     * @param dat is intensity of the display, eg: 3
     */
    //% blockId="TM650_INTENSITY" block="set intensity %dat"
    //% weight=70 blockGap=8
    export function setIntensity(dat: number) {
        if ((dat < 0) || (dat > 8))
            return;
        if (dat == 0)
            off()
        else {
            _intensity = dat
            cmd((dat << 4) | 0x01)
        }
    }

    on();
}
namespace Module_World_Color {

    const COLOR_ADD = 0X53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0X10;
    const COLOR_G = 0X0D;
    const COLOR_B = 0x13;

    let initialized = false;
    let val_red = 0;
    let val_green = 0;
    let val_blue = 0;

    export enum enGetRGB {
        //% blockId="GetValueR" block="GetValueR"
        GetValueR = 0,
        //% blockId="GetValueG" block="GetValueG"
        GetValueG = 1,
        //% blockId="GetValueB" block="GetValueB"
        GetValueB = 2
    }

    function i2cWriteData(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function setRegConfig(): void {
        i2cWriteData(COLOR_ADD, COLOR_REG, 0X06);
        i2cWriteData(COLOR_ADD, 0X04, 0X41);
        i2cWriteData(COLOR_ADD, 0x05, 0x01);
    }

    function initColorI2C(): void {
        setRegConfig();
        initialized = true;
    }

    function GetRGB(): void {
        let buff_R = pins.createBuffer(2);
        let buff_G = pins.createBuffer(2);
        let buff_B = pins.createBuffer(2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        buff_G = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);
        buff_B = pins.i2cReadBuffer(COLOR_ADD, 2);

        let Red = (buff_R[1] & 0xff) << 8 | (buff_R[0] & 0xff);
        let Green = (buff_G[1] & 0xff) << 8 | (buff_G[0] & 0xff);
        let Blue = (buff_B[1] & 0xff) << 8 | (buff_B[0] & 0xff);

        if (Red > 4500) Red = 2300;
        if (Green > 7600) Green = 4600;
        if (Blue > 4600) Blue = 2700;

        val_red = Math.map(Red, 0, 2300, 0, 255);
        val_green = Math.map(Green, 0, 4600, 0, 255);
        val_blue = Math.map(Blue, 0, 2700, 0, 255);

        if (val_red > 255) val_red = 255;
        if (val_green > 255) val_green = 255;
        if (val_blue > 255) val_blue = 255;

        if (val_red == val_green && val_red == val_blue) {
            val_red = 255;
            val_green = 255;
            val_blue == 255;
        }
        else if (val_red > val_green && val_red > val_blue) {
            val_red = 255;
            val_green /= 2;
            val_blue /= 2;
        }
        else if (val_green > val_red && val_green > val_blue) {
            val_green = 255;
            val_red /= 2;
            val_blue /= 2;
        }
        else if (val_blue > val_red && val_blue > val_green) {
            val_blue = 255;
            val_red /= 2;
            val_green /= 2;
        }
    }

    //% blockId=ModuleWorld_Sensor_GetRGBValue block="GetRGBValue|value %value"
    //% blockGap=20
    //% weight=98
    //% color="#0000cd"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function GetRGBValue(value: enGetRGB): number {
        if (!initialized) {
            initColorI2C();
        }
        GetRGB();
        switch (value) {
            case enGetRGB.GetValueR:
                return val_red;
            case enGetRGB.GetValueG:
                return val_green;
            case enGetRGB.GetValueB:
                return val_blue;
            default:
                break;
        }
        return 0;
    }

}
namespace ModuleWorld_Digital {

    export enum mwDigitalNum {
        //% blockId="P0P1" block="P0P1"
        P0P1 = 1,
        //% blockId="P2P3" block="P2P3"
        P2P3 = 2,
        //% blockId="P3P4" block="P3P4"
        P3P4 = 3,
        //% blockId="P4P5" block="P4P5"
        P4P5 = 4,
        //% blockId="P6P7" block="P6P7"
        P6P7 = 5,
        //% blockId="P8P9" block="P8P9"
        P8P9 = 6,
        //% blockId="P10P11" block="P10P11"
        P10P11 = 7,
        //% blockId="P12P13" block="P12P13"
        P12P13 = 8,
        //% blockId="P14P15" block="P14P15"
        P14P15 = 9,
        //% blockId="P1P10" block="P1P10"
        P1P10 = 10
    }


    export enum enObstacle {
        //% blockId="Obstacle" block="Obstacle"
        Obstacle = 0,
        //% blockId="NoObstacle" block="NoObstacle"
        NoObstacle = 1
    }

    export enum enPIR {
        //% blockId="NoPIR" block="NoPIR"
        NoPIR = 0,
        //% blockId="OPIR" block="OPIR"
        OPIR = 1
    }

    export enum enCollision {
        //% blockId="NoCollision" block="NoCollision"
        NoCollision = 0,
        //% blockId="OCollision" block="OCollision"
        OCollision = 1
    }

    export enum enVibration {
        //% blockId="NoVibration" block="NoVibration"
        NoVibration = 0,
        //% blockId="OVibration" block="OVibration"
        OVibration = 1
    }

    export enum DHT11Type {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,

        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,

        //% block="humidity(0~100)" enumval=2
        DHT11_humidity,
    }
    export enum enButton {
        //% blockId="Press" block="Press"
        Press = 0,
        //% blockId="Realse" block="Realse"
        Realse = 1
    }

    //% blockId="readdht11" block="value of dht11 %dht11type| at pin %value_DNum"
    //% weight=100
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5 
    export function dht11value(dht11type: DHT11Type, value_DNum: mwDigitalNum): number {
        let dht11pin;
        if (value_DNum == 1) { dht11pin = DigitalPin.P0; }
        else if (value_DNum == 2) { dht11pin = DigitalPin.P2; }
        else if (value_DNum == 3) { dht11pin = DigitalPin.P3; }
        else if (value_DNum == 4) { dht11pin = DigitalPin.P4; }
        else if (value_DNum == 5) { dht11pin = DigitalPin.P6; }
        else if (value_DNum == 6) { dht11pin = DigitalPin.P8; }
        else if (value_DNum == 7) { dht11pin = DigitalPin.P10; }
        else if (value_DNum == 8) { dht11pin = DigitalPin.P12; }
        else if (value_DNum == 9) { dht11pin = DigitalPin.P14; }
        else if (value_DNum == 10) { dht11pin = DigitalPin.P1; }

        pins.digitalWritePin(dht11pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(dht11pin)
        pins.setPull(dht11pin, PinPullMode.PullUp);
        switch (dht11type) {
            case 0:
                let dhtvalue1 = 0;
                let dhtcounter1 = 0;
                let dhtcounter1d = 0;
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);
                for (let i = 0; i <= 32 - 1; i++) {
                    dhtcounter1d = 0
                    while (pins.digitalReadPin(dht11pin) == 0) {
                        dhtcounter1d += 1;
                    }
                    dhtcounter1 = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        dhtcounter1 += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter1 > dhtcounter1d) {
                            dhtvalue1 = dhtvalue1 + (1 << (31 - i));
                        }
                    }
                }
                return ((dhtvalue1 & 0x0000ff00) >> 8);
                break;
            case 1:
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);
                let dhtvalue = 0;
                let dhtcounter = 0;
                let dhtcounterd = 0;
                for (let i = 0; i <= 32 - 1; i++) {
                    dhtcounterd = 0
                    while (pins.digitalReadPin(dht11pin) == 0) {
                        dhtcounterd += 1;
                    }
                    dhtcounter = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        dhtcounter += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter > dhtcounterd) {
                            dhtvalue = dhtvalue + (1 << (31 - i));
                        }
                    }
                }
                return Math.round((((dhtvalue & 0x0000ff00) >> 8) * 9 / 5) + 32);
                break;
            case 2:
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);

                let value = 0;
                let counter = 0;
                let counterd = 0;

                for (let i = 0; i <= 8 - 1; i++) {
                    counterd = 0
                    while (pins.digitalReadPin(dht11pin) == 0) {
                        counterd += 1;
                    }
                    counter = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        counter += 1;
                    }
                    if (counter > counterd) {
                        value = value + (1 << (7 - i));
                    }
                }
                return value;
            default:
                return 0;
        }
    }


    //% blockId=ModuleWorld_Digital_Ultrasonic block="Ultrasonic|pin %value_DNum"
    //% weight=97
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Ultrasonic(value_DNum: mwDigitalNum): number {
        //send pulse
        let Trig, Echo;
        if (value_DNum == 1) { Trig = DigitalPin.P0; Echo = DigitalPin.P1; }
        else if (value_DNum == 2) { Trig = DigitalPin.P2; Echo = DigitalPin.P3; }
        else if (value_DNum == 3) { Trig = DigitalPin.P3; Echo = DigitalPin.P4; }
        else if (value_DNum == 4) { Trig = DigitalPin.P4; Echo = DigitalPin.P5; }
        else if (value_DNum == 5) { Trig = DigitalPin.P6; Echo = DigitalPin.P7; }
        else if (value_DNum == 6) { Trig = DigitalPin.P8; Echo = DigitalPin.P9; }
        else if (value_DNum == 7) { Trig = DigitalPin.P10; Echo = DigitalPin.P11; }
        else if (value_DNum == 8) { Trig = DigitalPin.P12; Echo = DigitalPin.P13; }
        else if (value_DNum == 9) { Trig = DigitalPin.P14; Echo = DigitalPin.P15; }
        else if (value_DNum == 10) { Trig = DigitalPin.P1; Echo = DigitalPin.P10; }


        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(Trig, 0);

        //read pulse, maximum distance=500cm
        const d = pins.pulseIn(Echo, PulseValue.High, 500 * 58);

        return Math.idiv(d, 58);
    }

    //% blockId=ModuleWorld_Digital_IR block="IR|pin %value_DNum|value %value"
    //% weight=96
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function IR(value_DNum: mwDigitalNum, value: enObstacle): boolean {
        let pin;
        if (value_DNum == 1) { pin = DigitalPin.P0; }
        else if (value_DNum == 2) { pin = DigitalPin.P2; }
        else if (value_DNum == 3) { pin = DigitalPin.P3; }
        else if (value_DNum == 4) { pin = DigitalPin.P4; }
        else if (value_DNum == 5) { pin = DigitalPin.P6; }
        else if (value_DNum == 6) { pin = DigitalPin.P8; }
        else if (value_DNum == 7) { pin = DigitalPin.P10; }
        else if (value_DNum == 8) { pin = DigitalPin.P12; }
        else if (value_DNum == 9) { pin = DigitalPin.P14; }
        else if (value_DNum == 10) { pin = DigitalPin.P1; }

        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }

    //% blockId=ModuleWorld_Digital_PIR block="PIR|pin %value_DNum|value %value"
    //% weight=96
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function PIR(value_DNum: mwDigitalNum, value: enPIR): boolean {
        let pin;
        if (value_DNum == 1) { pin = DigitalPin.P0; }
        else if (value_DNum == 2) { pin = DigitalPin.P2; }
        else if (value_DNum == 3) { pin = DigitalPin.P3; }
        else if (value_DNum == 4) { pin = DigitalPin.P4; }
        else if (value_DNum == 5) { pin = DigitalPin.P6; }
        else if (value_DNum == 6) { pin = DigitalPin.P8; }
        else if (value_DNum == 7) { pin = DigitalPin.P10; }
        else if (value_DNum == 8) { pin = DigitalPin.P12; }
        else if (value_DNum == 9) { pin = DigitalPin.P14; }
        else if (value_DNum == 10) { pin = DigitalPin.P1; }

        pins.setPull(pin, PinPullMode.PullDown);
        pins.digitalWritePin(pin, 1);
        return pins.digitalReadPin(pin) == value;
    }

    //% blockId=ModuleWorld_Digital_Collision block="Collision|pin %value_DNum|value %value"
    //% weight=3
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Collision(value_DNum: mwDigitalNum, value: enCollision): boolean {

        let pin;
        if (value_DNum == 1) { pin = DigitalPin.P0; }
        else if (value_DNum == 2) { pin = DigitalPin.P2; }
        else if (value_DNum == 3) { pin = DigitalPin.P3; }
        else if (value_DNum == 4) { pin = DigitalPin.P4; }
        else if (value_DNum == 5) { pin = DigitalPin.P6; }
        else if (value_DNum == 6) { pin = DigitalPin.P8; }
        else if (value_DNum == 7) { pin = DigitalPin.P10; }
        else if (value_DNum == 8) { pin = DigitalPin.P12; }
        else if (value_DNum == 9) { pin = DigitalPin.P14; }
        else if (value_DNum == 10) { pin = DigitalPin.P1; }

        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }

    //% blockId=ModuleWorld_Digital_Button block="Button|pin %value_DNum|value %value"
    //% weight=3
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(value_DNum: mwDigitalNum, value: enButton): boolean {

        let pin;
        if (value_DNum == 1) { pin = DigitalPin.P0; }
        else if (value_DNum == 2) { pin = DigitalPin.P2; }
        else if (value_DNum == 3) { pin = DigitalPin.P3; }
        else if (value_DNum == 4) { pin = DigitalPin.P4; }
        else if (value_DNum == 5) { pin = DigitalPin.P6; }
        else if (value_DNum == 6) { pin = DigitalPin.P8; }
        else if (value_DNum == 7) { pin = DigitalPin.P10; }
        else if (value_DNum == 8) { pin = DigitalPin.P12; }
        else if (value_DNum == 9) { pin = DigitalPin.P14; }
        else if (value_DNum == 10) { pin = DigitalPin.P1; }

        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }
    //% blockId=ModuleWorld_Digital_Vibration block="Vibration|pin %value_DNum|get "
    //% weight=1
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Vibration(value_DNum: mwDigitalNum, handle: () => void): void {
        let pin;
        if (value_DNum == 1) { pin = DigitalPin.P0; }
        else if (value_DNum == 2) { pin = DigitalPin.P2; }
        else if (value_DNum == 3) { pin = DigitalPin.P3; }
        else if (value_DNum == 4) { pin = DigitalPin.P4; }
        else if (value_DNum == 5) { pin = DigitalPin.P6; }
        else if (value_DNum == 6) { pin = DigitalPin.P8; }
        else if (value_DNum == 7) { pin = DigitalPin.P10; }
        else if (value_DNum == 8) { pin = DigitalPin.P12; }
        else if (value_DNum == 9) { pin = DigitalPin.P14; }
        else if (value_DNum == 10) { pin = DigitalPin.P1; }

        pins.setPull(pin, PinPullMode.PullUp);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(pin, DAL.MICROBIT_PIN_EVT_FALL, handle);
    }


}

//% color="#C814B8" weight=24 icon="\uf1d4"
namespace ModuleWorld_Analog {

    export enum enRocker {
        //% blockId="NoState" block="NoState"
        NoState = 0,
        //% blockId="Up" block="Up"
        Up,
        //% blockId="Down" block="Down"
        Down,
        //% blockId="Left" block="Left"
        Left,
        //% blockId="Right" block="Right"
        Right
    }

    export enum mwAnalogNum {
        //% blockId="P0P1" block="P0P1"
        AP0P1 = 1,
        //% blockId="P2P3" block="P2P3"
        AP2P3 = 2,
        //% blockId="P3P4" block="P3P4"
        AP3P4 = 3
    }

    //% blockId=ModuleWorld_Anaglog_Light block="Light|pin %value_ANum"
    //% weight=100
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5 
    export function Light(value_ANum: mwAnalogNum): number {
        let lightpin;
        let value: number;
        if (value_ANum == 1) { lightpin = AnalogPin.P0; }
        else if (value_ANum == 2) { lightpin = AnalogPin.P2; }
        else if (value_ANum == 3) { lightpin = AnalogPin.P3; }

        value = 1024 - pins.analogReadPin(lightpin);
        return value;
        //return 0;
    }

    //% blockId=ModuleWorld_Anaglog_Sound block="Sound|pin %value_ANum"
    //% weight=99
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Sound(value_ANum: mwAnalogNum): number {
        let soundpin;
        let value: number;
        if (value_ANum == 1) { soundpin = AnalogPin.P0; }
        else if (value_ANum == 2) { soundpin = AnalogPin.P2; }
        else if (value_ANum == 3) { soundpin = AnalogPin.P3; }

        value = pins.analogReadPin(soundpin);
        return value;
        //return 0;
    }
    //% blockId=ModuleWorld_Anaglog_Potentiometer block="Potentiometer|pin %value_ANum"
    //% weight=2
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOption.columns=5
    export function Potentiometer(value_ANum: mwAnalogNum): number {
        let pin;
        let value: number;
        if (value_ANum == 1) { pin = AnalogPin.P0; }
        else if (value_ANum == 2) { pin = AnalogPin.P2; }
        else if (value_ANum == 3) { pin = AnalogPin.P3; }

        value = pins.analogReadPin(pin);
        return value;
    }

    //% blockId=ModuleWorld_Anaglog_Rocker block="Rocker|pin %value_ANum|value %value"
    //% weight=1
    //% blockGap=20
    export function Rocker(value_ANum: mwAnalogNum, value: enRocker): boolean {

        let pin1;
        let pin2;

        if (value_ANum == 1) { pin1 = AnalogPin.P0; pin2 = AnalogPin.P1; }
        else if (value_ANum == 2) { pin1 = AnalogPin.P2; pin2 = AnalogPin.P3; }
        else if (value_ANum == 3) { pin1 = AnalogPin.P3; pin2 = AnalogPin.P4; }

        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);

        let now_state = enRocker.NoState;

        if (x < 100) // 左
        {
            now_state = enRocker.Left;
        }
        else if (x > 700) //右
        {
            now_state = enRocker.Right;
        }
        else  // 上下
        {
            if (y < 100) //下
            {
                now_state = enRocker.Down;
            }
            else if (y > 700) //上
            {
                now_state = enRocker.Up;
            }
        }
        return now_state == value;
    }




}

//% color="#ECA40D" weight=22 icon="\uf085"
namespace ModuleWorld_PWM {

    export enum enColor {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="Red" block="Red"
        Red,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="White" block="White"
        White,
        //% blockId="Cyan" block="Cyan"
        Cyan,
        //% blockId="Pinkish" block="Pinkish"
        Pinkish,
        //% blockId="Yellow" block="Yellow"
        Yellow
    }

    export enum mwDigitalNum {
        //% blockId="P0P1" block="P0P1"
        P0P1 = 1,
        //% blockId="P2P3" block="P2P3"
        P2P3 = 2,
        //% blockId="P3P4" block="P3P4"
        P3P4 = 3,
        //% blockId="P4P5" block="P4P5"
        P4P5 = 4,
        //% blockId="P6P7" block="P6P7"
        P6P7 = 5,
        //% blockId="P8P9" block="P8P9"
        P8P9 = 6,
        //% blockId="P10P11" block="P10P11"
        P10P11 = 7,
        //% blockId="P12P13" block="P12P13"
        P12P13 = 8,
        //% blockId="P14P15" block="P14P15"
        P14P15 = 9,
        //% blockId="P1P10" block="P1P10"
        P1P10 = 10
    }

    export enum mwServoNum {
        //% blockId="P1" block="P1"
        P1 = 1,
        //% blockId="P4" block="P4"
        P4 = 2,
        //% blockId="P2" block="P2"
        P2 = 3,
        //% blockId="P10" block="P10"
        P10 = 4
    }



    //% blockId=ModuleWorld_PWM_BuzzerPin block="Set Buzzer Pin|%value_DNum"
    //% weight=99
    //% blockGap=22
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function BuzzerPin(value_DNum: mwDigitalNum): void {
        let pinb;
        if (value_DNum == 1) { pinb = AnalogPin.P0 }
        else if (value_DNum == 2) { pinb = AnalogPin.P2 }
        else if (value_DNum == 3) { pinb = AnalogPin.P3 }
        else if (value_DNum == 4) { pinb = AnalogPin.P4 }
        else if (value_DNum == 5) { pinb = AnalogPin.P6 }
        else if (value_DNum == 6) { pinb = AnalogPin.P8 }
        else if (value_DNum == 7) { pinb = AnalogPin.P10 }
        else if (value_DNum == 8) { pinb = AnalogPin.P12 }
        else if (value_DNum == 9) { pinb = AnalogPin.P14 }
        else if (value_DNum == 10) { pinb = AnalogPin.P1 }

        pins.setAudioPin(pinb);
    }
    //% blockId=ModuleWorld_PWM_VibrationMot block="Vibration Motor|%value_DNum|speed %speed"
    //% weight=80
    //% blockGap=22
    //% speed.min=0 speed.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function VibrationMot(value_DNum: mwDigitalNum, speed: number): void {

        let pin;
        if (value_DNum == 1) { pin = AnalogPin.P0; }
        else if (value_DNum == 2) { pin = AnalogPin.P2; }
        else if (value_DNum == 3) { pin = AnalogPin.P3; }
        else if (value_DNum == 4) { pin = AnalogPin.P4; }
        else if (value_DNum == 5) { pin = AnalogPin.P6; }
        else if (value_DNum == 6) { pin = AnalogPin.P8; }
        else if (value_DNum == 7) { pin = AnalogPin.P10; }
        else if (value_DNum == 8) { pin = AnalogPin.P12; }
        else if (value_DNum == 9) { pin = AnalogPin.P14; }
        else if (value_DNum == 10) { pin = AnalogPin.P1; }

        pins.analogWritePin(pin, speed);
    }

    //% blockId=ModuleWorld_PWM_RGB block="RGB|(P12P13P14)|value1 %value1|value2 %value2|value3 %value3"
    //% weight=2
    //% blockGap=20
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(value1: number, value2: number, value3: number): void {

        pins.analogWritePin(AnalogPin.P13, value1 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P14, value2 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P12, value3 * 1024 / 256);
    }

    //% blockId=ModuleWorld_PWM_RGB2 block="RGB|(P12P13P14)|value %value"
    //% weight=1
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(value: enColor): void {
        let pin1 = DigitalPin.P13;
        let pin2 = DigitalPin.P14;
        let pin3 = DigitalPin.P12;

        switch (value) {
            case enColor.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }
    }

    //% blockId=ModuleWorld_PWM_Servo block="Servo(360)|pin %ServoNum|value %value"
    //% weight=6
    //% blockGap=20
    //% value.min=0 value.max=360
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Servo(ServoNum: mwServoNum, value: number): void {
        let pin;
        if (ServoNum == 1) { pin = AnalogPin.P1; }
        else if (ServoNum == 2) { pin = AnalogPin.P4; }
        else if (ServoNum == 3) { pin = AnalogPin.P2; }
        else if (ServoNum == 4) { pin = AnalogPin.P10; }

        pins.servoSetPulse(pin, Math.map(value, 0, 360, 500, 2500))
    }

    //% blockId=ModuleWorld_PWM_Servo2 block="Servo(270)|pin %ServoNum|value %value"
    //% weight=6
    //% blockGap=20
    //% value.min=0 value.max=270
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Servo2(ServoNum: mwServoNum, value: number): void {
        let pin;
        if (ServoNum == 1) { pin = AnalogPin.P1; }
        else if (ServoNum == 2) { pin = AnalogPin.P4; }
        else if (ServoNum == 3) { pin = AnalogPin.P2; }
        else if (ServoNum == 4) { pin = AnalogPin.P10; }

        pins.servoSetPulse(pin, Math.map(value, 0, 270, 500, 2500))
    }




}
namespace GHBit {

    const PCA9685_ADD = 0x41;
    const MODE1 = 0x00;
    const MODE2 = 0x01;
    const SUBADR1 = 0x02;
    const SUBADR2 = 0x03;
    const SUBADR3 = 0x04;

    const LED0_ON_L = 0x06;
    const LED0_ON_H = 0x07;
    const LED0_OFF_L = 0x08;
    const LED0_OFF_H = 0x09;

    const ALL_LED_ON_L = 0xFA;
    const ALL_LED_ON_H = 0xFB;
    const ALL_LED_OFF_L = 0xFC;
    const ALL_LED_OFF_H = 0xFD;

    const PRESCALE = 0xFE;

    let initialized = false;
    let yahStrip: neopixel.Strip;

    export enum STepper {
        //% blockId="Stepper" block="foreward"
        Stepper = 0,
        //% blockId="Stepper0" block="reversal"
        Stepper0,
        //% blockId="Stepper1" block="Stop"
        Stepper1
    }
    export enum Angle {
        //% blockId="Angle0" block="first gear"
        Angle0 = 0,
        //% blockId="Angle1" block="second gear"
        Angle1,
        //% blockId="Angle2" block="third gear"
        Angle2,
        //% blockId="Angle3" block="forth gear"
        Angle3,
        //% blockId="Angle4" block="fifth gear"
        Angle4,
        //% blockId="Angle5" block="sixth gear"
        Angle5,
        //% blockId="Angle6" block="seventh gear"
        Angle6,
        //% blockId="Angle7" block="eighth gear"
        Angle7
    }
    export enum Beamstate {
        //% blockId="bright" block="Bright"
        bright = 1,
        //% blockId="dark" block="Dark"
        dark
    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }

    export enum enServo {

        S1 = 1,
        S2,
        S3,
        S4
    }

    export enum Motorshock {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="ON" block="ON"
        ON
    }

    export enum speed {
        //% blockId="speed1" block="1"
        speed1 = 2000,
        //% blockId="speed2" block="2"
        speed2 = 3000,
        //% blockId="speed3" block="3"
        speed3 = 4000
    }

    export enum enRocker {
        //% blockId="Nostate" block="Nostate"
        Nostate = 0,
        //% blockId="Up" block="Up"
        Up,
        //% blockId="Down" block="Down"
        Down,
        //% blockId="Left" block="Left"
        Left,
        //% blockId="Right" block="Right"
        Right,
        //% blockId="Press" block="Press"
        Press
    }

    export enum enButtonState {
        //% blockId="Press" block="Press"
        Press = 0,
        //% blockId="Realse" block="Realse"
        Realse = 1
    }

    export enum enButton {

        B1 = 0,
        B2,
        B3,
        B4
    }

    export enum enColor {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="RED" block="RED"
        RED,
        //% blockId="GREEN" block="GREEN"
        GREEN,
        //% blockId="BLUE" block="BLUE"
        BLUE,
        //% blockId="WHITE" block="WHITE"
        WHITE,
        //% blockId="CYAN" block="CYAN"
        CYAN,
        //% blockId="PINKISH" block="PINKISH"
        PINKISH,
        //% blockId="YELLOW" block="YELLOW"
        YELLOW
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1);
        buf[0] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00);
        setFreq(50);
        initialized = true;
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }

    /**
     * *****************************************************************
     * @param index
     */

    //% blockId=GHBit_RGB_Program block="RGB_Program"
    //% weight=99
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Program(): neopixel.Strip {

        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P4, 4, NeoPixelMode.RGB);
        }
        return yahStrip;
    }

    //% blockId=GHBit_RGB_Program_Close block="RGB_Program_Close"
    //% weight=98
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function RGB_Program_Close(): void {
        pins.digitalWritePin(DigitalPin.P4, 0);
        GHBit.RGB_Program().clear();
        GHBit.RGB_Program().show();
    }

    //% blockId=GHBit_Min_Motor_Shake block="Min_Motor_Shake|value %value"
    //% weight=97
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Min_Motor_Shake(value: Motorshock): void {
        switch (value) {
            case Motorshock.ON: {
                setPwm(0, 0, 4095);
                break;
            }
            case Motorshock.OFF: {
                setPwm(0, 0, 0);
                break;
            }
        }
    }

    //% blockId=GHBit_Rocker block="Rocker|value %value"
    //% weight=96
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Rocker(value: enRocker): boolean {

        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        let x = pins.analogReadPin(AnalogPin.P1);
        let y = pins.analogReadPin(AnalogPin.P2);
        let z = pins.digitalReadPin(DigitalPin.P8);
        let now_state = enRocker.Nostate;

        if (x < 200) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 730) //下 900 -> 730
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 200) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 730) //左 900 -> 730
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=GHBit_Button block="Button|num %num|value %value"
    //% weight=95
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(num: enButton, value: enButtonState): boolean {
        let temp = false;
        switch (num) {
            case enButton.B1: {
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P13) == value) {
                    temp = true;
                }
                else {
                    temp = false;
                }
                break;
            }
            case enButton.B2: {
                pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P14) == value) {
                    temp = true;
                }
                else {
                    temp = false;
                }
                break;
            }
            case enButton.B3: {
                pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P15) == value) {
                    temp = true;
                }
                else {
                    temp = false;
                }
                break;
            }
            case enButton.B4: {
                pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P16) == value) {
                    temp = true;
                }
                else {
                    temp = false;
                }
                break;
            }
        }
        return temp;
    }



    //% blockId=GHBit_Music_Handle block="Music_Handle|%index"
    //% weight=92
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Handle(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    //% blockId=GHBit_Servo_Handle block="Servo_Handle|num %num|value %value"
    //% weight=91
    //% blockGap=10
    //% color="#C814B8"
    //% num.min=1 num.max=4 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Handle(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num + 8, 0, pwm);

    }

    //% blockId=GHBit_Ultrasonic_Handle block="ultrasonic return distance(cm)"
    //% color="#C814B8"
    //% weight=90
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Handle(): number {

        // send pulse
        pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
        pins.digitalWritePin(DigitalPin.P12, 0)
        control.waitMicros(4)
        pins.digitalWritePin(DigitalPin.P12, 1)
        control.waitMicros(15)
        pins.digitalWritePin(DigitalPin.P12, 0)
        const d = pins.pulseIn(DigitalPin.P11, PulseValue.High, 500 * 40);
        return Math.idiv(d, 40)
    }

    //% blockId=GHBit_Ultrasonic_Handle_V2 block="ultrasonic_V2 return distance(cm)"
    //% color="#C814B8"
    //% weight=90
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Handle_V2(): number {

        // send pulse
        pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
        pins.digitalWritePin(DigitalPin.P12, 0)
        control.waitMicros(4)
        pins.digitalWritePin(DigitalPin.P12, 1)
        control.waitMicros(15)
        pins.digitalWritePin(DigitalPin.P12, 0)
        const d = pins.pulseIn(DigitalPin.P11, PulseValue.High, 500 * 58);
        return Math.idiv(d, 58)
    }

    //% blockId=GHBit_RGB_Colorful block="RGB_Colorful|%value"
    //% weight=89
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Colorful(value: enColor): void {
        switch (value) {
            case enColor.OFF: {
                setPwm(15, 0, 0);
                setPwm(14, 0, 0);
                setPwm(13, 0, 0);
                break;
            }
            case enColor.RED: {
                setPwm(15, 0, 4095);
                setPwm(14, 0, 0);
                setPwm(13, 0, 0);
                break;
            }
            case enColor.GREEN: {
                setPwm(15, 0, 0);
                setPwm(14, 0, 4095);
                setPwm(13, 0, 0);
                break;
            }
            case enColor.BLUE: {
                setPwm(15, 0, 0);
                setPwm(14, 0, 0);
                setPwm(13, 0, 4095);
                break;
            }
            case enColor.WHITE: {
                setPwm(15, 0, 4095);
                setPwm(14, 0, 4095);
                setPwm(13, 0, 4095);
                break;
            }
            case enColor.CYAN: {
                setPwm(15, 0, 0);
                setPwm(14, 0, 4095);
                setPwm(13, 0, 4095);
                break;
            }
            case enColor.PINKISH: {
                setPwm(15, 0, 4095);
                setPwm(14, 0, 0);
                setPwm(13, 0, 4095);
                break;
            }
            case enColor.YELLOW: {
                setPwm(15, 0, 4095);
                setPwm(14, 0, 4095);
                setPwm(13, 0, 0);
                break;
            }
        }
    }

    //% blockId=GHBit_Stepper_Motor block="Stepper_Motor|value %value|value1 %value1"
    //% weight=88
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Stepper_Motor(value: STepper, value1: speed): void {
        let a = 64;
        switch (value) {
            case STepper.Stepper: {
                while (a) {
                    setPwm(1, 0, 4095);
                    setPwm(2, 0, 4095);
                    setPwm(3, 0, 0);
                    setPwm(4, 0, 0);
                    control.waitMicros(value1);
                    setPwm(1, 0, 0);
                    setPwm(2, 0, 4095);
                    setPwm(3, 0, 4095);
                    setPwm(4, 0, 0);
                    control.waitMicros(value1);
                    setPwm(1, 0, 0);
                    setPwm(2, 0, 0);
                    setPwm(3, 0, 4095);
                    setPwm(4, 0, 4095);
                    control.waitMicros(value1);
                    setPwm(1, 0, 4095);
                    setPwm(2, 0, 0);
                    setPwm(3, 0, 0);
                    setPwm(4, 0, 4095);
                    control.waitMicros(value1);
                    a--;
                }
                a = 0;
                break;
            }
            case STepper.Stepper0: {
                while (a) {
                    setPwm(1, 0, 0);
                    setPwm(2, 0, 0);
                    setPwm(3, 0, 4095);
                    setPwm(4, 0, 4095);
                    control.waitMicros(value1);
                    setPwm(1, 0, 0);
                    setPwm(2, 0, 4095);
                    setPwm(3, 0, 4095);
                    setPwm(4, 0, 0);
                    control.waitMicros(value1);
                    setPwm(1, 0, 4095);
                    setPwm(2, 0, 4095);
                    setPwm(3, 0, 0);
                    setPwm(4, 0, 0);
                    control.waitMicros(value1);
                    setPwm(1, 0, 4095);
                    setPwm(2, 0, 0);
                    setPwm(3, 0, 0);
                    setPwm(4, 0, 4095);
                    control.waitMicros(value1);
                    a--;
                }
                a = 0;
                break;
            }
            case STepper.Stepper1: {
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                setPwm(3, 0, 0);
                setPwm(4, 0, 0);
                break;
            }
        }
    }
    //% blockId=GHBit_Min_Motor block="Min_Motor|value %value"
    //% weight=87
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Min_Motor(value: Angle): void {
        switch (value) {
            case Angle.Angle0: {
                setPwm(7, 0, 0);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle1: {
                setPwm(7, 0, 600);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle2: {
                setPwm(7, 0, 1200);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle3: {
                setPwm(7, 0, 1800);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle4: {
                setPwm(7, 0, 2400);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle5: {
                setPwm(7, 0, 3000);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle6: {
                setPwm(7, 0, 3600);
                setPwm(8, 0, 0);
                break;
            }
            case Angle.Angle7: {
                setPwm(7, 0, 4095);
                setPwm(8, 0, 0);
                break;
            }
        }
    }
    //% blockId=GHBit_Rotate block="Rotate|value %value"
    //% weight=86
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Rotate(value: Angle): boolean {

        let y = pins.analogReadPin(AnalogPin.P3);
        let a = false;
        switch (value) {
            case Angle.Angle0: {
                if (y < 128)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle1: {
                if (y < 254 && y > 127)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle2: {
                if (y < 381 && y > 253)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle3: {
                if (y < 508 && y > 381)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle4: {
                if (y < 635 && y > 508)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle5: {
                if (y < 762 && y > 634)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle6: {
                if (y < 889 && y > 761)
                    a = true;
                else
                    a = false;
                break;
            }
            case Angle.Angle7: {
                if (y > 888)
                    a = true;
                else
                    a = false;
                break;
            }
        }
        return a;
    }

    //% blockId=GHBit_Beam block="Beam|value %value"
    //% weight=85
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Beam(value: Beamstate): boolean {

        pins.setPull(DigitalPin.P10, PinPullMode.PullUp);
        let x = pins.analogReadPin(AnalogPin.P10);
        if (x < 700) // 亮
        {
            if (value == Beamstate.bright) {
                return true;
            }
            else {

                return false;
            }
        }
        else {

            if (value == Beamstate.dark) {
                return true;
            }
            else {
                return false;
            }
        }
    }


}