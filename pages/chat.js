import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from "next/router"
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQwNDA5MSwiZXhwIjoxOTU4OTgwMDkxfQ.kevUGOFed_VTBX0fNMeJ6S2ElBy8YR1yZS_E93mx9os'
const SUPABASE_URL = 'https://gubfbrqyrdngcryfcuoq.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function messageListListener(addMessage){
    return supabaseClient
        .from('messageList') 
        .on('INSERT',(liveResponse)=>{
            addMessage(liveResponse.new)
        })
        .subscribe();
}

export default function Chat() {
    const route = useRouter()
    const userLogged = route.query.username
    const [message, setMessage] = React.useState('')
    const [messageList, setMessageList] = React.useState([])


    React.useEffect(() => {
        supabaseClient
            .from('messageList')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setMessageList(data)
            })
            messageListListener((newMessage)=>{
                setMessageList((realtimeMessageList)=>{
                    return[newMessage, ...realtimeMessageList]
                })
            })
    }, []);


    function handleNewMessage(newMessage) {
        const message = {
            text: newMessage,
            from: userLogged,
        }

        supabaseClient
            .from('messageList')
            .insert([
                message
            ])
            .then(({ data }) => {
                // setMessageList([data[0], ...messageList])
            })
        setMessage('')
    }



    return (
        <Box//caixa englobando fundo de tela
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt881609ccc5207499/60b1901d3aac347374b5d9d1/VALORANT_YR1_ArticleHero_16_9.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box //Caixa maior englobando tudo
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box // caixa onde será renderizado a MessageList
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messageList={messageList} />
                    <Box //caixa onde está a caixade texto
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}

                    >

                        <TextField //caixa ondeo texto é inserido

                            value={message}
                            // onChange={function (event){
                            //const value = event.target.value
                            //setMessage(value)
                            //acima, modo antigo, abaixo, arrow function
                            onChange={(event) => {
                                const value = event.target.value
                                setMessage(value)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()


                                    handleNewMessage(message)

                                }

                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                minHeight: '48px',
                                width: '90%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/* Callback */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log('salva sticker banco')
                                handleNewMessage(':sticker:' + sticker)
                            }}
                        />
                        <Button
                            iconName="arrowRight"
                            label="Send"
                            onClick={() => {
                                handleNewMessage(message)
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[400],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                minHeight: '48px',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                            }}

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
function Header() {

    const route = useRouter()

    return (
        <>
            <Box //caixa contendo texto do cabeçalho
                styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: appConfig.theme.colors.primary[400],
                }} >
                <Text variant='heading3'>
                    Mission Log
                </Text>
                <Button //botão de logout
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[400],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary[600],
                    }}
                    onClick={function () {
                        //Decidir qual página vai aparecer quando submeter
                        route.push('')
                    }}
                    variant='secondary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',

            }}
        >
            {props.messageList.map((message) => {
                return (
                    <Text //mensagem a ser renderizada
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            wordBreak: 'break-word',
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box //caixa onde cada msg é renderizada
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image //imagem de quem enviou a msg
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text //nome de quem enviou a msg
                                tag="strong"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary[400]
                                }}>
                                {message.from}
                            </Text>
                            <Text // texto da data e hora da msg
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[100],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleString())}
                            </Text>
                        </Box>
                        {message.text.startsWith(':sticker:')
                            ? (
                                <Image src={message.text.replace(':sticker:', '')} />
                            )
                            : (
                                message.text
                            )}

                    </Text>
                )
            })}

        </Box>
    )
}