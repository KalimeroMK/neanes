import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { describe, expect, it } from 'vitest';

import {
    ModeKeyElement,
    NoteElement,
    ScoreElement,
    TempoElement,
} from '../../models/Element';
import {
    Accidental,
    Fthora,
    Note,
    QuantitativeNeume,
} from '../../models/Neumes';
import { Scale, ScaleNote } from '../../models/Scales';
import { PlaybackOptions, PlaybackService } from './PlaybackService';

function getModeKey(
    mode: number,
    scale: Scale,
    scaleNote: ScaleNote,
    options?: Partial<ModeKeyElement>,
) {
    const element = new ModeKeyElement();
    element.mode = mode;
    element.scale = scale;
    element.scaleNote = scaleNote;

    if (options) {
        Object.assign(element, options);
    }

    return element;
}

function getNote(base: QuantitativeNeume, options?: Partial<NoteElement>) {
    const element = new NoteElement();
    element.quantitativeNeume = base;

    if (options) {
        Object.assign(element, options);
    }

    return element;
}

function getDefaultWorkspaceOptions() {
    return {
        diatonicIntervals: [12, 10, 8],
        hardChromaticIntervals: [6, 20, 4],
        softChromaticIntervals: [8, 14, 8],
        legetosIntervals: [8, 10, 12],
        useLegetos: false,
    } as any;
}

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('OxeiaPlayback', () => {
    it('should play the 12-10-8 diatonic scale using Oxeia', () => {
        const service = new PlaybackService();

        const options = getDefaultWorkspaceOptions();
        options.diatonicIntervals = [12, 10, 8];

        const elements: ScoreElement[] = [];

        elements.push(getModeKey(1, Scale.Diatonic, ScaleNote.VouLow));
        elements.push(getNote(QuantitativeNeume.Ison));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));
        elements.push(getNote(QuantitativeNeume.Oxeia));

        const events = service.computePlaybackSequence(elements, options, true);
        const expectedFrequencies = [
            80.84, 87.31, 98, 110, 121.12, 130.81, 146.83, 161.67, 174.62, 196, 220,
            242.24, 261.63, 293.67, 323.35, 349.23, 392, 440.01,
        ];

        expect(events.map((x) => x.frequency)).toBeDeepCloseTo(
            expectedFrequencies,
            2,
        );
    });
});
