import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

//intefaces
import { IBreed } from "@interfaces/cats";

//styles
import styles from "./breedInfoList.module.css";

interface BreedInfoListProps {
  data: IBreed[];
}
export function BreedInfoList({ data }: BreedInfoListProps) {
  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <List>
      {data?.map(function (breed: IBreed, index: number) {
        return (
          <div className={styles.infoList} key={breed.id}>
            <ListItem>
              <ListItemText primary="Name" secondary={breed.name} />
              <ListItemText
                primary="Description"
                secondary={breed.description}
              />
            </ListItem>
            <Grid container>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <Typography component="legend">Child Friendly</Typography>
                  <Rating
                    name="read-only"
                    value={breed.child_friendly}
                    readOnly
                  />
                </ListItem>
                <ListItem>
                  <Typography component="legend">Dog Friendly</Typography>
                  <Rating
                    name="read-only"
                    value={breed.dog_friendly}
                    readOnly
                  />
                </ListItem>
                <ListItem>
                  <Typography component="legend">Energy Level</Typography>
                  <Rating
                    name="read-only"
                    value={breed.energy_level}
                    readOnly
                  />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12} className={styles.noTopMargins}>
                <ListItem>
                  <ListItemText primary="Origin" secondary={breed.origin} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Life Span"
                    secondary={breed.life_span + " Years"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Temperament"
                    secondary={breed.temperament}
                  />
                </ListItem>
                {breed.wikipedia_url && (
                  <ListItem>
                    <ListItemText
                      primary="Wikipedia"
                      secondary={<span className={styles.link}>Link</span>}
                      onClick={() => handleOpenUrl(breed.wikipedia_url)}
                    />
                  </ListItem>
                )}
              </Grid>
            </Grid>
          </div>
        );
      })}
    </List>
  );
}
