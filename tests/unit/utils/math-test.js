import { isNumeric } from '../../../utils/math';
import { module, test } from 'qunit';

module('Unit | Utility | math');

test('isNumeric with integer literals', function (assert) {

  assert.ok(isNumeric("-10"), "Negative integer string");
  assert.ok(isNumeric("0"), "Zero string");
  assert.ok(isNumeric("5"), "Positive integer string");
  assert.ok(isNumeric(-16), "Negative integer number");
  assert.ok(isNumeric(0), "Zero integer number");
  assert.ok(isNumeric(32), "Positive integer number");
  assert.ok(isNumeric("040"), "Octal integer literal string");
  assert.ok(isNumeric(0144), "Octal integer literal");
  assert.ok(isNumeric("0xFF"), "Hexadecimal integer literal string");
  assert.ok(isNumeric(0xFFF), "Hexadecimal integer literal");

});

test('isNumeric with floting-point literals', function (assert) {

  assert.ok(isNumeric("-1.6"), "Negative floating point string");
  assert.ok(isNumeric("4.536"), "Positive floating point string");
  assert.ok(isNumeric(-2.6), "Negative floating point number");
  assert.ok(isNumeric(3.1415), "Positive floating point number");
  assert.ok(isNumeric(8e5), "Exponential notation");
  assert.ok(isNumeric("123e-2"), "Exponential notation string");

});

test('isNumeric with non-numeric values', function (assert) {

  assert.ok(!isNumeric(""), "Empty string");
  assert.ok(!isNumeric("        "), "Whitespace characters string");
  assert.ok(!isNumeric("\t\t"), "Tab characters string");
  assert.ok(!isNumeric("abcdefghijklm1234567890"), "Alphanumeric character string");
  assert.ok(!isNumeric("xabcdefx"), "Non-numeric character string");
  assert.ok(!isNumeric(true), "Boolean true literal");
  assert.ok(!isNumeric(false), "Boolean false literal");
  assert.ok(!isNumeric("bcfed5.2"), "Number with preceding non-numeric characters");
  assert.ok(!isNumeric("7.2acdgs"), "Number with trailling non-numeric characters");
  assert.ok(!isNumeric(undefined), "Undefined value");
  assert.ok(!isNumeric(null), "Null value");
  assert.ok(!isNumeric(NaN), "NaN value");
  assert.ok(!isNumeric(Infinity), "Infinity primitive");
  assert.ok(!isNumeric(Number.POSITIVE_INFINITY), "Positive Infinity");
  assert.ok(!isNumeric(Number.NEGATIVE_INFINITY), "Negative Infinity");
  assert.ok(!isNumeric(new Date(2009, 1, 1)), "Date object");
  assert.ok(!isNumeric(new Object()), "Empty object");
  assert.ok(!isNumeric(function () {
  }), "Instance of a function");

});
