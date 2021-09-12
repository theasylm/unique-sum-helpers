import { combinations as generateCombos}  from './combinations.js';
import { allCombos } from './allCombos.js';
const combinations = generateCombos([1,2,3,4,5,6,7,8,9]).map(e => e.join(''));

export const sumOfDigits = function(s){
  let sum = 0;
  for ( let x=0; x < s.length; x++ ){
    sum += parseInt(s[x]);
  }
  return sum;
}

const filterIncluded = function(included) {
  return function(e) {
    for ( let x in included ){
      if ( e.indexOf(included[x]) < 0 )  {
        return false;
      }
    }
    return true;
  }
}

const filterExcluded = function(excluded) {
  return function(e) {
    for ( let x in excluded ){
      if ( e.indexOf(excluded[x]) > -1 ) {
        return false;
      }
    }
    return true;
  }
}

const sizeSort = function(a,b) {
  let aSum = sumOfDigits(a)
  let bSum = sumOfDigits(b)
  if ( aSum < bSum ) {
    return -1
  } else if ( aSum == bSum) {
    if ( a.length < b.length ) {
      return -1
    } else if ( a.length > b.length ){
      return 1
    }
    if ( a < b ){
      return -1
    }
  }
  return 1
}

const totalSort = function(a,b) {
  if ( a.length < b.length ){
    return -1;
  }
  if ( a.length > b.length ) {
    return 1;
  }
  if ( a < b ){
    return -1
  } else {
    return 1
  }
}

const fieldHasValue = function(field) {
  return field != undefined && field != '0' && field != ''
}

const filterAllCombos = function(opts) {
  let a = combinations;

  if ( fieldHasValue(opts['size']) ){
    a = a.filter(e => e.length == parseInt(opts['size']));
  }

  if ( fieldHasValue(opts['total']) ){
    a = a.filter(e => sumOfDigits(e) == parseInt(opts['total']));
  }

  if ( fieldHasValue(opts['included']) ){
    a = a.filter(filterIncluded(opts['included']));
  }

  if ( fieldHasValue(opts['excluded']) ){
    a = a.filter(filterExcluded(opts['excluded']));
  }

  if ( fieldHasValue(opts['minSize']) && !fieldHasValue(opts['size']) ){
    a = a.filter(e => e.length >= parseInt(opts['minSize']))
  }

  if ( fieldHasValue(opts['maxSize']) && !fieldHasValue(opts['size']) ){
    a = a.filter(e => e.length <= parseInt(opts['maxSize']))
  }

  if ( fieldHasValue(opts['minTotal']) && !fieldHasValue(opts['total']) ){
    a = a.filter(e => sumOfDigits(e) >= parseInt(opts['minTotal']));
  }

  if ( fieldHasValue(opts['maxTotal']) && !fieldHasValue(opts['total']) ){
    a = a.filter(e => sumOfDigits(e) <= parseInt(opts['maxTotal']));
  }

  if ( fieldHasValue(opts['total'])){
    a = a.sort(totalSort);
  } else {
    a = a.sort(sizeSort)
  }

  return a
}

export const getCombos = function(opts){
  //check for include all
  if ( opts['included'] == '123456789' ){
    return ['123456789'];
  }

  //check for exclude all
  if ( opts['excluded'] == '123456789' ){
    return [];
  }

  //check for min-max clash
  if (fieldHasValue(opts['minSize']) && fieldHasValue(opts['maxSize']) && !fieldHasValue(opts['size'])) {
    if ( parseInt(opts['minSize']) > parseInt(opts['maxSize']) ){
      return [];
    }
  }

  //check for min-max clash
  if (fieldHasValue(opts['minTotal']) && fieldHasValue(opts['maxTotal']) && !fieldHasValue(opts['total'])) {
      if ( parseInt(opts['minTotal']) > parseInt(opts['maxTotal']) ){
      return [];
    }
  }

  //if no filters set
  if ( !fieldHasValue(opts['included']) && !fieldHasValue(opts['excluded']) && !fieldHasValue(opts['minSize']) &&
       !fieldHasValue(opts['maxSize']) && !fieldHasValue(opts['minTotal']) && !fieldHasValue(opts['maxTotal']) ) {
    //check both size and total are 0 or unset
    if ( !fieldHasValue(opts['size']) && !fieldHasValue(opts['total']) ){
      return combinations.sort(sizeSort);
    }

    //check for both size and total
    if ( fieldHasValue(opts['size']) && fieldHasValue(opts['total']) ){
      return allCombos[opts['size']][opts['total']].sort(sizeSort) || []
    }
  }

  //return filtered list
  return filterAllCombos(opts)
}

export const cleanZeroes = function(s) {
  if ( s == undefined || s == '')
    return '0'
  if ( s.length == 0 || s.length == 1)
    return s
  while ( s[0] == 0 ){
    s = s.slice(1)
  }
  if ( s == undefined )
    s = '0'
  return s
}