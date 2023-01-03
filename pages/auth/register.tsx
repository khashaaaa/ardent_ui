import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { Paper, Button, Center, Flex, TextInput, PasswordInput, Loader, Text } from '@mantine/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function Register() {

    const [load, setLoad] = useState<boolean>(false)
    const routa = useRouter()
    const creds = useSelector((state: RootState) => state.login.creds)

    useEffect(() => {
        if(creds !== null) {
            routa.push('/dash')
        }
    }, [])

    const regdata = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            pass: ''
        },
        validate: {
            first_name: (val) => (val.length < 3 ? '3 үсгээс дээш урттай байх ёстой' : null),
            last_name: (val) => (val.length < 3 ? '3 үсгээс дээш урттай байх ёстой' : null),
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Имэйл буруу байна'),
            pass: (val) => (val.length < 8 ? '8 болон дээш урттай байх ёстой' : null),
        }
    })

    const register = async () => {

        try {
            setLoad(true)
            const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'consumer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regdata.values)
            })

            let data = await resp.json()
            if(data.statusCode === 201 || data.statusCode === 200) {
                routa.push('/auth/login')
            }
        }
        catch(error) {
            console.error(error)
        }
    }

    return (
        <Center w="100%" h="100vh">
            {
                load === true ?
                <Loader variant="bars" />
                :
                <Flex direction="column">
                    <Paper sx={{ padding: '1rem', width: '350px' }}>
                        <form onSubmit={regdata.onSubmit(register)}>
                            <TextInput label="Нэр" {...regdata.getInputProps('first_name')} />
                            <TextInput label="Овог" {...regdata.getInputProps('last_name')} />
                            <TextInput label="Мэйл" {...regdata.getInputProps('email')} />
                            <PasswordInput label="Нууц үг" {...regdata.getInputProps('pass')} />
                            <Flex mt="1rem">
                                <Button fullWidth uppercase type="submit">OK</Button>
                            </Flex>
                        </form>
                        <Text fz="sm" ta="center" mt="1rem">Эсвэл <Link href="/auth/login">нэвтрэх</Link></Text>
                    </Paper>
                </Flex>
            }
        </Center>
    )
}