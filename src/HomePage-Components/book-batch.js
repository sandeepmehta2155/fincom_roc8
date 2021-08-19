import { useBookBatches } from "./book-batch-provider";

export function BookBatches() {
  const { img } = useBookBatches();

  return (
    <div className="bookBatches">
      {img ? (
        img.map((obj) => (
          <img className="bookBatchPills" src={obj} alt="loading" key={obj} />
        ))
      ) : (
        <img
          className="bookBatchPills"
          src="https://as1.ftcdn.net/jpg/02/01/18/68/500_F_201186834_NLRQImmmfLmOHEQpQPXB6wh4F4quHloV.jpg"
          alt="loading"
        />
      )}
    </div>
  );
}
