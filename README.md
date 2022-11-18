# Hermes

Repositório para criação do backend do projeto de conclusão de curso FastPark

=============================//==============================

# Enpoints

# Auth

## Post

### Login: http://localhost:6060/auth/entrar

Ex body : { "email": "eduardo@eduardo.com", "password" : "1234567" }

### Register: http://localhost:6060/auth/cadastrar

Ex body : { "email": "eduardo@eduardo.com", "password" : "1234567", "name" : "Eduardo" }

# Parking

## Post

### CheckIn: http://localhost:6060/parking/checkIn

### CheckOut: http://localhost:6060/parking/checkOut/:id

## Get

### CheckIn List: http://localhost:6060/parking/listarCheckIn
### CheckOut List: http://localhost:6060/parking/listarCheckOut
### Select CheckIn: http://localhost:6060/parking/selectCheckIn/:id
### Select CheckOut: http://localhost:6060/parking/selectCheckOut/:id

# Report

## Post

### http://localhost:6060/report/flowReport

#### Tipos de relatórios:

  1 - Relatório geral de atendimento concluído.
  2 - Relatrio de atendimento concluído por período.
  3 - Relatório de entrada por período(Obs: Lista atendimento não finalizados ainda).

#### Exemplos de requisição:

  1 - {
        "type": 1
      }
 
  2 - {
        "type": 2,
        "start": "2022-10-09T00:00:00.000z",
        "end": "2022-10-25T00:00:00.000z"
      }
     
  3 - {
        "type": 3,
        "start": "2022-10-09T00:00:00.000z",
        "end": "2022-10-25T00:00:00.000z"
      }
      
 ### Obs: Caso seja passado um body do tipo 2 ou 3 sem as informações necessárias o sistemas retornará:
 
  {
    "status": 0,
    "msg": "Não foram passados os parametros necessários para gerar o relatório."
  }
 
 # Users
 
 ## Get
 
 ### http://localhost:6060/users/list

=============================//==============================

## Como executar?

1. Clone o repositório na sua maquina.
2. Instale as dependencias. EX: yarn install
3. Execute o server: yarn start
4. Abra o postman ou qualquer outra ferramenta e faça o teste.
