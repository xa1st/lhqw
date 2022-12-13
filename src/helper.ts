export const utf82duo = (hex: Array<string>): string => {
  // 记录循环次数
  let odd: boolean = true;
  // 拿到循环最后的结果
  let ret: Array<string> = [];
  // 因为上一步的替换，一定会有一个行末空格造成多一个空数据，下一步直接不读他就好
  for (let i = 0; i < (hex.length - 1); i++) {
    // 临时容器
    let tmp: number = 0;
    if (13 == Number.parseInt(hex[i])) {
      // 这里读到高位的话，就连下一位一起读出来
      i++;
      tmp = Number.parseInt(hex[i]) + 13;
    } else {
      // 如果是低位，就直接读出来即可
      tmp = Number.parseInt(hex[i]);
    }
    ret.push((odd ? '%' : '') + tmp.toString(16).toUpperCase());
    odd = !odd;
  }
  return decodeURIComponent(ret.join(""));
}

export const duo2utf8 = (str: string): string => {
  // 提取属于ascii编码范围内的字符内容，直接换成16进制
  const str1:string = str.replace(/[A-Za-z0-9\-\_\.\!\~\*\'\(\)]/g, (s) :string => {
    return s.codePointAt(0)?.toString(16) || '';
  });
  // 把其余的值进行urlencode编码并去掉%号
  return encodeURIComponent(str1).replace(/%/g, "").toUpperCase();
}

export const trim = (str: string): string => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}