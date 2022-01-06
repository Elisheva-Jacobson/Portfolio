const scale = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];

export function findDifference(chord1, chord2) {
    const index1 = scale.indexOf(chord1);
    const index2 = scale.indexOf(chord2);
    const difference = index2 - index1;
    return difference;
}

export function transpose(chordArray, difference) {
    const transposed = [];
    chordArray.forEach(chord => {
        let fragment = '';
        if (chord.length > 1) {
            if (chord.substring(1) !== '#' && chord.substring(1) !== 'b') {
                fragment = chord.substring(1);
                chord = chord.substring(0, 1);
            } else if (chord.length > 2) {
                fragment = chord.substring(2);
                chord = chord.substring(0, 2);
            }
        }
        console.log('chord', chord);
        console.log(fragment);
        let index;
        if (scale.indexOf(chord) + difference > scale.length) {
            index = scale.indexOf(chord) + difference - scale.length;
        } else if (scale.indexOf(chord) + difference < 0) {
            index = scale.indexOf(chord) + difference + scale.length;
        } else {
            index = scale.indexOf(chord) + difference;
        }
        transposed.push(scale[index] + fragment);
    });
    console.log(transposed);
    return transposed;
}

const change = findDifference('A', 'E');
console.log(change);

transpose(['A', 'F', 'C', 'G'], change);