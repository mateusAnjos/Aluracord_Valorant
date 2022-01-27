import { Box, Text,  Button, } from '@skynexui/components';
import React from 'react';
import {useRouter} from "next/router"
import appConfig from '../config.json';

export default function Header() {

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
