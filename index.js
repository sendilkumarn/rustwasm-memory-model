const bytes = await fetch("target/wasm32-unknown-unknown/debug/memory_world.wasm");
const response = await bytes.arrayBuffer();
const result = await WebAssembly.instantiate(response, {});
result.exports.memory_to_js();
const memObj = new UInt8Array(result.exports.memory.buffer, 0).slice(0, 1);
console.log(memObj[0]); // 13


const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });
const instance = await WebAssembly.instantiate(response, { js: { mem: memory } });
const s = new Set([1, 2, 3]);
let jsArr = Uint8Array.from(s);
const len = jsArr.length;
let wasmArrPtr = instance.exports.malloc(length);
let wasmArr = new Uint8Array(instance.exports.memory.buffer, wasmArrPtr, len);
wasmArr.set(jsArr);

const sum = instance.exports.accumulate(wasmArrPtr, len);
console.log(sum);