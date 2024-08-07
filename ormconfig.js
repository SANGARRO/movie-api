module.exports = {
  type: 'postgres', // O el tipo de base de datos que uses (MySQL, MariaDB, etc.)
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase',
  entities: [
    'dist/**/*.entity.js', // Asegúrate de que coincida con el patrón de archivos transpilados
  ],
  migrations: [
    'dist/migrations/*.js', // Asegúrate de que coincida con el patrón de archivos transpilados
  ],
  synchronize: false, // No habilites en producción
  logging: true, // Opcional
};
