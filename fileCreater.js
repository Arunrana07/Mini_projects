import readline from 'readline'
import fs from "fs"

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
const creation = ()=>{
    rl.question("Enter file name : ", (fileName)=>{
        rl.question("Enter the content : ", (content)=>{
            fs.writeFile(`${fileName}.txt` , `${content}`,(err)=>{
               if(err){
                console.log(`Error writting the file : ${err.message} ` );
               }
               else{
                console.log(`File ${fileName}.txt created successfully! `);
               }
                
            })
            rl.close()
        })
    })
    
}

creation();