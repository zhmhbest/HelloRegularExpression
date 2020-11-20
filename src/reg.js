
/**
 * 原样匹配
 */
function getOriginString(s) {
    s = s.toString();
    const buffer = [];
    for (let ch of s) {
        switch (ch) {
            case '\t':
                buffer.push('\\t');
                break;
            case '\r':
                buffer.push('\\r');
                break;
            case '\n':
                buffer.push('\\n');
                break;
            case '[': case ']':
            case '(': case ')':
            case '{': case '}':
            case '^': case '$':
            case '.': case '|': case '\\':
            case '?': case '*': case '+':
                buffer.push('\\');
                buffer.push(ch);
                break;
            default:
                buffer.push(ch);
        }
    }
    return buffer.join(''); 
}

/**
 * 正则匹配
 */
function getRegExpString(r) {
    const s = r.toString();
    if (r instanceof RegExp) {
        // RegExp
        return s.substr(1, s.length - 2);
    } else {
        return s;
    }
}

function makeRegExp(values, flag) {
    const buffer = [];
    for (let item of values) {
        buffer.push(getRegExpString(item));
    }
    return new RegExp(buffer.join(''), flag);
}

function assertHead(r) { return `(?<=${getRegExpString(r)})` }
function assertTail(r) { return `(?=${getRegExpString(r)})` }
function assertNotHead(r) { return `(?<!${getRegExpString(r)})` }
function assertNotTail(r) { return `(?!${getRegExpString(r)})` }
function orCommand(/* ... */) {
    let values = Object.values(arguments);
    for (let i=0; i<values.length; i++) {
        values[i] = getRegExpString(values[i]);
    }
    return `(${values.join('|')})`;
}
function joinCommand() {
    let values = Object.values(arguments);
    for (let i = 0; i < values.length; i++) {
        values[i] = getRegExpString(values[i]);
    }
    return values.join('');
}


const reg = {
    make: makeRegExp,
    reg: getRegExpString,
    str: getOriginString,

    isH: assertHead,
    isT: assertTail,
    isnH: assertNotHead,
    isnT: assertNotTail,

    join: joinCommand,
    or: orCommand
};

const common = {
    CrLf: reg.or(/\r\n/, /\n/, /\r/),
    Space: reg.reg(/[\t ]/),
    Spaces: reg.reg(/[\t ]*?/),
    AnyChar: reg.reg(/[\s\S]/),
    AnyChars: reg.reg(/[\s\S]*?/),
};

module.exports = { ...reg, ...common};
