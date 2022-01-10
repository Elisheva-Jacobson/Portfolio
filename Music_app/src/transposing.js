const scale = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];

export function findDifference(chord1, chord2) {
    try {
        [chord1] = dealWithMinors(chord1);
        [chord2] = dealWithMinors(chord2);
        const index1 = scale.indexOf(chord1);
        const index2 = scale.indexOf(chord2);
        if (index1 === -1 || index2 === -1) {
            throw new Error('Invalid input');
        }
        const difference = index2 - index1;
        return difference;
    } catch (err) {
        //console.log(err);
        return err;
    }
}

function dealWithMinors(chord) {
    let fragment = '';
    if (chord.length > 1) {
        if (chord.substring(1, 2) !== '#' && chord.substring(1, 2) !== 'b') {
            fragment = chord.substring(1);
            chord = chord.substring(0, 1);
        } else if (chord.length > 2) {
            fragment = chord.substring(2);
            chord = chord.substring(0, 2);
        }
    }
    return [chord, fragment];
}

export function transpose(chordArray, difference) {
    try {
        if (typeof(difference) != typeof(1)) {
            // console.log(typeof difference);
            throw new Error('Invalid transposition');
        }
        const transposed = [];
        chordArray.forEach(chord => {
            let fragment;
            [chord, fragment] = dealWithMinors(chord);
            let index;
            if (scale.indexOf(chord) !== -1) {
                if (scale.indexOf(chord) + difference > scale.length) {
                    index = scale.indexOf(chord) + difference - scale.length;
                } else if (scale.indexOf(chord) + difference < 0) {
                    index = scale.indexOf(chord) + difference + scale.length;
                } else {
                    index = scale.indexOf(chord) + difference;
                }
                transposed.push(scale[index] + fragment);
            } else {
                // console.log('error', scale.indexOf(chord));
                transposed.push('Unfound');
            }


        });
        //console.log(transposed);
        return transposed;
    } catch(err) {
        return err;
    }
    
}
//need to deal with alternative names for #s and bs

const change = findDifference('A', 'E');
console.log(change);

transpose(['A', 'F', 'C', 'G'], change);