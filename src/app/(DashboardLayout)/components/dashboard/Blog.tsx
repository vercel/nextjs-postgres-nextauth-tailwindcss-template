import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";

import user1 from "public/images/backgrounds/u2.jpg";
import user2 from "public/images/backgrounds/u3.jpg";
import user3 from "public/images/backgrounds/u4.jpg";

const blogs = [
  {
    img: user1,
    title: "Super awesome, Next 14 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "error.main",
  },
  {
    img: user2,
    title: "Super awesome, Next 14 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "warning.main",
  },
  {
    img: user3,
    title: "Super awesome, Next 14 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "primary.main",
  },
];

const BlogCard = () => {
  return (
    <Grid container spacing={3}>
      {blogs.map((blog, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
            }}
          >
            <Image
              src={blog.img}
              alt="img"
              style={{ width: "100%", height: "250px" }}
            />
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Typography variant="h4">{blog.title}</Typography>
              <Typography
                color="textSecondary"
                mt={1}
                fontSize="14px"
                fontWeight={400}
              >
                {blog.subtitle}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: "15px",
                  backgroundColor: blog.btncolor,
                  "&:hover": {
                    backgroundColor: blog.btncolor,
                  },
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogCard;
