import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { Paper, Button, Center, Flex, TextInput, PasswordInput, Loader, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../../redux/logics/consumerSlice'
import { RootState } from '../../redux/store'

export default function Login() {

    const [load, setLoad] = useState<boolean>(false)
    const routa = useRouter()
    const dispatch = useDispatch()
    const creds = useSelector((state: RootState) => state.login.creds)

    useEffect(() => {

        let mount = true

        if(creds !== null) {
            routa.push('/dash')
        }

        return() => {
            mount = false
        }
    }, [])

    const logdata = useForm({
        initialValues: {
            email: '',
            pass: ''
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Имэйл буруу байна'),
            pass: (val) => (val.length < 8 ? '8 болон дээш урттай байх ёстой' : null),
        }
    })

    const login = async () => {

        try {
            setLoad(true)
            const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logdata.values)
            })

            let data = await resp.json()

            dispatch(authenticate(data))

            setTimeout(() => {
                setLoad(false)
                routa.push("/dash")
            }, 1000)
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
                        <form onSubmit={logdata.onSubmit(login)}>
                            <TextInput label="Мэйл" {...logdata.getInputProps('email')} />
                            <PasswordInput label="Нууц үг" {...logdata.getInputProps('pass')} />
                            <Flex mt="1rem">
                                <Button fullWidth uppercase type="submit">OK</Button>
                            </Flex>
                        </form>
                        <Text fz="sm" ta="center" mt="1rem">Шинэ хэрэглэгч <Link href="/auth/register">болох</Link></Text>
                    </Paper>
                </Flex>
            }
        </Center>
    )
}