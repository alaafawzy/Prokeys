import React from 'react'
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import free1 from '../assets/free1.jpeg'
import free2 from '../assets/free2.jpeg'
import free3 from '../assets/free3.jpeg'
import { Box } from '@mui/material';
import Btn from './../components/Btn';
import BookYourSession from '../Sections/BookYourSession';
import { useTranslation } from 'react-i18next';

export default function FreeProducts() {
    const { t } = useTranslation();
    const Free = t("freeProducts");
    return (
        <>
            <Grid sx={{
                marginBottom: "3rem"
            }}>
                <Container>
                    <Grid container sx={{
                        justifyContent: "center"
                    }}>
                        <Grid item
                            sx={{
                                fontFamily: "Tajawal",
                                fontSize: "32px",
                                fontWeight: "700",
                                lineHeight: "24px",
                                color: "#131F89",
                                margin: "3rem 0"
                            }}
                        >
                            {Free.title}
                        </Grid>
                    </Grid>
                    <Grid container sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "space-between" },
                    }}>
                        <OurFreeProducts img={free3} title={Free.sectionTitle3} desc={Free.sectionDesc3} />
                        <OurFreeProducts img={free2} title={Free.sectionTitle2} desc={Free.sectionDesc2} />
                        <OurFreeProducts img={free1} title={Free.sectionTitle1} desc={Free.sectionDesc1} />

                    </Grid>
                </Container>

            </Grid>
            <BookYourSession />
        </>
    )
}


function OurFreeProducts({ title, desc, img }) {
    return (
        <>
            <Grid item md={3.7} xs={11}
                sx={{
                    "& > div": {
                        marginBottom: "0.8rem",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                <Box>
                    <img src={img} style={{ width: '100%', borderRadius: '16px' }}></img>
                </Box>
                <Box sx={{
                    fontFamily: "Tajawal",
                    fontSize: "24px",
                    fontWeight: "700",
                    lineHeight: "32px",
                    color: "#1A1A1A",
                    textAlign: "center"

                }}>
                    {title}
                </Box>
                <Box sx={{
                    fontFamily: "Tajawal",
                    fontSize: "20px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    color: "#4F4F4F",
                    textAlign: "left"

                }}>
                    {desc}
                </Box>
                <Box>
                    <Btn bg={"#131F89"} FontColor={"white"} H={"60px"} W={"120px"} >
                        تنزيل الان
                    </Btn>
                </Box>





            </Grid>
        </>
    )


}