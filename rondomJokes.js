import https from 'https'
import chalk  from 'chalk'
import { error } from 'console'

let getJokes = ()=>{
    const url =  "https://official-joke-api.appspot.com/jokes/random"  
     https.get(url , (response)=>{
        let data = '';
        response.on('data',(chunk)=>{
            data += chunk;
        })
        response.on('end', ()=>{
            const joke = JSON.parse(data);
            // console.log(data);
            console.log(`here is the rondom ${joke.type} joke`);
            console.log(chalk.red(`${joke.setup}`));
            console.log(chalk.bgMagentaBright(`${joke.punchline}`));
           
        })
        response.on('error',(error)=>{
            console.log(`Error feting the jokes : ${error.message}`);
        })
     })
}
getJokes();