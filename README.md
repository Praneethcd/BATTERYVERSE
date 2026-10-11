# Batteryverse — Energy made visible

A light-theme, browser-based teaching website for lead-acid and sodium-ion batteries. Runs locally, works offline, and needs no runtime dependencies or cloud accounts.

## Start

With Node.js 18 or newer, open a terminal and run:

```sh
git clone https://github.com/Praneethcd/BATTERYVERSE.git
cd BATTERYVERSE
npm start
```

Open http://localhost:3000. Stop with Ctrl+C. If that port is already used, run `PORT=3001 npm start` and open http://localhost:3001. The server binds only to this computer.

## Main sections

1. **Battery lab** — animated electrode cutaways, separate ion and electron paths, lead sulphate formation, equal 5 kWh packs, charge/discharge, load selection, play/pause/reset, live SOC curves.
2. **Construction & working** — build both batteries manually by clicking parts in sequence; undo, reset and rebuild; explore an exploded cell, rotate, select components and reverse the reaction animation.
3. **Solar storage** — no parameter form. Morning, hot sun, clouds and evening presets. A moving daylight scene shows solar generation, battery storage and home power. Energy accounting includes conversion losses, solar curtailment and unmet demand.
4. **Compare the two** — specific energy, specific power and round-trip efficiency graphs, visual metric demonstrations and a replay button.
5. **Where they shine** — lead-acid backup/starting and sodium stationary storage, with illustrative comparative graphs and links into the live demonstrations. This does not claim universal superiority.

The discreet **•••** button opens lithium-ion, primary zinc-air, lithium-ion polymer, rechargeable iron-air as a metal-air example, and nickel-metal hydride simulations. Charging is disabled for the chosen primary zinc-air cell. Zinc-air is also a member of the metal-air family.

## Suggested classroom sequence

- Start in Battery lab. Play discharge and change from a lamp to a pump.
- Reverse to Charge. Explain internal ions and external electrons.
- Open Construction & working. Build lead-acid in six clicks, then build sodium-ion. Undo/rebuild a component and explore exploded layers.
- Open Solar storage. Play Hot sun, then select Evening and play again.
- Compare specific energy, specific power and efficiency. Explain that Wh/kg and W/kg measure different properties.
- Open Where they shine and discuss why the use case determines the choice.
- Optionally open the hidden extra batteries for a brief comparison.

## Scientific boundaries

All numeric battery values and costs are illustrative teaching defaults unless explicitly attributed in the interface. Lead-acid uses 40 Wh/kg, 250 W/kg, 80% round-trip efficiency and 50% reserve. Sodium-ion uses 140 Wh/kg, 500 W/kg, 92% round-trip efficiency and 10% reserve. Ion and electron animations are schematic rather than molecular predictions. Construction is a conceptual virtual activity, not a physical battery fabrication guide.

Charging multiplies input by the square root of round-trip efficiency. Discharging removes output divided by that factor. Both main packs use the same generic temperature derating: 1.2% per degree below 10°C and 0.6% per degree above 35°C, floored at 55%. No universal sodium heat advantage is asserted.

The solar model uses separate alternate installations: the solar section now models only one 5 kWh sodium-ion pack, with a 2 kW solar array and a 400 W home demand. Daylight follows a sine curve from 06:00 to 18:00. Clouds apply 45% irradiance. Panel-cell temperature is estimated as ambient plus 20 times irradiance/1000. The illustrative silicon PV coefficient is −0.4%/°C; output is capped at rated power. Charge input is capped at 1.5 kW.

No charge taper, Peukert effect, cranking transient, voltage sag, thermal dynamics or aging model is provided. Use manufacturer data for real installation decisions. A compact About the model dialog explains assumptions and links to sources; there is no separate sources/navigation section.

## Tests

Runtime needs no installation. The optional interface tests use jsdom:

```sh
npm install
npm test
```

The checks cover model energy balance, reserve limits, primary-cell charging restrictions, page initialization, manual assembly, pause/reset/reversal, solar presets and hidden simulations. DOM tests use local files, not a live browser. Visual browser inspection has not been completed because browser permission was previously declined.

## GitHub

No GitHub push has been made. After approving the preview, upload this folder's current website and tests, excluding `node_modules` and `previous-version`. The previous design is preserved in `previous-version` for rollback. The entrypoint loads only `light.css`, `light-model.js` and `light.js`; legacy app files are inactive.


## New interactions

Drag the highlighted component onto the assembly bench; components snap into a conceptual sequence. Click alternatives remain available. Drag a lamp, laptop, fan or pump onto either battery to connect the same shared load to both. Lamps glow, fans rotate and pumps show water flow only while discharging above reserve.

