import {Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import {useRouter} from "next/router"
import appConfig from '../config.json'


// componente React
function Titulo(props) {
    const Tag  = props.tag||'h1'
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag}{
                font-size:24px;
                font-weight:600;
                color:${appConfig.theme.colors.neutrals['000']};
            }
            `}</style>
        </>
    )
}



export default function PaginaInicial() {
    //const username = 'mateusAnjos';
    const[username, setUsername] = React.useState('')
    const route = useRouter()// roteamento
    

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            //backgroundColor: appConfig.theme.colors.primary[600],
            backgroundImage: 'url(https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt881609ccc5207499/60b1901d3aac347374b5d9d1/VALORANT_YR1_ArticleHero_16_9.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              autoComplete="off"
              onSubmit={function (event){
                  //previne que o formulario recarregue a pagina, comportamento default
                  event.preventDefault();
                  //Decidir qual página vai aparecer quando submeter
                  route.push(`/chat?username=${username}`)
                

              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Olá agente {username}!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
                {appConfig.name}
              </Text>
              
              {/* <input
                type="text"
                placeholder='Digite seu usuário GitHub'
                value={username}
                onChange = {function (event){
                    console.log("usuário digitou", event.target.value)
                    //onde esta o valor?
                    const valor = event.target.value
                    //trocar o valor
                    setUsername(valor)
                }}
              /> */}
              {/* este textfield é a mesma coisa que o input acima, mas estilizado */}
              <TextField
                placeholder="Digite seu usuário do GitHub"
                onChange = {function (event){
                    //onde esta o valor?
                    const valor = event.target.value
                    //trocar o valor
                    setUsername(valor)
                    
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                disabled={username.length<3}//validação que desabilita o botão caso username seja menor que 3
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[400],
                  mainColorLight: appConfig.theme.colors.primary[300],
                  mainColorStrong: appConfig.theme.colors.primary[500],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.primary[400],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`${username.length>2 ?`https://github.com/${username}.png`:'https://wallpaperaccess.com/full/4547519.jpg'}`}
              />
             
              <Text
                variant="body4"
                hidden={username.length<3}
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username.length>2? username:""}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }

