export default [
    'nodejs-mentoring',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        operatorsAliases: false,
    },
];
