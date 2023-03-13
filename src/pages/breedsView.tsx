import React, { useEffect, useCallback, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { Link, Outlet, useLocation } from "react-router-dom";

//components
import { SelectBreeds } from "@components/breedsView/BreedList";
import { DialogModal } from "@components/breedsView/dialog";
import { Title } from "@components/common/PageTitle";

//services
import { getCatBreeds, getCatBreedById } from "@base/services/dataServices";

//intefaces
import { ICats, IBreed } from "@interfaces/cats";

//styles
import styles from "./breedsView.module.css";

interface ViewProps {
  title?: string;
}

function BreedsView({ title }: ViewProps) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState<IBreed[]>([]);
  const [catsByBreed, setCatsByBreed] = useState<ICats[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (breedId: string) => {
    setSelectedBreed(breedId);
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  //get all breeds
  const getBreeds = useCallback(async () => {
    setLoading(true);
    getCatBreeds().then((response: IBreed[]) => {
      if (response && response.length > 0) {
        setBreeds(response);
      }
      setLoading(false);
    });
  }, []);

  //get cats by breed
  const getBreedsById = useCallback(async (id: string) => {
    setLoading(true);
    const req = {
      breed_ids: id,
      limit: 5,
    };
    getCatBreedById(req).then((response: ICats[]) => {
      if (response && response.length > 0) {
        setCatsByBreed(response);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getBreeds();
  }, [getBreeds]);

  useEffect(() => {
    if (selectedBreed) getBreedsById(selectedBreed);
  }, [selectedBreed, getBreedsById]);

  return (
    <>
      {/* Resuable Custom Title Component */}
      {title && <Title title={title} />}

      <div className={styles.wrapper}>
        {/* Select List Component */}
        <SelectBreeds
          data={breeds}
          selectedBreed={selectedBreed}
          handleChange={handleChange}
        />

        {/* Reusable Modal rendering children as content */}
        <DialogModal isOpen={isOpen} handleDialogClose={handleDialogClose}>
          <div className={styles.dialogContainer}>
            {loading ? (
              <CircularProgress />
            ) : (
              catsByBreed?.map(function (cat: ICats) {
                return (
                  <div className={styles.listItem} key={cat.id}>
                    <Link
                      to={`/modal/${cat.id}`}
                      state={{ background: location }}
                    >
                      <img alt={cat.id} src={cat.url} />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </DialogModal>
      </div>
      <Outlet />
    </>
  );
}

export default BreedsView;
