import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { logout, profile } from '../../redux/logics/consumerSlice'
import { Container, Flex, Image, Input, Button, Space } from '@mantine/core'
import { IconSearch, IconCategory, IconSchema, IconShoppingCart, IconUser, IconHeart } from '@tabler/icons'
import Megamenu from '../../comps/megamenu'

export async function getStaticProps() {

    try {
        const raw = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'procedure/categories')
        const { data } = await raw.json()
        
        return {
            props: { data }
        }
    }
    catch(e) {
        console.log(e)
    }
}

export default function Index({ data }: any) {

    const routa = useRouter()
    const creds = useSelector((state: RootState) => state.login.creds)
    const token = useSelector((state: RootState) => state.login.token)
    const disp = useDispatch()
    const consumer = useSelector((state: RootState) => state.login.consumer)
    const [down, setDown] = useState(false)

    useEffect(() => {
        if(creds === null) {
            routa.push('/auth/login')
        }

        let mount = true

        const getProfile = async() => {

            try {
                if(creds) {
                    const raw = await fetch(
                        process.env.NEXT_PUBLIC_BASE_URL + 'consumer/' + creds.mark,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                    const resp = await raw.json()
                    mount && disp(profile(resp.data))
                    if(resp.statusCode !== 200) {
                        disp(logout())
                        routa.push('/auth/login')
                    }
                }
            }
            catch(err) {
                console.error(err)
            }
        }

        getProfile()

        return() => {
            mount = false
        }
    }, [])

    return (
        <Container size="xl">
            <Flex sx={{ padding: '1rem 0' }} justify="center" align="center">
                <Flex sx={{ minWidth: '160px', marginRight: '2rem' }} justify="center" align="center">
                    <Image src="/logo/ardent.png" alt="ardent logo" />
                </Flex>

                <Flex gap="md" justify="center" align="center">
                    <Button onClick={() => setDown(!down)} variant="subtle" size="md" color="dark" leftIcon={<IconCategory />}>
                        Products
                    </Button>
                    <Button variant="subtle" size="md" color="dark" leftIcon={<IconSchema />}>
                        Services
                    </Button>
                </Flex>

                <Input.Wrapper sx={{ width: '100%', margin: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Input sx={{ width: '100%' }} size="md" />
                    <Space w="md" />
                    <Button size="md" variant="default" leftIcon={<IconSearch />}>Хайх</Button>
                </Input.Wrapper>

                <Flex gap="md" justify="center" align="center">
                    <IconHeart style={{ cursor: 'pointer' }} />
                    <IconShoppingCart style={{ cursor: 'pointer' }} />
                    <IconUser style={{ cursor: 'pointer' }} />
                </Flex>
            </Flex>

            <Megamenu down={down} state={setDown} categories={data} />
        </Container>
    )
}