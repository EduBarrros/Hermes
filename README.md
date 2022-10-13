# Hermes

Repositório para criação do backend do projeto de conclusão de curso FastPark

=============================//==============================

# Enpoints

# Auth

## Post

### Login: http://localhost:6060/auth/entrar

### Register: http://localhost:6060/auth/cadastrar

# Parking

## Post

### CheckIn: http://localhost:6060/parking/checkIn

### CheckOut: http://localhost:6060/parking/checkOut/:id

## Get

### CheckIn List: http://localhost:6060/parking/listarCheckIn
### CheckOut List: http://localhost:6060/parking/listarCheckOut
### Select CheckIn: http://localhost:6060/parking/selectCheckIn/:id
### Select CheckOut: http://localhost:6060/parking/selectCheckOut/:id

=============================//==============================

## Como executar?

1. Clone o repositório na sua maquina.
2. Instale as dependencias. EX: yarn install
3. Execute o server: yarn start
4. Abra o postman ou qualquer outra ferramenta e faça o teste.
