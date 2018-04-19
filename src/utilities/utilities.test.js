import { getArFromDict, sortByPropertyDesc, getPrettyQuestion,
getUnansweredQuestions, getPercentVoted, sortByAnswersCount } from '../utilities/utilities.js';

test('getArFromDict generates array', () => {
  const dictionary = {
    'id1': {
      id: 'id1',
      name: 'name1',
    },
    'id2': {
      id: 'id2',
      name: 'name2',
    },
    'id3': {
      id: 'id3',
      name: 'name3',
    }
  }

  const objAr = [
    {
      id: 'id1',
      name: 'name1',
    },
    {
      id: 'id2',
      name: 'name2',
    },
    {
      id: 'id3',
      name: 'name3',
    }
  ]

  expect(getArFromDict(dictionary)).toEqual(objAr);
});

test('getArFromDict for empty dict', () => {

  expect(getArFromDict({})).toEqual([]);
});

// test('sortByPropertyDesc', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// test('getPrettyQuestion', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// test('getUnansweredQuestions', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// test('getPercentVoted', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// test('sortByAnswersCount', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });
