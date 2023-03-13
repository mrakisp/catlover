import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import { sub_id } from "@base/config/config";

//styles
import styles from "./CatModal.module.css";

//components
import { BreedInfoList } from "@components/common/breedInfoList";
import { CustomButton } from "@components/common/button";

//hooks
import { usePreventBodyScroll, useCopyToClipboard } from "@hooks/index";

//services
import {
  getCatById,
  likeACat,
  getLikedCatByID,
} from "@base/services/dataServices";

import { ICats } from "@interfaces/cats";

export const CatModal = () => {
  usePreventBodyScroll({ isOpen: true });
  const [isCopied, copyToClipboard] = useCopyToClipboard(window.location.href);
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [breedInfo, setBreedInfo] = useState<ICats>();
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const showCatBreedById = useCallback(async (id: string) => {
    setLoading(true);
    getCatById(id).then((response: ICats) => {
      if (response) {
        setBreedInfo(response);
      }
      setLoading(false);
    });
  }, []);

  const handleClose = () => {
    //if has state then return user in prev screen else if he come here directly return on home
    if (state) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleAddToFavourites = () => {
    const req = {
      image_id: id,
      sub_id: sub_id,
    };
    likeACat(req).then((response: { id: number; message: string }) => {
      if (response && response.message === "SUCCESS") {
        setIsFavourite(true);
      }
    });
  };

  const handleGetFavourites = (id: string) => {
    const req = {
      image_id: id,
      sub_id: sub_id,
    };
    getLikedCatByID(req).then((response) => {
      if (response && response.length > 0) {
        setIsFavourite(true);
      }
    });
  };

  useEffect(() => {
    if (id) {
      showCatBreedById(id);
      handleGetFavourites(id);
    }
  }, [showCatBreedById, id]);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <Grid container spacing={2}>
          {loading ? (
            <Grid item xs={12} textAlign="center">
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} textAlign="center">
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleAddToFavourites}
                >
                  {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label="copy" onClick={copyToClipboard}>
                  {isCopied ? "Copied!" : <ContentCopyIcon />}
                </IconButton>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <img width="300px" alt={breedInfo?.id} src={breedInfo?.url} />
              </Grid>
              <Grid item xs={12} textAlign="center">
                {breedInfo?.breeds && breedInfo?.breeds.length > 0 ? (
                  <BreedInfoList data={breedInfo?.breeds} />
                ) : (
                  "No Breed Data Available"
                )}
              </Grid>
              <Grid item xs={12} textAlign="center">
                <CustomButton title="Close" handleButtonClick={handleClose} />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};
