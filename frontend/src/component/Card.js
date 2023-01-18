import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OutlinedCard({ song }) {
  return (
    <div className="p-2 w-full">
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Title En: {song["Title English"]}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Title Sin: {song["Title Sinhala"]}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Title Sin: {song["Title Sinhala"]}
            </Typography>
            <Typography variant="body1">Singer: {song["Singer English"]}</Typography>
            <Typography variant="body1">Singer: {song["Singer Sinhala"]}</Typography>
            <Typography variant="body1">Singer: {song["Lyricist English"]}</Typography>
            <Typography variant="body1">Singer: {song["Lyricist Sinhala"]}</Typography>
            <Typography variant="body1">Singer: {song["Composer English"]}</Typography>
            <Typography variant="body1">Singer: {song["Composer Sinhala"]}</Typography>
            {/* <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography> */}
            <Typography variant="body2">Lyrics: {song["Lyrics"]}</Typography>
            <Typography variant="body2">Metaphor: {song["Metaphor"]}</Typography>
            <Typography variant="body2">
              Source Domain: {song["Source Domain"]}
            </Typography>
            <Typography variant="body2">
              Target Domain: {song["Target Domain"]}
            </Typography>
            <Typography variant="body2">
              Interpretation: {song["Interpretation"]}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Box>
    </div>
  );
}
