const fastify = require('fastify')({ logger: true });

const { Client } = require('pg'); 


const client = new Client({
    user: 'postgres',
    database: 'fastifydb',
    password: '1234',
    port: '5432',
});

const path = require('path');
const fs = require('fs');
const { error } = require('console');
fastify.register(require('@fastify/formbody')); 
fastify.register(require('@fastify/static'), { 
  root: path.join(__dirname, 'public'),
});

fastify.register(require('fastify-postgres'), {
  connectionString: 'postgres://postgres:1234@localhost:5432/fastifydb'
}, async (err) => {
  if (err) {
    throw err;
  }

  fastify.pg.ready(() => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS payments (
        id BIGINT GENERATED ALWAYS AS IDENTITY,
        vhod TIME,
        money INT
      );
    `;

    fastify.pg.query(createTableQuery)
      .then(() => {
        console.log('Таблица создана или уже существует');

        // Выполняем запрос для получения данных из таблицы
        const selectQuery = `
          SELECT * FROM payments;
        `;

        fastify.pg.query(selectQuery)
          .then(result => {
            console.log('Данные из таблицы:', result.rows);

            // Записываем данные в файл db.psql
            const dbFile = path.join(__dirname, 'db.psql');
            fs.writeFileSync(dbFile, JSON.stringify(result.rows, null, 2));
            console.log('Данные записаны в файл db.psql');
          })
          .catch(err => {
            console.error('Ошибка получения данных из таблицы:', err.stack);
          });
      })
      .catch(err => {
        console.error('Ошибка создания таблицы:', err.stack);
      });
  });
});

fastify.get('/', async (req, res) => {
  return res.sendFile('game.html')
})

const start = async () => {
    try {
      await fastify.listen({ port: 3000 });
      console.log('Сервер запущен на http://localhost:3000');
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
};
start();
