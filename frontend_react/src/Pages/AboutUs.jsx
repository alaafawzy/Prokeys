import React, { useState, useEffect } from 'react';
import { Grid, Box } from "@mui/material";
import { Container } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Question_array } from "../components/Question_array";
import api from '../../Api';
import Feedback from '../Sections/Feedback';
import OurSystems from '../Sections/OurSystems';
import AboutWithRightPic from '../Sections/AboutRightpic';
import SectionsWithLeftPic from '../Sections/AboutLeftPic';
import { Description } from '@mui/icons-material';
// import { Question } from "../Sections/FAQ";
const section_data=[{
  title:"لماذا أخترتنا",
  subtitle:"نحن شريكك الموثوق في النجاح المالي",
  Description:"نحن نقدم خدمات متميزة في مجال الإدارة المالية والمحاسبة، مع فريق من الخبراء المتخصصين الذين يضمنون لك الحصول على أفضل النتائج. نستخدم أحدث التقنيات والأساليب لضمان دقة وسرعة تنفيذ جميع العمليات المالية.",
  benefits:[ 'خبرة تزيد عن 15 عاماً في مجال المحاسبة والإدارة المالية',
  'فريق متخصص من المحاسبين المعتمدين دولياً',
  'استخدام أحدث البرامج والتقنيات المحاسبية',
  'دعم فني متواصل على مدار الساعة',
  'حلول مخصصة تناسب احتياجات عملك']
},
{
  title:"العديد من الخدمات المالية",
  subtitle:"خدمات شاملة لجميع احتياجاتك المالية",
  Description:"نوفر مجموعة واسعة من الخدمات المالية والمحاسبية التي تغطي جميع جوانب عملك. من إعداد القوائم المالية إلى الاستشارات الضريبية، نحن هنا لمساعدتك.",
  benefits:[ 'خبرة واسعة في المجال المحاسبي والإداري',
  'إعداد القوائم المالية الشهرية والسنوية',
  'المراجعة و التدقيق المالى',
  'الاستشارات الضريبية والزكاة',
  'إدارة كشوف الرواتب والموارد البشرية',
  'تصميم وتطوير الأنظمة المحاسبيةالتخطيط المالي الاستراتيجي'],
},
{
  title:"تحسين مهاراتك الإدارية",
  subtitle:"برامج تدريبية متخصصة للتطوير المهني",
  Description:"نقدم برامج تدريبية متقدمة لتطوير المهارات الإدارية والمحاسبية لفريق عملك. برامجنا مصممة خصيصاً لتلبية احتياجات السوق الحديث.",
  benefits:[ 'ورش عمل تفاعلية في المحاسبة والإدارة المالية',
  'دورات تدريبية معتمدة في الأنظمة المحاسبية الحديثة',
  'استشارات إدارية لتحسين الأداء المؤسسي',
  'برامج تطوير القيادات المالية',
  'تدريب على أفضل الممارسات العالمية',
  'شهادات معتمدة دولياً'],
}
]
const section_data_en = [
  {
    title: "Why Choose Us",
    subtitle: "Your trusted partner in financial success",
    description:
      "We provide outstanding services in financial management and accounting, with a team of specialized experts who ensure you achieve the best results. We use the latest technologies and methods to guarantee accuracy and speed in executing all financial operations.",
    benefits: [
      "More than 15 years of experience in accounting and financial management",
      "A specialized team of internationally certified accountants",
      "Using the latest accounting software and technologies",
      "24/7 continuous technical support",
      "Customized solutions tailored to your business needs"
    ]
  },
  {
    title: "A Wide Range of Financial Services",
    subtitle: "Comprehensive services for all your financial needs",
    description:
      "We offer a wide range of financial and accounting services that cover all aspects of your business. From preparing financial statements to tax consulting, we are here to help you.",
    benefits: [
      "Extensive experience in accounting and administrative fields",
      "Preparation of monthly and annual financial statements",
      "Financial review and auditing",
      "Tax and zakat consulting",
      "Payroll and human resources management",
      "Design and development of accounting systems and strategic financial planning"
    ]
  },
  {
    title: "Improve Your Management Skills",
    subtitle: "Specialized training programs for professional development",
    description:
      "We offer advanced training programs to develop the managerial and accounting skills of your team. Our programs are specifically designed to meet the needs of the modern market.",
    benefits: [
      "Interactive workshops in accounting and financial management",
      "Accredited training courses in modern accounting systems",
      "Management consulting to improve institutional performance",
      "Financial leadership development programs",
      "Training on global best practices",
      "Internationally recognized certifications"
    ]
  }
];



