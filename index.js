// index.js
const express = require('express');
const cors = require('cors');

const {
  obtenerPosts,
  agregarPost,
  incrementarLike,
  eliminarPost,
} = require('./consultas');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Levantar servidor
app.listen(3000, () => {
  console.log('🚀 SERVIDOR ENCENDIDO en puerto 3000');
});

/**
 * GET /posts
 * Devuelve todos los posts
 */
app.get('/posts', async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.log('GET /posts error:', error.message);
    res.status(500).send('Error al obtener los posts');
  }
});

/**
 * POST /posts
 * Crea un nuevo post
 * body: { titulo, img, descripcion }
 */
app.post('/posts', async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;

    if (!titulo || !img || !descripcion) {
      return res
        .status(400)
        .send('Faltan campos: titulo, img o descripcion');
    }

    const nuevoPost = await agregarPost(titulo, img, descripcion);
    res.status(201).json(nuevoPost);
  } catch (error) {
    console.log('POST /posts error:', error.message);
    res.status(500).send('Error al crear el post');
  }
});

/**
 * PUT /posts/like/:id
 * Incrementa los likes de un post
 */
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postActualizado = await incrementarLike(id);
    res.json(postActualizado);
  } catch (error) {
    console.log('PUT /posts/like/:id error:', error.message);

    if (error.message === 'Post no encontrado') {
      return res.status(404).send('Post no encontrado');
    }

    res.status(500).send('Error al registrar el like');
  }
});

/**
 * DELETE /posts/:id
 * Elimina un post
 */
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postEliminado = await eliminarPost(id);

    res.json({
      mensaje: 'Post eliminado correctamente',
      post: postEliminado,
    });
  } catch (error) {
    console.log('DELETE /posts/:id error:', error.message);

    if (error.message === 'Post no encontrado') {
      return res.status(404).send('Post no encontrado');
    }

    res.status(500).send('Error al eliminar el post');
  }
});
