const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.DB_USER,
	password: encodeURIComponent(process.env.DB_PASSWORD),
	host: process.env.DB_HOST,
	post: process.env.POST,
	database: process.env.DB_DATABASE,
});

module.exports = pool;
