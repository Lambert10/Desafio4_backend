// consultas.js
const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',     // CAMBIA esto a tu usuario real
  password: 'postgres', // CAMBIA esto a tu contraseña real
  database: 'likeme',   // la BD que creaste
  port: 5432,
  allowExitOnIdle: true,
});

// Probar conexión (opcional)
const probarConexion = async () => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    console.log('✅ Conectado a PostgreSQL:', rows[0].now);
  } catch (error) {
    console.log('❌ Error de conexión a PostgreSQL:', error.message);
  }
};

probarConexion();

/**
 * 1) OBTENER TODOS LOS POSTS
 */
const obtenerPosts = async () => {
  try {
    const consulta = 'SELECT * FROM posts ORDER BY id DESC';
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    console.log('Error en obtenerPosts:', error.message);
    throw error; // se maneja en index.js
  }
};

/**
 * 2) AGREGAR UN POST
 */
const agregarPost = async (titulo, img, descripcion) => {
  try {
    const consulta = `
      INSERT INTO posts (titulo, img, descripcion, likes)
      VALUES ($1, $2, $3, 0)
      RETURNING *;
    `;
    const values = [titulo, img, descripcion];
    const { rows } = await pool.query(consulta, values);
    console.log('Post agregado');
    return rows[0];
  } catch (error) {
    console.log('Error en agregarPost:', error.message);
    throw error;
  }
};

/**
 * 3) INCREMENTAR LIKE DE UN POST (PUT)
 */
const incrementarLike = async (id) => {
  try {
    const consulta = `
      UPDATE posts
      SET likes = COALESCE(likes, 0) + 1
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const { rows } = await pool.query(consulta, values);

    if (rows.length === 0) {
      throw new Error('Post no encontrado');
    }

    console.log('Like incrementado al post', id);
    return rows[0];
  } catch (error) {
    console.log('Error en incrementarLike:', error.message);
    throw error;
  }
};

/**
 * 4) ELIMINAR UN POST (DELETE)
 */
const eliminarPost = async (id) => {
  try {
    const consulta = `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const { rows } = await pool.query(consulta, values);

    if (rows.length === 0) {
      throw new Error('Post no encontrado');
    }

    console.log('Post eliminado', id);
    return rows[0];
  } catch (error) {
    console.log('Error en eliminarPost:', error.message);
    throw error;
  }
};

module.exports = {
  obtenerPosts,
  agregarPost,
  incrementarLike,
  eliminarPost,
};
