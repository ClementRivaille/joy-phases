import { scaleNotes } from './scale'
import saveAs from 'file-saver'
import * as MidiWriter from 'midi-writer-js';

const DURATION = '16';

/** Generate and save MIDI */
export default function writeMidi(bpm, notes, sheet) {
  const tracks = {
    main: {
      track: new MidiWriter.Track(),
      delay: [],
      events: [],
      channel: 1,
    },
    phased: {
      track: new MidiWriter.Track(),
      delay: [],
      events: [],
      channel: 2
    }
  };
  tracks.main.track.setTempo(bpm);
  tracks.phased.track.setTempo(bpm);

  /* Add a note event or a delay to a track */
  function addNoteEvent(note, track, scale) {
    if (note !== -1) {
      // Add note event
      track.events.push(new MidiWriter.NoteEvent({
        pitch: [scale[note]],
        duration: DURATION,
        wait: track.delay,
        channel: track.channel
      }));
      track.delay = [];
    }
    // Otherwise, increase delay for next note
    else track.delay.push(DURATION);
  }

  // Browse sheet
  sheet.forEach((section, phaseIndex) => {
    // List of notes in the current scale
    const scale = scaleNotes(section.tonic, section.scale)

    // Repeat section four times
    for (let i = 0 ; i < 4 ; i++) {
      // Browse notes
      notes.forEach((note, noteIndex) => {
        // Main: plays the melody regularly
        addNoteEvent(note, tracks.main, scale);
        // Phased: plays notes with a shift
        const phasedNote = notes[(noteIndex + phaseIndex) % notes.length];
        addNoteEvent(phasedNote, tracks.phased, scale);
      });
    }
  }, []);

  // Write events
  tracks.main.track.addEvent(tracks.main.events);
  tracks.phased.track.addEvent(tracks.phased.events);

  // Save MIDI
  const writer = new MidiWriter.Writer([tracks.main.track, tracks.phased.track]);
  saveAs(writer.dataUri(), 'joy-phases-output.mid');
}
