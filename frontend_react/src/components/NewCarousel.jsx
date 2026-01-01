import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useTheme } from "@emotion/react";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

export default function InfiniteCarousel({ items }) {
  // const items = [
  //   "Item 1",
  //   "Item 2",
  //   "Item 3",
  //   "Item 4",
  //   "Item 5",
  //   "Item 6",
  // ];
  // console.log(items);
  
  const loopItems = [...items, ...items,...items,...items,...items];
  // console.log(loopItems)
  // loopItems.map((src, i) => {
  //   console.log(src)
  // })
  // for(it in loopItems){
  //   console.log()
  // }
  const theme = useTheme();
const isRTL = theme.dir === "rtl";
  return (
    <Box sx={{ overflow: "hidden", width: "100%", whiteSpace: "nowrap" }}>
      <Box
        sx={{
          display: "inline-flex",
          animation: `${isRTL ? scrollRight : scrollLeft} 60s linear infinite`,
        }}
      >
        {loopItems.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src.logo}
            alt={src.logo_alt_text}
            sx={{
              width: 120,
              // height: 120,
              my: 1,
              mx:6,
              borderRadius: 2,
              objectFit: "contain",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
