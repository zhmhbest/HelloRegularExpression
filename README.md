# HelloRegularExpression

>[参考资料](https://deerchao.cn/tutorials/regex/regex.htm)

```js
// Javascript
String.prototype.testMatch = function (reg) {
    //# /reg/  : 匹配一次
    //# /reg/g : 重复匹配
    console.log(this.replace(reg, s => {
        let buf = [];
        for(let i=0; i<s.length; i++) buf.push('■');
        return buf.join('');
    }));
};
```

## 特殊符号

| 符号 | 含义 |
| -: | :- |
| `.`                | 匹配任意一个字符 |
| `\.`               | 匹配一个`.` |
| `\\`               | 匹配一个`\` |
| `^`                | 匹配**字符串开头**的位置 |
| `$`                | 匹配**字符串结尾**的位置 |
| `\b`               | 匹配单词的**开头**或**结尾**的位置 |
| `\B`               | 匹配一个不是（单词的**开头**或**结尾**）的位置 |
| `\s`               | 匹配一个**空白**（Space、`\t`、`\r`、`\n`、`\v`、`\f`） |
| `\S`               | 匹配一个**不是空白**的字符 |
| `\d`               | 匹配一个**数字** |
| `[0-9]`            | 匹配一个**数字** |
| `\D`               | 匹配一个**不是数字**的字符 |
| `\w`               | 匹配一个**字母**或**数字**或**下划线** |
| `[0-9,a-z,A-Z,_]`  | 匹配一个**字母**或**数字**或**下划线** |
| `\W`               | 匹配一个**不是字母**且**不是数字**且**不是下划线**的字符 |
| `[^0-9,a-z,A-Z,_]` | 匹配一个**不是字母**且**不是数字**且**不是下划线**的字符 |

```js
// Javascript
  'I love learning'.testMatch(/./g);
// ■■■■■■■■■■■■■■■

  'I love learning'.testMatch(/^\w/g);
// ■ love learning

  'I love learning'.testMatch(/\w$/g);
// I love learnin■

  'I love learning'.testMatch(/\b\w+\b/g);
// ■ ■■■■ ■■■■■■■■

  'I love learning'.testMatch(/\s/g);
// I■love■learning

  'I love learning'.testMatch(/\S/g);
// ■ ■■■■ ■■■■■■■■
```

## 重复匹配

| 符号 | 含义 |
| -: | :- |
| `?`  | 重复`0`或`1`次（尽可能多） |
| `*`  | 重复`0`或`∞`次（尽可能多） |
| `+`  | 重复`1`或`∞`次（尽可能多） |
| &nbsp; | &nbsp; |
| `??` | 重复`0`或`1`次（尽可能少） |
| `*?` | 重复`0`或`∞`次（尽可能少） |
| `+?` | 重复`1`或`∞`次（尽可能少） |
| &nbsp; | &nbsp; |
| `{n}`    | 重复`n`次 |
| `{n,}`   | 重复`n`或`∞`次（尽可能多） |
| `{n,m}`  | 重复`n`到`m`次（尽可能多） |
| `{n,}?`  | 重复`n`或`∞`次（尽可能少） |
| `{n,m}?` | 重复`n`到`m`次（尽可能少） |

```js
// Javascript
  '___###___###___'.testMatch(/#{3}/g);
// ___■■■___■■■___

  '___###___###___'.testMatch(/#{2,}/g);
// ___■■■___■■■___

  '___###___###___'.testMatch(/#{2,}?/g);
// ___■■#___■■#___

  '___###___###___'.testMatch(/#{2}/g);
// ___■■#___■■#___
```

## 多条件匹配

| 表达式 | 含义 |
| -: | :- |
| `[abc]`     | 匹配一个字符`a`或`b`或`c` |
| `[a-c]`     | 匹配一个字符`a`或`b`或`c` |
| `[a-c,0-2]` | 匹配一个字符`a`或`b`或`c`或`0`或`1`或`2` |
| `[^abc]`     | 匹配一个不是（字符`a`或`b`或`c`）的字符 |
| `[^a-c]`     | 匹配一个不是（字符`a`或`b`或`c`）的字符 |
| `[^a-c,0-2]` | 匹配一个不是（字符`a`或`b`或`c`或`0`或`1`或`2`）的字符 |
| `#{3}|@{3}`  | 匹配`###`或`@@@` |

```js
// Javascript
  '___012___ABC___abc___'.testMatch(/[abc]/g);
// ___012___ABC___■■■___

  '___012___ABC___abc___'.testMatch(/[^abc]/g);
// ■■■■■■■■■■■■■■■abc■■■

  '___012___ABC___abc___'.testMatch(/[0-2]/g);
// ___■■■___ABC___abc___

  '___012___ABC___abc___'.testMatch(/[a-c,0-2]/g);
// ___■■■___ABC___■■■___

  '___###___@@@___'.testMatch(/#{3}|@{3}/g);
// ___■■■___■■■___

  '___###___@@@___'.testMatch(/#{2,}|@{2,}/g);
// ___■■■___■■■___
```

## 分组匹配

| 表达式 | 含义 |
| -: | :- |
| `(?#comment)`           | 注释 |
| `(expression)`          | 成组匹配 |
| `(?<gname>expression)`  | 入栈，自定义组名 |
| `(?<-gname>)`           | 出栈 |
| `(?(gname)y_exp|n_exp)` | 存在组`gname`匹配y_exp，否则匹配n_exp |
| `\number`               | 后向引用，重复匹配**已确定**的组内容 |
| `\k<gname>`             | 后向引用，重复匹配**已确定**的组内容 |

```js
// Javascript
  '192.168.1.100'.testMatch(/\d{1,3}\./);
// ■■■■168.1.100

  '192.168.1.100'.testMatch(/(\d{1,3}\.){3}/);
// ■■■■■■■■■■100

  'I am who I am'.testMatch(/(I) (am) who \1 \2/);
// ■■■■■■■■■■■■■

  'I am who I am'.testMatch(/(?<name>I am) who \k<name>/);
// ■■■■■■■■■■■■■
```

## 零宽断言

>两个**正向断言**是先把内容匹配出来，再看匹配的内容开头或结尾是否满足断言；
>两个**负向断言**是在匹配完成后，再看未匹配的位置前后是否满足断言。
>**断言内容都不被包含在匹配的内容里面。**

| 表达式 | 含义 |
| -: | :- |
| `(?<=exp)expression` | 零宽度正回顾后发断言，开头包含`exp` |
| `expression(?=exp)`  | 零宽度正预测先行断言，结尾包含`exp` |
| `(?<!exp)expression` | 零宽度负回顾后发断言，开头不包含`exp` |
| `expression(?!exp)`  | 零宽度负预测先行断言，结尾不包含`exp` |

```js
// Javascript
// a开头
  'I am singing while you are dancing'.testMatch(/(?<=\ba)\w+\b/g);
// I a■ singing while you a■■ dancing

// ing结尾
  'I am singing while you are dancing'.testMatch(/\b\w+(?=ing\b)/g);
// I am ■■■■ing while you are ■■■■ing

// 不以$开头
  '$count++; echo $count'.testMatch(/(?<!\$)\b\w+\b/g);
// $count++; ■■■■ $count

// 不以++结尾
  '$count++; echo $count'.testMatch(/\b\w+\b(?!\+\+)/g);
// $count++; ■■■■ $■■■■■
```
