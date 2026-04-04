import latinise from 'voca/latinise';

function exists(text: string, search: string): boolean {
  if (typeof search === 'object') {
    return false;
  }

  const latinisedText = latinise(text);
  const latinisedSearch = latinise(search);

  const loweredCaseText = latinisedText.toLowerCase();
  const loweredCaseSearch = latinisedSearch.toLowerCase();

  return loweredCaseText.includes(loweredCaseSearch);
}

export {exists as existsForAutocomplete}
