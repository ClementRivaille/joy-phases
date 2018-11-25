import teoria from 'teoria';

/** Calculate notes on two octaves from a scale
 * @param {string} tonic
 * @param {string} scale
 * @returns {string[]} notes in scientific notation
 */
export function scaleNotes(tonic, scale) {
  let notes = teoria.scale(tonic + '4', scale).notes();
  notes = notes.concat(notes.map(note => note.interval('P8')));
  notes.push(notes[7].interval('P8'));
  return notes.map(note => note.scientific());
}
