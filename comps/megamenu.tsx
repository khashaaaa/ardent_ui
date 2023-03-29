import { Box, Text } from '@mantine/core'

export default function Megamenu({ down, state, categories }: any) {

    const downstyle = {
        megamenu: {
            height: down === true ? 'auto' : '0',
            transition: 'height 0.3s',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            border: down === true ? '1px solid lightgray' : '0'
        }
    }

    return (
        <div onMouseLeave={() => state(false)} style={downstyle.megamenu}>
            {
                categories && categories.map((cat: any, num: any) => {

                    const subcats = cat.sub.split(",")

                    return <Box key={num}>
                                <Text fw={700} sx={{ padding: '10px' }}>{cat.main}</Text>
                                {
                                    subcats.map((sub: any, iter: any) => {
                                        return <Text key={iter} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'lightgray' }, display: 'flex', alignItems: 'center', padding: '10px' }}>{sub}</Text>
                                    })
                                }
                            </Box>
                })
            }
        </div>
    )
}