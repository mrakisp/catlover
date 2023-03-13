import React, { useEffect, useCallback, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, Outlet, useLocation } from "react-router-dom";

//components
import { CustomButton } from "@components/common/button";
import { CatCard } from "@components/common/CatCard";
import { Title } from "@components/common/PageTitle";

//services
import { getCatsAPI } from "@base/services/dataServices";

//intefaces
import { ICats } from "@interfaces/cats";

//styles
import styles from "./catsView.module.css";

interface ViewProps {
  title?: string;
}
function CatsView({ title }: ViewProps) {
  const location = useLocation();
  const [limit] = useState(10); //default page limit
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<ICats[]>([]);

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  //In real project we could use React Query or Custom Hook/Util to destructure {loading state, response/error handling etc}
  const getCats = useCallback(async (limit: number, page: number) => {
    const req = {
      limit: limit,
      page: page,
    };
    getCatsAPI(req).then((response: ICats[]) => {
      if (response && response.length > 0) {
        setCats((prevState) => [...prevState, ...response]);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getCats(limit, page);
  }, [page, getCats, limit]);

  return (
    <>
      {/* Reusable Custom Title Component */}
      {title && <Title title={title} />}

      <div className={styles.listContainer}>
        {cats?.map(function (cat: ICats) {
          return (
            <Link
              key={cat.id}
              to={`/modal/${cat.id}`}
              state={{ background: location }}
            >
              <CatCard id={cat.id} image={cat.url} />
            </Link>
          );
        })}
        <div className={styles.listActionsBottom}>
          {loading ? (
            <CircularProgress />
          ) : (
            <CustomButton
              title="Load More"
              handleButtonClick={handleLoadMore}
            />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default CatsView;
