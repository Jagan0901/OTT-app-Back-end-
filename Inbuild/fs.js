const fs = require("fs");

// 1.WRITING THE FILE
const quote = "Always and forever";

// fs.writeFile("./originals.js", quote, (err) =>{
//     console.log("Completed writing")
// });






// 2.  WRITING THE FILE WITH no. of times(ex: 10 times)
// const quote2 = "I'm Feeling epic";

// for(let i=1; i<=10; i++){
// fs.writeFile(`./backup/text-${i}.html`,quote2, (err) => {
//     console.log('10 file has been created');
// });
// }






// 3. WRITING THE FILE WITH no. of times WHICH HAS GIVEN IN COMMAND PROMPT
// const [, , n] = process.argv;

// for(let i=1; i<= (+n); i++){
//     fs.writeFile(`./commandPrompt/text-${i}.txt`, quote, (err)=>{
//         console.log(`text-${i}.txt`);
//     })
// }







// 4. READING THE FILE
// fs.readFile("./cool.txt", "utf-8", (err,data) => {
//     err ? console.error("Error" , err) : console.log("The content of the file is:", data);
// })






// 5. APPENDING THE FILE (updating...)
// const appendQuote = "\nStay Healthy"

// fs.appendFile("./append.txt", appendQuote, (err) => {
//     console.log('Updated Successfully');
// })





//6. DELETING THE FILE
// fs.unlink("./unlink.txt", (err) => {
//     console.log("Deleted Successfully")
// })






//7. REDIRECTING TO THE PARTICULAR FOLDER (OR) FILES

// fs.readdir("./backup", (err,files) => {
//     console.log("All file names : " ,files)
// })






//8. READ THE PARTICULAR FILE AND DELETING IT

// fs.readdir("./commandPrompt", (err,data) => {
//     data.forEach((fileName) => {
//         fs.unlink("./commandPrompt/text-20.txt", () => {
//             console.log("Deleted Successfully")
//         })
//     })
// })








//9. READ THE  FILES (OR) PARTICULAR FOLDER AND DELETING IT

// fs.readdir("./commandPrompt", (err,data) => {
//     data.forEach((fileName) => {
//         fs.unlink(`./commandPrompt/${fileName}`, () => {
//             console.log("Deleted Successfully")
//         })
//     })
// })










//Task-2

// 1. create 20 files like, file1.html, file2.html, ... file20.html
// 2. content - append

//1.
// for(let i=1; i<=20; i++){
//  fs.writeFile(`./commandPrompt/file${i}.html`, quote, (err) => {
//     console.log(err)
//  })
// }








//2.
// fs.readdir(`./commandPrompt`, (err,data) =>{
//     data.forEach((file) => {
//         fs.appendFile(`./commandPrompt/${file}`, `\n${quote}`, (err)=>{
//             console.log("Updated Successfully")
//         })
//     })
// })







// fs.writeFile, fs.readFile, fs.appendFile - async
// fs.writeFileSync, fs.readFileSync, fs.appendFileSync - sync //To make files in a ordered way




//Example
//Sync
// for(let i=1; i<=5; i++){
//     fs.writeFileSync(`./file${i}.html`, quote)
//        console.log("Files",i )
//    }
   