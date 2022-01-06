const scale = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];

export function findDifference(chord1, chord2) {
    const index1 = scale.indexOf(chord1);
    const index2 = scale.indexOf(chord2);
    const difference = index2 - index1;
    //console.log(index1, index2, difference);
    return difference;
}

export function transpose(chordArray, difference) {
    const transposed = [];
    chordArray.forEach(chord => {
        // if (chord.length > 2) {
        //     if (chord.substring(1) !== '#' || chord.substring(1) !== 'b') {
        //         const fragment = chord.substring(1);
        //         chord = chord.substring(0, 1);
        //     } else {
        //         const fragment = chord.substring(2);
        //         chord = chord.substring(0, 2);
        //     }
        //     console.log(fragment);
        // } else if (chord.length > 1) {
        //     if (chord.substring(1) !== '#' || chord.substring(1) !== 'b') {
        //         const fragment = chord.substring(1);
        //         chord = chord.substring(0, 1);
        //     }
        // }
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
        //need to see if this can be done more efficiently, in only one if - 
        //maybe index for the # or b and split it on it? - so should work without checking the length
        let index;
        if (scale.indexOf(chord) + difference > scale.length) {
            index = scale.indexOf(chord) + difference - scale.length;
            //console.log(scale[index], index, 'was over the top of the list');
        } else if (scale.indexOf(chord) + difference < 0) {
            index = scale.indexOf(chord) + difference + scale.length;
            //console.log(scale[index], index, 'was under the bottom of the list');
        } else {
            index = scale.indexOf(chord) + difference;
            //console.log(scale[index], index, 'was within range');
        }
        //const index = (scale.indexOf(chord) + difference < scale.length) ? (scale.indexOf(chord) + difference) : (scale.indexOf(chord) + difference - scale.length);
        //probably should turn this into an if/else
        //transposed.push(scale[scale.indexOf(chord) + difference]);
        transposed.push(scale[index] + fragment);
    });
    console.log(transposed);
    return transposed;
}
//have to account for minors
//should account for mistaken lowercase letters too, maybe

const change = findDifference('A', 'E');
console.log(change);

transpose(['A', 'F', 'C', 'G'], change);

//have to find a way to combine these two into one function
//also have to add a UI or something to make it useful