import readline from 'readline'
// create a interface to write data aur read data

const rl = readline.createInterface({
    input: process.stdin,   // to read the data
    output: process.stdout   // by help we write
})

const todo = [];

const showMenu = () => {
    console.log("\n1 : Add a Task ");
    console.log("2 : view task ");
    console.log("3 : Exit ");
    rl.question("Choose an option : ", handleInput)

}
const handleInput = (option) => {
    if (option === "1") {
        rl.question("Enter the Task : ", (task) => {
            todo.push(task);

            console.log("Task added");
            showMenu();
        })
    }
    else if (option === "2") {
        console.log("\n Your Todo lists ");
        todo.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
        showMenu();
    }
    else if (option === "3") {
        console.log("Good Bye");
        rl.close()
    }
    else {
        console.log("Invalid option. please try again");
        showMenu();
    }
}

showMenu();
