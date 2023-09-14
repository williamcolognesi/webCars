import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import "./styles.css";

function User() {
  const baseUrl = "http://localhost:5000/api/";
  const [todosCarros, setTodosCarros] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}carros`).then((response) => {
      setTodosCarros(response.data.result);
    });
  }, []);
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item>
            <div className="teste">
              {todosCarros.map((carro) => {
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
                  <div className="cards" key={carro}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-conducao_114360-14312.jpg?size=626&ext=jpg&ga=GA1.2.22775427.1685402366&semt=ais"
                          alt="imagem do carro"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="titulo-card"
                          >
                            {`${carro.marca} ${carro.modelo}`}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="descricao-card"
                          >
                            {carro.descricao}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            {formatarValor(carro.valor)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default User;