export default function AboutUs() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Who = t("AboutUs");
  const { Q1, Q2, Q3 } = t("AboutUs");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/aboutUs/'); // Adjust endpoint as needed
        console.log(response.data[0]);
        
        if (response.data) {
          setData(response.data[0]);
        } else {
          // Set data to an empty array if the response is not an array
          setData([]);
        }
        // setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const textStyle = {
    whiteSpace: 'pre-line', // preserves newlines
  };
  const sec_data=theme.direction=='rtl'?section_data:section_data_en;
  return (
    <Grid>
      <Container
        sx={{
          width: "100%",
          justifyContent: "center",
          "& > div:not(:last-child)": {
            marginBottom: "4rem",
          },
        }}
      >
        
        <Grid
          continer
          sx={{
            "& > div:not(:first-child)": {
              marginBottom: "1.5rem",
              fontFamily: "Cairo",
              fontSize: "1.3rem",
              fontWeight: "400",
              lineHeight: "30px",
              textAlign: "center",
              color: "#4F4F4F",
            },
          }}
        >
          <Grid
            item
            sx={{
              fontFamily: "Cairo",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "24px",
              textAlign: "center",
              color: "#131F89",
              marginBottom: "3rem",
              marginTop: "3rem",
            }}
          >
            {theme.direction=='rtl'?data?.arabic_title:data?.english_title}
            {/* {Who.title} */}
          </Grid>
          <div style={textStyle}>{theme.direction=='rtl'?data?.arabic_description:data?.english_description}</div>
          
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "center",
            // textAlign: "start",
            marginBottom: "3rem",
          }}
        >
          {/* <div
        dangerouslySetInnerHTML={{ __html: data.content }}
      /> */}
      {sec_data.map((section, index) =>
        index % 2 === 0 ? (
          <AboutWithRightPic key={index} data={section} />
        ) : (
          <SectionsWithLeftPic key={index} data={section} />
        )
      )}
          {/* <AboutWithRightPic />
          <SectionsWithLeftPic />
          <AboutWithRightPic /> */}
          <OurSystems />
          <Feedback/>
          {/* <Question_array
            ques={Q1.Question}
            ans={Array.isArray(Q1.Answer) ? Q1.Answer : []}
            bg={"#F9FAFB"}
          />
          <Question_array
            ques={Q2.Question}
            ans={Array.isArray(Q2.Answer) ? Q2.Answer : []}
            bg={"#F9FAFB"}
          />
          <Question_array
            ques={Q3.Question}
            ans={Array.isArray(Q3.Answer) ? Q3.Answer : []}
            bg={"#F9FAFB"}
          /> */}
        </Grid>
        {/* <Grid
          container
          sx={{
            justifyContent: "center",
            "& > div:not(:last-child)": {
              marginBottom: "3rem",
            },
          }}
        >
          <Grid
            item
            sx={{
              fontFamily: "Tajawal",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "24px",
              textAlign: "center",
              color: "#131F89",
            }}
          >
            {Who.OurTeam}
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              direction: `${theme.direction == "ltr" ? "rtl" : "ltr"}`,
              rowGap:"2rem"
            }}
          >
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
          </Grid>
        </Grid> */}
      </Container>
    </Grid>
  );
}
