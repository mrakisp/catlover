import CatsView from "@pages/catsView";
import BreedsView from "@pages/breedsView";
import FavouritesView from "@pages/favouritesView";
import ErrorView from "@pages/errorView";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import ViewListIcon from "@mui/icons-material/ViewList";

//Set up menu
export const MenuData = [
  {
    id: 1,
    path: "/",
    label: "Cats",
    page: <CatsView title="Cats" />,
    icon: <PetsIcon />,
    hasModal: true,
    showInNav: true,
  },
  {
    id: 2,
    path: "/breeds",
    label: "Breeds",
    page: <BreedsView title="Breeds" />,
    icon: <ViewListIcon />,
    hasModal: true,
    showInNav: true,
  },
  {
    id: 3,
    path: "/favourites",
    label: "Favourites",
    page: <FavouritesView title="Favourites" />,
    icon: <FavoriteIcon />,
    hasModal: false,
    showInNav: true,
  },
  {
    id: 4,
    path: "*",
    label: "Error",
    page: <ErrorView />,
    hasModal: false,
    showInNav: false,
  },
];
