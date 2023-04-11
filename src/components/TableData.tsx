import { Product } from "../interfaces";

interface ComponentProps {
  products: Product[];
}

export const TableData = ({ products }: ComponentProps) => {
  const truncateDescription = (description: string) => {
    if (description.length <= 40) {
      return description;
    }

    return description.substring(0, 39) + "...";
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>상품번호</td>
            <td>상품명</td>
            <td>브랜드</td>
            <td>상품내용</td>
            <td>가격</td>
            <td>평점</td>
            <td>재고</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>{truncateDescription(product.description)}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
