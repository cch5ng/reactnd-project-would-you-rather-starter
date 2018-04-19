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

test('sortByPropertyDesc', () => {
  const questions = [ {id: 'q1', timestamp: 222222222},
                      {id: 'q2', timestamp: 777777777},
                      {id: 'q3', timestamp: 444444444},
                      {id: 'q4', timestamp: 888888888}]

  const sortedQuestions = [ {id: 'q4', timestamp: 888888888},
                            {id: 'q2', timestamp: 777777777},
                            {id: 'q3', timestamp: 444444444},
                            {id: 'q1', timestamp: 222222222}]

   expect(sortByPropertyDesc(questions, 'timestamp')).toEqual(sortedQuestions);
});

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
