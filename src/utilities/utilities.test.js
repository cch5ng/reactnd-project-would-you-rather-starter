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

test('getPrettyQuestion', () => {

  let questions = {
    "qid000": {
      id: 'qid000',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['sarahedo'],
        text: 'eat pizza',
      },
      optionTwo: {
        votes: [],
        text: 'eat a hamburger'
      }
    },
    "qid001": {
      id: 'qid001',
      author: 'johndoe',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'have dark roast coffee',
      },
      optionTwo: {
        votes: ['johndoe', 'sarahedo'],
        text: 'have light roast coffee'
      }
    },
  }

   expect(getPrettyQuestion('qid001', questions)).toBe('have dark roast coffee OR have light roast coffee?');
});

test('getUnansweredQuestions', () => {
  let userAnswers = {
      "qid001": 'have dark roast coffee'
  };

  let questions = {
    "qid000": {
      id: 'qid000',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['sarahedo'],
        text: 'eat pizza',
      },
      optionTwo: {
        votes: [],
        text: 'eat a hamburger'
      }
    },
    "qid001": {
      id: 'qid001',
      author: 'johndoe',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'have dark roast coffee',
      },
      optionTwo: {
        votes: ['johndoe', 'sarahedo'],
        text: 'have light roast coffee'
      }
    },
    "qid002": {
      id: 'qid002',
      author: 'johndoe',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'work late',
      },
      optionTwo: {
        votes: ['johndoe', 'sarahedo'],
        text: 'work early'
      }
    },
  };

  expect(getUnansweredQuestions(userAnswers, questions)).toEqual(["qid000", "qid002"]);
});

test('getPercentVoted', () => {
  expect(getPercentVoted(50, 100)).toBe(50);
});

test('getPercentVoted round down', () => {
  expect(getPercentVoted(1, 3)).toBe(33);
});


test('sortByAnswersCount', () => {
  let users = [
    {
      id: 'uid000',
      answers: {
        "aid000": "optionOne",
        "aid001": "optionOne",
        "aid002": "optionTwo",
        "aid005": "optionTwo"
      },
    },
    {
      id: 'uid001',
      answers: {
        "aid000": "optionOne",
        "aid001": "optionOne",
        "aid002": "optionTwo",
        "aid005": "optionTwo",
        "aid006": "optionOne",
        "aid007": "optionTwo",
        "aid008": "optionTwo"
      },
    },
    {
      id: 'uid002',
      answers: {
        "aid003": "optionOne",
        "aid004": "optionOne",
      },
    }
  ];

  let sortedUsers = [
    {
      id: 'uid001',
      answers: {
        "aid000": "optionOne",
        "aid001": "optionOne",
        "aid002": "optionTwo",
        "aid005": "optionTwo",
        "aid006": "optionOne",
        "aid007": "optionTwo",
        "aid008": "optionTwo"
      },
    },
    {
      id: 'uid000',
      answers: {
        "aid000": "optionOne",
        "aid001": "optionOne",
        "aid002": "optionTwo",
        "aid005": "optionTwo"
      },
    },
    {
      id: 'uid002',
      answers: {
        "aid003": "optionOne",
        "aid004": "optionOne",
      },
    }
  ];

  expect(sortByAnswersCount(users)).toEqual(sortedUsers);
});
