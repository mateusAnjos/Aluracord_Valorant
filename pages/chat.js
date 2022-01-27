import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from "next/router"




export default function Chat() {

    const [message, setMessage] = React.useState('')
    const [messageList, setMessageList] = React.useState([])

    function handleNewMessage(newMessage) {
        const message = {
            text: newMessage,
            from: 'MateusAnjos',
            id: messageList.length + 1,
        }
        setMessageList([ message,...messageList])
        setMessage('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt881609ccc5207499/60b1901d3aac347374b5d9d1/VALORANT_YR1_ArticleHero_16_9.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
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
                <Box
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
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField

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
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
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
            <Box styleSheet={{ 
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
                <Button
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary[400],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[600],
                  }}
                    onClick={function (){
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
    console.log(props.messageList);
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
                    <Text
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
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary[400]
                                }}>
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleString())}
                            </Text>
                        </Box>
                        {message.text}
                    </Text>
                )
            })}

        </Box>
    )
}