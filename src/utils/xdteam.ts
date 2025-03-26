/**
 * 根据现在时间返回文本
 * @param str
 * @returns 返回
 */
export function getCurrentTimePeriod(): string {
  const currentTime: Date = new Date();
  const currentHour: number = currentTime.getHours();

  if (currentHour >= 0 && currentHour < 5) {
    return "凌晨";
  } else if (currentHour >= 5 && currentHour < 12) {
    return "上午";
  } else if (currentHour >= 12 && currentHour < 15) {
    return "中午";
  } else if (currentHour >= 15 && currentHour < 18) {
    return "下午";
  } else {
    return "晚上";
  }
}

/**
 * 检查一个字符串是否只包含数字，不含小数点
 * @param str
 * @returns 返回
 */
export function isNumeric(str) {
  return /^\d+$/.test(str);
}

/**
 * 根据后缀名返回vscode的主题
 * @param type
 * @returns
 */
export function get_CodeType(type: string) {
  switch (type) {
    case ".json":
      return "json";
    case ".yaml":
    case ".yml":
      return "yaml";
    case ".xml":
      return "xml";
    case ".php":
      return "php";
    case ".sql":
      return "sql";
    case ".html":
    case ".htm":
      return "html";
    case ".js":
      return "javascript";
    case ".py":
      return "python";
    case ".css":
      return "css";
    case ".sh":
      return "shell";
    case ".toml":
      return "toml";
    case ".md":
      return "markdown";
    default:
      return "plaintext";
  }
}

/**
 * 生成a到b之间的随机整数（包括a和b）
 * @param a
 * @param b
 * @returns
 */
export function getRandomIntInclusive(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * 生成特定数量密匙：
 * @param numStrings 生成数量
 * @param length 长度
 * @returns
 */
export function GetSkeys(numStrings: number = 1, length: number = 12): string {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/,.|";
  let result: string = "";

  for (let j = 0; j < numStrings; j++) {
    let randomString: string = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    result += randomString + "\n";
  }

  return result;
}

/**
 * 生成特定数量密匙：
 * @param mode 模式，1：大写，2：小写，3：混合
 * @param length 长度
 * @returns
 */
export function generateRandomLetters(
  mode: 1 | 2 | 3,
  length: number = 6
): string {
  let characters: string;
  switch (mode) {
    case 1: // 大写
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;
    case 2: // 小写
      characters = "abcdefghijklmnopqrstuvwxyz";
      break;
    case 3: // 混合
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      break;
    default:
      throw new Error(
        "Invalid mode. Please choose 1 for uppercase, 2 for lowercase, or 3 for mixed."
      );
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * 判断时间是否过期的函数
 * @param old_time
 * @returns
 */
export function isExpired(old_time) {
  // 设置过期时间，比如一天
  const expirationTime = 1 * 1000; // 1秒的时间（以毫秒为单位）
  // 获取当前时间
  const currentTime = new Date().getTime();

  // 计算过期时间点
  const expirationDate = new Date(old_time).getTime() + expirationTime;
  // 判断是否过期
  return currentTime > expirationDate;
}

/**
 * 判断字符串是否可以被json格式化
 * @param str 输入字符串
 * @returns 如果字符串是有效的 JSON 格式，则返回 true；否则返回 false
 */
export function isValidJson(str: any): boolean {
  // 验证输入是否为字符串类型
  if (typeof str !== "string" || str.trim() === "") {
    return false; // 非字符串或空字符串直接返回 false
  }

  try {
    JSON.parse(str); // 尝试解析 JSON
    return true; // 如果解析成功，返回 true
  } catch (error) {
    // 捕获解析错误并返回 false
    // 可以根据需求记录 error 信息
    console.log(error);
    return false;
  }
}
