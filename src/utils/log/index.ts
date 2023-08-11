import chalk from 'chalk';

const getTimestamp = () => new Date().toISOString();

const getContent = (...args: any) => [getTimestamp(), '-', ...args];

export const logSuccess = (...args: any) => {
    console.log(chalk.greenBright('|SCS|'), ...getContent(...args));
};

export const logWarning = (...args: any) => {
    console.log(chalk.yellowBright('|WRN|'), ...getContent(...args));
};

export const logInfo = (...args: any) => {
    console.log(chalk.blueBright('|INF|'), ...getContent(...args));
};

export const logError = (...args: any) => {
    console.log(chalk.redBright('|ERR|'), ...getContent(...args));
};
