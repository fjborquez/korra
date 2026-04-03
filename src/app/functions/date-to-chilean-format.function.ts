function convert(date: string) {
  return date.split('-').reverse().join('/');
}

export {convert as dateToChileanFormat}
