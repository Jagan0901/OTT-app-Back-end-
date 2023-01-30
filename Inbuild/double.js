// 1.
// console.log(process.argv);
// we'll get
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'D:\\B41\\B41 Batch\\Session Practice\\NodeJS\\double.js',
//     'YOU'VE ENTERED IN COMMAND PROMPT'(Ex:2)
//   ]

// 2.
// console.log(process.argv[2]);
// we'll get
// 'YOU'VE ENTERED IN COMMAND PROMPT'(Ex:2)

const double = (num) => num * 2;

const [ , ,n] = process.argv;

console.log(double(n));