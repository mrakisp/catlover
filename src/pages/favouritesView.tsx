import React, { useEffect, useCallback, useState } from "react";
import { sub_id } from "@base/config/config";
import CircularProgress from "@mui/material/CircularProgress";

//components
import { CatCard } from "@components/common/CatCard";
import { Title } from "@components/common/PageTitle";

//services
import {
  getFavouriteCats,
  removeFavouriteCat,
} from "@base/services/dataServices";

//intefaces
import { IFavCats } from "@interfaces/favCats";

//styles
import styles from "./favouritesView.module.css";

interface ViewProps {
  title?: string;
}
function FavouritesView({ title }: ViewProps) {
  const [limit] = useState(100);
  const [page] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [favCats, setFavCats] = useState<IFavCats[]>([]);

  //In real project we could use React Query or Custom Hook to destructure {loading state, error handling etc}
  const getFavCats = useCallback(async (limit: number, page: number) => {
    setIsLoading(true);
    const req = {
      limit: limit,
      page: page,
      sub_id: sub_id,
    };
    getFavouriteCats(req).then((response: IFavCats[]) => {
      if (response && response.length > 0) {
        setFavCats((prevState) => [...prevState, ...response]);
      }
      setIsLoading(false);
    });
  }, []);

  const handleRemoveFromFavs = (id: string) => {
    removeFavouriteCat(id).then((response) => {
      if (response && response.message === "SUCCESS") {
        deleteFavCatById(id);
      }
    });
  };

  //filter by id
  const deleteFavCatById = (id: string) => {
    setFavCats((oldValues) => {
      return oldValues.filter((favCat) => favCat.id !== id);
    });
  };

  useEffect(() => {
    getFavCats(limit, page);
  }, [page, getFavCats, limit]);

  return (
    <>
      {title && <Title title={title} />}

      <div className={styles.listContainer}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          favCats?.map(function (favCat: IFavCats) {
            return (
              <CatCard
                key={favCat.id}
                id={favCat.id}
                image={favCat.image.url}
                handleButtonClick={handleRemoveFromFavs}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default FavouritesView;
