import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export default function DataTable(props) {
    let [labels, setLabels] = useState(props.labels);
    let [values, setValues ]= useState(props.values);

    useEffect(() => {
        setLabels(props.labels);
        setValues(props.values);
    }, [props])
  return (
      <>
      {values ?
      <table class ="dataTable">
        <thead>
            <tr>
                {labels.map(label => <th key={label}>{label}</th>)}
            </tr>
        </thead>
        <tbody>
            <tr>
                {values.map(value => <td>{value}</td>)}
            </tr>
        </tbody>
    </table>: null}
      </>
    
  );
}

DataTable.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.array.isRequired
};