The main lab supports equal energy (5 kWh each) and equal illustrative cell mass (10 kg each: 0.4 kWh lead-acid, 1.4 kWh sodium-ion). Changing basis resets the run. The experiment summary reports actual integrated input, output and conversion losses. The comparison page animates 100 supplied energy dots returning 80 or 92 under the model assumptions. Prediction prompts launch the actual pump and evening simulations after an answer.

Solar storage now features only sodium-ion. “Sunrise → night” starts at 06:00 in the hot-climate preset. The sun moves across the scene; stored energy supplies evening lights until reserve. The display separates the assumed 92% round-trip efficiency from temperature-related capacity derating. Neither number is a measured efficiency-vs-temperature curve. The product-specific CATL Naxtra operating-temperature statement is included as context, not as validation of the modeled pack.


## EV weather lab

A separate automotive engineering section evaluates hot (+45°C), cold (−20°C) and moderate (+25°C) ambient scenarios. City-EV recommendations include sodium-ion as a supplier-validated candidate in hot/cold scenarios, with mature alternatives; moderate city use selects LFP. Long-range scenarios prioritize NMC with thermal management. Lead-acid is compared but not recommended as the main modern passenger-EV traction chemistry.

An equal-60-kWh illustrative simulation includes cruising, higher traction power, charging to 80%, thermal-management on/off, cabin/pack energy demand, a moving vehicle and SOC graph. The full comparison addresses specific energy, power, charging, thermal behavior, safety, cycle life and vehicle performance. All model numbers are assumptions; manufacturer statements and links are separate. There is no empirical prediction of real range, safe charge limits, cooling transients or aging.


## Pack building, regenerative braking and BMS

The EV section includes a series/parallel pack builder using illustrative identical 100 Ah cells. Voltage, Ah, cell count and nominal energy update with each connection. Apply the chosen energy capacity to the EV simulation. The 108S2P example is conceptual; voltage-dependent inverter and motor behavior is not modeled.

A separate brake event computes kinetic-energy removal for a 1,600 kg vehicle, decelerating by 18 km/h per click. It accepts at most 65% normally or 10% in cold unmanaged mode, limited by battery headroom and simulated protection faults. The brake-event speed is a separate teaching scenario, not a longitudinal dynamics model for the cruise simulation. Full battery and faults block recovery.

Simulated overheat, high cell voltage and fault current open the modeled energy-transfer path. Unmanaged below-zero charging is blocked by a generic demo rule. These thresholds are illustrative, not safe operating limits. The demonstration cannot diagnose actual batteries.

## Power buffers

A separate section animates an electric double-layer ultracapacitor and a high-speed flywheel. The capacitor uses 100 F and 48 V (32 Wh maximum), and the rotor uses 0.02 kg·m² and 20,000 rpm (about 12.18 Wh). Stored energy determines displayed voltage or rpm. Both integrate electrical input/output with round-trip conversion efficiency assumptions. A braking pulse and boost pulse apply the same actual buffer model.

Illustrative comparison defaults: ultracapacitor 5 Wh/kg, 8,000 W/kg, 96% round-trip efficiency; flywheel 30 Wh/kg, 2,000 W/kg, 90%. These are not claims from a particular datasheet. Hold mode is ideal and omits leakage/bearing/standby loss. Rotor animation is slowed; containment, overspeed protection, gyroscopic effects and voltage converters are explained rather than engineered. The term ultraflywheel is interpreted as high-speed flywheel energy storage.

## Transparent EV journey

Power buffers now includes clickable installation of traction battery, inverter, motor/generator and buffer, followed by Build → Drive → Brake → Recharge. Driving consumes modeled traction-battery energy. Braking calculates kinetic energy from a 1,600 kg vehicle at 30 km/h, assumes 80% reaches the electrical converter, and stores input according to buffer conversion efficiency and remaining capacity. The boost delivers a short 1 kW motor-assist pulse, not full vehicle propulsion. Capacitor/flywheel switching retains the journey while resetting the selected buffer.

Flywheel idle/hold now loses energy exponentially at an explicitly illustrative 2% per simulated minute. RPM decreases with the square root of remaining energy. A one-minute standby experiment advances the actual model and records losses; capacitor leakage remains omitted. Automated checks cover the complete journey and standby energy balance. Browser visual verification remains pending.

## Interactive brake pedal

In **Power buffers**, install the four vehicle components and start driving. Set brake pressure, then hold **Hold to brake** with your mouse or touch, or focus it and hold Space/Enter. Higher pressure slows the vehicle faster and brightens the energy route into storage. Release to stop braking. Select **Accelerate** to deliver stored energy back to the motor. Both ultracapacitor and flywheel storage are demonstrated.

## Run automated checks

Use Node.js 22 or newer for the development dependencies:

```sh
npm ci
npm test
```

The suite contains 44 tests, including energy conservation, storage capacity limits, braking pressure, and releasing the pedal.
