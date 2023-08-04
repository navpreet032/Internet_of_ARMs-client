/**
 * Maps a value from one range to another.
 * @param {number} x - The value to be mapped.
 * @param {number} in_min - The lower bound of the input range.
 * @param {number} in_max - The upper bound of the input range.
 * @param {number} out_min - The lower bound of the output range.
 * @param {number} out_max - The upper bound of the output range.
 * @returns {number} The mapped value.
 */
export function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;}

