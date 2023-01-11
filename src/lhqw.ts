// 连花清瘟加解密类
class Core {

  // 当前版本
  readonly VERSION:string = "2.0.4";

  // 密钥默认分割符
  readonly Spt:string = "引"; 

  // 负号表示字符
  readonly Sign:string = "配";

  readonly Step:number = 2;
  
  // 创建要用到加密的串,连花清瘟的配方一共14位药
  keys: Array<string> = ["连翘", "银花", "麻黄", "苦杏仁", "石膏", "板蓝根", "贯众", "鱼腥草", "红景天", "薄荷脑", "藿香", "大黄", "甘草", "淀粉"];
  
  // 随机的密钥序号，因为是16进制(16个数) - 当前字典长度，直接口算一下
  keyInd: number = 2;

  // 初始化类
  constructor () {}

  // 加密方法
  encode(str:string): string {
    // 不加密空串
    str = this._trim(str);
    if (str.length < 1) return '';
    // 这里生成默认的密钥索引，因为一共是0-13，但是因为是16转14，最小值应该至少是2
    this.keyInd = Math.floor(Math.random() * 11) + this.Step;
    // 用于装载转换后的utf8串
    let strUtf8:string = "";
    for(let s of str) {
      // 如果这些值在ascii范围，则直接转换
      if (s.charCodeAt(0) < 128 && s.charCodeAt(0) > 15) {
        strUtf8 += s.codePointAt(0)?.toString(16) || '';
      } else {
        // 否则则为UTF8
        strUtf8 += encodeURIComponent(s).replace(/%/g, "").toUpperCase()
      }
    }
    // 装编码后数字的数组
    let ret: string = "";
    // 将上一步得到的去掉%号的UTF8串分位进行计算
    for (let ind of strUtf8) {
      // 把每一位上的字符都按16进制转换成10进制
      const n: number = Number.parseInt(ind, 16) - this.keyInd;
      // 这里用每个数字减去当前随机生成的密钥值，然后记录起来
      // 小于0的时候直接表示负号，那么拿到这值必然是负数
      if (n < 0) ret += this.Sign;
      ret += this.keys[Math.abs(n)];
    }
    
    // 然后把这些连起来，就是我们要的加密串啦
    return this.keys[this.keyInd] + this.Spt + ret;
  }

  // 解密方法
  decode(str:string): string {
    // 这里不解密空串
    str = this._trim(str);
    if (str.length < 1 || str.indexOf(this.Spt) < 0) return '';
    // 因为密钥不定长，所以用所有密钥来替换一次值中的串，把对应的值换上去，拆出结果来
    // 拿出头来
    let strArr:Array<string> = str.split(this.Spt);
    if (strArr.length < 1) return "";
    // 查找到当前的key
    this.keyInd = this.keys.indexOf(strArr[0]);
    if (this.keyInd < 0) return "";
    // 注册一下正则
    let reg:RegExp;
    // 然后进行替换
    for (let key in this.keys) {
      reg = new RegExp(this.keys[key], "g");
      strArr[1] = strArr[1].replace(reg, key + ',');
    }
    // 替换掉所有负号
    reg = new RegExp(this.Sign, "g");
    strArr[1] = strArr[1].replace(reg, "-");
    // 去掉末尾的空格
    strArr[1] = strArr[1].substring(0, strArr[1].lastIndexOf(','));
    // 拆分上面的字符串，然后拆成一个数字的数组
    let hex: Array<string> = strArr[1].split(',');
    // 标记
    let odd: boolean = true;
    // 用于装结果
    let ret: string = "";
    // 在这里直接开始把值转换好
    for (let i = 0; i < hex.length; i++) {
      ret += (odd ? '%' : '') + (Number.parseInt(hex[i]) + this.keyInd).toString(16).toUpperCase();
      odd = !odd;
    }
    // 返回结果
    return decodeURIComponent(ret);
  }
  _trim(str:string):string {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
}
export default Core;