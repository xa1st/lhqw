// 连花清瘟加解密类
import {utf82duo, duo2utf8, trim} from "./helper";

class Core {
  // 创建要用到加密的串,连花清瘟的配方一共14位药
  keys: Array<string> = ["连翘", "银花", "麻黄", "苦杏仁", "石膏", "板蓝根", "贯众", "鱼腥草", "红景天", "薄荷脑", "藿香", "大黄", "甘草", "淀粉"];
  
  // 初始化类
  constructor () {}

  // 加密方法
  encode(str:string): string {
    // 不加密空串
    str = trim(str);
    if (str.length < 1) return '';
    // 转成不带%号的utf8串
    str = duo2utf8(str);
    // 装编码后数字的数组
    const duo: Array<string> = [];
    // 将上一步得到的去掉%号的UTF8串分位进行计算
    for (let ind of str) {
      // 把每一位上的字符都按16进制转换成10进制
      const n: number = Number.parseInt(ind, 16);
      // 此处算法
      // 因为keys一共有14位（0-13），预留最后一位做为大于14的数字的高位，来装载14和15的高位
      // 因为此处的数字是上一步传来的 0-F 即0-15，1共16个数，所以取出前14个，即0-13做为1位，只用1个串替换
      // 大于13的，14和15，就用预留的最后一位做高位，低位用一个自己规定的序号 值 - 13 来替代
      // 解密的时候，只要见到 n = 14 那么，一定是2位，再往后读一位进行还原即可
      if (n < 13) {
        // 不大于13的值，直接
        duo.push(this.keys[n]);
      } else {
        // 做高位
        duo.push(this.keys[13]);
        // 低位用自己规定的值
        duo.push(this.keys[n - 13]);
      }
    }
    // 然后把这些连起来，就是我们要的加密串啦
    return duo.join("");
  }

  // 解密方法
  decode(str:string): string {
    // 这里不解密空串
    str = trim(str);
    if (str.length < 1) return '';
    // 因为密钥不定长，所以用所有密钥来替换一次值中的串，把对应的值换上去，拆出结果来
    for (let key in this.keys) {
      let reg:RegExp = new RegExp(this.keys[key], "g");
      str = str.replace(reg, key + ',');
    }
    // 拆分上面的字符串，然后拆成一个数字的数组
    let hex: Array<string> = str.split(',');
    // 返回结果
    return utf82duo(hex);
  }
}
export default Core;