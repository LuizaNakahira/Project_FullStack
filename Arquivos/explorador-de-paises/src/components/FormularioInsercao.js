import React, { useState } from "react";
import axios from "axios";

const FormularioInsercao = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    capital: "",
    region: "",
    population: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Pegando o token armazenado

    try {
      const response = await axios.post(
        "http://localhost:5000/api/countries",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("País inserido com sucesso:", response.data);
      onClose(); // Fecha o modal após a inserção
      window.location.reload(); // Atualiza a página para exibir o novo país na lista
    } catch (error) {
      console.error("Erro ao inserir país:", error.response?.data || error);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Inserir País</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Nome do país"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              name="capital"
              placeholder="Capital"
              value={formData.capital}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              name="region"
              placeholder="Região"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="number"
              name="population"
              placeholder="População"
              value={formData.population}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>Salvar</button>
            <button type="button" onClick={onClose} style={{ ...styles.button, backgroundColor: "gray" }}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
  },
};

export default FormularioInsercao;
