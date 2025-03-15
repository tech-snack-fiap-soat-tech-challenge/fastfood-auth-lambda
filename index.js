import { handler } from "./src/functions/authenticate.js";

console.log('process.env:', process.env);
console.log('Running test');
const result = await handler({ userName: '35843258890', passowrd: '!Teste1234' })
console.log('Result:', result);
console.log('Test complete');