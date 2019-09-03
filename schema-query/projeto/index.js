const { ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    # pontos de entradas da Api ! enterpoints
    type Query {
        ola: String! 
        horaAtual: Date!
        usuarioLogado: Usuario
    }

`
// resolvers , um resolver para cada consulta
const resolvers = {
    Query :{
        ola(){
            return 'String de retorno'
        },
        horaAtual(){
            // var date = new Date("03-09-2019".replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
            // return date.toDateString() 
            // return `${new Date()}`
            return new Date
        } ,
        usuarioLogado(){
            return {
                id: 1,
                nome: 'Sergio',
                email:'sergio@git.com.br',
                idade: 24,
                salario: 17.200,
                vip: false
            }

        }
    },
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
