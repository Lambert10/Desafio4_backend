import { useState } from "react";
import PropTypes from "prop-types";

const API = "/api"; // si no usas proxy: "http://localhost:3000"

export default function NewPostForm({ onCreated }) {
const [form, setForm] = useState({ titulo: "", img: "", descripcion: "" });
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();              // 👈 importante
    if (!form.titulo || !form.img || !form.descripcion) return;

    try {
    setLoading(true);
    const res = await fetch(`${API}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("No se pudo crear el post");
      // limpia y avisa al padre para recargar
    setForm({ titulo: "", img: "", descripcion: "" });
    onCreated?.();
    } catch (err) {
    console.error(err);
    alert("Error creando el post");
    } finally {
    setLoading(false);
    }
};

return (
    <form onSubmit={handleSubmit} style={{ background: "#093f92", color: "white", padding: 16, borderRadius: 8 }}>
    <h5 className="text-center mb-3">Agregar post</h5>

    <label className="form-label">Título</label>
    <input
        className="form-control mb-2"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        maxLength={25}
        required
    />

    <label className="form-label">URL de la imagen</label>
    <input
        className="form-control mb-2"
        name="img"
        placeholder="https://..."
        value={form.img}
        onChange={handleChange}
        required
    />

    <label className="form-label">Descripción</label>
    <textarea
        className="form-control mb-3"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        maxLength={255}
        required
    />

    <button type="submit" className="btn btn-light" disabled={loading}>
        {loading ? "Agregando..." : "Agregar"}
    </button>
    </form>
);
}

NewPostForm.propTypes = {
  onCreated: PropTypes.func, // callback para refrescar la lista
};
