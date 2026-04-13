import cakeImg from "../../assets/cake.png";

type ItemProps = {
  name: string;
  price: number;
  onAddToCart: () => void;
};

function Item({ name, price, onAddToCart }: ItemProps) {
  return (
    <div className="flex flex-col w-60">
      <div className="relative flex flex-row items-center justify-center w-60 h-60 bg-[#d18e97] rounded-3xl">
        <div className="font-opun text-lg absolute -top-3 -right-3 z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#9a3140] bg-[#ffe7b5] text-[#9a3140] shadow-sm">
          P{price}
        </div>
        <img src={cakeImg} className="w-50 h-50"></img>
      </div>
      <h1 className="font-opun text-[#9a3140] mt-4 text-lg text-center">
        {name}
      </h1>
      <button
        onClick={onAddToCart}
        className="font-pangolin text-white mt-4 w-auto bg-[#d18e97] rounded-full p-2 cursor-pointer"
      >
        ADD TO CART
      </button>
    </div>
  );
}

export default Item;
