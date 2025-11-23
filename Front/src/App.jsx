import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const api = axios.create({
  baseURL: "http://localhost:3000", // Backend Desafío 4
});

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  // Obtener todos los posts
  const getPosts = async () => {
    const { data } = await api.get("/posts");
    setPosts(data);
  };

  // Agregar un nuevo post
  const agregarPost = async () => {
    if (!titulo || !imgSrc || !descripcion) return;

    const post = { titulo, img: imgSrc, descripcion }; // el backend espera "img"
    await api.post("/posts", post);

    // limpiar formulario
    setTitulo("");
    setImgSRC("");
    setDescripcion("");

    await getPosts();
  };

  // Dar like a un post (usa PUT /posts/like/:id del backend)
  const like = async (id) => {
    await api.put(`/posts/like/${id}`);
    await getPosts();
  };

  // Eliminar un post (usa DELETE /posts/:id del backend)
  const eliminarPost = async (id) => {
    await api.delete(`/posts/${id}`);
    await getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>

      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            titulo={titulo}
            imgSrc={imgSrc}
            descripcion={descripcion}
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>

        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
