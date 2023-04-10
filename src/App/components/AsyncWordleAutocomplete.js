/**
 * Most of the hard work of an autocomplete component seems like it will be handled by material UI and the demo shown here:
 * https://refine.dev/blog/material-ui-autocomplete-component/#asynchronous-requests
 * 
 * That demo only makes an API call right at the start, we need to modify it to make calls on input change.
 */

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchWordleAutocomplete } from '../netRequests';

const DEBOUNCE_TIMER = 500; // 1s

// managing state
export default function AsyncWordleAutocomplete() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(undefined);
  const [options, setOptions] = useState([]); // Which options are available in the dropdown
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const input = inputValue;
    setLoading(true);
    setError(undefined);
    const getData = setTimeout(() => {
      fetchWordleAutocomplete(input).then((results) => {
        setOptions(results);
      }).catch((reason) => {
        setError(reason.error || "An Unknown Error Occured");
      }).finally(() => {
        setLoading(false);
      });
    }, DEBOUNCE_TIMER);
    return () => clearTimeout(getData);
  }, [inputValue])

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Rendering our parameters on the DOM
  return (
    <>
      <Autocomplete
        sx={{ width: 300, margin: "auto" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onInputChange={(_event, value) => {
          setInputValue(value);
        }}
        isOptionEqualToValue={(option, value) => {
          if (value === undefined) { return true; }
          return option?.title === (value?.title ?? value)?.toString()
        }}
        getOptionLabel={(option) => option?.title ?? option}
        options={options}
        loading={loading}
        freeSolo={true} // Allow arbitrary values
        renderInput={(params) => (
          <TextField
            {...params}
            label="Find wordle word"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {error && loading ? <p>Error</p> : null}
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {<div className="errorText">{error}</div>}
    </>
  );
}