const bias = 1;
const learningRate = 1;

let wbias = 0;
let wv = 0;
let wb = 0;
let wh = 0;
let wc = 0;
let iterations = 0;
let error;
let areOutputsCorrect = false;
let pretendedWheights = [0, 0, 0, 0, 0, 0];

const outputs = {
  gripe: 0,
  resfriado: 1,
};

const trainingBase = [
  {
    virus: 1,
    bacteria: 0,
    headache: 1,
    coryza: 1,
    output: outputs.gripe,
  },
  {
    virus: 0,
    bacteria: 1,
    headache: 0,
    coryza: 1,
    output: outputs.resfriado,
  },
  {
    virus: 1,
    bacteria: 0,
    headache: 1,
    coryza: 0,
    output: outputs.gripe,
  },
  {
    virus: 0,
    bacteria: 1,
    headache: 1,
    coryza: 1,
    output: outputs.resfriado,
  },
  {
    virus: 0,
    bacteria: 0,
    headache: 1,
    coryza: 1,
    output: outputs.gripe,
  },
  {
    virus: 0,
    bacteria: 0,
    headache: 0,
    coryza: 1,
    output: outputs.resfriado,
  },
];

// const trainingBase = [
//   {
//     virus: 1,
//     bacteria: 1,
//     headache: 1,
//     coryza: 1,
//     output: outputs.gripe,
//   },
//   {
//     virus: 1,
//     bacteria: 0,
//     headache: 0,
//     coryza: 0,
//     output: outputs.resfriado,
//   },
//   {
//     virus: 0,
//     bacteria: 1,
//     headache: 0,
//     coryza: 0,
//     output: outputs.gripe,
//   },
//   {
//     virus: 0,
//     bacteria: 1,
//     headache: 1,
//     coryza: 1,
//     output: outputs.resfriado,
//   },
//   {
//     virus: 1,
//     bacteria: 0,
//     headache: 0,
//     coryza: 1,
//     output: outputs.gripe,
//   },
//   {
//     virus: 0,
//     bacteria: 0,
//     headache: 0,
//     coryza: 0,
//     output: outputs.resfriado,
//   },
// ];

const stairFunction = (
  biasValue,
  trainingVirus,
  trainingBacteria,
  trainingHeadache,
  trainingCoryza
) =>
  biasValue * wbias +
    trainingVirus * wv +
    trainingBacteria * wb +
    trainingHeadache * wh +
    trainingCoryza * wc >
  0
    ? 1
    : 0;

const wheightCorrection = (lastWeight, errorValue, learningRate, entrySignal) =>
  lastWeight + errorValue * learningRate * entrySignal;

const stairCheck = (stair, index, errorValue) => {
  if (stair == trainingBase[index].output) {
    pretendedWheights[index] = 1;
    console.log("Pesos pretendidos encontrados:", pretendedWheights);
  } else {
    wbias = wheightCorrection(wbias, errorValue, learningRate, bias);

    wv = wheightCorrection(
      wv,
      errorValue,
      learningRate,
      trainingBase[index].virus
    );

    wb = wheightCorrection(
      wb,
      errorValue,
      learningRate,
      trainingBase[index].bacteria
    );

    wh = wheightCorrection(
      wh,
      errorValue,
      learningRate,
      trainingBase[index].headache
    );

    wc = wheightCorrection(
      wc,
      errorValue,
      learningRate,
      trainingBase[index].coryza
    );

    console.log(
      `Novos pesos: wbias = ${wbias}, wv = ${wv}, wb = ${wb}, wh = ${wh}, wc = ${wc}`
    );
  }
};

const areWheightsCorrect = () => {
  if (!pretendedWheights.includes(0)) {
    console.log("Aprendizado aconteceu!");
    areOutputsCorrect = true;
  }
};

const main = (index) => {
  console.log("Teste na posição: ", index);

  const stair = stairFunction(
    bias,
    trainingBase[index].virus,
    trainingBase[index].bacteria,
    trainingBase[index].headache,
    trainingBase[index].coryza
  );

  console.log("Escada: ", stair);

  error = trainingBase[index].output - stair;

  console.log("Erro: ", error);

  console.log(
    `Antigos pesos: wbias = ${wbias}, wv = ${wv}, wb = ${wb}, wh = ${wh}, wc = ${wc}`
  );

  stairCheck(stair, index, error);

  areWheightsCorrect();
};

do {
  // trainingBase.forEach((item, index) => {
  console.log("--->Início da Iteração<---");
  const index = Math.floor(Math.random() * 6);

  main(index);

  iterations++;
  // });
} while (!areOutputsCorrect);

console.log("--------------------------");
console.log(
  `Pesos finais: wbias = ${wbias}, wv = ${wv}, wb = ${wb}, wh = ${wh}, wc = ${wc}, processo executado ${iterations} vezes.`
);
