import React from "react";

const card = () => {
  return <div>card</div>;
};

export default card;

// <Card
// sx={{
//   width: "400px",
//   minHeight: 300,
//   p: 3,
//   display: "flex",
//   flexDirection: "column",
//   flexWrap: "wrap",
//   alignItems: "center",
//   borderRadius: "25px",
//   // backgroundColor: "#EEF0F2",
// }}
// >
// <CardMedia
//   component="img"
//   height="140"
//   image="https://th.bing.com/th/id/OIP.CIjnLNfuNOZ_71H2g1nE5gHaF7?pid=ImgDet&rs=1"
//   alt="random"
// />
// <CardHeader title={post.gadgetname} />
// {/* <Typography sx={{ color: "black" }}>{post.category}</Typography> */}
// {/* <Typography sx={{ color: "black" }}>{post.model}</Typography>
// <Typography sx={{ color: "black" }}>{post.price}</Typography>
// <Typography sx={{ color: "black" }}>{post.rate}</Typography>
// <Typography sx={{ color: "black" }}>{post.authoremail}</Typography> */}

// <CardContent>
//   <Grid
//     item
//     xs={12}
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//     }}
//   >
//     <Typography
//       sx={{
//         color: "black",
//         fontSize: "15px",
//         fontWeight: "bold",
//         backgroundColor: "#83c5be",
//         borderRadius: "10px",
//         padding: "5px 10px",
//       }}
//     >
//       {post.category}
//     </Typography>
//     <Typography
//       sx={{
//         color: "black",
//         fontSize: "15px",
//         fontWeight: "bold",
//         backgroundColor: "#83c5be",
//         borderRadius: "10px",
//         padding: "5px 10px",
//       }}
//     >
//       {post.model}
//     </Typography>
//   </Grid>
//   <Grid
//     item
//     xs={12}
//     sx={{
//       my: "15px",
//     }}
//   >
//     <Typography
//       sx={{
//         color: "black",
//         fontSize: "16px",
//         backgroundColor: "#EEF0F2",
//         padding: "5px 10px",
//       }}
//     >
//       {post.review.slice(0, 100)} ...{" "}
//       <Button onClick={handleOpen}>Read More</Button>
//     </Typography>
//     <Typography
//       sx={{
//         color: "black",
//         fontSize: "15px",
//         textAlign: "right",
//         mt: "10px",
//       }}
//     >
//       By{" "}
//       <span style={{ fontWeight: "light" }}>
//         {" "}
//         {post.authorname}
//       </span>
//     </Typography>
//   </Grid>
// </CardContent>

// <CardActions sx={{ mt: "10px", p: 0 }}>
//   <Grid
//     item
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "center",
//     }}
//   >
//     <Button
//       variant="contained"
//       sx={{
//         backgroundColor: "transparent",
//         mr: "10px",
//       }}
//     >
//       <ThumbUpIcon sx={{ color: "black", fontSize: "25px" }} />
//     </Button>
//     <Button
//       variant="contained"
//       sx={{
//         backgroundColor: "transparent",
//       }}
//     >
//       <ChatBubbleIcon sx={{ color: "black", fontSize: "25px" }} />
//     </Button>
//   </Grid>
// </CardActions>
// </Card>
