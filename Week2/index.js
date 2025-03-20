const express =require('express');
const path =require('path');
const app =express();
const PORT =process.env.PORT||3000;
app.use(express.static(path.join(__dirname,'public')));
app.get('/add',(req,res)=>{
let num1= parseFloat(req.query.num1);
let num2=parseFloat(req.query.num2);
if(isNaN(num1)){return res.send('Error : Please provide a valid number for num1.')};
if(isNaN(num2)){return res.send('Error : Please provide a valid number for num2.')};
let sum= num1+num2;
res.send(`The sum of ${num1} and ${num2} is :  ${sum} `);
});
app.listen(PORT,()=>{
console.log(`Server is running on http://localhost:${PORT} `);
});