import { Button, Container, Grid, Box, Typography, Modal } from "@mui/material";
import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";

function Admin() {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  const [openInserir, setOpenInserir] = useState(false);
  const handleOpenInserir = () => setOpenInserir(true);
  const handleCloseInserir = () => setOpenInserir(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [codigoEditar, setCodigoEditar] = useState(null);
  const baseURL = "http://localhost:5000/api/";
  const handleOpenEditar = (codigo) => {
    setCodigoEditar(codigo);
    setOpenEditar(true);
  };
  const handleCloseEditar = () => {
    setCodigoEditar(null);
    setOpenEditar(false);
  };

  const [carros, setCarros] = useState([]);
  //States para o formulario
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    axios.get(`${baseURL}carros`).then((response) => {
      setCarros(response.data.result);
    });
  }, []);

  const inserirCarro = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}carro`, {
        marca: marca,
        modelo: modelo,
        descricao: descricao,
        preco: preco,
      });

      const data = response.data;

      if (data.error) {
      } else {
        // Limpar o formulário após a inserção bem-sucedida, se desejar
        setMarca("");
        setModelo("");
        setDescricao("");
        setPreco("");
      }
      window.location.reload(false);
    } catch (error) {
      console.error("Erro ao enviar a solicitação:", error);
    }
  };

  async function alterarCarro() {
    if (codigoEditar !== null) {
      try {
        const response = await axios.put(`${baseURL}carro/${codigoEditar}`, {
          preco: preco,
        });

        const data = response.data;

        if (data.error) {
        } else {
          setPreco("");
          handleCloseEditar(); // Feche o modal de edição
        }
        window.location.reload(false);
      } catch (error) {
        console.error("Erro ao enviar a solicitação:", error);
      }
    }
  }

  function excluirCarro(codigo) {
    axios.delete(`${baseURL}carro/${codigo}`).then((response) => {
      console.log(response);
      alert("Carro excluido com sucesso");
      window.location.reload(false);
    });
  }

  return (
    <div>
      <Container>
        <Grid container>
          <div className="display-carros">
            <Grid item>
              <div>
                <h2>Lista de veiculos</h2>
                <div>
                  <ul>
                    {carros.map((carro) => {
                      function formatarValor(valor) {
                        const numero = parseFloat(valor);
                        if (!isNaN(numero)) {
                          return `R$ ${numero.toLocaleString("pt-BR", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}`;
                        } else {
                          return valor;
                        }
                      }
                      return (
                        <div key={carro}>
                          <div className="linha-carro">
                            <li className="marca">{carro.marca}</li>
                            <li className="modelo">{carro.modelo}</li>
                            <li className="descricao">{carro.descricao}</li>
                            <li className="valor">
                              {" "}
                              {formatarValor(carro.valor)}
                            </li>
                            <div className="botoes-linha">
                              <Button
                                variant="contained"
                                size="small"
                                color="warning"
                                onClick={() => handleOpenEditar(carro.codigo)}
                              >
                                Editar preço
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                color="error"
                                onClick={() => {
                                  excluirCarro(carro.codigo);
                                }}
                              >
                                Excluir
                              </Button>
                            </div>
                          </div>
                          <div className="divider"></div>{" "}
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} marginTop={5}>
              <Button onClick={handleOpenInserir} variant="contained">
                Inserir Carro
              </Button>
              <Modal
                open={openInserir}
                onClose={handleCloseInserir}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Insira todos os campos abaixo:
                  </Typography>
                  <form onSubmit={inserirCarro} enctype="multipart/form-data">
                    <label htmlFor="marca">Marca:</label>
                    <input
                      type="text"
                      id="marca"
                      name="marca"
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                      required
                    />
                    <br />
                    <br />
                    <label htmlFor="modelo">Modelo:</label>
                    <input
                      type="text"
                      id="modelo"
                      name="modelo"
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value)}
                      required
                    />
                    <br />
                    <br />

                    <label htmlFor="descricao">Descrição:</label>
                    <input
                      type="text"
                      id="descricao"
                      name="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      required
                    />
                    <br />
                    <br />
                    <label htmlFor="preco">Preço:</label>
                    <input
                      type="text"
                      id="preco"
                      name="preco"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      required
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="success" type="submit">
                      Inserir Carro
                    </Button>
                  </form>
                </Box>
              </Modal>
              <Modal
                open={openEditar}
                onClose={handleCloseEditar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Altere o valor do veiculo:
                  </Typography>
                  <form onSubmit={alterarCarro}>
                    <label htmlFor="preco">Preço:</label>
                    <input
                      type="text"
                      id="preco"
                      name="preco"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="success" type="submit">
                      Editar Preço
                    </Button>
                  </form>
                </Box>
              </Modal>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default Admin;
