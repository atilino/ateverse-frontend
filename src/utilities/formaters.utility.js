export const breakStringToArray = (string) => typeof string === 'string' ? string.split('\n').filter(line => line !== '') : string