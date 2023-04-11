import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TableData } from "./components/TableData";
import { Product } from "./interfaces";
import { getData } from "./service";
import { useSearchParams } from "react-router-dom";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const fetchData = async () => {
    const queryLimit = limit ? +limit : 10;
    const skip = page ? (+page - 1) * queryLimit : 0;
    try {
      const { data } = await getData({
        limit: queryLimit,
        skip: skip,
      });

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const hanlePrev = () => {
    if (!page || +page === 1) {
      return;
    }

    setSearchParams({
      page: `${+page - 1}`,
      limit: limit ? limit : "10",
    });
  };

  const hanleNext = () => {
    if (page && +page === Math.ceil(total / (limit ? +limit : 10))) {
      return;
    }

    setSearchParams({
      page: `${(page ? +page : 1) + 1}`,
      limit: limit ? limit : "10",
    });
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return (
    <div className="App">
      <body>
        <div className="filter">
          <div>Filter</div>
          <div className="filter-search">
            search
            <select>
              <option value="전체">전체</option>
              <option value="상품명">상품명</option>
              <option value="브랜드">브랜드</option>
              <option value="상품내용">상품내용</option>
            </select>
            <input type="text" />
          </div>
        </div>
        <div>Total: {total}</div>
        <TableData products={products} />
        <div className="paging">
          <div>
            <div>Limit</div>
            <div>
              <select
                value={limit ? limit : "10"}
                onChange={(e) => {
                  setSearchParams({
                    page: page ? page : "1",
                    limit: e.target.value,
                  });
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <div>
            <button onClick={hanlePrev}>{"<"}</button>
            {Array.from({
              length: Math.ceil(total / (limit ? +limit : 10)),
            }).map((value, index) => (
              <button
                onClick={() => {
                  setSearchParams({
                    page: `${index + 1}`,
                    limit: limit ? limit : "10",
                  });
                }}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={hanleNext}>{">"}</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
