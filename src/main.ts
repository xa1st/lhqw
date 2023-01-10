import Core from './lhqw';

// 获取上面的输入框内容
let encodeEle: HTMLInputElement = <HTMLInputElement>document.getElementById('sAreaText');

// 获取下面的输入框内容
let decodeEle: HTMLInputElement = <HTMLInputElement>document.getElementById('tAreaText'); 

// 编码按钮
let encodeBtn: HTMLElement = <HTMLElement>document.getElementById('encode');

// 解码按钮
let decodeBtn: HTMLElement = <HTMLElement>document.getElementById('decode');

// 引用核心库
const core:Core = new Core();

// 编码点击事件
encodeBtn.addEventListener('click', (e:Event) => {
  // 获取值
  let value = encodeEle?.value || '';
  if (value.length < 1) return;
  // 目标对象
  let targetEle: HTMLInputElement = <HTMLInputElement>document.getElementById('tAreaText');
  targetEle.value = core.encode(value) || ''
});

// 解码点击事件
decodeBtn.addEventListener('click', (e:Event) => {
  // 获取值
  let value = decodeEle?.value || '';
  if (value.length < 1) return;
  // 目标对象
  let targetEle: HTMLInputElement = <HTMLInputElement>document.getElementById('sAreaText');
  targetEle.value= core.decode(value) || '';
});

// 点击全选
encodeEle.addEventListener('dblclick',  (e:Event) => {
  encodeEle.select();
});

// 点击全选
decodeEle.addEventListener('dblclick',  (e:Event) => {
  decodeEle.select();
});

console.log("当前版本:", core.VERSION);

