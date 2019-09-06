const { ApolloServer, gql} = require('apollo-server')


const usuarios = [
    {
    id: 1,
    nome: 'Sergio',
    email: 'sergio@email',
    idade: 24,
    perfil_id : 1,
   }, 
    {
    id: 2,
    nome: 'Sergio filho',
    email: 'sergio@email',
    idade: 25,
    perfil_id : 2,
   },
   {
    id: 3,
    nome: 'Sthiago tx',
    email: 'sergio@email',
    idade: 25,
    perfil_id : 1,
    }
]
const perfil = [
{id: 1,nome: ' Perfil 1 Comum'},
{id: 2,nome: 'Perfil 2 Superuser'}
]
const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float      
    }

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil
    }

    type Perfil {
        id: Int
        nome: String!
    }

    # pontos de entradas da Api ! enterpoints
    type Query {
        ola: String! 
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario!]!
        usuario(id: ID): Usuario!
        perfil: [Perfil!]!
        perfil_unico (id: Int) : Perfil!
    }

`
// resolvers , um resolver para cada consulta
const resolvers = {
    Usuario:{
        salario(usuario){
            return usuario.salario_real
        }
    },
    
    Produto : { 
    precoComDesconto(produto) {
      
        if(produto.desconto){
           return produto.preco * (1 - produto.desconto)
       } else {
           return produto.preco
       }

    }
  },
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
                salario_real: 17.200,
                vip: false
            }

        },
        produtoEmDestaque(){
            return{
                nome: 'Teclado Gamer',
                preco: 200.0,
                desconto: 0.5,
            }

        },
        numerosMegaSena(){
            // return [5,9,12,27,33,55] valores amarrados ,  TODO: desafio remover os numeros repetidos
            const crescente = (a, b) => a - b 
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },
        usuarios(){
            return usuarios
        },
        usuario(_, args){
            const selecionados = usuarios.filter(u => u.id == args.id)

            return selecionados ? selecionados[0] : null
                                
        },
        perfil(){
            return perfil
        },
        perfil_unico(_, args) {
            const selecionados = perfil.filter(u => u.id == args.id)

            return selecionados ? selecionados[0] : null    
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
