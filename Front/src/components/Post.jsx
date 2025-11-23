import PropTypes from "prop-types";

export default function Post({ post, like, eliminarPost }) {
  const { id, titulo, img, descripcion, likes } = post;

  return (
    <div className="card col-12 col-sm-4 d-inline mx-0 px-3">
      <div className="card-body p-0">
        <img className="card-img-top" src={img} alt={titulo} />

        <div className="p-3">
          <h5 className="card-title">{titulo}</h5>
          <div className="card-text">{descripcion}</div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <button
              className="btn btn-link p-0"
              onClick={() => like(id)}
              title="Me gusta"
            >
              <i
                className={`fa-heart fa-xl ${
                  likes ? "fa-solid" : "fa-regular"
                }`}
              />
            </button>

            <span className="ms-1">{likes}</span>

            <button
              className="btn btn-link text-danger p-0"
              onClick={() => eliminarPost(id)}
              title="Eliminar"
            >
              <i className="fa-solid fa-x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  like: PropTypes.func.isRequired,
  eliminarPost: PropTypes.func.isRequired,
};
