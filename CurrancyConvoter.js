import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = "94d71543da74e380ddefdbf7";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

const convertCurrency = (amount, rate) => {
    return (amount * rate).toFixed(2);
};

https.get(apiUrl, (response) => {
    let data = "";

    response.on("data", (chunk) => {
        data += chunk;
    });

    response.on("end", () => {
        const rates = JSON.parse(data).conversion_rates;

        rl.question("Enter the amount in INR: ", (amount) => {
            rl.question(
                "Enter the target currency (e.g. INR, EUR, NPR): ",
                (currency) => {
                    const rate = rates[currency.toUpperCase()];

                    if (rate) {
                        console.log(
                            chalk.green(
                                `${amount} USD is approximately ${convertCurrency(
                                    Number(amount),
                                    rate
                                )} ${currency.toUpperCase()}`
                            )
                        );
                    } else {
                        console.log(
                            chalk.red("Invalid currency code!")
                        );
                    }

                    rl.close();
                }
            );
        });
    });
}).on("error", (err) => {
    console.log(chalk.red("Error fetching exchange rates:", err.message));
});