const bias = 1;
const learningRate = 1;

let wbias = 0;
let w1 = 0;
let w2 = 0;
let iterations = 0;
let error;
let areOutputsCorrect = false;
let pretendedWheights = [0, 0, 0, 0];

const outputs = {
  compositor: 0,
  cientista: 1,
};

const trainingBase = [
  {
    n1: 0,
    n2: 0,
    output: outputs.compositor,
  },
  {
    n1: 0,
    n2: 1,
    output: outputs.compositor,
  },
  {
    n1: 1,
    n2: 0,
    output: outputs.cientista,
  },
  {
    n1: 1,
    n2: 1,
    output: outputs.cientista,
  },
];

const stairFunction = (biasValue, trainingComposer, trainingScientist) =>
  biasValue * wbias + trainingComposer * w1 + trainingScientist * w2 > 0
    ? 1
    : 0;

const wheightCorrection = (lastWeight, errorValue, learningRate, entrySignal) =>
  lastWeight + errorValue * learningRate * entrySignal;

const stairCheck = (stair, index, errorValue) => {
  if (stair === trainingBase[index].output) {
    pretendedWheights[index] = 1;
    console.log("Pesos pretendidos encontrados:", pretendedWheights);
  } else {
    wbias = wheightCorrection(wbias, errorValue, learningRate, bias);

    w1 = wheightCorrection(
      w1,
      errorValue,
      learningRate,
      trainingBase[index].n1
    );

    w2 = wheightCorrection(
      w2,
      errorValue,
      learningRate,
      trainingBase[index].n2
    );

    console.log(`Novos pesos: wbias = ${wbias}, w1 = ${w1}, w2 = ${w2}`);
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
    trainingBase[index].n1,
    trainingBase[index].n2
  );

  console.log("Escada: ", stair);

  error = trainingBase[index].output - stair;

  console.log("Erro: ", error);

  console.log(`Antigos pesos: wbias = ${wbias}, w1 = ${w1}, w2 = ${w2}`);

  stairCheck(stair, index, error);

  areWheightsCorrect();
};

do {
  //   trainingBase.forEach((item, index) => {
  console.log("--->Início da Iteração<---");
  const index = Math.floor(Math.random() * 4);

  main(index);

  iterations++;
  //   });
} while (!areOutputsCorrect);

console.log("--------------------------");
console.log(
  `Pesos finais: wbias = ${wbias}, w1 = ${w1}, w2 = ${w2}, processo executado ${iterations} vezes.`
);
