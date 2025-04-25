function parseJSON(jsonString) {
    var i = 0;

    // Helper function to skip white spaces
    function skipWhitespace() {
        while (i < jsonString.length && /\s/.test(jsonString[i])) {
            i++;
        }
    }

    // Parse an object
    function parseObject() {
        var obj = {};
        i++; // skip '{'
        skipWhitespace();

        if (jsonString[i] === '}') {
            i++; // empty object '{}'
            return obj;
        }

        while (i < jsonString.length) {
            skipWhitespace();

            var key = parseString();
            skipWhitespace();

            if (jsonString[i] !== ':') {
                throw new SyntaxError('Expected colon after key');
            }
            i++; // skip ':'
            skipWhitespace();

            var value = parseValue();
            obj[key] = value;

            skipWhitespace();

            if (jsonString[i] === '}') {
                i++; // close object
                break;
            }

            if (jsonString[i] !== ',') {
                throw new SyntaxError('Expected comma or closing brace');
            }
            i++; // skip ','
        }

        return obj;
    }

    // Parse an array
    function parseArray() {
        var arr = [];
        i++; // skip '['
        skipWhitespace();

        if (jsonString[i] === ']') {
            i++; // empty array '[]'
            return arr;
        }

        while (i < jsonString.length) {
            skipWhitespace();

            var value = parseValue();
            arr.push(value);

            skipWhitespace();

            if (jsonString[i] === ']') {
                i++; // close array
                break;
            }

            if (jsonString[i] !== ',') {
                throw new SyntaxError('Expected comma or closing bracket');
            }
            i++; // skip ','
        }

        return arr;
    }

    // Parse a value (string, number, object, array, true, false, null)
    function parseValue() {
        skipWhitespace();

        if (jsonString[i] === '"') {
            return parseString();
        }

        if (jsonString[i] === '{') {
            return parseObject();
        }

        if (jsonString[i] === '[') {
            return parseArray();
        }

        if (jsonString[i] === 't') {
            return parseTrue();
        }

        if (jsonString[i] === 'f') {
            return parseFalse();
        }

        if (jsonString[i] === 'n') {
            return parseNull();
        }

        if (/[0-9-]/.test(jsonString[i])) {
            return parseNumber();
        }

        throw new SyntaxError('Unexpected character: ' + jsonString[i]);
    }

    // Parse a string (must start and end with double quotes)
    function parseString() {
        var str = '';
        i++; // skip opening '"'

        while (i < jsonString.length && jsonString[i] !== '"') {
            if (jsonString[i] === '\\') {
                i++; // skip backslash
                if (jsonString[i] === '"') {
                    str += '"';
                } else if (jsonString[i] === '\\') {
                    str += '\\';
                } else {
                    throw new SyntaxError('Unexpected escape character: ' + jsonString[i]);
                }
            } else {
                str += jsonString[i];
            }
            i++;
        }

        i++; // skip closing '"'
        return str;
    }

    // Parse a number
    function parseNumber() {
        var numStr = '';
        while (i < jsonString.length && /[0-9.-]/.test(jsonString[i])) {
            numStr += jsonString[i];
            i++;
        }
        return Number(numStr);
    }

    // Parse true
    function parseTrue() {
        if (jsonString.slice(i, i + 4) === 'true') {
            i += 4;
            return true;
        }
        throw new SyntaxError('Expected true');
    }

    // Parse false
    function parseFalse() {
        if (jsonString.slice(i, i + 5) === 'false') {
            i += 5;
            return false;
        }
        throw new SyntaxError('Expected false');
    }

    // Parse null
    function parseNull() {
        if (jsonString.slice(i, i + 4) === 'null') {
            i += 4;
            return null;
        }
        throw new SyntaxError('Expected null');
    }

    // Start parsing the value at the beginning of the string
    return parseValue();
}