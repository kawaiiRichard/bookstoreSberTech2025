import styles from "./Favorite.module.css";
import BookCard from "../BookCard/BookCard";
import { useFavorites } from "../../context/FavoriteContext";
import Empty from "../Empty/Empty";

function Favorite() {
  const { favorites } = useFavorites();

  return (
    <>
      <div className={styles.title}>Избранное</div>
      {favorites.length === 0 ? (
        <Empty>Здесь появятся ваши избранные товары</Empty>
      ) : (
        <div className={styles.favorite}>
          {favorites.map((element) => (
            <div key={element.id}>
              <BookCard
                id={element.id}
                title={element.title}
                author={element.author}
                price={element.price}
                imgSrc={element.imgSrc}
                weight={element.weight}
                discount={element.discount}
              ></BookCard>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favorite;
