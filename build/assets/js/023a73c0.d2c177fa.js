"use strict";(self.webpackChunkhello_world=self.webpackChunkhello_world||[]).push([[951],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=a.createContext({}),s=function(e){var n=a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return a.createElement(d.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(t),c=r,g=m["".concat(d,".").concat(c)]||m[c]||u[c]||o;return t?a.createElement(g,i(i({ref:n},p),{},{components:t})):a.createElement(g,i({ref:n},p))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=c;var l={};for(var d in n)hasOwnProperty.call(n,d)&&(l[d]=n[d]);l.originalType=e,l[m]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5090:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=t(7462),r=(t(7294),t(3905));const o={sidebar_position:4},i="OpenBCI Comms Explained",l={unversionedId:"programming-arduino/openbci-comms-explained",id:"programming-arduino/openbci-comms-explained",title:"OpenBCI Comms Explained",description:"In the previous section we controlled the arduino with auto-generated data from a artificial OpenBCI headset.",source:"@site/docs/programming-arduino/openbci-comms-explained.md",sourceDirName:"programming-arduino",slug:"/programming-arduino/openbci-comms-explained",permalink:"/pZero/docs/programming-arduino/openbci-comms-explained",draft:!1,editUrl:"https://github.com/Chris0016/pZero/tree/main/docs/programming-arduino/openbci-comms-explained.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"OpenBCI Comms",permalink:"/pZero/docs/programming-arduino/openbci-comms"},next:{title:"OpenBCI Cyton Setup",permalink:"/pZero/docs/category/openbci-cyton-setup"}},d={},s=[{value:"Understanding the Code",id:"understanding-the-code",level:2},{value:"Flow Control Diagram",id:"flow-control-diagram",level:3},{value:"Import  Libraries",id:"import--libraries",level:3},{value:"Set global Variables",id:"set-global-variables",level:3},{value:"Sleep Timer &amp; Data Rows",id:"sleep-timer--data-rows",level:3},{value:"Handshake Signal from Arduino",id:"handshake-signal-from-arduino",level:3},{value:"Send Data",id:"send-data",level:3},{value:"Random Multiple",id:"random-multiple",level:3},{value:"OpenBCI Connection",id:"openbci-connection",level:3},{value:"Converting OpenBCI range to PWM Range",id:"converting-openbci-range-to-pwm-range",level:3},{value:"Set up Serial Connection",id:"set-up-serial-connection",level:3},{value:"Putting It Together",id:"putting-it-together",level:3}],p={toc:s},m="wrapper";function u(e){let{components:n,...o}=e;return(0,r.kt)(m,(0,a.Z)({},p,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"openbci-comms-explained"},"OpenBCI Comms Explained"),(0,r.kt)("p",null,"In the previous section we controlled the arduino with auto-generated data from a artificial OpenBCI headset."),(0,r.kt)("p",null,"This section will take a deeper dive at the code and explain in detail what is happening."),(0,r.kt)("h2",{id:"understanding-the-code"},"Understanding the Code"),(0,r.kt)("p",null,"OpenBCI Cyton board reads brain signals and outputs a value between -30k and 55k (the output may vary). Point is, different parts of the brain will emit values of different ranges."),(0,r.kt)("h3",{id:"flow-control-diagram"},"Flow Control Diagram"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"flow-diagram",src:t(4698).Z,width:"915",height:"536"})),(0,r.kt)("h3",{id:"import--libraries"},"Import  Libraries"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import serial\nimport time\nimport random\nimport math\nimport statistics\n\nfrom brainflow.board_shim import BoardShim, BrainFlowInputParams, LogLevels, BoardIds\nfrom brainflow.data_filter import DataFilter, AggOperations\n")),(0,r.kt)("h3",{id:"set-global-variables"},"Set global Variables"),(0,r.kt)("p",null,"These will help us make our code more dynamic by only making changes to these values."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"##Change these values depending on channel, some channels only go up to 100\nBCI_UPPER_LIMIT = 55_000\nBCI_LOWER_LIMIT = 45_000 #big negative numbers are considered no activity\nSELECTED_CHANNEL = 8\n\nDELAY_LOWER_LIMIT = 150\nDELAY_UPPER_LIMIT = 100\nDELAY_STEP = 10\n\nPWM_LOWER_LIMIT = 20.0\nPWM_UPPER_LIMIT = 40.0\n#PWM_STEP = 10\n")),(0,r.kt)("h3",{id:"sleep-timer--data-rows"},"Sleep Timer & Data Rows"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"SLEEP_TIMER = 3\nDATA_ROWS = 80\n")),(0,r.kt)("p",null,"When we read data off our cyton board we need to set the current thread to sleep. Our Cyton board samples at 250Htz (250 rows per second). You can lower/increase this value depending on the number of rows you want to collect."),(0,r.kt)("h3",{id:"handshake-signal-from-arduino"},"Handshake Signal from Arduino"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'\n# Handshake signal from Arduino\ndef arduino_ready():\n    while True:\n        #print("waiting")\n        if ser.in_waiting:\n            response = ser.readline().decode(\'utf-8\').rstrip()\n            if response == "Ready":\n                return True\n            else:\n                print("\\n Recived->>", response)\n\n')),(0,r.kt)("p",null,' We only want to send signals to the Arduino whenever it\'s ready. Hence, we keep the line open and wait until it sends the code "Ready". Keep in mind that the arduino may send other kinds of data for debugging so we need this filter.'),(0,r.kt)("h3",{id:"send-data"},"Send Data"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"\ndef send_data(pwmTarget):\n    ## DEBUGGING - Send a random number to the arduino\n    delay = 0\n    pwmTarget = randomMultiple(PWM_LOWER_LIMIT, PWM_UPPER_LIMIT, PWM_STEP)\n        #send values between PWM_LOWER_LIMIT (50) and    PWM_UPPER_LIMIT (255) \n        #that are multiples of PWM_STEP (5)\n        #ex: 55, 100, 75, 250, 160, ... \n  \n\n    ##DEBUGGING - Alternate between to numbers \n\n    # low = 15\n    # high = 50\n\n    # if(isAtHigh):\n    #     pwmTarget = low\n    # else:\n    #     pwmTarget = high\n  \n    ##DEBUGGING - Send fixed values to the arduino\n\n    #delay = 150\n    #pwm_max = 255\n\n    # Send the values to Arduino\n    ser.write(str(delay).encode('utf-8'))\n    ser.write(b',')\n    ser.write(str(pwmTarget).encode('utf-8'))\n    ser.write(b'\\n')\n\n")),(0,r.kt)("h3",{id:"random-multiple"},"Random Multiple"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def randomMultiple(minimum, maximum, step):\n    return random.randint(math.ceil(minimum / step ), math.floor(maximum / step)) * step\n")),(0,r.kt)("p",null,"We currently don't use this function since our values are being auto-generated."),(0,r.kt)("h3",{id:"openbci-connection"},"OpenBCI Connection"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"### openBCI Connection ###\n\n#openBCI board setup\nBoardShim.enable_dev_board_logger()\n\n# use synthetic board for demo\nparams = BrainFlowInputParams()\nboard = BoardShim(BoardIds.SYNTHETIC_BOARD.value, params)\n\n#REAL BOARD\n#params = BrainFlowInputParams()\n#params.serial_port = \"/dev/ttyUSB0\" //CHANGE THIS DEPENDING ON YOUR OS\n#board = BoardShim(BoardIds.CYTON_BOARD, params)\n\ndef get_board_data():\n\n    board.prepare_session()\n    board.start_stream()\n    BoardShim.log_message(LogLevels.LEVEL_INFO.value, 'start sleeping in the main thread')\n    time.sleep(SLEEP_TIMER)\n    data = board.get_board_data(DATA_ROWS)\n    board.stop_stream()\n    board.release_session()\n  \n\n  \n    eeg_channels = BoardShim.get_eeg_channels(BoardIds.CYTON_BOARD.value)\n  \n    downsampled_data = []\n\n    # downsample data, it just aggregates data\n    for count, channel in enumerate(eeg_channels):\n        print('Original data for channel %d:' % channel)\n        print(data[channel])\n        # if count == 0:\n        #     downsampled_channel = DataFilter.perform_downsampling(data[channel], 3, AggOperations.MEDIAN.value)\n        # elif count == 1:\n        #     downsampled_channel = DataFilter.perform_downsampling(data[channel], 2, AggOperations.MEAN.value)\n        # else:\n        #     downsampled_channel = DataFilter.perform_downsampling(data[channel], 2, AggOperations.EACH.value)\n  \n        #print('Downsampled data for channel %d:' % channel)\n        #print(downsampled_data)\n\n        # downsampled_data.append(downsampled_channel)\n\n    return data[SELECTED_CHANNEL]\n")),(0,r.kt)("p",null,"We setup our board, sleep for 3 seconds (SLEEP_TIMER) seconds, then collect our data from the board object, and then return data from channel number 8 (SELECTED_CHANNEL)."),(0,r.kt)("p",null,"Optionally you can downsample the incoming data, however the code is commented out."),(0,r.kt)("h3",{id:"converting-openbci-range-to-pwm-range"},"Converting OpenBCI range to PWM Range"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"bci-range-to-pwm-range-diagram",src:t(1598).Z,width:"807",height:"506"})),(0,r.kt)("p",null,"We are still using auto-generated data, however our goal is to transform the range of values that the OpenBCI board may give and map it to values from 0 to 255, which represent the strength our motor will run at. Remember that we are still using the motor and not the electromagnet for rapid testing."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'\ndef process_bci_data(channel):\n  \n    mean =  statistics.mean(channel) \n\n    if (mean < 0 ):\n        return PWM_LOWER_LIMIT\n\n\n    diff = (BCI_UPPER_LIMIT - BCI_LOWER_LIMIT)\n    x = mean - BCI_LOWER_LIMIT\n\n    x_normalized = (x/diff)\n\n    #DEBUGGING\n    #print("\\n channel: \\n", channel, "\\n")\n    #print("\\n mean: ", mean, "\\n")\n    #print("\\n x_nomalized:", x_normalized, "\\n")\n\n  \n    return (x_normalized *  (PWM_UPPER_LIMIT - PWM_LOWER_LIMIT) ) + PWM_LOWER_LIMIT \n')),(0,r.kt)("p",null,"To convert the given auto-generated(values from -33k-55k) data to a value between 0(PWM_LOWER_LIMIT)TO 255(PWM_UPPER_LIMIT), we determine the mean for that section."),(0,r.kt)("p",null,"We convert the mean into a decimal value that is represenative of what percentage of the BCI_LOWER_LIMIT to BCI_UPPER_LIMIT range we set before hand. Afterwards, we use that percentage in the PWM_LOWER_LIMIT to PWM_UPPER_LIMIT range."),(0,r.kt)("h3",{id:"set-up-serial-connection"},"Set up Serial Connection"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"# Set up the serial connection\nser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # Change '/dev/ttyACM0' to the correct port for your Arduino\nser.reset_input_buffer()\nser.close()\nser.open()\ntime.sleep(5)\n")),(0,r.kt)("p",null,"Make sure to change the 'ser' variable depending on your system. To figure out what this should be click here(link me)."),(0,r.kt)("p",null,"We wait 5 seconds before starting the program. This will give some time for our motor to start running."),(0,r.kt)("h3",{id:"putting-it-together"},"Putting It Together"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'def get_pwm_value():\n    #Collect data from bci headset\n\n    channel_data = get_board_data()\n    return process_bci_data(channel_data)\n\ndef main():\n   \n    while True:\n        try:\n            # Wait for Arduino confirmation\n            if arduino_ready():\n                print("Arduino Ready")\n                send_data(get_pwm_value())\n            else:\n                #print("Waiting")\n\n        except KeyboardInterrupt:\n            break\n\n    # Close the serial connection\n    ser.close()\nmain()\n')))}u.isMDXComponent=!0},1598:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/bci-range-to-pwm-range-diagram-b52fe5b3924aeac18c2cb50a31e550db.png"},4698:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/flow-diagram-c932a3ba689b599de1852a1b0467e8dc.png"}}]);