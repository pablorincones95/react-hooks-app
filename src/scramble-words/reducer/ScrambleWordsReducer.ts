export interface ScrambleWordsState {
  words: string[];
  currentWord: string;
  scrambledWord: string;
  guess: string;
  points: number;
  errorCounter: number;
  maxAllowErrors: number;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export type ScrambleWordsAction =
  | {
      type: "SET_GUESS";
      payload: string;
    }
  | {
      type: "CHECK_ANSWER";
    }
  | {
      type: "SKIP_WORD";
    }
  | {
      type: "STAR_WORD";
    };

export const scrambleWordReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS": {
      return { ...state, guess: action.payload.trim().toUpperCase() };
    }

    case "CHECK_ANSWER": {
      if (state.currentWord === state.guess) {
        const nextWords = state.words.slice(1);
        const nextWord = nextWords[0] || "";
        return {
          ...state,
          points: state.points + 1,
          words: nextWords,
          currentWord: nextWord,
          scrambledWord: scrambleWord(nextWord),
          guess: "",
          errorCounter: 0,
          isGameOver: nextWords.length === 0,
        };
      }

      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        guess: "",
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }

    case "SKIP_WORD": {
      if (state.skipCounter >= state.maxSkips) return state;
      const nextWords = state.words.slice(1);
      const nextWord = nextWords[0] || "";
      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: nextWords,
        currentWord: nextWord,
        scrambledWord: scrambleWord(nextWord),
        guess: "",
        isGameOver: nextWords.length === 0,
      };
    }

    case "STAR_WORD": {
      const shuffledWords = shuffleArray(GAME_WORDS);
      const firstWord = shuffledWords[0];
      return {
        words: shuffledWords,
        currentWord: firstWord,
        scrambledWord: scrambleWord(firstWord),
        guess: "",
        points: 0,
        errorCounter: 0,
        maxAllowErrors: 3,
        skipCounter: 0,
        maxSkips: 3,
        isGameOver: false,
        totalWords: shuffledWords.length,
      };
    }

    default:
      return state;
  }
};

export const getScrambleWordsInitialState = (): ScrambleWordsState => {
  const localStorageState = localStorage.getItem("scrambleWordsState");
  if (!localStorageState) {
    const shuffledWords = shuffleArray(GAME_WORDS);
    const firstWord = shuffledWords[0];
    return {
      words: shuffledWords,
      currentWord: firstWord,
      scrambledWord: scrambleWord(firstWord),
      guess: "",
      points: 0,
      errorCounter: 0,
      maxAllowErrors: 3,
      skipCounter: 0,
      maxSkips: 3,
      isGameOver: false,
      totalWords: shuffledWords.length,
    };
  }

  return JSON.parse(localStorageState);
};
